export const portfolioData = {
  personal: {
    name: "Husain Bardanwala", // Assuming from path, or placeholder
    title: "Computer Engineering Student",
    email: "husainbardanwala65@gmail.com",
    github: "https://github.com/HusainMain",
    linkedin: "https://www.linkedin.com/in/husain-bardanwala-93a56b376/",
    location: "India",
    about: "I am a passionate Computer Engineering student at Sardar Vallabhbhai Patel Institute of Technology with a strong foundation in core CS concepts like Data Structures, Operating Systems, and Database Management. I'm actively learning Full Stack Development and AI/ML to bridge the gap between theory and real-world applications. My goal is to leverage technology to solve complex problems and contribute to impactful software solutions.",
  },
  education: {
    university: "Sardar Vallabhbhai Patel Institute of Technology",
    degree: "Bachelor of Engineering in Computer Engineering",
    year: "Second Year (SY), Class of 2028",
    coursework: [
      "Data Structures",
      "Operating Systems",
      "Database Management",
      "Object-Oriented Programming",
      "Computer Networks"
    ],
  },
  skills: {
    languages: ["C", "Java", "Python", "SQL"],
    frameworks: ["React (Learning)", "Node.js (Learning)"],
    tools: ["Git", "VS Code"],
    interests: ["Full Stack Development", "Backend Systems", "AI/ML"],
  },
  projects: [
    {
      slug: "library-management-system",
      title: "Library Management System",
      description: "A console-based application to manage book issues and returns. Implemented using C file handling to persist data, allowing librarians to add, remove, and search for books efficiently.",
      tech: ["C", "File Handling", "Data Structures"],
      link: "/projects/library-management-system",
    },
    {
      slug: "personal-portfolio-website",
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio built with Next.js and Tailwind CSS. Features dark mode, smooth scrolling animations with Framer Motion, and a clean UI to showcase my academic journey.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
      link: "/projects/personal-portfolio-website",
    },
    {
      slug: "student-database-manager",
      title: "Student Database Manager",
      description: "A database management system for student records. Uses SQL for data storage and Java for the backend logic, demonstrating core CRUD operations and relational database concepts.",
      tech: ["Java", "SQL", "JDBC"],
      link: "/projects/student-database-manager",
    }
  ],
};
