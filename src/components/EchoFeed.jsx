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
    <div className="space-y-6">
      {/* Banner Intro */}
      <div className="glass-panel p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 pointer-events-none hidden md:block">
          <img src="/hero.jpg" alt="Echo UI preview" className="w-full h-full object-cover rounded-r-2xl" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-green">
              <Radio size={12} className="animate-pulse" /> LIVE STREAM
            </span>
            <span className="text-xs text-[var(--text-secondary)]">2,481 Active Mirror Traders Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-heading">
            Verified Trade <span className="text-[var(--rh-green)]">Echo Stream</span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            Lihat aktivitas eksekusi riil dari Pro Trader terverifikasi secara transparan. Klik <span className="text-[var(--rh-green-light)] font-semibold">Echo Trade</span> untuk menyalin transaksi secara otomatis dengan proteksi manajemen risiko.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mr-2">
              <Filter size={14} /> Filter Signal:
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filter === f.id 
                    ? 'bg-[var(--rh-green)] text-black font-bold shadow-[0_2px_10px_var(--rh-green-glow)]' 
                    : 'bg-[rgba(255,255,255,0.05)] text-slate-300 hover:bg-[rgba(255,255,255,0.1)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isLiked = likedPosts[post.id];
          return (
            <div key={post.id} className="glass-panel-interactive p-5 sm:p-6 space-y-4">
              
              {/* Header: Trader Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={post.trader.avatar} 
                      alt={post.trader.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--border-color)]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[var(--rh-green)] rounded-full p-0.5 border border-[var(--bg-dark)]">
                      <ShieldCheck size={12} className="text-black" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-white text-base font-heading">{post.trader.name}</h3>
                      <span className="text-xs text-[var(--text-muted)] font-mono">{post.trader.handle}</span>
                      <span className="badge badge-purple text-[10px]">{post.trader.riskLevel}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mt-0.5">
                      <span>Win Rate: <strong className="text-white">{post.trader.winRate}</strong></span>
                      <span>30d ROI: <strong className="text-[var(--rh-green-light)]">{post.trader.monthlyReturn}</strong></span>
                      <span className="text-[var(--text-muted)] font-mono hidden sm:inline">Proof: {post.trader.verifiedHash}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[var(--text-muted)]">{post.time}</span>
                </div>
              </div>

              {/* Signal Card Box */}
              <div className="p-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                    post.type.includes('BUY') || post.type.includes('CALL') 
                      ? 'bg-[rgba(0,200,5,0.15)] text-[var(--rh-green-light)] border border-[rgba(0,200,5,0.3)]' 
                      : 'bg-[rgba(255,69,91,0.15)] text-[var(--rh-red)] border border-[rgba(255,69,91,0.3)]'
                  }`}>
                    {post.type}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold font-heading text-white">{post.symbol}</span>
                      <span className="text-xs text-[var(--text-secondary)]">({post.assetName})</span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Eksekusi: <strong className="text-white">{post.price}</strong> • Alokasi: <strong className="text-white">{post.allocation}</strong>
                    </div>
                  </div>
                </div>

                {/* Action CTA: Echo Trade */}
                <button 
                  onClick={() => onSelectTraderForMirror(post)}
                  className="btn-primary py-2.5 px-5 text-xs sm:text-sm whitespace-nowrap"
                >
                  <Zap size={16} fill="currentColor" />
                  Echo Trade
                </button>
              </div>

              {/* Reasoning Description */}
              <p className="text-sm text-slate-200 leading-relaxed">
                {post.reasoning}
              </p>

              {/* Footer Engagement */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition ${isLiked ? 'text-rose-400 font-bold' : 'hover:text-white'}`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                    <MessageSquare size={16} />
                    <span>{post.comments} Diskusi</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[var(--rh-green-light)]">
                    <Repeat size={16} />
                    <span>{post.echoCount} Trader Menyalin</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 bg-[rgba(0,200,5,0.08)] px-2.5 py-1 rounded-full border border-[rgba(0,200,5,0.2)] text-[11px] text-[var(--rh-green-light)]">
                  <Sparkles size={12} />
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
