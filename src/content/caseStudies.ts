import type { CaseStudy } from "./types";

/**
 * Case-study content — verified against github.com/HusainMain/* repositories
 * (README, source files, package.json, firestore.rules, live deployments).
 * ideabridge: README, frontend + server package.json, server/src/index.ts,
 * server/src/routes/analysis.ts, AUDIT_REPORT.md.
 * healthcare-appointment-system: README + all six .java source files.
 * iems: README, package.json, firestore.rules, schema.md, architecture.md, src tree.
 * buildex-website: README, package.json, src tree, live buildex-website-sooty.vercel.app.
 * Nothing here is invented. Where repository documentation and source disagree,
 * the source is treated as authoritative (see the healthcare reflection).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "ideabridge",
    problem: [
      "IdeaBridge is an AI-powered startup validation platform: a web application that guides early-stage founders from a raw business idea to a structured, venture-ready plan.",
      // Verified: README — "Bridging early-stage ideas to structured, venture-ready startup blueprints."
      "The product is a four-view journey — a cinematic landing page with an interactive 3D orb, a multi-step founder intake flow, an AI analysis workspace, and a results workspace with readiness indicators, incubator recommendations, and a milestone roadmap.",
      // Verified: README Key Features + directory structure (LandingPage → IdeaInputFlow → AnalysisScreen → ResultsWorkspace).
    ],
    constraints: [
      {
        number: "01",
        text: "Browser-rendered 3D must stay usable — the orb runs on a continuous animation loop and must not compromise reading or page performance.",
      },
      // Verified: InteractiveOrb.tsx / OrbController.tsx (README structure); AUDIT_REPORT flags the rAF loop.
      {
        number: "02",
        text: "LLM latency and cost — every analysis request hits external model APIs, so responses must be rate-limited and cached.",
      },
      // Verified: express-rate-limit (middleware/rateLimiter.ts) + node-cache (utils/cache.ts).
      {
        number: "03",
        text: "LLM output reliability — unstructured model responses must be validated before they reach the user.",
      },
      // Verified: two-stage validation in routes/analysis.ts (zod schema → deterministic → AI validation).
      {
        number: "04",
        text: "A public API boundary — the analysis API is consumed from a deployed client, so it needs hardening, structured errors, and a health endpoint.",
      },
      // Verified: helmet, CORS allowlist, /health, error middleware in server/src/index.ts; groqErrorMapper.
    ],
    decisions: [
      {
        number: "D1",
        decision: "A single-page, four-view journey with client-side state",
        reason:
          "Landing, intake, analysis, and results are one continuous session; a Zustand store (useJourneyStore) carries the idea, the results, and step progress without page reloads.",
        tradeOff:
          "All four views share one client bundle and deep-linking into a specific step is limited.",
      },
      // Verified: README — store/useJourneyStore.ts + pages structure.
      {
        number: "D2",
        decision: "A custom shader-based 3D orb instead of stock 3D assets",
        reason:
          "The orb is built with Three.js and React Three Fiber, isolated in its own component, with content rendered on separate HTML layers (ContentLayer / ProjectionLayer) above the WebGL canvas.",
        tradeOff:
          "The continuous render loop costs battery and CPU; the repository's own audit report flags this.",
      },
      // Verified: README — InteractiveOrb.tsx, OrbController.tsx, ContentLayer, ProjectionLayer; AUDIT_REPORT §2.1.4.
      {
        number: "D3",
        decision: "Validate before generating",
        reason:
          "The analysis route runs two-stage validation — a zod schema, deterministic rules from the shared validation module, then model validation via Groq — and refuses analysis with a 422 response when the idea does not pass.",
        tradeOff:
          "The extra model call adds latency before any analysis is produced.",
      },
      // Verified: routes/analysis.ts (analysisSchema.safeParse, validateDeterministic, validateIdea, 422 responses).
      {
        number: "D4",
        decision: "Cache identical analysis requests server-side",
        reason:
          "node-cache stores the normalized response keyed by the serialized request body, so repeated submissions skip generation entirely.",
        tradeOff:
          "The cache key is exact — near-identical submissions miss it and are regenerated.",
      },
      // Verified: routes/analysis.ts (cacheKey = JSON.stringify(req.body), analysisCache.get/set).
      {
        number: "D5",
        decision: "A dedicated service boundary with structured errors",
        reason:
          "Generation, validation, incubator matching, response normalization, and error mapping each live in their own service under the Express API; failures return mapped codes (400, 422, 429, 500) instead of raw exceptions.",
        tradeOff:
          "More moving parts, but each is independently testable and replaceable.",
      },
      // Verified: server/src/services + utils (groqService, validationService, incubatorMatchingService, normalizer, error mapper).
    ],
    implementation: {
      body: [
        "The analysis pipeline lives in a single route, POST /api/analyze. A zod schema parses the request, deterministic rules from the shared validation module run first, then the idea is validated by the model; only a valid idea reaches generation.",
        // Verified: routes/analysis.ts.
        "Generated responses are normalized, cached in node-cache keyed by the serialized request body, and enriched with incubator recommendations matched against curated data before the { analysis, validation } payload is returned to the client.",
        // Verified: routes/analysis.ts (normalizeResponse, analysisCache, matchIncubators, attachIncubatorRecommendations); timelineData.ts labeled mock dataset.
        "The API is hardened with helmet, a CORS allowlist (the deployed origin and localhost), and rate limiting; failures map to structured error codes, a timeout utility bounds model calls, and /health exposes liveness.",
        // Verified: server/src/index.ts (helmet, cors, trust proxy, /health) + utils (timeout, rateLimiter).
        "The repository contains 57 commits, the React SPA, an Express + TypeScript server, a shared validation module, and AUDIT_REPORT.md — a full production-readiness audit documenting the product's known weaknesses (focus states, a large landing-page DOM, reduced-motion gaps).",
        // Verified: repo root listing + AUDIT_REPORT.md (2026-06-26).
      ],
      annotations: [
        { anchor: "single route", note: "zod → deterministic → Groq validation" },
        { anchor: "cache", note: "cache key = JSON.stringify(body)" },
        { anchor: "errors", note: "400 · 422 · 429 · 500 mapped" },
        { anchor: "shared module", note: "shared/ validation — used by the server" },
      ],
    },
    architecture: {
      title: "IdeaBridge system architecture — conceptual diagram",
      desc: "A React SPA with four views and a Zustand store posts idea data to an Express API. The API validates the request with a zod schema, deterministic rules, and model validation, then generates analysis via Groq, normalizes and caches the response, matches incubator recommendations against curated data, and returns a structured response. The shared validation module is imported by the server.",
      layers: [
        {
          label: "CLIENT — REACT SPA",
          nodes: [
            { id: "landing", label: "Landing", sub: "3D shader orb" },
            { id: "intake", label: "Idea intake", sub: "multi-step wizard" },
            { id: "analysis", label: "Analysis", sub: "loading workspace" },
            { id: "results", label: "Results", sub: "roadmap · match" },
          ],
        },
        {
          label: "API — EXPRESS",
          nodes: [
            {
              id: "api",
              label: "POST /api/analyze",
              sub: "helmet · rate limit · CORS",
              accent: true,
            },
          ],
        },
        {
          label: "VALIDATION",
          nodes: [
            { id: "det", label: "Schema + rules", sub: "zod · deterministic" },
            { id: "aival", label: "Model validation", sub: "Groq" },
          ],
        },
        {
          label: "SHARED MODULE",
          nodes: [
            { id: "shared", label: "shared/", sub: "types · validation · errors" },
          ],
        },
        {
          label: "AI SERVICES",
          nodes: [
            { id: "groq", label: "Analysis", sub: "Groq SDK" },
            { id: "norm", label: "Normalizer", sub: "response shape" },
            { id: "cache", label: "Cache", sub: "node-cache" },
            { id: "match", label: "Incubator match", sub: "curated data" },
          ],
        },
        {
          label: "RESPONSE",
          nodes: [
            { id: "resp", label: "Structured response", sub: "analysis + validation" },
          ],
        },
      ],
      edges: [
        { from: "intake", to: "api", label: "POST /api/analyze" },
        { from: "api", to: "det", label: "parse" },
        { from: "det", to: "aival", label: "rules pass" },
        { from: "aival", to: "groq", label: "valid" },
        { from: "groq", to: "norm", label: "raw" },
        { from: "norm", to: "cache", label: "normalized" },
        { from: "cache", to: "match", label: "enrich" },
        { from: "match", to: "resp", label: "result" },
        { from: "shared", to: "det", label: "imports", dashed: true },
      ],
    },
    stack: [
      {
        group: "Frontend",
        tags: [
          "React",
          "TypeScript",
          "Vite",
          "Three.js",
          "React Three Fiber",
          "Framer Motion",
          "Zustand",
          "React Router",
          "Tailwind",
          "lucide-react",
        ],
      },
      {
        group: "Backend",
        tags: [
          "Express",
          "TypeScript",
          "Groq SDK",
          "Google GenAI",
          "Zod",
          "node-cache",
          "express-rate-limit",
          "helmet",
        ],
      },
      {
        group: "Shared",
        tags: ["Validation module", "Shared types", "Error modules"],
      },
    ],
    repository: {
      url: "https://github.com/HusainMain/ideabridge",
      evidence:
        "The repository contains the React SPA, the Express analysis API, and the shared validation module — 57 commits, with a production-readiness audit (AUDIT_REPORT.md) included.",
    },
    reflection: {
      pullLine:
        "IdeaBridge is where I learned that the system boundary — not the orb — is the part that has to hold.",
      body: "The repository's own audit report documents the rough edges: focus states, a large landing-page DOM, and animations that did not respect reduced motion. Those findings are exactly why this portfolio treats accessibility and performance as design constraints rather than afterthoughts.",
    },
  },
  {
    slug: "healthcare-appointment-system",
    problem: [
      "A small clinic schedules patients against a fixed roster of doctors, and without a scheduling model, one doctor's waitlist can grow invisibly while another sits idle. The system has to keep every doctor's appointments ordered and visible so that patients are served fairly and nothing is lost between bookings.",
      // Verified: README — "simplify doctor-patient scheduling while preventing appointment conflicts and managing fully booked time slots through a waitlist" + Main.java per-doctor queues.
      "This is a console application: patients are registered at booking time, appointments are enqueued against a chosen doctor, and staff can view a doctor's queue, cancel a booking, or advance the queue when a consultation ends. Everything happens in a terminal session, in memory, with no database behind it.",
      // Verified: Main.java — 5-option menu (book / cancel / view queue / view doctors / exit); no file or DB I/O anywhere in the source.
    ],
    constraints: [
      {
        number: "01",
        text: "Console-only interface — everything must run from a terminal with plain Java and no external libraries.",
      },
      // Verified: README ("javac *.java" / "java Main") + source (only java.util imports).
      {
        number: "02",
        text: "In-memory data only — the doctor roster and every queue live in static fields for the session; there is no persistence layer.",
      },
      // Verified: Main.java — static Doctor[] + static QueueManager[]; no File/DB classes anywhere.
      {
        number: "03",
        text: "Uncontrolled user input — a terminal user can type anything at any prompt; invalid input must never crash the program.",
      },
      // Verified: readInt() loop in Main.java — reprompts until a valid integer.
      {
        number: "04",
        text: "Per-doctor isolation — one doctor's queue must not interfere with another's; each doctor keeps their own ordering.",
      },
      // Verified: Main.java — one QueueManager per doctor (queues[i] for doctors[i]).
    ],
    decisions: [
      {
        number: "D1",
        decision: "One queue per doctor instead of a shared schedule",
        reason:
          "Each doctor owns a QueueManager wrapping a LinkedList<Appointment>. Bookings enqueue against a specific doctor, so workload and arrival order are tracked per doctor and a doctor can never be double-assigned at the same position in their own queue.",
        tradeOff:
          "There is no shared schedule across doctors — the caller must choose a doctor up front, and there are no time slots at all.",
      },
      // Verified: Main.java static block (queues[i] = new QueueManager(doctors[i])) + QueueManager.java.
      {
        number: "D2",
        decision: "FIFO waitlist semantics",
        reason:
          "Appointments are added at the tail and polled from the head — first booked, first served. The booking confirmation prints the queue position, either \"You are next!\" or \"#N (M patient(s) ahead)\".",
        tradeOff:
          "Strictly arrival order — there is no priority or urgent-case handling.",
      },
      // Verified: QueueManager.java (add / poll) + Main.java confirmation card.
      {
        number: "D3",
        decision: "Cancellation by appointment ID versus removing the queue head",
        reason:
          "Two explicit modes: cancelById() scans all seven queues with removeIf to find a specific appointment (a patient cancelling their own booking), while the second mode polls the head — \"doctor done with current patient\" — and prints who is next.",
        tradeOff:
          "Cancel-by-ID is a linear scan across every queue; there is no index.",
      },
      // Verified: Main.java cancelAppointment() + QueueManager.java cancelById / removeHead.
      {
        number: "D4",
        decision: "A safe integer input loop",
        reason:
          "Every numeric prompt goes through readInt(), which reprompts until a valid integer is entered (\"Invalid input — please enter a number.\"). Text fields get a separate non-empty check. Malformed input can never crash the menu loop.",
        tradeOff:
          "Prompts are strictly numeric — no fuzzy parsing or abbreviations.",
      },
      // Verified: Main.java readInt() + scheduleAppointment() empty-field rejection.
    ],
    implementation: {
      body: [
        "The roster is seeded as a static array of seven doctors — each with a name, specialization, experience in years, and a plain-language \"treats\" description — and a static block builds one QueueManager per doctor. The main loop then presents a five-option menu: book, cancel, view queue, view doctors, exit.",
        // Verified: Main.java (doctors array + static queues block + printMenu).
        "Booking prompts for full name, gender, age, and symptoms. Empty text fields reject the booking; the caller then picks a doctor from a numbered list. A new Appointment is created with an auto-incrementing ID (the static counter starts at 2001) and enqueued, and the confirmation card reports the queue position.",
        // Verified: Main.java scheduleAppointment() + Appointment.java (nextId = 2001, appointmentId = ++nextId).
        "Cancellation works two ways: by appointment ID (a linear scan across all queues) or by removing the head of a selected doctor's queue, which prints the next patient's name. Viewing prints a formatted ASCII table of a doctor's queue with positions, IDs, patients, and symptoms.",
        // Verified: Main.java cancelAppointment() + QueueManager.java displayQueue().
        "Exiting closes the scanner and terminates. Nothing is written to disk — the roster and queues live and die with the process. That is the actual scope of the implementation: an educational console model of queue-based scheduling, not a full booking system.",
        // Verified: Main.java — no file I/O classes imported or used.
      ],
      annotations: [
        { anchor: "one QueueManager per doctor", note: "queues[i] ↔ doctors[i]" },
        { anchor: "auto-incrementing ID", note: "nextId starts at 2001" },
        { anchor: "FIFO", note: "add at tail · poll at head" },
        { anchor: "readInt", note: "reprompts — never crashes" },
      ],
    },
    architecture: {
      title: "Healthcare Appointment System — class and queue topology",
      desc: "Main seeds seven doctors and one QueueManager per doctor. Doctor and Patient extend the Person base class. Appointments link one doctor to one patient with an auto-incrementing ID, and are enqueued into the doctor's FIFO queue, from which they are polled in arrival order.",
      note: "Topology verified against the repository's source files — the Person hierarchy, the per-doctor queue ownership, and the in-memory lifecycle of the program.",
      layers: [
        {
          label: "MODELS",
          nodes: [
            { id: "person", label: "Person", sub: "name · gender · age" },
            { id: "doctor", label: "Doctor", sub: "specialization · experience" },
            { id: "patient", label: "Patient", sub: "sickness" },
          ],
        },
        {
          label: "SCHEDULING",
          nodes: [
            { id: "appt", label: "Appointment", sub: "auto ID 2001+" },
            { id: "queue", label: "QueueManager", sub: "LinkedList<Appointment>", accent: true },
          ],
        },
        {
          label: "ENTRY",
          nodes: [
            { id: "main", label: "Main", sub: "roster · menu loop" },
          ],
        },
      ],
      edges: [
        { from: "person", to: "doctor", label: "extends" },
        { from: "person", to: "patient", label: "extends" },
        { from: "doctor", to: "appt", label: "1 : n" },
        { from: "patient", to: "appt", label: "1 : 1" },
        { from: "doctor", to: "queue", label: "1 : 1" },
        { from: "appt", to: "queue", label: "enqueued" },
        { from: "main", to: "queue", label: "owns 7" },
      ],
    },
    stack: [
      {
        group: "Language",
        tags: ["Java", "Console application"],
      },
      {
        group: "Data structures",
        tags: ["Queue — LinkedList", "Arrays"],
      },
      {
        group: "Concepts",
        tags: ["OOP — inheritance", "Encapsulation", "Input validation"],
      },
    ],
    repository: {
      url: "https://github.com/HusainMain/Healthcare_Appointment_System",
      evidence:
        "Six classes — Person, Doctor, Patient, Appointment, QueueManager, Main. Plain javac build with no dependencies; an educational Java project.",
    },
    reflection: {
      pullLine: "Six classes. One queue per doctor. No dependencies. This is what fundamentals look like.",
      body: "This project demonstrates core CS concepts in a single console application: a Person → Doctor/Patient inheritance hierarchy, encapsulation via QueueManager per doctor, FIFO scheduling with LinkedList, auto-incrementing IDs, and a defensive input loop that reprompts until valid. It runs with `javac *.java && java Main` — no build tools, no frameworks, no database. The scope is intentionally narrow: an in-memory queue model that lives and dies with the process, built to illustrate data structures and input safety, not to ship.",
    },
  },
  {
    slug: "iems",
    problem: [
      "An educational institution juggles users, classes, grades, attendance, announcements, and timetables across disconnected tools. iEMS centralizes them into one platform where access is shaped by role: administrators manage the system, teachers run their classes, and students see their own records.",
      // Verified: README — "comprehensive platform for managing educational institutions with role-based access control for Administrators, Teachers, and Students."
      "The hard constraint is trust: the same Firestore database serves all three roles, so the boundary between what an admin may write, a teacher may record, and a student may read has to be enforced at the database layer, not just hidden in the UI.",
      // Verified: firestore.rules — default-deny with role-scoped grants.
    ],
    constraints: [
      {
        number: "01",
        text: "No backend server of its own — Firebase (Authentication, Firestore, Cloud Storage) is the entire backend; the app is a client-only SPA.",
      },
      // Verified: package.json (firebase ^12.10.0, no server deps) + architecture.md.
      {
        number: "02",
        text: "Data access must be enforced by Firestore security rules — the rules file is the security boundary.",
      },
      // Verified: firestore.rules — explicit role checks per collection + default deny.
      {
        number: "03",
        text: "Hackathon scope — three role surfaces with role-specific flows, built for the CVMU hackathon as team lead (owner-verified).",
      },
      // Verified: owner decision #3 — CVMU hackathon, team lead. Repo itself does not mention the hackathon.
      {
        number: "04",
        text: "Bulk data — importing a class roster by hand is impractical, so CSV bulk import is part of the design.",
      },
      // Verified: papaparse dep + test_bulk.csv + shift_lines.py + admin/UserManagement.
    ],
    decisions: [
      {
        number: "D1",
        decision: "Role-based access control with three app surfaces",
        reason:
          "AuthContext reads the user's role from the Firestore users document, and ProtectedRoute gates the admin, teacher, and student route groups. Each role gets its own page folder and flows — admin management, teacher grading/attendance, student records.",
        tradeOff:
          "Role is a single string on the user document — fine-grained permissions would need more granular rules.",
      },
      // Verified: AuthContext.jsx, ProtectedRoute.jsx, src/{admin,teacher,student}/.
      {
        number: "D2",
        decision: "Firestore collections separated by concern",
        reason:
          "users, classes, subjects, announcements, timetable, marks, and attendance each get their own collection with role-scoped read/write grants. A student can read their own marks and attendance rows, teachers write marks and attendance, and only admins manage users, classes, subjects, and the timetable.",
        tradeOff:
          "The repo's schema.md documents courses/grades while the rules use classes/subjects/marks — documentation drifted from the rules; the rules are what ships.",
      },
      // Verified: firestore.rules + schema.md (drift noted, not silently fixed).
      {
        number: "D3",
        decision: "Default-deny security rules",
        reason:
          "The rules file ends with `match /{document=**} { allow read, write: if false; }` — every collection must be explicitly opened. Reads check isAuthenticated(), and student-scoped reads compare resource.data.studentId against request.auth.uid.",
        tradeOff:
          "Adding a new collection requires a rules update before it becomes readable.",
      },
      // Verified: firestore.rules — isAuthenticated / getUserRole / default deny.
      {
        number: "D4",
        decision: "CSV bulk import for user management",
        reason:
          "papaparse parses client-side CSV, the admin surface imports users from a bulk file, and a Python helper (shift_lines.py) generates the sample data (test_bulk.csv). This makes onboarding a full roster feasible.",
        tradeOff:
          "Import runs in the browser — file size and shape are the admin's responsibility.",
      },
      // Verified: papaparse dep + test_bulk.csv + shift_lines.py + UserManagement page.
      {
        number: "D5",
        decision: "Client-side PDF generation",
        reason:
          "jsPDF and html2canvas-pro render views to downloadable documents without a server — reports work entirely in the browser.",
        tradeOff:
          "Output is canvas-rasterized, not text-selectable.",
      },
      // Verified: package.json deps + README ("PDF Generation: jsPDF & html2canvas-pro").
    ],
    implementation: {
      body: [
        "Login signs a user in through Firebase Authentication; AuthContext stores the session and reads the role field from the users document. ProtectedRoute wraps the role surfaces, so an unauthenticated or wrongly-roled user cannot reach another surface through routing alone.",
        // Verified: Login.jsx, AuthContext.jsx, ProtectedRoute.jsx, architecture.md ("Login Page → Role Check → Dashboard").
        "The admin surface owns user management (CRUD plus bulk CSV import), the analytics dashboard (Recharts), and system logs. The teacher surface handles classes, attendance marking, schedules, and a dashboard. The student surface exposes attendance views, academic records, subjects with downloadable materials, and the timetable.",
        // Verified: src/admin (UserManagement, AdminDashboard, SystemLogs), src/teacher (TeacherClasses, Attendance, TeacherSchedule, TeacherDashboard), src/student (StudentAcademicRecords, AttendanceView, StudentSubjects, StudentTimeTable).
        "The security model lives in firestore.rules: admins manage users, classes, subjects, and the timetable; teachers and admins may write announcements, marks, and attendance; students read only their own marks and attendance rows (studentId == request.auth.uid). The UI's role checks are convenience — the rules are the boundary.",
        // Verified: firestore.rules — role-scoped allow rules per collection + default deny.
        "Deployment is wired for Firebase Hosting via GitHub Actions — separate workflows run for pull requests and merges to the default branch, so CI can preview and deploy the SPA. A live URL is not published in the repository.",
        // Verified: .github/workflows/firebase-hosting-*.yml + firebase.json; owner decision #4 — no live URL claimed.
      ],
      annotations: [
        { anchor: "role from users doc", note: "users/{uid}.role" },
        { anchor: "default-deny", note: "match {document=**} → false" },
        { anchor: "student reads own", note: "studentId == request.auth.uid" },
        { anchor: "Hosting CI", note: "merge + pull-request workflows" },
      ],
    },
    architecture: {
      title: "iEMS — role-gated Firestore topology",
      desc: "Firebase Authentication signs users in; AuthContext reads the role from the users document. ProtectedRoute gates three role surfaces — admin, teacher, student. Each surface reads and writes Firestore within the bounds set by default-deny security rules.",
      note: "Topology verified against the repository's source files and firestore.rules — authentication, the three role surfaces, and the collections each role may touch.",
      layers: [
        {
          label: "AUTHENTICATION",
          nodes: [
            { id: "login", label: "Login", sub: "Firebase Auth" },
            { id: "auth", label: "AuthContext", sub: "session · role", accent: true },
          ],
        },
        {
          label: "ROLE SURFACES",
          nodes: [
            { id: "admin", label: "Admin", sub: "users · logs" },
            { id: "teacher", label: "Teacher", sub: "classes · attendance" },
            { id: "student", label: "Student", sub: "records · materials" },
          ],
        },
        {
          label: "DATA — FIRESTORE",
          nodes: [
            { id: "db", label: "Firestore", sub: "users · classes · subjects · marks · attendance" },
          ],
        },
      ],
      edges: [
        { from: "login", to: "auth", label: "sign-in" },
        { from: "auth", to: "admin", label: "role: admin" },
        { from: "auth", to: "teacher", label: "role: teacher" },
        { from: "auth", to: "student", label: "role: student" },
        { from: "admin", to: "db", label: "manage users" },
        { from: "teacher", to: "db", label: "marks · attendance" },
        { from: "student", to: "db", label: "own records" },
      ],
    },
    stack: [
      {
        group: "Frontend",
        tags: ["React 19", "Vite", "JavaScript (JSX)", "Tailwind CSS", "React Router DOM", "lucide-react"],
      },
      {
        group: "Backend — Firebase",
        tags: ["Firebase Auth", "Cloud Firestore", "Cloud Storage", "Firestore security rules"],
      },
      {
        group: "Tooling",
        tags: ["Recharts", "jsPDF", "html2canvas-pro", "papaparse", "react-hot-toast", "Firebase Hosting CI"],
      },
    ],
    repository: {
      url: "https://github.com/HusainMain/iems",
      evidence:
        "React + Firebase role-based education platform — 7 commits, Firestore security rules, Firebase Hosting CI workflows, and schema + architecture docs. No live URL is published.",
    },
    reflection: {
      pullLine:
        "iEMS is where I learned that the access boundary — not the dashboard — is the security surface.",
      body: "Built for the CVMU hackathon as team lead (owner-verified), iEMS kept its three-role surface honest by putting the security model in Firestore rules with a default-deny catch-all. The schema.md and the rules file drifted apart on collection names — courses/grades versus classes/subjects/marks — which is exactly why the rules, the thing that ships and enforces, is treated as authoritative here.",
    },
  },
  {
    slug: "buildex-website",
    problem: [
      "BuildEx — the Startup & Entrepreneurship Club of SVIT, Vasad — exists to close the gap between inspiration and execution. The club needed an online presence that reflected that mission: a premium technology brand experience, not a conventional college club website.",
      // Verified: README — "designed to reflect that mission: every interaction, transition, and animation is intentional, cinematic, and built to convey momentum."
      "That ambition lands on a static site with no backend: a cinematic intro, an interactive canvas hero, scroll-driven storytelling, a dedicated events page, an animated gallery, and a contact surface — all of it responsive and respecting reduced-motion preferences.",
      // Verified: README Features + src tree (Intro.tsx, hero/, execution-blueprint/, events/, gallery/, contact/).
    ],
    constraints: [
      {
        number: "01",
        text: "No backend — a static React SPA; events and gallery content live in local data modules.",
      },
      // Verified: package.json (no server deps) + src/data/{events,gallery}.ts.
      {
        number: "02",
        text: "Motion must be intentional and accessible — GSAP-driven, with reduced-motion support throughout.",
      },
      // Verified: README + src/lib/animation.ts + package.json (gsap).
      {
        number: "03",
        text: "Fully responsive across desktop, tablet, and mobile, with separate desktop and mobile navigation.",
      },
      // Verified: README + src/components/navigation (desktop + mobile nav).
      {
        number: "04",
        text: "Self-hosted typography — the Geist variable font ships with the bundle instead of loading from a font CDN.",
      },
      // Verified: geist package + public/fonts/Geist-Variable.woff2.
    ],
    decisions: [
      {
        number: "D1",
        decision: "A canvas-drawn hexagonal grid hero instead of static imagery",
        reason:
          "HeroCanvasBackground.tsx (~23 KB) renders the grid in real time with volumetric light blooms and expanding wavefronts. The hero is interactive and asset-free — no hero image to crop or compress.",
        tradeOff:
          "Real-time canvas rendering costs CPU and battery on lower-end devices.",
      },
      // Verified: src/components/hero/HeroCanvasBackground.tsx + README ("interactive hero").
      {
        number: "D2",
        decision: "Pinned-scroll storytelling for the Execution Blueprint",
        reason:
          "ExecutionBlueprint.tsx (~18 KB) pins a six-stage scroll section — Ideate, Learn, Connect, Build, Execute, Grow — that animates into view as the user progresses, driven by GSAP ScrollTrigger.",
        tradeOff:
          "Pinned sections need careful fallbacks; reduced-motion users skip the pin behavior.",
      },
      // Verified: README (six stages + pinned scroll) + src/components/execution-blueprint/ + gsap dep.
      {
        number: "D3",
        decision: "Domain-grouped component architecture",
        reason:
          "Components are split by section — about, contact, events, execution-blueprint, gallery, hero, navigation — with shared data (events, gallery) and lib/animation.ts constants. Pages stay thin; routing lives in App.tsx.",
        tradeOff:
          "More files and imports to navigate, but each section owns its behavior.",
      },
      // Verified: README project structure + src tree (components/*, data/, lib/, pages/).
      {
        number: "D4",
        decision: "Self-hosted Geist typography via the geist package",
        reason:
          "The Geist variable font is bundled (Geist-Variable.woff2) rather than pulled from a font CDN, so the brand typeface renders consistently without a third-party request.",
        tradeOff:
          "Font files ship in the build — a few hundred KB of payload.",
      },
      // Verified: package.json (geist ^1.7.2) + public/fonts/Geist-Variable.woff2.
    ],
    implementation: {
      body: [
        "The experience opens with Intro.tsx — a logo reveal with ambient lighting and a marker animation that crossfades into the navigation bar. From there, the hero mounts its canvas: a hexagonal grid with volumetric light blooms and expanding wavefronts that react to the scene.",
        // Verified: README Features + src/components/Intro.tsx + src/components/hero/.
        "The Execution Blueprint is a pinned-scroll section: six stages (Ideate, Learn, Connect, Build, Execute, Grow) animate into view as the user progresses, with animation constants centralized in lib/animation.ts.",
        // Verified: README + src/components/execution-blueprint/ExecutionBlueprint.tsx + lib/animation.ts.
        "Events and the gallery are data-driven: src/data/events.ts feeds the dedicated events page (featured events, archive, particle background), and src/data/gallery.ts feeds the arc-based photo carousel with hover magnification. Both render from local modules — there is no CMS or API.",
        // Verified: src/data/*.ts + public/images/event-* imagery + README Features.
        "The contact section provides a social link dock with hover tooltips, call-to-action buttons, and a subtle watermark. Navigation is split between desktop and mobile components, and reduced-motion preferences are respected throughout the GSAP sequences.",
        // Verified: README Features + src/components/contact/ + src/components/navigation/.
      ],
      annotations: [
        { anchor: "canvas hex grid", note: "no hero image asset" },
        { anchor: "pinned scroll", note: "GSAP ScrollTrigger" },
        { anchor: "six stages", note: "Ideate → Grow" },
        { anchor: "local data", note: "events.ts · gallery.ts" },
      ],
    },
    architecture: {
      title: "BuildEx Website — component and motion topology",
      desc: "Intro.tsx crossfades into the app shell. React Router maps navigation to the Home and Events routes. Domain components — the canvas hero, the pinned execution blueprint, the arc gallery, and section components — consume shared data modules and GSAP-driven animation constants, with reduced-motion respected throughout.",
      note: "Topology verified against the repository's source files and the live deployment (buildex-website-sooty.vercel.app).",
      layers: [
        {
          label: "ENTRY",
          nodes: [
            { id: "intro", label: "Intro", sub: "cinematic reveal" },
          ],
        },
        {
          label: "ROUTES — REACT ROUTER",
          nodes: [
            { id: "home", label: "Home", sub: "composes sections" },
            { id: "events", label: "Events", sub: "featured · archive" },
          ],
        },
        {
          label: "DOMAIN COMPONENTS",
          nodes: [
            { id: "hero", label: "Hero", sub: "canvas hex grid", accent: true },
            { id: "blueprint", label: "Execution Blueprint", sub: "pinned scroll" },
            { id: "gallery", label: "Gallery", sub: "arc carousel" },
          ],
        },
        {
          label: "SUPPORT",
          nodes: [
            { id: "data", label: "data/", sub: "events · gallery" },
            { id: "lib", label: "lib/", sub: "animation constants" },
          ],
        },
      ],
      edges: [
        { from: "intro", to: "home", label: "crossfade" },
        { from: "home", to: "hero", label: "mounts" },
        { from: "home", to: "blueprint", label: "pins" },
        { from: "home", to: "gallery", label: "renders" },
        { from: "events", to: "data", label: "events.ts" },
        { from: "gallery", to: "data", label: "gallery.ts" },
        { from: "hero", to: "lib", label: "gsap" },
        { from: "blueprint", to: "lib", label: "ScrollTrigger" },
      ],
    },
    stack: [
      {
        group: "Runtime",
        tags: ["React 19", "TypeScript", "Vite", "React Router DOM"],
      },
      {
        group: "Motion",
        tags: ["GSAP", "ScrollTrigger"],
      },
      {
        group: "Styling",
        tags: ["Tailwind CSS v4", "lucide-react", "clsx", "tailwind-merge"],
      },
      {
        group: "Typography",
        tags: ["Geist — self-hosted"],
      },
    ],
    repository: {
      url: "https://github.com/HusainMain/buildex-website",
      evidence:
        "React 19 + TypeScript + GSAP site — 9 commits, MIT licensed. Live deployment verified at buildex-website-sooty.vercel.app.",
    },
    reflection: {
      pullLine:
        "BuildEx is where I learned that a club website can be engineered like a product.",
      body: "The brief was a premium brand experience, and the implementation delivered it with real engineering: a canvas hero, pinned-scroll storytelling, data-driven events and gallery, self-hosted type, and reduced-motion support — all in a static React app with no backend. The official-buildEx positioning (README) and the live deployment are both verified; no usage or performance claims are made here because none are published.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
