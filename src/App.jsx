import React, { useState } from 'react';
import Header from './components/Header';
import EchoFeed from './components/EchoFeed';
import TraderLeaderboard from './components/TraderLeaderboard';
import PredictionArena from './components/PredictionArena';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MirrorModal from './components/MirrorModal';
import AiCopilotModal from './components/AiCopilotModal';
import { Radio, TrendingUp, ShieldCheck, Sparkles, Shield, Lock, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedTraderForMirror, setSelectedTraderForMirror] = useState(null);
  const [activeMirrors, setActiveMirrors] = useState([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleConfirmMirror = (newMirror) => {
    setActiveMirrors(prev => [newMirror, ...prev]);
    setSelectedTraderForMirror(null);
    setActiveTab('portfolio');
  };

  const handleStopMirror = (mirrorIndex) => {
    setActiveMirrors(prev => prev.filter((_, idx) => idx !== mirrorIndex));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-[var(--bg-dark)] text-white overflow-x-hidden">
      {/* Header Bar */}
      <div className="w-full">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden w-full flex items-center justify-around bg-[var(--bg-card)] border-b border-[var(--border-color)] p-2 text-xs">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'feed' ? 'text-[var(--rh-green)] font-bold' : 'text-slate-400'}`}
        >
          <Radio size={16} /> Feed
        </button>
        <button 
          onClick={() => setActiveTab('leaderboard')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'leaderboard' ? 'text-[var(--rh-green)] font-bold' : 'text-slate-400'}`}
        >
          <TrendingUp size={16} /> Pro Leaderboard
        </button>
        <button 
          onClick={() => setActiveTab('predictions')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'predictions' ? 'text-[var(--rh-green)] font-bold' : 'text-slate-400'}`}
        >
          <ShieldCheck size={16} /> Arena
        </button>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg ${activeTab === 'portfolio' ? 'text-[var(--rh-green)] font-bold' : 'text-slate-400'}`}
        >
          <Layers size={16} /> Mirror
        </button>
      </div>

      {/* Main Content View - Perfect Centering */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-stretch">
        {activeTab === 'feed' && (
          <EchoFeed onSelectTraderForMirror={(trader) => setSelectedTraderForMirror(trader)} />
        )}

        {activeTab === 'leaderboard' && (
          <TraderLeaderboard onSelectTraderForMirror={(trader) => setSelectedTraderForMirror(trader)} />
        )}

        {activeTab === 'predictions' && (
          <PredictionArena />
        )}

        {activeTab === 'portfolio' && (
          <AnalyticsDashboard 
            activeMirrors={activeMirrors} 
            onStopMirror={handleStopMirror} 
          />
        )}
      </main>

      {/* Mirror Allocation Modal */}
      {selectedTraderForMirror && (
        <MirrorModal 
          trader={selectedTraderForMirror}
          onClose={() => setSelectedTraderForMirror(null)}
          onConfirmMirror={handleConfirmMirror}
        />
      )}

      {/* AI Copilot Assistant Modal */}
      {isAiModalOpen && (
        <AiCopilotModal 
          onClose={() => setIsAiModalOpen(false)}
          onSelectTraderForMirror={(trader) => {
            setIsAiModalOpen(false);
            setSelectedTraderForMirror(trader);
          }}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[rgba(0,0,0,0.6)] py-8 text-xs text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Robinhood Echo" className="w-8 h-8 rounded-lg border border-[var(--border-active)]" />
            <div>
              <span className="font-bold text-slate-200 font-heading">Robinhood Echo</span>
              <span className="block text-[11px]">Verified Social Copy-Trading & Crowd Predictions Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield size={14} className="text-[var(--rh-green)]" /> Broker Grade Encryption
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Lock size={14} className="text-[var(--rh-green)]" /> Verified Proof-of-Trade
            </span>
          </div>

          <p>© 2026 Robinhood Markets Inc. All rights reserved. Conceptual project prototype.</p>
        </div>
      </footer>
    </div>
  );
}
