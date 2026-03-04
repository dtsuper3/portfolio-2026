'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  language: string;
  url: string;
  tags: string[];
  period: string;
}

interface TechCategory {
  label: string;
  items: string[];
}

const projects: Project[] = [
  {
    name: 'mnai-platform',
    description: 'Migrated a UK-based data & analytics platform from PHP to React. Provides meaningful insight into all UK companies.',
    language: 'TypeScript',
    url: 'https://platform.mnai.tech/',
    tags: ['Next.js', 'TypeScript', 'Serverless', 'PostgreSQL'],
    period: 'Jan 2022 – Present',
  },
  {
    name: 'teacherkhoj',
    description: 'Personal project — a marketplace for finding and connecting teachers and students across India.',
    language: 'TypeScript',
    url: 'https://teacherkhoj.com/',
    tags: ['Next.js', 'Node.js', 'MongoDB', "Serverless", "S3"],
    period: 'Aug 2021 – Present',
  },
  {
    name: 'dineout-events',
    description: 'Event booking feature for Dineout. Built UI design and handled API integration for the event detail page.',
    language: 'JavaScript',
    url: 'https://www.dineout.co.in',
    tags: ['Next.js', 'SSR', 'SASS'],
    period: 'Jul 2021 – Jan 2022',
  },
  {
    name: 'ana-pwa-erp',
    description: 'PWA-based Enterprise Resource Planning app for employer management. Implemented offline feature using IndexedDB.',
    language: 'JavaScript',
    url: 'https://anapwamobile.eastus.cloudapp.azure.com',
    tags: ['React', 'Redux', 'PWA'],
    period: 'Feb 2021 – Jul 2022',
  },
  {
    name: 'pcex-member',
    description: 'Cryptocurrency exchange & trading platform. Implemented live crypto market view, buy/sell, TradingView Chart, wallets.',
    language: 'TypeScript',
    url: 'https://www.pcexmember.in',
    tags: ['React', 'Redux', 'Socket'],
    period: 'Feb 2020 – May 2021',
  },
  {
    name: 'feelium-econtract',
    description: 'Platform for creating digital contracts online. Implemented digital KYC and payment gateway integration.',
    language: 'TypeScript',
    url: 'https://www.feeliumecontract.com',
    tags: ['Angular 4+', 'Bootstrap', 'TypeScript'],
    period: 'Aug 2019 – Feb 2020',
  },
];

interface Experience {
  role: string;
  company: string;
  url: string;
  period: string;
}

const experience: Experience[] = [
  { role: 'Software Engineer', company: 'Clinchinfosystems Pvt. Ltd.', url: 'http://clinchinfosystems.com/', period: '2022 – Present' },
  { role: 'Software Engineer', company: 'InnovationM Pvt. Ltd.', url: 'https://www.innovationm.com/', period: '2021 – 2022' },
  { role: 'Full Stack Developer', company: 'Panaesha Capital Pvt. Ltd.', url: 'https://www.panaeshacapital.com/', period: '2019 – 2021' },
  { role: 'React Developer', company: 'Transfin Pvt. Ltd.', url: 'https://transfin.in/', period: '2019' },
];

const techStack: TechCategory[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Angular 2+', 'React Native', 'Bootstrap', 'Material UI'] },
  { label: 'Backend', items: ['Node.js', 'MongoDB', 'MySQL', 'REST APIs'] },
  { label: 'DevOps & Tools', items: ['Docker', 'AWS EC2', 'S3', 'Nginx', 'PM2', 'Git'] },
  { label: 'State Management', items: ['Redux', 'Recoil', 'SWR', 'Context API'] },
];

const langColors: Record<string, string> = {
  TypeScript: '#00FF41',
  JavaScript: '#FFD700',
  Rust: '#FF6B35',
  Go: '#00FFFF',
  'C++': '#FF69B4',
};

export default function HomePage() {
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<number>(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const bootSequence = [
    'BIOS v2.4.1 — Initializing hardware...',
    'RAM check: 32768MB OK',
    'Loading kernel modules...',
    'Mounting filesystem: /dev/portfolio',
    'Starting network services...',
    'Launching devfolio.sh...',
    '',
    'Welcome. System ready.',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootLines(i);
      if (i >= bootSequence.length) {
        clearInterval(interval);
        setTimeout(() => setBootDone(true), 600);
      }
    }, 220);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct mailto link
    const subject = encodeURIComponent(`New Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:dtsuper3@gmail.com?subject=${subject}&body=${body}`;

    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!bootDone) {
    return (
      <div className="crt-screen min-h-screen flex items-center justify-center">
        <div className="scanline" />
        <div className="terminal-window w-full max-w-2xl mx-4 p-6">
          <div className="terminal-titlebar mb-4">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>boot.sh</span>
          </div>
          <div className="space-y-1">
            {bootSequence.slice(0, bootLines).map((line, i) => (
              <div
                key={i}
                className="boot-line text-sm font-mono"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  color: line === '' ? 'transparent' : line.includes('Welcome') ? 'var(--terminal-green)' : 'var(--terminal-text-dim)',
                  textShadow: line.includes('Welcome') ? 'var(--crt-glow)' : 'none',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}
            <span className="cursor-blink text-sm">█</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="crt-screen min-h-screen flicker">
      <div className="scanline" />

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'rgba(10,14,10,0.92)', borderColor: 'var(--terminal-border)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-mono text-sm font-bold glow-green phosphor-pulse">
            <span style={{ color: 'var(--terminal-text-faint)' }}>~/</span>deepak-thapa
          </button>
          <div className="hidden md:flex items-center gap-6">
            {['projects', 'experience', 'stack', 'contact'].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="font-mono text-xs transition-all duration-200"
                style={{
                  color: activeSection === s ? 'var(--terminal-green)' : 'var(--terminal-text-faint)',
                  textShadow: activeSection === s ? 'var(--crt-glow)' : 'none',
                }}
              >
                ./{s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tech-badge">GitHub</a>
            <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" className="font-mono text-xs tech-badge">LinkedIn</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="terminal-window box-glow"
          >
            <div className="terminal-titlebar">
              <div className="terminal-dot" style={{ background: '#FF5F57' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#28C840' }} />
              <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>portfolio.sh — bash — 120×40</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <span className="text-xs" style={{ color: 'var(--terminal-text-faint)' }}>Last login: {new Date().toDateString()} on ttys001</span>
              </div>
              <div className="mb-4">
                <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>visitor@devfolio</span>
                <span style={{ color: 'var(--terminal-text-faint)' }}>:</span>
                <span style={{ color: 'var(--terminal-cyan)', textShadow: 'var(--cyan-glow)' }}>~</span>
                <span style={{ color: 'var(--terminal-text-faint)' }}>$ </span>
                <span style={{ color: 'var(--terminal-text)' }}>whoami</span>
              </div>
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 glow-green-strong phosphor-pulse">
                  Deepak Thapa
                </h1>
                <p className="text-lg md:text-xl mb-1" style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}>
                  Web Developer · Software Engineer · Agentic AI Enthusiast
                </p>
                <p className="text-sm" style={{ color: 'var(--terminal-text-dim)' }}>
                  Simple, creative, and enthusiastic — building things that are helpful for others.
                </p>
              </div>
              <div className="mb-8 space-y-1 text-sm" style={{ color: 'var(--terminal-text-dim)' }}>
                <div><span style={{ color: 'var(--terminal-green)' }}>location</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> New Delhi, India</div>
                <div><span style={{ color: 'var(--terminal-green)' }}>status</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <span style={{ color: '#28C840' }}>● Open to opportunities</span></div>
                <div><span style={{ color: 'var(--terminal-green)' }}>focus</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> React, Next.js, Full-Stack Web Development</div>
                <div><span style={{ color: 'var(--terminal-green)' }}>email</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> dtsuper3@gmail.com</div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('projects')}
                  className="font-mono text-sm px-5 py-2 rounded border transition-all duration-200 box-glow"
                  style={{ background: 'var(--terminal-green-faint)', borderColor: 'var(--terminal-green-dim)', color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}
                >
                  ls ./projects
                </button>
                <a
                  href="https://ideepakthapa.com/docs/Deepak-Thapa-Resume-Web-Developer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm px-5 py-2 rounded border transition-all duration-200"
                  style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text-dim)' }}
                >
                  cat resume.pdf
                </a>
                <button
                  onClick={() => scrollTo('contact')}
                  className="font-mono text-sm px-5 py-2 rounded border transition-all duration-200"
                  style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text-dim)' }}
                >
                  ./contact.sh
                </button>
              </div>
              <div className="mt-6">
                <span style={{ color: 'var(--terminal-text-faint)' }}>$ </span>
                <span className="cursor-blink">█</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>$</span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>ls -la ./projects</h2>
            </div>
            <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>// {projects.length} projects found</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card rounded-lg p-5 block group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>▶</span>
                    <span className="font-bold text-sm group-hover:text-green-400 transition-colors" style={{ color: 'var(--terminal-text)' }}>
                      {project.name}
                    </span>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{ background: langColors[project.language] || '#00FF41', boxShadow: `0 0 6px ${langColors[project.language] || '#00FF41'}` }}
                  />
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--terminal-text-dim)' }}>
                  {project.description}
                </p>
                <div className="text-xs mb-3" style={{ color: 'var(--terminal-text-faint)' }}>
                  <span style={{ color: 'var(--terminal-amber)' }}>period:</span> {project.period}
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-badge">{tag}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="py-24 px-4" style={{ background: 'var(--terminal-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>$</span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>cat ./experience.log</h2>
            </div>
            <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>// {experience.length} positions held</p>
          </motion.div>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                key={i}
                className="terminal-window p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>▸</span>
                    <div>
                      <span className="font-bold text-sm" style={{ color: 'var(--terminal-text)' }}>{exp.role}</span>
                      <span style={{ color: 'var(--terminal-text-faint)' }}> @ </span>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-green-400 transition-colors"
                        style={{ color: 'var(--terminal-cyan)', textShadow: 'var(--cyan-glow)' }}
                      >
                        {exp.company}
                      </a>
                    </div>
                  </div>
                  <span className="tech-badge text-xs ml-6 md:ml-0">{exp.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section id="stack" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>$</span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>cat ./tech-stack.yaml</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((cat, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={cat.label}
                className="terminal-window p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}>▸</span>
                  <span className="text-sm font-bold" style={{ color: 'var(--terminal-text)' }}>{cat.label}:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="tech-badge cursor-default">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: techStack.length * 0.1 }}
              className="terminal-window p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: 'var(--terminal-amber)', textShadow: 'var(--amber-glow)' }}>▸</span>
                <span className="text-sm font-bold" style={{ color: 'var(--terminal-text)' }}>Currently Learning:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Blockchain', 'Web3', 'Solidity'].map((item) => (
                  <span key={item} className="tech-badge" style={{ borderColor: 'var(--terminal-amber-dim)', color: 'var(--terminal-amber)' }}>{item}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 px-4" style={{ background: 'var(--terminal-surface)' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: 'var(--terminal-green)', textShadow: 'var(--crt-glow)' }}>$</span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--terminal-text)' }}>./contact.sh</h2>
            </div>
            <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>// Send a message — I reply within 24h</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="terminal-window box-glow mb-6"
          >
            <div className="terminal-titlebar">
              <div className="terminal-dot" style={{ background: '#FF5F57' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#28C840' }} />
              <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>contact-info.sh</span>
            </div>
            <div className="p-6 space-y-2 text-sm font-mono">
              <div><span style={{ color: 'var(--terminal-green)' }}>email</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <a href="mailto:dtsuper3@gmail.com" style={{ color: 'var(--terminal-text-dim)' }}>dtsuper3@gmail.com</a></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>phone</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <span style={{ color: 'var(--terminal-text-dim)' }}>+91-7838626816</span></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>location</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <span style={{ color: 'var(--terminal-text-dim)' }}>Karol Bagh, New Delhi, India</span></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>github</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>github.com/dtsuper3</a></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>linkedin</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>linkedin.com/in/deepak-thapa-381647148</a></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>twitter</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <a href="https://twitter.com/Deepak13307717" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>@Deepak13307717</a></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="terminal-window box-glow"
          >
            <div className="terminal-titlebar">
              <div className="terminal-dot" style={{ background: '#FF5F57' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#28C840' }} />
              <span className="ml-2 text-xs" style={{ color: 'var(--terminal-text-faint)' }}>contact.sh — interactive</span>
            </div>
            <div className="p-8">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 glow-green">✓</div>
                  <p className="glow-green font-bold mb-2">Message routed to mail client.</p>
                  <p className="text-sm" style={{ color: 'var(--terminal-text-faint)' }}>Please send the email from your device.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: 'name', label: 'name', type: 'text', placeholder: 'Your name', value: formData.name, onChange: (v: string) => setFormData(p => ({ ...p, name: v })) },
                    { id: 'email', label: 'email', type: 'email', placeholder: 'you@example.com', value: formData.email, onChange: (v: string) => setFormData(p => ({ ...p, email: v })) },
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="block text-xs mb-1" style={{ color: 'var(--terminal-text-faint)' }}>
                        <span style={{ color: 'var(--terminal-green)' }}>--</span>{field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-transparent border rounded px-4 py-2 text-sm font-mono outline-none transition-all duration-200 focus:border-green-600"
                        style={{
                          borderColor: 'var(--terminal-border)',
                          color: 'var(--terminal-text)',
                          caretColor: 'var(--terminal-green)',
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs mb-1" style={{ color: 'var(--terminal-text-faint)' }}>
                      <span style={{ color: 'var(--terminal-green)' }}>--</span>message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Your message here..."
                      className="w-full bg-transparent border rounded px-4 py-2 text-sm font-mono outline-none transition-all duration-200 focus:border-green-600 resize-none"
                      style={{
                        borderColor: 'var(--terminal-border)',
                        color: 'var(--terminal-text)',
                        caretColor: 'var(--terminal-green)',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded font-mono text-sm font-bold transition-all duration-200 box-glow hover:box-glow-strong"
                    style={{
                      background: 'var(--terminal-green-faint)',
                      border: '1px solid var(--terminal-green-dim)',
                      color: 'var(--terminal-green)',
                      textShadow: 'var(--crt-glow)',
                    }}
                  >
                    ./send-message.sh ▶
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: 'var(--terminal-border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
            <span style={{ color: 'var(--terminal-green)' }}>Deepak Thapa</span> · Built with Next.js &amp; ☕
          </div>
          <div className="font-mono text-xs" style={{ color: 'var(--terminal-text-faint)' }}>
            © {new Date().getFullYear()} · All rights reserved
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>GitHub</a>
            <a href="https://twitter.com/Deepak13307717" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>Twitter</a>
            <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>LinkedIn</a>
            <a href="mailto:dtsuper3@gmail.com" className="font-mono text-xs transition-colors duration-200 hover:text-green-400" style={{ color: 'var(--terminal-text-faint)' }}>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
