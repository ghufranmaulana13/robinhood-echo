import React from 'react';
import { TrendingUp, PieChart, ShieldCheck, DollarSign, XCircle, ArrowUpRight, Clock, Pause } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard({ activeMirrors, onStopMirror }) {
  const totalMirroredValue = activeMirrors.reduce((sum, item) => sum + item.allocation, 0) + 12450.80;
  const totalProfit = 1380.40;
  const profitPercentage = '+11.08%';

  const chartData = {
    labels: ['Jul 1', 'Jul 5', 'Jul 10', 'Jul 15', 'Jul 20', 'Jul 25', 'Jul 30', 'Aug 1'],
    datasets: [
      {
        fill: true,
        label: 'Mirror Portfolio Growth ($)',
        data: [10000, 10250, 10800, 10600, 11400, 11950, 12200, 12450.80],
        borderColor: '#00C805',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(0, 200, 5, 0.35)');
          gradient.addColorStop(1, 'rgba(0, 200, 5, 0.0)');
          return gradient;
        },
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#00C805',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#11141A',
        titleColor: '#FFFFFF',
        bodyColor: '#00C805',
        borderColor: 'rgba(0, 200, 5, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.04)' },
        ticks: { color: '#64748B', font: { family: 'Inter' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.04)' },
        ticks: { color: '#64748B', font: { family: 'Inter' } }
      }
    }
  };

  const defaultMirrors = [
    {
      id: 'm-1',
      traderName: 'Alex Vance (AlphaQuant)',
      allocation: 2500,
      stopLoss: 10,
      monthlyReturn: '+28.4%',
      currentProfit: '+$412.50 (+16.5%)',
      isUp: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      activeSince: '12 days ago'
    },
    {
      id: 'm-2',
      traderName: 'Elena Rostova (Options Queen)',
      allocation: 1500,
      stopLoss: 15,
      monthlyReturn: '+41.2%',
      currentProfit: '+$285.00 (+19.0%)',
      isUp: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      activeSince: '5 days ago'
    }
  ];

  const allMirrors = [...defaultMirrors, ...activeMirrors];

  return (
    <div className="space-y-6 w-full">
      {/* Portfolio Overview Summary Card */}
      <div className="glass-panel p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              TOTAL MIRROR PORTFOLIO VALUE
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                ${totalMirroredValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h1>
              <span className="text-sm font-bold text-[var(--rh-green-light)] flex items-center gap-0.5">
                <ArrowUpRight size={16} />
                {profitPercentage} (+${totalProfit.toLocaleString()})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
              <span className="text-slate-400 block">Active Copy Traders:</span>
              <strong className="text-white text-sm font-mono">{allMirrors.length} Traders</strong>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs">
              <span className="text-slate-400 block">Risk Protection:</span>
              <strong className="text-[var(--rh-green-light)] text-sm font-mono">Auto Stop-Loss Active</strong>
            </div>
          </div>
        </div>

        {/* Growth Line Chart */}
        <div className="h-64 sm:h-72 w-full pt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Active Mirror Positions List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
          <PieChart size={18} className="text-[var(--rh-green)]" />
          Active Mirror Positions ({allMirrors.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allMirrors.map((mirror, idx) => (
            <div key={idx} className="glass-panel-interactive p-5 space-y-4">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img src={mirror.avatar} alt={mirror.traderName} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--rh-green)]" />
                  <div>
                    <h4 className="font-bold text-white text-base">{mirror.traderName}</h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> Copying since {mirror.activeSince || 'Just now'}
                    </span>
                  </div>
                </div>

                <span className="badge badge-green text-xs">
                  {mirror.monthlyReturn}
                </span>
              </div>

              {/* Position Stats */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">Capital Allocation</div>
                  <div className="font-bold text-white font-mono mt-0.5">${mirror.allocation.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Live PnL</div>
                  <div className="font-bold text-[var(--rh-green-light)] font-mono mt-0.5">{mirror.currentProfit || '+$24.50 (+4.9%)'}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Stop-Loss</div>
                  <div className="font-bold text-rose-400 font-mono mt-0.5">-{mirror.stopLoss || 10}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button className="btn-secondary text-xs py-1.5 px-3">
                  <Pause size={14} /> Pause Copy
                </button>
                
                <button 
                  onClick={() => onStopMirror(mirror.id || idx)}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition"
                >
                  <XCircle size={15} /> Close Position
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
