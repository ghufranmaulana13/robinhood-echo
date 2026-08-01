import React, { useState } from 'react';
import { Award, Users, TrendingUp, Shield, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';

export default function TraderLeaderboard({ onSelectTraderForMirror }) {
  const [activeCategory, setActiveCategory] = useState('overall');

  const traders = [
    {
      rank: 1,
      name: 'Alex Vance (AlphaQuant)',
      handle: '@quant_vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      winRate: '84.2%',
      monthlyReturn: '+28.4%',
      allTimeReturn: '+342.1%',
      followers: 12450,
      riskScore: 3, // 1-5 scale (3 = Moderate)
      drawdown: '-4.2%',
      topAsset: 'NVDA, SPY Calls',
      badge: 'QUANT KING',
      category: 'overall'
    },
    {
      rank: 2,
      name: 'Elena Rostova (Options Queen)',
      handle: '@elena_options',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      winRate: '79.6%',
      monthlyReturn: '+41.2%',
      allTimeReturn: '+512.8%',
      followers: 9820,
      riskScore: 4, // High
      drawdown: '-8.5%',
      topAsset: 'TSLA, AAPL Spreads',
      badge: 'OPTIONS WIZARD',
      category: 'options'
    },
    {
      rank: 3,
      name: 'Marcus Chen (Dividend Safe)',
      handle: '@marcus_dividends',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      winRate: '94.1%',
      monthlyReturn: '+8.9%',
      allTimeReturn: '+118.4%',
      followers: 15300,
      riskScore: 1, // Low
      drawdown: '-1.8%',
      topAsset: 'SCHD, O, JNJ, MSFT',
      badge: 'SAFE COMPOUNDER',
      category: 'safe'
    },
    {
      rank: 4,
      name: 'Satoshi Nexus',
      handle: '@satoshi_nexus',
      avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80',
      winRate: '88.9%',
      monthlyReturn: '+62.1%',
      allTimeReturn: '+890.5%',
      followers: 21400,
      riskScore: 5, // Degen
      drawdown: '-14.2%',
      topAsset: 'SOL, BTC, ETH Futures',
      badge: 'CRYPTO WHALE',
      category: 'crypto'
    }
  ];

  const filteredTraders = activeCategory === 'overall' 
    ? traders 
    : traders.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-gold">
              <Award size={14} /> PRO LEADERBOARD
            </span>
            <span className="text-xs text-[var(--text-secondary)]">Peringkat Terverifikasi Minggu Ini</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Top Echo <span className="text-[var(--rh-green)]">Pro Traders</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Melacak performa transaksi nyata yang terverifikasi. Pilih trader untuk menyalin portofolio mereka secara transparan.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[rgba(0,0,0,0.4)] p-1.5 rounded-xl border border-[var(--border-color)]">
          {[
            { id: 'overall', label: 'Top Performance' },
            { id: 'safe', label: 'Low Risk' },
            { id: 'options', label: 'Options Spreads' },
            { id: 'crypto', label: 'Crypto & Assets' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === tab.id 
                  ? 'bg-[var(--rh-green)] text-black shadow-[0_0_10px_var(--rh-green-glow)]' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trader Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTraders.map((trader) => (
          <div key={trader.rank} className="glass-panel-interactive p-5 flex flex-col justify-between space-y-4">
            
            {/* Card Top: Rank & Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    trader.rank === 1 ? 'bg-amber-400 text-black shadow-[0_0_8px_rgba(251,191,36,0.6)]' :
                    trader.rank === 2 ? 'bg-slate-300 text-black' :
                    trader.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{trader.rank}
                  </div>
                  <img 
                    src={trader.avatar} 
                    alt={trader.name} 
                    className="w-14 h-14 rounded-xl object-cover border-2 border-[var(--border-color)]"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-base font-heading">{trader.name}</h3>
                    <CheckCircle2 size={14} className="text-[var(--rh-green-light)]" />
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-mono">{trader.handle}</div>
                  <span className="badge badge-purple text-[10px] mt-1">{trader.badge}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-[var(--text-muted)]">30d Return</div>
                <div className="text-lg font-extrabold font-heading text-[var(--rh-green-light)] glow-text-green">
                  {trader.monthlyReturn}
                </div>
              </div>
            </div>

            {/* Performance Metric Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] text-center text-xs">
              <div>
                <div className="text-[var(--text-muted)] text-[10px]">Win Rate</div>
                <div className="font-bold text-white font-mono mt-0.5">{trader.winRate}</div>
              </div>
              <div>
                <div className="text-[var(--text-muted)] text-[10px]">Max Drawdown</div>
                <div className="font-bold text-slate-300 font-mono mt-0.5">{trader.drawdown}</div>
              </div>
              <div>
                <div className="text-[var(--text-muted)] text-[10px]">All-Time</div>
                <div className="font-bold text-emerald-400 font-mono mt-0.5">{trader.allTimeReturn}</div>
              </div>
            </div>

            {/* Footer: Followers & CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Users size={14} />
                <span><strong className="text-white">{trader.followers.toLocaleString()}</strong> Mirror Followers</span>
              </div>

              <button 
                onClick={() => onSelectTraderForMirror(trader)}
                className="btn-primary text-xs py-2 px-4"
              >
                <Zap size={14} fill="currentColor" />
                Mirror Trader
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
