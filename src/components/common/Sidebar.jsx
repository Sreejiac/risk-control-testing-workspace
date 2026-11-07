import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  LayoutDashboard,
  GitFork,
  Shield,
  ClipboardList,
  FileSearch,
  AlertTriangle,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const {
    activeTab,
    setActiveTab,
    controls,
    testPlans,
    evidence,
    findings,
    selectedEngagementId
  } = useWorkspace();

  // Calculate live badge counts scoped to engagement if selected
  const filteredControls = selectedEngagementId === 'ALL'
    ? controls
    : controls; // controls are shared or can be filtered

  const dueControlsCount = controls.filter(c => c.status === 'Under Testing' || c.status === 'Planning').length;
  const activeTestPlansCount = testPlans.filter(tp => tp.status === 'Under Testing' || tp.status === 'Planning').length;
  const pendingEvidenceCount = evidence.filter(e => e.reviewStatus === 'Requested' || e.reviewStatus === 'Under Review' || e.reviewStatus === 'Follow-up Required').length;
  const openFindingsCount = findings.filter(f => f.actionStatus !== 'Closed').length;
  const overdueFindingsCount = findings.filter(f => f.actionStatus === 'Overdue').length;

  const navItems = [
    {
      id: 'overview',
      label: 'GRC Overview',
      icon: LayoutDashboard,
      badge: { count: 'Portal', variant: 'blue' }
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'processes',
      label: 'Processes & Risks',
      icon: GitFork,
      badge: null
    },
    {
      id: 'controls',
      label: 'Controls',
      icon: Shield,
      badge: { count: controls.length, variant: 'default' }
    },
    {
      id: 'testplans',
      label: 'Test Plans',
      icon: ClipboardList,
      badge: activeTestPlansCount > 0 ? { count: activeTestPlansCount, variant: 'blue' } : null
    },
    {
      id: 'evidence',
      label: 'Evidence',
      icon: FileSearch,
      badge: pendingEvidenceCount > 0 ? { count: pendingEvidenceCount, variant: 'amber' } : null
    },
    {
      id: 'findings',
      label: 'Findings & Actions',
      icon: AlertTriangle,
      badge: overdueFindingsCount > 0 
        ? { count: `${openFindingsCount} (${overdueFindingsCount} ovd)`, variant: 'rose' }
        : openFindingsCount > 0 ? { count: openFindingsCount, variant: 'amber' } : null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileBarChart,
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings & Charter',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Main Persistent Sidebar */}
      <aside
        className={`fixed md:sticky top-0 md:top-[113px] z-40 h-full md:h-[calc(100vh-113px)] w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Navigation Links */}
        <div className="py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Assurance Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                      item.badge.variant === 'rose'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                        : item.badge.variant === 'amber'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : item.badge.variant === 'blue'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Assurance Governance Notice & Status */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60">
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
              <span>2LoD Testing Notice</span>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400">
              Assurance conclusions require independent verification and adherence to approved sampling and IPE validation standards.
            </p>
          </div>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            Horizon Bancorp Assurance v4.2
          </div>
        </div>
      </aside>
    </>
  );
}
