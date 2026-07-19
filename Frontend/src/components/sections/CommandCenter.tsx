import React, { useState } from 'react';
import { Mail, FileText, Send, Check } from 'lucide-react';
import { LINKS, API_BASE_URL } from '../../config';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const CommandCenter: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const socialLinks = [
    { label: 'EMAIL DIRECT', icon: Mail, url: `mailto:${LINKS.email}`, color: 'hover:border-brand-cyan hover:text-brand-cyan hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]' },
    { label: 'LINKEDIN NODE', icon: LinkedinIcon, url: LINKS.linkedin, color: 'hover:border-brand-indigo hover:text-brand-indigo hover:shadow-[0_0_12px_rgba(79,70,229,0.25)]' },
    { label: 'GITHUB SERVER', icon: GithubIcon, url: LINKS.github, color: 'hover:border-white hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]' },
    { label: 'RESUME DOWNLOAD', icon: FileText, url: LINKS.resume, color: 'hover:border-brand-green hover:text-brand-green hover:shadow-[0_0_12px_rgba(34,197,94,0.25)]', isDownload: true },
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        throw new Error("Server transmission error");
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">COMMUNICATION COCKPIT</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          COMMAND CENTER
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact links list (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="glass-panel rounded-2xl p-5 border-white/5 space-y-4">
            <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 mb-4 uppercase">
              TRANSMISSION CHANNELS
            </h3>
            <div className="grid grid-cols-1 gap-3 font-mono-tech text-xs">
              {socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    onClick={link.isDownload ? (e) => { e.preventDefault(); alert("Downloading Krishna Goyal's Resume..."); } : undefined}
                    target={link.isDownload ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-900/40 transition-all duration-200 interactive ${link.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5" />
                      <span className="font-bold tracking-wider">{link.label}</span>
                    </div>
                    <span className="text-[8px] text-slate-600 font-medium">CONNECT</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-white/5 font-mono-tech text-[10px] text-slate-500 leading-relaxed">
            SYSTEM STATUS: SECURE TRANS-CODER ACTIVE
            <br />
            IP ENCRYPTION: SHA-256 PIPELINE
            <br />
            LATENCY NODE: 14ms (OPTIMAL)
          </div>
        </div>

        {/* Contact Form console (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="glass-panel-heavy rounded-2xl p-6 glow-border-cyan relative overflow-hidden crt-effect">
            <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 mb-6 uppercase">
              HOLOGRAPHIC UPLINK FORM
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono-tech text-xs select-text">
              {/* Name field */}
              <div className="space-y-1">
                <label className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold select-none">
                  guest@krishna-os:~$ enter_name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="E.g., John Doe"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-cyan/35 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none transition-colors"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold select-none">
                  guest@krishna-os:~$ enter_email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="E.g., johndoe@company.com"
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-cyan/35 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none transition-colors"
                />
              </div>

              {/* Message textarea */}
              <div className="space-y-1">
                <label className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold select-none">
                  guest@krishna-os:~$ write_message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Type your message packet here..."
                  className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-cyan/35 rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submission button */}
              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 interactive select-none ${
                  status === 'success'
                    ? 'bg-brand-green text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] border border-brand-green'
                    : status === 'error'
                    ? 'bg-red-950/80 border border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                    : 'bg-brand-cyan hover:bg-brand-cyan/85 text-black shadow-[0_0_15px_rgba(6,182,212,0.35)] border border-brand-cyan disabled:opacity-75'
                }`}
              >
                {status === 'idle' && (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Packet
                  </>
                )}
                {status === 'sending' && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-black animate-bounce" />
                    Transmitting...
                  </span>
                )}
                {status === 'success' && (
                  <>
                    <Check className="w-4 h-4" />
                    Transmission Logged ✓
                  </>
                )}
                {status === 'error' && (
                  <span>
                    Transmission Intercepted (Failed)
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
