import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function AiCopilotModal({ onClose, onSelectTraderForMirror }) {
  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Halo! Saya **Echo Genius AI**, asisten risiko & inteligensi portofolio Robinhood Echo Anda. Ada yang bisa saya bantu untuk menemukan Pro Trader terbaik atau mengoptimalkan alokasi mirror Anda?'
    }
  ]);

  const presetQuestions = [
    'Rekomendasikan trader berisiko rendah dengan ROI konsisten',
    'Analisis strategi Elena Rostova (@elena_options)',
    'Bagaimana cara kerja Smart Auto Stop-Loss?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { sender: 'user', text: query }]);
    setInputMsg('');

    // Simulate AI response
    setTimeout(() => {
      let aiReply = '';
      if (query.toLowerCase().includes('rendah') || query.toLowerCase().includes('safe')) {
        aiReply = 'Berdasarkan algoritma analisis kuantitatif Robinhood Echo, **Marcus Chen (@marcus_dividends)** adalah pilihan ideal untuk portofolio risiko rendah. Win Rate beliau mencapai **94.1%** dengan Max Drawdown hanya **-1.8%** dalam 12 bulan terakhir.';
      } else if (query.toLowerCase().includes('elena') || query.toLowerCase().includes('options')) {
        aiReply = 'Elena Rostova (@elena_options) memiliki tingkat kemenangan **79.6%** dengan fokus pada *Bull Call Spreads* di saham teknologi megacap. Return bulan ini mencapai **+41.2%**. Skor risiko beliau tergolong *Aggressive*, disarankan alokasi maksimal 15% dari total dana portofolio Anda.';
      } else {
        aiReply = 'Fitur **Smart Auto Stop-Loss** bekerja secara real-time di bursa. Jika posisi mirror yang Anda salin dari Pro Trader tertentu mengalami penurunan melampaui batas toleransi (misal -10%), sistem Echo akan langsung menjual posisi tersebut secara otomatis tanpa menunggu eksekusi manual dari Pro Trader.';
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl h-[600px] flex flex-col relative border border-purple-500/30 shadow-[0_0_50px_rgba(157,0,255,0.25)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[var(--border-color)] bg-[rgba(157,0,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/40">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                Echo Genius <span className="badge badge-purple text-[10px]">AI CO-PILOT</span>
              </h2>
              <p className="text-xs text-purple-200/70">Asisten Inteligensi Trading & Analisis Risiko</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition"
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
                  : 'bg-[rgba(0,0,0,0.5)] text-slate-200 border border-[rgba(255,255,255,0.08)] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Preset Pills */}
        <div className="px-5 py-2 flex items-center gap-2 overflow-x-auto border-t border-[var(--border-color)] bg-[rgba(0,0,0,0.3)]">
          {presetQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-purple-950/40 text-purple-200 border border-purple-500/30 hover:bg-purple-900/60 whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-glass)] flex items-center gap-2">
          <input 
            type="text"
            placeholder="Tanyakan analisis trader atau strategi risiko..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
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
