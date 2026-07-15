import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User as UserIcon } from 'lucide-react';
import { LINKS } from '../config';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "System initialized. I am KRISHNA_OS Agent. Ask me anything about Krishna's engineering experience, core skills, or project portfolio.",
      timestamp: '00:00',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const presetQueries = [
    { label: 'About Krishna', query: 'Tell me about Krishna Goyal.' },
    { label: 'JobGuard AI Specs', query: 'Explain JobGuard AI.' },
    { label: 'Flutter Apps', query: 'Show Flutter Projects.' },
    { label: 'Backend Experience', query: 'Show Backend Experience.' },
    { label: 'Why Hire Him?', query: 'Why should someone hire Krishna?' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getSystemResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('about') || q.includes('tell me about')) {
      return "Krishna Goyal is a Backend Developer, AI Engineer, and Flutter Developer who focuses on building intelligent software that solves real-world problems. He integrates AI models, builds scalable REST APIs, and designs beautiful cross-platform applications.";
    }
    if (q.includes('jobguard') || q.includes('explain jobguard')) {
      return "JobGuard AI is a smart fake job detection suite built with React, Python, FastAPI, and LangGraph. It leverages the Gemini API for intelligence and SHAP (SHapley Additive exPlanations) for Explainable AI, translating complex ML outputs into clean PDF safety reports.";
    }
    if (q.includes('flutter') || q.includes('show flutter')) {
      return "Krishna is a skilled Flutter Developer who designs fluid, responsive layouts. He developed the Business Listing Android App, integrated JSON REST APIs, managed remote Firebase databases, and created smooth, cross-platform Android deployments.";
    }
    if (q.includes('backend') || q.includes('experience')) {
      return "Krishna's backend stack consists of FastAPI, Node.js, MongoDB, Firebase, and SQL databases. During his Web Developer Internship at Right Ads Digital, he built core API routes, structured collections, and integrated scalable server structures.";
    }
    if (q.includes('why should') || q.includes('hire') || q.includes('why hire')) {
      return "You should hire Krishna because he combines solid backend capabilities (FastAPI, Python, DB design) with AI implementation skills (LangGraph, Gemini, ML) and outstanding design aesthetics (Flutter, React interfaces). He has hackathon experience, is a fast learner, and produces clean, well-tested code.";
    }
    if (q.includes('resume')) {
      return "Executing Resume Download... The resume will be downloaded in your browser shortly.";
    }
    if (q.includes('github') || q.includes('open github')) {
      window.open(LINKS.github, '_blank');
      return "Opening Krishna's GitHub repository. Done!";
    }
    return `System Query: "${query}". I am currently running in simulation mode. For specific inquires, please send Krishna a direct message using the CommandCenter form at the bottom of the page!`;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // User Message
    setMessages(prev => [...prev, { sender: 'user', text: textToSend, timestamp: time }]);
    setInput('');
    setIsTyping(true);

    // AI typing simulation
    setTimeout(() => {
      setIsTyping(false);
      const reply = getSystemResponse(textToSend);
      setMessages(prev => [...prev, { sender: 'ai', text: reply, timestamp: time }]);
    }, 750);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      {/* Chat window panel */}
      {isOpen && (
        <div className="glass-panel-heavy w-[92vw] sm:w-[380px] h-[480px] rounded-2xl mb-4 overflow-hidden border border-brand-cyan/20 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.65)] crt-effect">
          {/* Header */}
          <div className="bg-slate-950/40 px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-brand-cyan animate-pulse" />
              <div>
                <h3 className="text-xs font-bold font-orbitron tracking-wider text-white">KRISHNA_OS_AI</h3>
                <span className="text-[9px] font-mono-tech text-brand-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping inline-block" />
                  ONLINE
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors duration-150 interactive"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages timeline */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono-tech scrollbar-none">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.sender === 'ai' ? 'bg-brand-cyan/10 border-brand-cyan/25 text-brand-cyan' : 'bg-brand-indigo/10 border-brand-indigo/25 text-brand-indigo'
                }`}>
                  {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-xl max-w-[78%] leading-relaxed ${
                  msg.sender === 'ai' ? 'bg-slate-900/40 border border-white/5 text-slate-300' : 'bg-brand-indigo/20 text-white'
                }`}>
                  <p>{msg.text}</p>
                  <span className="block text-[8px] text-slate-500 mt-1.5 text-right">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-3 rounded-xl text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Quick chips queries suggestions */}
          <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none bg-slate-950/15">
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.query)}
                className="text-[9px] font-mono-tech border border-white/10 hover:border-brand-cyan/30 bg-slate-900/60 hover:bg-brand-cyan/5 text-slate-400 hover:text-brand-cyan px-2.5 py-1 rounded-lg transition-all duration-200 interactive"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Send Input box */}
          <form 
            onSubmit={e => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 border-t border-white/5 bg-slate-950/20 flex gap-2 items-center"
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-slate-900/50 border border-white/5 outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono-tech text-white placeholder-slate-500 focus:border-brand-cyan/25"
            />
            <button
              type="submit"
              className="bg-brand-cyan hover:bg-brand-cyan/85 text-black p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)] interactive"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Bubble */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="glass-panel px-4 py-3 rounded-full flex items-center gap-2.5 border border-brand-cyan/25 hover:border-brand-cyan text-white hover:text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_22px_rgba(6,182,212,0.4)] transition-all duration-300 interactive focus:outline-none"
      >
        <MessageSquare className="w-5 h-5 text-brand-cyan animate-pulse" />
        <span className="text-xs font-orbitron font-medium tracking-wider hidden sm:inline-block">
          ASK KRISHNA AI
        </span>
      </button>
    </div>
  );
};
