'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:dtsuper3@gmail.com?subject=${subject}&body=${body}`;

    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
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
          <p className="text-sm ml-6" style={{ color: 'var(--terminal-text-faint)' }}>
            {"//"} Send a message — I reply within 24h
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="terminal-window box-glow"
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
              <div><span style={{ color: 'var(--terminal-green)' }}>location</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <span style={{ color: 'var(--terminal-text-dim)' }}>New Delhi, India</span></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>github</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <a href="https://github.com/dtsuper3" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>github.com/dtsuper3</a></div>
              <div><span style={{ color: 'var(--terminal-green)' }}>linkedin</span><span style={{ color: 'var(--terminal-text-faint)' }}>:</span> <a href="https://www.linkedin.com/in/deepak-thapa-381647148" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terminal-cyan)' }}>linkedin.com/in/deepak-thapa-381647148</a></div>
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
            <div className="p-6">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 glow-green">✓</div>
                  <p className="glow-green font-bold mb-2">Message routed.</p>
                  <p className="text-sm text-dim">Please send the email from your client.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs mb-1 text-faint">--name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-transparent border rounded px-3 py-1.5 text-sm font-mono outline-none focus:border-green-600 transition-colors"
                      style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 text-faint">--email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-transparent border rounded px-3 py-1.5 text-sm font-mono outline-none focus:border-green-600 transition-colors"
                      style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 text-faint">--message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full bg-transparent border rounded px-3 py-1.5 text-sm font-mono outline-none focus:border-green-600 transition-colors resize-none"
                      style={{ borderColor: 'var(--terminal-border)', color: 'var(--terminal-text)' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded font-mono text-sm font-bold transition-all duration-200 box-glow hover:box-glow-strong"
                    style={{
                      background: 'var(--terminal-green-faint)',
                      border: '1px solid var(--terminal-green-dim)',
                      color: 'var(--terminal-green)',
                      textShadow: 'var(--crt-glow)',
                    }}
                  >
                    ./send.sh ▶
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
