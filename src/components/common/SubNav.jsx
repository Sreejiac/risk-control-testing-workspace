import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Building2, Shield, AlertTriangle } from 'lucide-react';

export default function SubNav() {
  const {
    activeTab,
    setActiveTab,
    currentTheme,
    selectedEngagementId,
    setSelectedEngagementId,
    engagements,
    controls,
    findings,
    evidence
  } = useWorkspace();

  const overdueCount = findings.filter(f => f.actionStatus === 'Overdue').length;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'processes', label: 'Processes & Risks' },
    { id: 'controls', label: 'Controls', badge: controls.length },
    { id: 'testplans', label: 'Test Plans' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'findings', label: 'Findings & Actions', alert: overdueCount > 0 ? overdueCount : null },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' }
  ];

  // Dynamic active underline color based on current theme
  const getActiveIndicatorColor = () => {
    switch (currentTheme) {
      case 'teal':
        return 'border-teal-400 text-white font-bold';
      case 'violet':
        return 'border-purple-400 text-white font-bold';
      case 'light':
        return 'border-blue-600 text-slate-900 font-bold';
      case 'sapphire':
      default:
        return 'border-blue-500 text-white font-bold';
    }
  };

  const getSubNavBg = () => {
    switch (currentTheme) {
      case 'teal':
        return 'bg-[#021418] border-white/10 text-white/70';
      case 'violet':
        return 'bg-[#0a0614] border-white/10 text-white/70';
      case 'light':
        return 'bg-white border-slate-200 text-slate-600 shadow-xs';
      case 'sapphire':
      default:
        return 'bg-[#070d18] border-white/10 text-white/70';
    }
  };

  return (
    <div className={`border-b select-none transition-colors ${getSubNavBg()}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
        {/* Left Side: GRC Title and Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          <div className="py-3.5 flex items-center gap-2">
            <span className={`text-sm font-black tracking-wider uppercase ${
              currentTheme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              GRC
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-3.5 px-3 text-xs tracking-tight transition whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? getActiveIndicatorColor()
                      : currentTheme === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>

                  {tab.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-white/10 text-white/80">
                      {tab.badge}
                    </span>
                  )}

                  {tab.alert && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-500/80 text-white">
                      {tab.alert}
                    </span>
                  )}

                  {/* Active tab bottom underline bar */}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      currentTheme === 'teal' ? 'bg-teal-400' :
                      currentTheme === 'violet' ? 'bg-purple-400' :
                      currentTheme === 'light' ? 'bg-blue-600' :
                      'bg-blue-500'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Engagement Scope Pill Selector */}
        <div className="hidden lg:flex items-center gap-2 py-2">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
            currentTheme === 'light'
              ? 'bg-slate-100 border-slate-300 text-slate-800'
              : 'bg-white/5 border-white/10 text-white/80'
          }`}>
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] text-white/50">Scope:</span>
            <select
              value={selectedEngagementId}
              onChange={(e) => setSelectedEngagementId(e.target.value)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">All Engagements</option>
              {engagements.map((eng) => (
                <option key={eng.id} value={eng.id} className="bg-slate-900 text-white">
                  {eng.period} - {eng.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

