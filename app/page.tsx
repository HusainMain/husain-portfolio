"use client";

import { portfolioData } from "./data/portfolio";
import { Github, Linkedin, Mail, ExternalLink, Code2, BookOpen, Terminal, ChevronDown, Download, User } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Navbar from "@/components/Navbar";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useScroll({ axis: "x" });
  
  // Stagger children animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30">
      <Navbar />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900 blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block p-2 px-6 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium text-sm mb-4 backdrop-blur-sm"
          >
            🚀 Transforming Ideas into Code
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
              {portfolioData.personal.name}
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-400 max-w-2xl mx-auto font-light">
            {portfolioData.personal.title} <br/>
            <span className="text-purple-400">@ {portfolioData.education.university}</span>
          </p>

          <motion.div 
            className="flex justify-center gap-6 pt-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[
              { Icon: Github, href: portfolioData.personal.github },
              { Icon: Linkedin, href: portfolioData.personal.linkedin },
              { Icon: Mail, href: `mailto:${portfolioData.personal.email}` }
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                variants={item}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-slate-900 border border-slate-800 hover:border-purple-500 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all group"
              >
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
              </motion.a>
            ))}
            <motion.a
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1R3pe0BgfBm_rMeNAx3LMtMcrHK07IurH/view?usp=sharing"
              target="_blank"
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-slate-500"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative z-10 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">About Me</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 leading-relaxed border-l-2 border-purple-500/50 pl-6"
          >
            {portfolioData.personal.about}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">Education</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l-2 border-slate-800 space-y-2"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <h3 className="text-3xl font-bold text-white">{portfolioData.education.university}</h3>
            <p className="text-xl text-blue-400">{portfolioData.education.degree}</p>
            <p className="text-slate-500 font-mono text-sm">{portfolioData.education.year}</p>
            
            <div className="pt-6">
              <p className="text-slate-400 mb-4 font-medium uppercase tracking-wider text-sm">Key Coursework</p>
              <div className="flex flex-wrap gap-3">
                {portfolioData.education.coursework.map((course, index) => (
                  <motion.span 
                    key={index} 
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 hover:border-blue-500/50 hover:text-blue-300 transition-colors"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 relative z-10 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
              <Terminal className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">Skills & Tech</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <SkillCard title="Languages" skills={portfolioData.skills.languages} color="green" delay={0} />
            <SkillCard title="Frameworks & Tools" skills={portfolioData.skills.frameworks.concat(portfolioData.skills.tools)} color="blue" delay={0.2} />
            <div className="md:col-span-2">
              <SkillCard title="Areas of Interest" skills={portfolioData.skills.interests} color="purple" delay={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Code2 className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">Featured Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project, index) => (
              <motion.a
                key={index}
                href={`/projects/${project.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-slate-900 border border-slate-800 p-8 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{project.title}</h3>
                    <span className="p-2 rounded-full bg-slate-800 text-slate-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                      <ExternalLink className="w-5 h-5" />
                    </span>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950">
        <p>© {new Date().getFullYear()} {portfolioData.personal.name}. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}

function SkillCard({ title, skills, color, delay }: { title: string, skills: string[], color: string, delay: number }) {
  const colorClasses = {
    green: "text-green-400 border-green-500/20 bg-green-500/10",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  };
  
  // Safe default
  const activeClass = (colorClasses as any)[color] || colorClasses.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors"
    >
      <h3 className={`text-xl font-semibold mb-6 ${color === 'green' ? 'text-green-400' : color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span 
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-lg text-sm border font-medium ${activeClass}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
