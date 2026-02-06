export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ ok: false, error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const n = typeof name === "string" ? name : "";
    const e = typeof email === "string" ? email : "";
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || "no-reply@example.com";
    const to = process.env.RESEND_TO || process.env.CONTACT_TO || "";
    if (!apiKey || !to) {
      return new Response(
        JSON.stringify({ ok: true, delivered: false, fallback: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const subject = `Portfolio Contact from ${n || "Visitor"}`;
    const text = `Name: ${n || "-"}\nEmail: ${e || "-"}\n\n${message}`;
    const html = `<div><p><strong>Name:</strong> ${n || "-"}</p><p><strong>Email:</strong> ${
      e || "-"
    }</p><p>${message.replace(/\n/g, "<br>")}</p></div>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return new Response(JSON.stringify({ ok: false, error: body || "Send failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true, delivered: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Bad request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
