import React, { useState } from 'react';
import { Radio, Repeat, Heart, MessageSquare, ShieldCheck, Zap, ArrowUpRight, TrendingUp, Sparkles, Filter } from 'lucide-react';

export default function EchoFeed({ onSelectTraderForMirror }) {
  const [filter, setFilter] = useState('all');
  const [likedPosts, setLikedPosts] = useState({});

  const feedPosts = [
    {
      id: 'post-1',
      trader: {
        name: 'Alex Vance (AlphaQuant)',
        handle: '@quant_vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        winRate: '84.2%',
        riskLevel: 'Moderate Risk',
        verifiedHash: '0x9f...a83c',
        monthlyReturn: '+28.4%'
      },
      time: '5 menit lalu',
      type: 'BUY',
      symbol: 'NVDA',
      assetName: 'NVIDIA Corp',
      allocation: '8.5% dari Portofolio',
      price: '$124.50',
      reasoning: 'Breached $122.80 resistance level with 2.4x average volume. Heavy call option buying detected at $130 strike expiring next Friday. Stop loss set at $118.',
      sentimentScore: 92,
      echoCount: 428,
      likes: 1250,
      comments: 94,
      category: 'tech'
    },
    {
      id: 'post-2',
      trader: {
        name: 'Elena Rostova (Options Queen)',
        handle: '@elena_options',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        winRate: '79.6%',
        riskLevel: 'Aggressive',
        verifiedHash: '0x4e...1b9d',
        monthlyReturn: '+41.2%'
      },
      time: '18 menit lalu',
      type: 'CALL SPREAD',
      symbol: 'TSLA',
      assetName: 'Tesla Inc',
      allocation: '5.0% dari Portofolio',
      price: '$218.30',
      reasoning: 'Opened Bull Call Spread (220/235) for next month earnings catalyst. High probability reward-to-risk ratio (3.8x).',
      sentimentScore: 88,
      echoCount: 312,
      likes: 840,
      comments: 61,
      category: 'options'
    },
    {
      id: 'post-3',
      trader: {
        name: 'Satoshi Nexus',
        handle: '@satoshi_nexus',
        avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80',
        winRate: '88.9%',
        riskLevel: 'High Growth',
        verifiedHash: '0x7c...3e12',
        monthlyReturn: '+62.1%'
      },
      time: '42 menit lalu',
      type: 'BUY',
      symbol: 'SOL/USD',
      assetName: 'Solana',
      allocation: '12.0% dari Portofolio',
      price: '$182.40',
      reasoning: 'On-chain DEX volume surged 45% today. TVL back above $5.5B. Accumulating spot position with trailing stop.',
      sentimentScore: 95,
      echoCount: 654,
      likes: 1890,
      comments: 142,
      category: 'crypto'
    }
  ];

  const filteredPosts = filter === 'all' ? feedPosts : feedPosts.filter(p => p.category === filter);

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 w-full">
      {/* Sleek Hero Banner Container */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-[#12161f] via-[#151b27] to-[#0f141d]">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="badge badge-green py-1 px-3">
              <Radio size={13} className="animate-pulse" /> LIVE STREAMING
            </span>
            <span className="text-xs text-slate-400 font-medium">2,481 Active Mirror Traders Online</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Verified Trade <span className="text-[var(--rh-green)]">Echo Stream</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Lihat aktivitas eksekusi riil dari Pro Trader terverifikasi secara transparan. Klik <span className="text-[var(--rh-green-light)] font-bold">Echo Trade</span> untuk menyalin transaksi secara otomatis dengan proteksi manajemen risiko.
          </p>

          {/* Clean Filter Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-[var(--rh-green)]" /> Filter Signal:
            </span>
            {[
              { id: 'all', label: 'Semua Sinyal' },
              { id: 'tech', label: 'Tech & Stocks' },
              { id: 'options', label: 'Opsi & Spreads' },
              { id: 'crypto', label: 'Crypto & Assets' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === f.id 
                    ? 'bg-[var(--rh-green)] text-black shadow-[0_4px_15px_rgba(0,200,5,0.3)]' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Posts Grid / List */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isLiked = likedPosts[post.id];
          return (
            <div key={post.id} className="glass-panel-interactive p-6 space-y-5">
              
              {/* Header: Trader Profile Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img 
                      src={post.trader.avatar} 
                      alt={post.trader.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/10 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[var(--rh-green)] rounded-full p-0.5 border border-black">
                      <ShieldCheck size={13} className="text-black" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white text-base font-heading">{post.trader.name}</h3>
                      <span className="text-xs text-slate-400 font-mono">{post.trader.handle}</span>
                      <span className="badge badge-purple text-[10px]">{post.trader.riskLevel}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-300 mt-1">
                      <span>Win Rate: <strong className="text-white">{post.trader.winRate}</strong></span>
                      <span>30d ROI: <strong className="text-[var(--rh-green-light)] font-bold">{post.trader.monthlyReturn}</strong></span>
                      <span className="text-slate-500 font-mono hidden sm:inline">Proof: {post.trader.verifiedHash}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-medium shrink-0">{post.time}</span>
              </div>

              {/* Signal Box Container */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`px-3 py-2 rounded-xl flex items-center justify-center font-extrabold text-xs tracking-wide shrink-0 ${
                    post.type.includes('BUY') || post.type.includes('CALL') 
                      ? 'bg-emerald-500/15 text-[var(--rh-green-light)] border border-emerald-500/30' 
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  }`}>
                    {post.type}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold font-heading text-white">{post.symbol}</span>
                      <span className="text-xs text-slate-400 font-medium">({post.assetName})</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      Eksekusi: <strong className="text-white font-mono">{post.price}</strong> • Alokasi: <strong className="text-white font-mono">{post.allocation}</strong>
                    </div>
                  </div>
                </div>

                {/* Action CTA: Echo Trade */}
                <button 
                  onClick={() => onSelectTraderForMirror(post)}
                  className="btn-primary py-2.5 px-6 text-sm shrink-0"
                >
                  <Zap size={16} fill="currentColor" />
                  Echo Trade
                </button>
              </div>

              {/* Trade Reasoning */}
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {post.reasoning}
              </p>

              {/* Footer Engagement */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition ${isLiked ? 'text-rose-400 font-bold' : 'hover:text-white'}`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition">
                    <MessageSquare size={16} />
                    <span>{post.comments} Diskusi</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[var(--rh-green-light)] font-medium">
                    <Repeat size={16} />
                    <span>{post.echoCount} Trader Menyalin</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-xs text-[var(--rh-green-light)] font-semibold">
                  <Sparkles size={13} />
                  <span>AI Score: <strong>{post.sentimentScore}/100</strong></span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
