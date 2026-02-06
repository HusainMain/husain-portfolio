"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/app/data/portfolio";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [messageText, setMessageText] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setBusy(true);
    setStatus("idle");
    setMessageText("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.ok && data.delivered) {
        setStatus("success");
        setMessageText("Message sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
      } else if (data.ok && data.fallback) {
        const to = portfolioData.personal.email || "email@example.com";
        const subject = encodeURIComponent(`Portfolio Contact from ${name || "Visitor"}`);
        const body = encodeURIComponent(`Name: ${name || "-"}\nEmail: ${email || "-"}\n\n${message}`);
        const href = `mailto:${to}?subject=${subject}&body=${body}`;
        window.location.href = href;
        setStatus("success");
        setMessageText("Opened your mail app to send the message.");
      } else {
        setStatus("error");
        setMessageText(data.error || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setMessageText("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="py-32 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            Contact
          </h2>
          <p className="mt-3 text-slate-400">
            I’m open to internships, collaborations, and learning opportunities.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 transition"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
        {status !== "idle" && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg border ${
              status === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-300"
                : "bg-red-500/10 border-red-500/20 text-red-300"
            }`}
          >
            {messageText}
          </div>
        )}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 bg-slate-900 p-8 rounded-2xl border border-slate-800"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-purple-500 outline-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-purple-500 outline-none"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-purple-500 outline-none resize-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all disabled:opacity-60"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
