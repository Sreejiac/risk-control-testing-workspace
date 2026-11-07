import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import {
  Briefcase,
  ShieldAlert,
  ClipboardCheck,
  FileSearch,
  AlertTriangle,
  Clock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Calendar,
  User,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function DashboardView() {
  const {
    engagements,
    controls,
    testPlans,
    evidence,
    findings,
    activityLog,
    selectedEngagementId,
    setSelectedEngagementId,
    setActiveTab
  } = useWorkspace();

  // Local filter states for Dashboard
  const [filterBusinessArea, setFilterBusinessArea] = useState('ALL');
  const [filterPeriod, setFilterPeriod] = useState('ALL');
  const [filterOwner, setFilterOwner] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter controls based on local + global filters
  const filteredControls = controls.filter((ctrl) => {
    if (filterBusinessArea !== 'ALL' && ctrl.businessProcess !== filterBusinessArea) return false;
    if (filterOwner !== 'ALL' && !ctrl.controlOwner.includes(filterOwner)) return false;
    if (filterStatus !== 'ALL' && ctrl.status !== filterStatus) return false;
    return true;
  });

  // Scope engagements
  const displayedEngagements = selectedEngagementId === 'ALL'
    ? engagements
    : engagements.filter(e => e.id === selectedEngagementId);

  // Compute stats
  const activeEngagementsCount = engagements.filter(e => e.status === 'In Progress' || e.status === 'Planning').length;
  const controlsDueCount = filteredControls.filter(c => c.status === 'Under Testing' || c.status === 'Planning').length;
  const testsInProgressCount = testPlans.filter(tp => tp.status === 'Under Testing').length;
  const evidenceAwaitingReviewCount = evidence.filter(e => e.reviewStatus === 'Under Review' || e.reviewStatus === 'Requested' || e.reviewStatus === 'Follow-up Required').length;
  const openFindingsCount = findings.filter(f => f.actionStatus !== 'Closed').length;
  const overdueActionsCount = findings.filter(f => f.actionStatus === 'Overdue').length;

  // Average completion rate of displayed engagements
  const avgCompletion = displayedEngagements.length > 0
    ? Math.round(displayedEngagements.reduce((acc, curr) => acc + curr.completionRate, 0) / displayedEngagements.length)
    : 0;

  // Control Status breakdown
  const statusCounts = {
    'Tested - Effective': controls.filter(c => c.status === 'Tested - Effective').length,
    'Under Testing': controls.filter(c => c.status === 'Under Testing').length,
    'Tested - Ineffective': controls.filter(c => c.status === 'Tested - Ineffective').length,
    'Planning': controls.filter(c => c.status === 'Planning').length,
  };

  // Severity breakdown
  const severityCounts = {
    'Critical': findings.filter(f => f.riskRating === 'Critical' && f.actionStatus !== 'Closed').length,
    'High': findings.filter(f => f.riskRating === 'High' && f.actionStatus !== 'Closed').length,
    'Medium': findings.filter(f => f.riskRating === 'Medium' && f.actionStatus !== 'Closed').length,
    'Low': findings.filter(f => f.riskRating === 'Low' && f.actionStatus !== 'Closed').length,
  };

  // Extract distinct owners for filter
  const uniqueOwners = Array.from(new Set(controls.map(c => c.controlOwner.split('(')[0].trim())));

  return (
    <div className="space-y-6">
      {/* Page Title & Scope Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Assurance Cockpit
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-mono text-slate-500">
                Scope: {selectedEngagementId === 'ALL' ? 'All Active Engagements' : selectedEngagementId}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Second-Line Risk & Control Testing Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Real-time oversight of internal control testing progress, population sampling, evidence evaluation, and remediation action tracking across banking operations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('testplans')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Open Test Plans</span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition"
            >
              <span>Executive Reports</span>
            </button>
          </div>
        </div>

        {/* Dashboard Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Refine Dashboard:</span>
          </div>

          {/* Business Area */}
          <select
            value={filterBusinessArea}
            onChange={(e) => setFilterBusinessArea(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Business Domains</option>
            <option value="Payments & Treasury">Payments & Treasury</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Technology & Cyber">Technology & Cyber</option>
            <option value="Financial Crimes Compliance">Financial Crimes Compliance</option>
            <option value="Commercial Lending">Commercial Lending</option>
          </select>

          {/* Control Owner */}
          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Control Owners</option>
            {uniqueOwners.map((owner) => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>

          {/* Testing Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Control Statuses</option>
            <option value="Under Testing">Under Testing</option>
            <option value="Tested - Effective">Tested - Effective</option>
            <option value="Tested - Ineffective">Tested - Ineffective</option>
            <option value="Planning">Planning</option>
          </select>

          {(filterBusinessArea !== 'ALL' || filterOwner !== 'ALL' || filterStatus !== 'ALL') && (
            <button
              onClick={() => {
                setFilterBusinessArea('ALL');
                setFilterOwner('ALL');
                setFilterStatus('ALL');
              }}
              className="text-xs text-teal-600 hover:text-teal-800 underline font-medium ml-1"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Active Engagements */}
        <div 
          onClick={() => setActiveTab('testplans')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-teal-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Engagements</span>
            <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{activeEngagementsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Active Cycles</span>
            <span className="text-teal-600 font-semibold">{avgCompletion}% avg</span>
          </div>
        </div>

        {/* Card 2: Controls Due */}
        <div 
          onClick={() => setActiveTab('controls')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-teal-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Controls Due</span>
            <ShieldAlert className="w-4 h-4 text-blue-500 group-hover:text-teal-600 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{controlsDueCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>In testing / plan</span>
            <span className="text-slate-400 font-mono">of {filteredControls.length}</span>
          </div>
        </div>

        {/* Card 3: Tests in Progress */}
        <div 
          onClick={() => setActiveTab('testplans')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-teal-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Tests Active</span>
            <ClipboardCheck className="w-4 h-4 text-teal-600 group-hover:text-teal-700 transition" />
          </div>
          <div className="text-2xl font-bold text-teal-700">{testsInProgressCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Design & OE workpapers
          </div>
        </div>

        {/* Card 4: Evidence Awaiting Review */}
        <div 
          onClick={() => setActiveTab('evidence')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-teal-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Evidence Review</span>
            <FileSearch className="w-4 h-4 text-amber-500 group-hover:text-amber-600 transition" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{evidenceAwaitingReviewCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Pending verification
          </div>
        </div>

        {/* Card 5: Open Findings */}
        <div 
          onClick={() => setActiveTab('findings')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-teal-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Open Findings</span>
            <AlertTriangle className="w-4 h-4 text-orange-500 group-hover:text-orange-600 transition" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{openFindingsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-rose-600 font-semibold">{severityCounts.High} High</span>
            <span>·</span>
            <span>{severityCounts.Medium} Med</span>
          </div>
        </div>

        {/* Card 6: Overdue Actions */}
        <div 
          onClick={() => setActiveTab('findings')}
          className={`border rounded-xl p-4 shadow-xs hover:border-rose-400 transition cursor-pointer group ${
            overdueActionsCount > 0 ? 'bg-rose-50/60 border-rose-200' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider">Overdue Actions</span>
            <Clock className={`w-4 h-4 ${overdueActionsCount > 0 ? 'text-rose-600' : 'text-slate-400'}`} />
          </div>
          <div className={`text-2xl font-bold ${overdueActionsCount > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
            {overdueActionsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {overdueActionsCount > 0 ? 'Requires escalation' : 'All actions on track'}
          </div>
        </div>
      </div>

      {/* Analytical Breakdown Charts & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Panel 1: Control Testing Status Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Control Testing Status</h2>
              <p className="text-[11px] text-slate-500">Distribution across scoped controls</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              {controls.length} Controls
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Effective */}
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Tested - Effective
                </span>
                <span className="font-mono">{statusCounts['Tested - Effective']} ({Math.round((statusCounts['Tested - Effective']/controls.length)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${(statusCounts['Tested - Effective']/controls.length)*100}%` }}
                />
              </div>
            </div>

            {/* In Progress */}
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Under Testing (In Progress)
                </span>
                <span className="font-mono">{statusCounts['Under Testing']} ({Math.round((statusCounts['Under Testing']/controls.length)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${(statusCounts['Under Testing']/controls.length)*100}%` }}
                />
              </div>
            </div>

            {/* Ineffective */}
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Tested - Ineffective (Deficient)
                </span>
                <span className="font-mono text-rose-700 font-bold">{statusCounts['Tested - Ineffective']} ({Math.round((statusCounts['Tested - Ineffective']/controls.length)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${(statusCounts['Tested - Ineffective']/controls.length)*100}%` }}
                />
              </div>
            </div>

            {/* Planning */}
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  Planning / Scoping
                </span>
                <span className="font-mono">{statusCounts['Planning']} ({Math.round((statusCounts['Planning']/controls.length)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-slate-400 h-full rounded-full transition-all"
                  style={{ width: `${(statusCounts['Planning']/controls.length)*100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Design Walkthroughs: 100% completed</span>
            <button 
              onClick={() => setActiveTab('controls')}
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-0.5"
            >
              View RCM <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Panel 2: Engagement Execution Progress */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Engagement Completion Rate</h2>
              <p className="text-[11px] text-slate-500">Execution progress by testing cycle</p>
            </div>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>

          <div className="space-y-3.5 text-xs">
            {engagements.map((eng) => (
              <div key={eng.id} className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]" title={eng.name}>
                    {eng.period}: {eng.businessArea}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{eng.completionRate}%</span>
                </div>
                <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full transition-all ${
                      eng.completionRate >= 80 ? 'bg-emerald-500' : eng.completionRate >= 50 ? 'bg-teal-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${eng.completionRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Lead: {eng.leadTester.split(',')[0]}</span>
                  <span className="font-mono">{eng.startDate} to {eng.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Open Findings & Remediation Risk Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Findings & Risk Severity</h2>
              <p className="text-[11px] text-slate-500">Active deficiencies awaiting remediation</p>
            </div>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-4">
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
              <div className="text-[10px] uppercase font-semibold text-rose-700">Critical</div>
              <div className="text-xl font-bold text-rose-900 mt-0.5">{severityCounts.Critical}</div>
              <div className="text-[10px] text-rose-600">Immediate escalation</div>
            </div>
            <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200">
              <div className="text-[10px] uppercase font-semibold text-orange-700">High Risk</div>
              <div className="text-xl font-bold text-orange-900 mt-0.5">{severityCounts.High}</div>
              <div className="text-[10px] text-orange-600">30-day SLA</div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-[10px] uppercase font-semibold text-amber-700">Medium Risk</div>
              <div className="text-xl font-bold text-amber-900 mt-0.5">{severityCounts.Medium}</div>
              <div className="text-[10px] text-amber-600">60-day SLA</div>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-[10px] uppercase font-semibold text-blue-700">Low / Obs</div>
              <div className="text-xl font-bold text-blue-900 mt-0.5">{severityCounts.Low}</div>
              <div className="text-[10px] text-blue-600">90-day SLA</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Primary Attention Finding:</span>
              <Badge variant="High" size="sm">High</Badge>
            </div>
            <div className="text-[11px] text-slate-600 mt-1 line-clamp-2">
              FND-2026-001: Untimely deprovisioning of Domain Admin privileges for external contractors.
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>Owner: K. Zhao (IAM)</span>
              <button
                onClick={() => setActiveTab('findings')}
                className="text-teal-600 font-semibold hover:underline"
              >
                Inspect Finding →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Milestones & Recent Assurance Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upcoming Testing Milestones */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">Upcoming Assurance Milestones</h2>
            </div>
            <span className="text-[11px] text-slate-400">Next 45 days</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {engagements[0]?.milestones.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {m.status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : m.status === 'In Progress' ? (
                    <div className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <div className="truncate">
                    <div className={`font-medium ${m.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {m.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{engagements[0].name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] text-slate-500">{m.dueDate}</span>
                  <Badge variant={m.status === 'Completed' ? 'Accepted' : m.status === 'In Progress' ? 'Under Testing' : 'Planning'} size="sm">
                    {m.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assurance Activity Audit Trail */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">Recent Assurance Activity</h2>
            </div>
            <span className="text-[11px] text-slate-400">Audit Trail</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs max-h-[290px] overflow-y-auto pr-1">
            {activityLog.slice(0, 7).map((log) => (
              <div key={log.id} className="py-2 flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-700 leading-snug">{log.action}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                    <span className="font-medium text-slate-600">{log.user}</span>
                    <span>•</span>
                    <span className="font-mono">{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

