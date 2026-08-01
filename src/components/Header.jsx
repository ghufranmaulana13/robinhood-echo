import React from 'react';
import { Radio, Search, Bell, Sparkles, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenAiModal }) {
  const tickerItems = [
    { symbol: 'NVDA', price: '$124.50', change: '+4.8%', isUp: true },
    { symbol: 'TSLA', price: '$218.30', change: '+6.2%', isUp: true },
    { symbol: 'BTC/USD', price: '$66,420', change: '+2.1%', isUp: true },
    { symbol: 'AAPL', price: '$224.10', change: '-0.4%', isUp: false },
    { symbol: 'SPY', price: '$545.80', change: '+0.9%', isUp: true },
    { symbol: 'AMZN', price: '$186.20', change: '+3.4%', isUp: true },
    { symbol: 'ETH/USD', price: '$3,480', change: '-1.2%', isUp: false }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[var(--bg-glass)] backdrop-blur-xl">
      {/* Ticker Tape Ribbon */}
      <div className="w-full overflow-hidden border-b border-white/5 bg-black/60 py-1.5 text-xs">
        <div className="animate-ticker flex gap-8 items-center px-4">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 font-mono">
              <span className="font-semibold text-slate-300">{item.symbol}</span>
              <span className="text-white">{item.price}</span>
              <span className={`flex items-center gap-0.5 font-bold ${item.isUp ? 'text-[var(--rh-green-light)]' : 'text-[var(--rh-red)]'}`}>
                {item.change}
                <ArrowUpRight size={12} className={item.isUp ? '' : 'rotate-90'} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar - Centered Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer shrink-0" 
            onClick={() => setActiveTab('feed')}
          >
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="Robinhood Echo Logo" 
                className="w-11 h-11 rounded-xl border border-[var(--border-active)] shadow-[0_0_15px_rgba(0,200,5,0.2)] object-cover" 
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--rh-green)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--rh-green)]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight font-heading text-white">
                  Robinhood <span className="text-[var(--rh-green)]">Echo</span>
                </span>
                <span className="badge badge-green text-[10px] py-0.5">VERIFIED</span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Social Copy-Trading & Crowd Predictions</p>
            </div>
          </div>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveTab('feed')}
              className={`nav-tab ${activeTab === 'feed' ? 'active' : ''}`}
            >
              <Radio size={16} />
              Echo Stream
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`nav-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
            >
              <TrendingUp size={16} />
              Pro Leaderboard
            </button>
            <button 
              onClick={() => setActiveTab('predictions')}
              className={`nav-tab ${activeTab === 'predictions' ? 'active' : ''}`}
            >
              <ShieldCheck size={16} />
              Prediction Arena
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`nav-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            >
              My Mirror
            </button>
          </nav>

          {/* Right Section: Mirror Wallet & AI Genius & Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mirror Wallet Widget */}
            <div className="hidden sm:flex flex-col items-end px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">MIRROR WALLET</span>
              <span className="text-sm font-extrabold font-mono text-[var(--rh-green-light)]">
                $12,450.80 <span className="text-[11px] font-sans text-emerald-400 font-semibold">(+11.08%)</span>
              </span>
            </div>

            {/* AI Assistant Button */}
            <button 
              onClick={onOpenAiModal}
              className="btn-secondary text-xs border-purple-500/40 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
            >
              <Sparkles size={15} className="text-purple-400 animate-pulse" />
              <span className="hidden sm:inline font-semibold">Echo Genius</span>
            </button>

            {/* Notification Bell */}
            <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-all">
              <Bell size={18} />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center pl-2 border-l border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User Avatar" 
                className="w-9 h-9 rounded-full border-2 border-[var(--rh-green)] object-cover shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
