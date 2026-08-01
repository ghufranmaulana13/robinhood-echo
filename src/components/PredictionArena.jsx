import React, { useState } from 'react';
import { ShieldCheck, Flame, ThumbsUp, ThumbsDown, Award, TrendingUp, HelpCircle, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PredictionArena() {
  const [userVotes, setUserVotes] = useState({});
  const [rewardPoints, setRewardPoints] = useState(1450);

  const battles = [
    {
      id: 'nvda-battle',
      symbol: 'NVDA',
      assetName: 'NVIDIA Corporation',
      currentPrice: '$124.50',
      timeRemaining: '04:12:45',
      totalVotes: 14280,
      bullishPercent: 78,
      bearishPercent: 22,
      targetQuestion: 'Akankah NVDA menembus harga $130.00 sebelum penutupan hari Jumat ini?',
      topReasoning: 'Permintaan GPU Blackwell melampaui estimasi analis, call options volume naik 300%.'
    },
    {
      id: 'tsla-battle',
      symbol: 'TSLA',
      assetName: 'Tesla Inc',
      currentPrice: '$218.30',
      timeRemaining: '11:45:10',
      totalVotes: 9840,
      bullishPercent: 62,
      bearishPercent: 38,
      targetQuestion: 'Akankah pengumuman Robotaxi mendongkrak harga di atas $235.00?',
      topReasoning: 'Persetujuan regulasi autonomous driving di California menjadi katalis utama.'
    },
    {
      id: 'btc-battle',
      symbol: 'BTC/USD',
      assetName: 'Bitcoin',
      currentPrice: '$66,420',
      timeRemaining: '01:08:30',
      totalVotes: 24910,
      bullishPercent: 84,
      bearishPercent: 16,
      targetQuestion: 'Akankah Bitcoin bertahan di atas support level $65,000 setelah akumulasi ETF?',
      topReasoning: 'Inflow mingguan BlackRock IBIT mencapai $420M.'
    }
  ];

  const handleVote = (battleId, choice) => {
    if (userVotes[battleId]) return;

    setUserVotes(prev => ({ ...prev, [battleId]: choice }));
    setRewardPoints(prev => prev + 50);

    // Trigger celebration confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-purple">
              <Flame size={14} className="text-amber-400" /> CROWD SENTIMENT ARENA
            </span>
            <span className="text-xs text-[var(--text-secondary)]">Kompetisi Prediksi Komunitas</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Prediction <span className="text-[var(--rh-green)]">Battles</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Beri suara pada pergerakan harga saham & aset populer. Dapatkan **Echo Reward Points** dan buktikan keakuratan analisis Anda!
          </p>
        </div>

        {/* User Reward Points Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[rgba(255,184,0,0.08)] border border-[rgba(255,184,0,0.3)]">
          <div className="p-2.5 rounded-lg bg-[rgba(255,184,0,0.2)] text-amber-400">
            <Award size={22} />
          </div>
          <div>
            <div className="text-[10px] text-amber-200 font-semibold uppercase tracking-wider">ECHO REWARD POINTS</div>
            <div className="text-xl font-extrabold font-mono text-amber-400">{rewardPoints.toLocaleString()} PTS</div>
          </div>
        </div>
      </div>

      {/* Battle Cards Grid */}
      <div className="space-y-4">
        {battles.map(battle => {
          const userChoice = userVotes[battle.id];
          return (
            <div key={battle.id} className="glass-panel-interactive p-6 space-y-5">
              
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(0,200,5,0.1)] border border-[rgba(0,200,5,0.3)] flex items-center justify-center font-bold text-white text-base font-heading">
                    {battle.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl text-white font-heading">{battle.symbol}</h3>
                      <span className="text-sm text-[var(--text-secondary)]">({battle.assetName})</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Harga Saat Ini: <strong className="text-white font-mono">{battle.currentPrice}</strong> • Berakhir dalam: <span className="text-amber-400 font-mono font-semibold">{battle.timeRemaining}</span>
                    </div>
                  </div>
                </div>

                <span className="badge badge-green text-xs">
                  {battle.totalVotes.toLocaleString()} Total Votes
                </span>
              </div>

              {/* Target Question */}
              <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-semibold mb-1">
                  <HelpCircle size={14} className="text-[var(--rh-green)]" />
                  PREDIKSI PASAR
                </div>
                <p className="text-base font-semibold text-white">
                  "{battle.targetQuestion}"
                </p>
              </div>

              {/* Progress Bar (Bullish vs Bearish) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--rh-green-light)] flex items-center gap-1">
                    <ThumbsUp size={14} /> BULLISH {battle.bullishPercent}%
                  </span>
                  <span className="text-rose-400 flex items-center gap-1">
                    BEARISH {battle.bearishPercent}% <ThumbsDown size={14} />
                  </span>
                </div>

                <div className="h-3 w-full bg-rose-950/60 rounded-full overflow-hidden flex border border-[rgba(255,255,255,0.1)]">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--rh-green)] to-emerald-400 transition-all duration-700" 
                    style={{ width: `${battle.bullishPercent}%` }}
                  />
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-700 transition-all duration-700" 
                    style={{ width: `${battle.bearishPercent}%` }}
                  />
                </div>
              </div>

              {/* Vote CTA Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleVote(battle.id, 'BULLISH')}
                  disabled={!!userChoice}
                  className={`p-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                    userChoice === 'BULLISH'
                      ? 'bg-[var(--rh-green)] text-black ring-2 ring-emerald-400 shadow-[0_0_15px_var(--rh-green-glow)]'
                      : userChoice
                      ? 'opacity-40 bg-[rgba(255,255,255,0.04)] text-slate-500 cursor-not-allowed'
                      : 'bg-[rgba(0,200,5,0.12)] text-[var(--rh-green-light)] border border-[rgba(0,200,5,0.3)] hover:bg-[rgba(0,200,5,0.25)]'
                  }`}
                >
                  {userChoice === 'BULLISH' ? <Check size={18} /> : <ThumbsUp size={18} />}
                  VOTE BULLISH (+50 PTS)
                </button>

                <button
                  onClick={() => handleVote(battle.id, 'BEARISH')}
                  disabled={!!userChoice}
                  className={`p-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                    userChoice === 'BEARISH'
                      ? 'bg-rose-500 text-white ring-2 ring-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                      : userChoice
                      ? 'opacity-40 bg-[rgba(255,255,255,0.04)] text-slate-500 cursor-not-allowed'
                      : 'bg-[rgba(255,69,91,0.12)] text-rose-400 border border-[rgba(255,69,91,0.3)] hover:bg-[rgba(255,69,91,0.25)]'
                  }`}
                >
                  {userChoice === 'BEARISH' ? <Check size={18} /> : <ThumbsDown size={18} />}
                  VOTE BEARISH (+50 PTS)
                </button>
              </div>

              {/* Top Reasoning Note */}
              <div className="text-xs text-[var(--text-secondary)] italic border-t border-[var(--border-color)] pt-3 flex items-center gap-2">
                <span className="font-semibold not-italic text-slate-300">Sentimen Komunitas Teratas:</span>
                "{battle.topReasoning}"
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
