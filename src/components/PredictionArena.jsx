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
      targetQuestion: 'Will NVDA breach the $130.00 price target before Friday market close?',
      topReasoning: 'Blackwell GPU demand is beating analyst estimates, call options volume up 300%.'
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
      targetQuestion: 'Will the Robotaxi reveal push the stock price above $235.00?',
      topReasoning: 'California autonomous driving regulatory approvals serve as key catalyst.'
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
      targetQuestion: 'Will Bitcoin hold above $65,000 support level post ETF accumulation?',
      topReasoning: 'BlackRock IBIT weekly inflows reached $420M.'
    }
  ];

  const handleVote = (battleId, choice) => {
    if (userVotes[battleId]) return;

    setUserVotes(prev => ({ ...prev, [battleId]: choice }));
    setRewardPoints(prev => prev + 50);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge badge-purple">
              <Flame size={14} className="text-amber-400" /> CROWD SENTIMENT ARENA
            </span>
            <span className="text-xs text-slate-400">Community Prediction Battles</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Prediction <span className="text-[var(--rh-green)]">Battles</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Cast your vote on popular stock & asset price movements. Earn **Echo Reward Points** and prove your market foresight!
          </p>
        </div>

        {/* User Reward Points Card */}
        <div className="flex items-center gap-3.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 shrink-0">
          <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Award size={24} />
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
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-white text-base font-heading">
                    {battle.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xl text-white font-heading">{battle.symbol}</h3>
                      <span className="text-xs text-slate-400 font-medium">({battle.assetName})</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Current Price: <strong className="text-white font-mono">{battle.currentPrice}</strong> • Ends in: <span className="text-amber-400 font-mono font-semibold">{battle.timeRemaining}</span>
                    </div>
                  </div>
                </div>

                <span className="badge badge-green text-xs">
                  {battle.totalVotes.toLocaleString()} Total Votes
                </span>
              </div>

              {/* Target Question */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
                  <HelpCircle size={14} className="text-[var(--rh-green)]" />
                  MARKET PREDICTION QUESTION
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

                <div className="h-3 w-full bg-rose-950/60 rounded-full overflow-hidden flex border border-white/10">
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
                  className={`p-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    userChoice === 'BULLISH'
                      ? 'bg-[var(--rh-green)] text-black ring-2 ring-emerald-400 shadow-[0_0_15px_rgba(0,200,5,0.4)]'
                      : userChoice
                      ? 'opacity-40 bg-white/5 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-500/15 text-[var(--rh-green-light)] border border-emerald-500/30 hover:bg-emerald-500/25'
                  }`}
                >
                  {userChoice === 'BULLISH' ? <Check size={18} /> : <ThumbsUp size={18} />}
                  VOTE BULLISH (+50 PTS)
                </button>

                <button
                  onClick={() => handleVote(battle.id, 'BEARISH')}
                  disabled={!!userChoice}
                  className={`p-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    userChoice === 'BEARISH'
                      ? 'bg-rose-500 text-white ring-2 ring-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                      : userChoice
                      ? 'opacity-40 bg-white/5 text-slate-500 cursor-not-allowed'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25'
                  }`}
                >
                  {userChoice === 'BEARISH' ? <Check size={18} /> : <ThumbsDown size={18} />}
                  VOTE BEARISH (+50 PTS)
                </button>
              </div>

              {/* Top Reasoning Note */}
              <div className="text-xs text-slate-300 italic border-t border-white/5 pt-3 flex items-center gap-2">
                <span className="font-semibold not-italic text-slate-400">Top Community Insight:</span>
                "{battle.topReasoning}"
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
