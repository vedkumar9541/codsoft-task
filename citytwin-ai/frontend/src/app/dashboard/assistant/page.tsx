'use client';

import { useState } from 'react';
import { Bot, User, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([
    { role: 'ai', text: 'Hello! I am your CityTwin AI Assistant. How can I help you manage Delhi today?' }
  ]);

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMsgs(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    setTimeout(() => {
      setMsgs(prev => [...prev, { 
        role: 'ai', 
        text: 'Analyzing current spatio-temporal data... I recommend deploying traffic wardens at ITO crossing due to a 24% spike in congestion over the last 15 minutes.' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-full flex space-x-6">
      <div className="flex-1 glass-card flex flex-col h-[calc(100vh-8rem)]">
        <div className="p-4 border-b border-[var(--border-color)] flex items-center space-x-3 bg-[var(--bg-card)]">
          <div className="w-10 h-10 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center pulse-glow">
            <Bot className="text-white" />
          </div>
          <div>
            <h3 className="font-bold">CityTwin Nexus Model</h3>
            <p className="text-xs text-[var(--accent-cyan)]">Online • LLM + Graph Engine</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {msgs.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-[var(--bg-tertiary)]' : 'bg-[var(--accent-blue)]'}`}>
                  {m.role === 'user' ? <User size={16} /> : <Sparkles size={16} className="text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[var(--accent-blue)] text-white rounded-tr-sm' 
                    : 'bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 border-t border-[var(--border-color)]">
          <form onSubmit={sendMsg} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about traffic, predictions, or run commands..." 
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl py-4 pl-4 pr-12 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-[var(--accent-blue)] rounded-lg hover:bg-[var(--accent-indigo)] transition-colors">
              <Send size={16} className="text-white" />
            </button>
          </form>
        </div>
      </div>
      
      <div className="w-80 hidden lg:block space-y-4">
        <div className="glass-card p-4">
          <h4 className="font-semibold text-sm text-[var(--text-secondary)] mb-3">Suggested Queries</h4>
          <div className="space-y-2">
            {[
              "Why is South Ex congested right now?",
              "Predict AQI for tomorrow morning",
              "Show me the nearest hospital to incident #42",
              "Generate report for yesterday's traffic"
            ].map((q, i) => (
              <button key={i} onClick={() => setInput(q)} className="w-full text-left p-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--accent-cyan)] transition-all text-xs">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
