import React, { useState } from 'react';
import { X, Zap, Shield, ShieldAlert, CheckCircle2, DollarSign, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MirrorModal({ trader, onClose, onConfirmMirror }) {
  const [allocation, setAllocation] = useState(500);
  const [stopLoss, setStopLoss] = useState(10);
  const [isCopying, setIsCopying] = useState(false);

  if (!trader) return null;

  const targetName = trader.trader ? trader.trader.name : trader.name;
  const targetWinRate = trader.trader ? trader.trader.winRate : trader.winRate;
  const targetReturn = trader.trader ? trader.trader.monthlyReturn : trader.monthlyReturn;
  const targetAvatar = trader.trader ? trader.trader.avatar : trader.avatar;

  const handleConfirm = () => {
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onConfirmMirror({
        traderName: targetName,
        allocation,
        stopLoss,
        monthlyReturn: targetReturn,
        avatar: targetAvatar
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 space-y-6 relative border border-[var(--border-active)] shadow-[0_0_50px_rgba(0,200,5,0.2)]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[rgba(0,200,5,0.15)] text-[var(--rh-green-light)] border border-[rgba(0,200,5,0.3)]">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold font-heading text-white">One-Click Mirror Allocator</h2>
            <p className="text-xs text-[var(--text-secondary)]">Salin transaksi otomatis dari Pro Trader terverifikasi</p>
          </div>
        </div>

        {/* Target Trader Profile Card */}
        <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={targetAvatar} alt={targetName} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--rh-green)]" />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-base">{targetName}</h3>
                <CheckCircle2 size={14} className="text-[var(--rh-green-light)]" />
              </div>
              <div className="text-xs text-[var(--text-muted)]">Verified Echo Pro Trader</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-[var(--text-muted)]">30d Return</div>
            <div className="text-base font-extrabold text-[var(--rh-green-light)]">{targetReturn}</div>
          </div>
        </div>

        {/* Allocation Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-200">Jumlah Alokasi Modal:</span>
            <span className="font-mono font-extrabold text-xl text-[var(--rh-green-light)]">${allocation.toLocaleString()}</span>
          </div>

          <input 
            type="range" 
            min="50" 
            max="10000" 
            step="50"
            value={allocation}
            onChange={(e) => setAllocation(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--rh-green)]"
          />

          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Min: $50</span>
            <span>Max: $10,000</span>
          </div>
        </div>

        {/* Smart Auto Stop-Loss */}
        <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Shield size={14} className="text-[var(--rh-green-light)]" /> Smart Auto Stop-Loss:
            </span>
            <span className="text-xs font-mono font-bold text-rose-400">-{stopLoss}% Portofolio</span>
          </div>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map(sl => (
              <button
                key={sl}
                onClick={() => setStopLoss(sl)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                  stopLoss === sl
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                -{sl}%
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] leading-tight">
            Jika kerugian portofolio ter-copy mencapai -{stopLoss}%, sistem akan menghentikan salinan transaksi secara otomatis untuk melindungi dana Anda.
          </p>
        </div>

        {/* Security & Lock note */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Lock size={13} className="text-[var(--rh-green)]" />
          <span>Dana disimpan aman di dompet Robinhood Anda. Anda dapat berhenti kapan saja.</span>
        </div>

        {/* Confirm Button */}
        <button 
          onClick={handleConfirm}
          disabled={isCopying}
          className="btn-primary w-full py-4 text-base font-extrabold"
        >
          {isCopying ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></span>
              Memproses Alokasi Mirror...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Konfirmasi Mirror Trade (${allocation.toLocaleString()})
              <ArrowRight size={18} />
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
