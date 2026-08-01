import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User } from 'lucide-react';

export default function AiCopilotModal({ onClose, onSelectTraderForMirror }) {
  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am **Echo Genius AI**, your Robinhood Echo portfolio intelligence & risk assistant. How can I help you find top Pro Traders or optimize your mirror allocation strategy today?'
    }
  ]);

  const presetQuestions = [
    'Recommend low-risk traders with consistent ROI',
    'Analyze Elena Rostova (@elena_options) strategy',
    'How does Smart Auto Stop-Loss work?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: query }]);
    setInputMsg('');

    setTimeout(() => {
      let aiReply = '';
      if (query.toLowerCase().includes('low') || query.toLowerCase().includes('risk') || query.toLowerCase().includes('consistent')) {
        aiReply = 'Based on Robinhood Echo quantitative analysis, **Marcus Chen (@marcus_dividends)** is the ideal match for low-risk compounding. His Win Rate stands at **94.1%** with a Max Drawdown of only **-1.8%** over the past 12 months.';
      } else if (query.toLowerCase().includes('elena') || query.toLowerCase().includes('options')) {
        aiReply = 'Elena Rostova (@elena_options) maintains a **79.6%** win rate focusing on *Bull Call Spreads* in megacap tech equities. Her 30-day return is **+41.2%**. Risk classification is *Aggressive*; we recommend allocating a maximum of 15% of your total portfolio capital.';
      } else {
        aiReply = 'The **Smart Auto Stop-Loss** feature operates in real-time. If your copied mirror position experiences a drawdown exceeding your threshold (e.g. -10%), Echo instantly executes a market sell order to preserve your balance independently of the Pro Trader.';
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl h-[600px] flex flex-col relative border border-purple-500/30 shadow-[0_0_50px_rgba(157,0,255,0.25)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 bg-purple-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/40">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                Echo Genius <span className="badge badge-purple text-[10px]">AI CO-PILOT</span>
              </h2>
              <p className="text-xs text-purple-200/70">Trading Intelligence & Risk Analysis Assistant</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user' ? 'bg-[var(--rh-green)] text-black' : 'bg-purple-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[var(--rh-green)]/15 text-white border border-[var(--rh-green)]/30 rounded-tr-none'
                  : 'bg-black/50 text-slate-200 border border-white/10 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Preset Questions */}
        <div className="px-5 py-2.5 flex items-center gap-2 overflow-x-auto border-t border-white/10 bg-black/40">
          {presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-purple-950/40 text-purple-200 border border-purple-500/30 hover:bg-purple-900/60 whitespace-nowrap transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-[var(--bg-glass)] flex items-center gap-2">
          <input 
            type="text"
            placeholder="Ask about trader analysis or risk strategy..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
          />
          <button 
            onClick={() => handleSend()}
            className="btn-primary py-2.5 px-4 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          >
            <Send size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
