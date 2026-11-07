import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  ShieldAlert,
  TrendingDown,
  AlertTriangle,
  Play,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Monitor,
  Sparkles,
  Palette,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  Maximize2,
  Filter,
  Check
} from 'lucide-react';

export default function ServiceNowHeroView() {
  const {
    currentTheme,
    setCurrentTheme,
    setActiveTab,
    controls,
    findings,
    testPlans,
    risks,
    currentUser
  } = useWorkspace();

  const [selectedHeatmapCell, setSelectedHeatmapCell] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  // Dynamic theme styling tokens
  const getThemeStyles = () => {
    switch (currentTheme) {
      case 'teal':
        return {
          heroBg: 'bg-gradient-to-b from-[#021317] via-[#052127] to-[#010e12]',
          announcementBg: 'bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-800 text-white',
          announcementButton: 'bg-slate-950 text-white hover:bg-slate-900',
          accentPill: 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-teal-500/20',
          floatingPills: 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-950/50',
          windowGlow: 'shadow-[0_20px_70px_rgba(13,148,136,0.18)] border-teal-500/30',
          windowHeaderBg: 'bg-[#041c22] border-white/10',
          accentText: 'text-teal-400',
          trustText: 'text-white'
        };
      case 'violet':
        return {
          heroBg: 'bg-gradient-to-b from-[#090514] via-[#140b2b] to-[#06030e]',
          announcementBg: 'bg-gradient-to-r from-purple-800 via-indigo-700 to-violet-900 text-white',
          announcementButton: 'bg-slate-950 text-white hover:bg-slate-900',
          accentPill: 'bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-purple-600/30',
          floatingPills: 'bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-950/50',
          windowGlow: 'shadow-[0_20px_70px_rgba(124,58,237,0.2)] border-purple-500/30',
          windowHeaderBg: 'bg-[#100824] border-white/10',
          accentText: 'text-purple-400',
          trustText: 'text-white'
        };
      case 'light':
        return {
          heroBg: 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900',
          announcementBg: 'bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white',
          announcementButton: 'bg-blue-600 text-white hover:bg-blue-500',
          accentPill: 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-blue-600/20',
          floatingPills: 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-slate-900/20',
          windowGlow: 'shadow-2xl border-slate-300',
          windowHeaderBg: 'bg-slate-100 border-slate-200 text-slate-900',
          accentText: 'text-blue-600',
          trustText: 'text-slate-900'
        };
      case 'sapphire':
      default:
        return {
          heroBg: 'bg-gradient-to-b from-[#060b14] via-[#0b172a] to-[#040810]',
          announcementBg: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white',
          announcementButton: 'bg-slate-950 text-white hover:bg-slate-900',
          accentPill: 'bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-blue-600/30',
          floatingPills: 'bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-950/50',
          windowGlow: 'shadow-[0_20px_70px_rgba(37,99,235,0.2)] border-blue-500/30',
          windowHeaderBg: 'bg-[#09152b] border-white/10',
          accentText: 'text-blue-400',
          trustText: 'text-white'
        };
    }
  };

  const themeStyles = getThemeStyles();
  const isLight = currentTheme === 'light';

  // 5x5 Heatmap Matrix Data (Likelihood vs Impact)
  const heatmapData = [
    // [Likelihood: Almost Certain (5)]
    [
      { color: 'bg-amber-400 text-slate-950', count: 0 },
      { color: 'bg-orange-400 text-slate-950', count: 1 },
      { color: 'bg-orange-500 text-white', count: 2 },
      { color: 'bg-rose-600 text-white', count: 1, tag: 'RSK-AML-01 OFAC Screening' },
      { color: 'bg-rose-700 text-white', count: 1, tag: 'RSK-PMT-01 High-Value Wire' }
    ],
    // [Likelihood: Likely (4)]
    [
      { color: 'bg-yellow-400 text-slate-950', count: 0 },
      { color: 'bg-amber-400 text-slate-950', count: 1 },
      { color: 'bg-orange-400 text-slate-950', count: 2 },
      { color: 'bg-orange-500 text-white', count: 2 },
      { color: 'bg-rose-600 text-white', count: 1, tag: 'RSK-IT-01 Excessive PAM Access' }
    ],
    // [Likelihood: Moderate (3)]
    [
      { color: 'bg-emerald-500 text-white', count: 1 },
      { color: 'bg-yellow-400 text-slate-950', count: 2 },
      { color: 'bg-amber-400 text-slate-950', count: 3 },
      { color: 'bg-orange-400 text-slate-950', count: 1 },
      { color: 'bg-orange-500 text-white', count: 0 }
    ],
    // [Likelihood: Unlikely (2)]
    [
      { color: 'bg-emerald-600 text-white', count: 2 },
      { color: 'bg-emerald-500 text-white', count: 1 },
      { color: 'bg-yellow-400 text-slate-950', count: 1 },
      { color: 'bg-amber-400 text-slate-950', count: 0 },
      { color: 'bg-orange-400 text-slate-950', count: 0 }
    ],
    // [Likelihood: Rare (1)]
    [
      { color: 'bg-emerald-700 text-white', count: 3 },
      { color: 'bg-emerald-600 text-white', count: 2 },
      { color: 'bg-emerald-500 text-white', count: 1 },
      { color: 'bg-yellow-400 text-slate-950', count: 0 },
      { color: 'bg-amber-400 text-slate-950', count: 0 }
    ]
  ];

  return (
    <div className={`relative overflow-hidden transition-colors duration-300 ${themeStyles.heroBg}`}>
      {/* 1. Full-Width Announcement Banner (From ServiceNow Screenshot) */}
      <div className={`px-4 py-2.5 text-center text-xs font-semibold flex items-center justify-center flex-wrap gap-2.5 transition-colors shadow-xs ${themeStyles.announcementBg}`}>
        <span>Miss the 2026 Second-Line Risk & Compliance Assurance briefing? It's on demand.</span>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3 py-1 rounded-full text-[11px] font-bold transition shadow-xs ${themeStyles.announcementButton}`}
        >
          Watch Event Replay
        </button>
      </div>

      {/* 2. Hero Content Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Narrative & Primary Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className={`text-[11px] font-extrabold uppercase tracking-widest ${
                isLight ? 'text-blue-700' : 'text-white/80'
              }`}>
                SOLUTIONS
              </span>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}>
                Governance, Risk, and Compliance (GRC)
              </h1>

              <p className={`text-sm sm:text-base leading-relaxed ${
                isLight ? 'text-slate-700' : 'text-white/80'
              }`}>
                Drive smarter assurance decisions. Improve control operating effectiveness and achieve resilience by unifying 2LoD testing, IPE evidence validation, automated workflows, and connected risk data.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-8 py-3 rounded-full text-sm transition-all transform hover:scale-[1.02] shadow-xl ${themeStyles.accentPill}`}
              >
                Launch Workspace
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`px-6 py-3 rounded-full text-sm font-semibold border transition ${
                  isLight
                    ? 'border-slate-300 text-slate-800 hover:bg-slate-200'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                Get Assurance Report
              </button>
            </div>

            {/* Sub-highlights pill badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-white/70'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOX 404 & COSO Key Controls</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-white/70'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>IPE Completeness & Accuracy Checks</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Embedded Interactive Software Window Mockup */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${themeStyles.windowGlow} ${
              isLight ? 'bg-white border-slate-300 shadow-2xl' : 'bg-[#040914] border-white/20 shadow-2xl'
            }`}>
              {/* Software Window Header */}
              <div className={`px-4 py-2.5 flex items-center justify-between border-b text-xs ${themeStyles.windowHeaderBg}`}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-white/30 ml-1">|</span>
                  <div className="font-bold text-white flex items-center gap-1 text-[11px]">
                    <span className="opacity-70 font-normal">servicenow</span>
                    <span>•</span>
                    <span>Risk Management</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('controls')}
                    className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition"
                  >
                    + Run Assessment
                  </button>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="p-1 rounded text-white/60 hover:text-white transition"
                    title="Maximize to Full Workspace"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub-header inside software window */}
              <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-black/20 text-xs">
                <div>
                  <h3 className="font-bold text-white text-sm">Risk Overview</h3>
                  <div className="text-[11px] text-white/50">Horizon Bancorp • Enterprise Risk Register</div>
                </div>
                <div className="text-[10px] text-white/50 font-mono">
                  Updated: Today 4:10:22 PM
                </div>
              </div>

              {/* Three Overview Metric Cards (Exact to Screenshot: 1, $941.64K, 4) */}
              <div className="p-4 grid grid-cols-3 gap-3 border-b border-white/5">
                {/* Metric 1 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-semibold text-white/50 truncate">
                    Entities at highest risk
                  </div>
                  <div className="text-2xl font-black text-rose-500 mt-1">1</div>
                  <div className="text-[9px] text-white/40 mt-0.5">Payment Wire Clearance</div>
                </div>

                {/* Metric 2 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-semibold text-white/50 truncate">
                    Total loss - year-to-date
                  </div>
                  <div className="text-2xl font-black text-white mt-1">$941.64K</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">↓ 14.2% vs previous period</div>
                </div>

                {/* Metric 3 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase font-semibold text-white/50 truncate">
                    KRI Breaches
                  </div>
                  <div className="text-2xl font-black text-amber-400 mt-1">4</div>
                  <div className="text-[9px] text-white/40 mt-0.5">Updated at 4:10:22 PM</div>
                </div>
              </div>

              {/* Middle Section: Side-by-side Charts (Risk Breakdown vs. 5x5 Heatmap) */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5">
                {/* Chart 1: Risk Breakdown Horizontal Stacked Bars */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Risk breakdown</span>
                    <span className="text-[10px] font-mono text-white/40">4 Domains</span>
                  </div>

                  <div className="space-y-2.5 text-[11px]">
                    {/* Operations */}
                    <div>
                      <div className="flex justify-between text-white/70 text-[10px] mb-1">
                        <span>Operations</span>
                        <span className="font-mono">8 Controls</span>
                      </div>
                      <div className="h-3 w-full rounded overflow-hidden flex gap-0.5">
                        <div className="bg-emerald-500 h-full w-[45%]" title="Low" />
                        <div className="bg-yellow-400 h-full w-[25%]" title="Moderate" />
                        <div className="bg-orange-500 h-full w-[18%]" title="High" />
                        <div className="bg-rose-600 h-full w-[12%]" title="Critical" />
                      </div>
                    </div>

                    {/* Technology / ITGC */}
                    <div>
                      <div className="flex justify-between text-white/70 text-[10px] mb-1">
                        <span>Technology / ITGC</span>
                        <span className="font-mono">6 Controls</span>
                      </div>
                      <div className="h-3 w-full rounded overflow-hidden flex gap-0.5">
                        <div className="bg-emerald-500 h-full w-[35%]" />
                        <div className="bg-yellow-400 h-full w-[20%]" />
                        <div className="bg-orange-500 h-full w-[30%]" />
                        <div className="bg-rose-600 h-full w-[15%]" />
                      </div>
                    </div>

                    {/* Financial */}
                    <div>
                      <div className="flex justify-between text-white/70 text-[10px] mb-1">
                        <span>Financial Close</span>
                        <span className="font-mono">5 Controls</span>
                      </div>
                      <div className="h-3 w-full rounded overflow-hidden flex gap-0.5">
                        <div className="bg-emerald-500 h-full w-[60%]" />
                        <div className="bg-yellow-400 h-full w-[25%]" />
                        <div className="bg-orange-500 h-full w-[15%]" />
                      </div>
                    </div>

                    {/* Compliance */}
                    <div>
                      <div className="flex justify-between text-white/70 text-[10px] mb-1">
                        <span>Compliance & Sanctions</span>
                        <span className="font-mono">4 Controls</span>
                      </div>
                      <div className="h-3 w-full rounded overflow-hidden flex gap-0.5">
                        <div className="bg-emerald-500 h-full w-[50%]" />
                        <div className="bg-yellow-400 h-full w-[30%]" />
                        <div className="bg-rose-600 h-full w-[20%]" />
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-white/60">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> Low</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-yellow-400" /> Mod</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-orange-500" /> High</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-600" /> Critical</span>
                  </div>
                </div>

                {/* Chart 2: 5x5 Risk Heatmap by Severity (Exact to Screenshot) */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Risk heatmap by Severity</span>
                    <span className="text-[10px] font-mono text-white/40">5 × 5 Matrix</span>
                  </div>

                  {/* Matrix Grid */}
                  <div className="space-y-1">
                    {heatmapData.map((row, rowIdx) => (
                      <div key={rowIdx} className="grid grid-cols-5 gap-1">
                        {row.map((cell, colIdx) => (
                          <div
                            key={colIdx}
                            onClick={() => setSelectedHeatmapCell({ rowIdx, colIdx, ...cell })}
                            className={`h-5 sm:h-6 rounded flex items-center justify-center font-mono font-bold text-[10px] cursor-pointer transition transform hover:scale-110 shadow-xs ${cell.color}`}
                            title={`Severity Cell [${rowIdx + 1}, ${colIdx + 1}]`}
                          >
                            {cell.count > 0 ? cell.count : ''}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Axes labels */}
                  <div className="flex items-center justify-between text-[9px] text-white/50 pt-1">
                    <span>Likelihood: Rare ➔ Almost Certain</span>
                    <span>Impact ➔</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Needs Attention (Highest Risks & Overdue Tasks) */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-black/20">
                {/* Highest Risks */}
                <div className="space-y-1.5">
                  <div className="font-bold text-white text-[11px] flex items-center justify-between">
                    <span>Highest risks</span>
                    <span className="text-[10px] text-rose-400 font-mono">2 Critical</span>
                  </div>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setActiveTab('controls')}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center justify-between text-[11px]"
                    >
                      <span className="font-medium text-white truncate max-w-[180px]">RSK-PMT-01: Unauthorized Wire Release</span>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">Critical</span>
                    </div>
                    <div 
                      onClick={() => setActiveTab('controls')}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center justify-between text-[11px]"
                    >
                      <span className="font-medium text-white truncate max-w-[180px]">RSK-IT-01: Privileged Access Recert</span>
                      <span className="text-[10px] font-bold text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded">High</span>
                    </div>
                  </div>
                </div>

                {/* Overdue Tasks Across Organization */}
                <div className="space-y-1.5">
                  <div className="font-bold text-white text-[11px] flex items-center justify-between">
                    <span>Overdue tasks across organization</span>
                    <span className="text-[10px] text-amber-400 font-mono">1 Overdue</span>
                  </div>
                  <div className="space-y-1">
                    <div 
                      onClick={() => setActiveTab('findings')}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center justify-between text-[11px]"
                    >
                      <span className="font-medium text-white truncate max-w-[180px]">FND-2026-003: Nostro Clearing Breaks</span>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">38d ovd</span>
                    </div>
                    <div 
                      onClick={() => setActiveTab('testplans')}
                      className="p-2 rounded bg-white/5 hover:bg-white/10 transition cursor-pointer flex items-center justify-between text-[11px]"
                    >
                      <span className="font-medium text-white truncate max-w-[180px]">TP-2026-001: Sample #18 Retest</span>
                      <span className="text-[10px] font-medium text-blue-400">Due Sept 20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Action Pills on Right Edge (Exact to Screenshot: Contact & Demo + Color Theme) */}
      <div className="fixed right-3 bottom-8 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => setShowThemeModal(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs transition transform hover:scale-105 shadow-xl ${themeStyles.floatingPills}`}
          title="Change Color Theme"
        >
          <Palette className="w-4 h-4" />
          <span>Theme</span>
        </button>

        <button
          onClick={() => setShowContactModal(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs transition transform hover:scale-105 shadow-xl ${themeStyles.floatingPills}`}
          title="Contact Assurance Lead"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs transition transform hover:scale-105 shadow-xl ${themeStyles.floatingPills}`}
          title="Open Full Assurance Workspace"
        >
          <Monitor className="w-4 h-4" />
          <span>Demo</span>
        </button>
      </div>

      {/* 4. Enterprise / Banking Trust Logo Bar (From ServiceNow Screenshot) */}
      <div className="border-t border-white/10 bg-black/40 py-8 px-4">
        <div className="max-w-[1600px] mx-auto text-center space-y-6">
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            The world works with ServiceNow™
          </h3>

          <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition text-sm sm:text-base font-bold font-mono tracking-wider text-white">
            <span className="hover:text-blue-400 transition cursor-pointer">Honeywell</span>
            <span className="hover:text-blue-400 transition cursor-pointer">AstraZeneca</span>
            <span className="hover:text-blue-400 transition cursor-pointer">nationalgrid</span>
            <span className="hover:text-blue-400 transition cursor-pointer">DNB</span>
            <span className="hover:text-blue-400 transition cursor-pointer">Uber</span>
            <span className="hover:text-blue-400 transition cursor-pointer">Barclays</span>
            <span className="hover:text-blue-400 transition cursor-pointer">JPMorgan</span>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-base">Contact 2LoD Assurance Team</h4>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Connect with Senior Assurance Leads regarding SOX 404 test scoping, IPE evidence requirements, or finding remediation plans.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="font-bold text-white">Sarah Jenkins, CISA</div>
                <div className="text-white/50 text-[11px]">Senior 2LoD Assurance Lead</div>
                <div className="text-blue-400 font-mono text-[11px] mt-1">s.jenkins@horizonbancorp.internal</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="font-bold text-white">Marcus Vance, Director</div>
                <div className="text-white/50 text-[11px]">Assurance Practice Director</div>
                <div className="text-blue-400 font-mono text-[11px] mt-1">m.vance@horizonbancorp.internal</div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Switcher Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-base">Select Visual Color Theme</h4>
              </div>
              <button
                onClick={() => setShowThemeModal(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Customize the visual palette of the GRC portal and assurance testing workspaces.
            </p>
            <div className="space-y-2 text-xs">
              {[
                { id: 'sapphire', name: 'Sapphire & Royal Navy', desc: 'Deep midnight navy with royal blue and electric cyan accents.', color: 'bg-blue-600' },
                { id: 'teal', name: 'Refined Sea-Teal & Obsidian', desc: 'Sophisticated dark obsidian with refined executive sea-teal.', color: 'bg-teal-600' },
                { id: 'violet', name: 'Royal Amethyst & Midnight', desc: 'Deep midnight violet with royal amethyst and indigo accents.', color: 'bg-purple-600' },
                { id: 'light', name: 'Executive Platinum Light', desc: 'Crisp high-contrast daylight slate with deep navy typography.', color: 'bg-slate-300' }
              ].map(theme => (
                <div
                  key={theme.id}
                  onClick={() => {
                    setCurrentTheme(theme.id);
                    setShowThemeModal(false);
                  }}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    currentTheme === theme.id
                      ? 'bg-white/15 border-white/40 ring-1 ring-white/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 shrink-0 ${theme.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{theme.name}</span>
                      {currentTheme === theme.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">{theme.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowThemeModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Cell Inspection Modal */}
      {selectedHeatmapCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h4 className="font-bold text-base">Heatmap Cell Details</h4>
              </div>
              <button
                onClick={() => setSelectedHeatmapCell(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-white/50 text-[10px] uppercase font-mono">Matrix Position</div>
                <div className="font-bold text-white mt-0.5">
                  Severity Rating: {selectedHeatmapCell.tag || 'Tier-1 High Risk Cluster'}
                </div>
                <div className="text-white/70 text-[11px] mt-1">
                  Active risks recorded in this cell: <strong className="text-white">{selectedHeatmapCell.count}</strong>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setSelectedHeatmapCell(null);
                  setActiveTab('controls');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-semibold text-xs text-white"
              >
                Inspect Linked Controls →
              </button>
              <button
                onClick={() => setSelectedHeatmapCell(null)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
