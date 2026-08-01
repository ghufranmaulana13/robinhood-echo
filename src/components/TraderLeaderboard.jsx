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
      riskScore: 3,
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
      riskScore: 4,
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
      riskScore: 1,
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
      riskScore: 5,
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
    <div className="space-y-6 w-full">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge badge-gold">
              <Award size={14} /> PRO LEADERBOARD
            </span>
            <span className="text-xs text-slate-400">Peringkat Terverifikasi Minggu Ini</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">
            Top Echo <span className="text-[var(--rh-green)]">Pro Traders</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Melacak performa transaksi nyata yang terverifikasi. Pilih trader untuk menyalin portofolio mereka secara transparan.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10 shrink-0">
          {[
            { id: 'overall', label: 'Top Performance' },
            { id: 'safe', label: 'Low Risk' },
            { id: 'options', label: 'Options Spreads' },
            { id: 'crypto', label: 'Crypto & Assets' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === tab.id 
                  ? 'bg-[var(--rh-green)] text-black font-bold shadow-[0_2px_10px_rgba(0,200,5,0.3)]' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trader Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTraders.map((trader) => (
          <div key={trader.rank} className="glass-panel-interactive p-6 flex flex-col justify-between space-y-5">
            
            {/* Card Header: Rank Badge & Profile */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md ${
                    trader.rank === 1 ? 'bg-amber-400 text-black shadow-amber-400/40' :
                    trader.rank === 2 ? 'bg-slate-300 text-black' :
                    trader.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{trader.rank}
                  </div>
                  <img 
                    src={trader.avatar} 
                    alt={trader.name} 
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-base font-heading">{trader.name}</h3>
                    <CheckCircle2 size={15} className="text-[var(--rh-green-light)]" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{trader.handle}</div>
                  <span className="badge badge-purple text-[10px] mt-1">{trader.badge}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400 font-medium">30d Return</div>
                <div className="text-xl font-extrabold font-heading text-[var(--rh-green-light)]">
                  {trader.monthlyReturn}
                </div>
              </div>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-black/40 border border-white/5 text-center text-xs">
              <div>
                <div className="text-slate-400 text-[11px]">Win Rate</div>
                <div className="font-bold text-white font-mono mt-0.5">{trader.winRate}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">Max Drawdown</div>
                <div className="font-bold text-slate-300 font-mono mt-0.5">{trader.drawdown}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px]">All-Time</div>
                <div className="font-bold text-emerald-400 font-mono mt-0.5">{trader.allTimeReturn}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Users size={15} className="text-[var(--rh-green)]" />
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
