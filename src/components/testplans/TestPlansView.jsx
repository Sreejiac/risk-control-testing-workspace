import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import SampleExecutionModal from './SampleExecutionModal';
import {
  ClipboardList,
  Search,
  Plus,
  Play,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  Database,
  Sliders,
  CheckSquare,
  FileSpreadsheet
} from 'lucide-react';

export default function TestPlansView() {
  const {
    engagements,
    testPlans,
    addTestPlan,
    updateTestPlan,
    controls,
    evidence,
    findings,
    addFinding,
    selectedEngagementId,
    setSelectedEngagementId,
    setActiveTab,
    methodology
  } = useWorkspace();

  const [search, setSearch] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState(testPlans[0]?.id || null);
  const [activeSubTab, setActiveSubTab] = useState('scoping'); // 'scoping', 'design', 'operating', 'steps'
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  // Escalate exception to finding state
  const [escalateData, setEscalateData] = useState(null);

  // Filter test plans
  const filteredTestPlans = testPlans.filter((tp) => {
    if (selectedEngagementId !== 'ALL' && tp.engagementId !== selectedEngagementId) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchId = tp.id.toLowerCase().includes(q);
      const matchTitle = tp.title.toLowerCase().includes(q);
      const matchCtrl = tp.controlId.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchCtrl) return false;
    }
    return true;
  });

  const activePlan = testPlans.find(tp => tp.id === selectedPlanId) || filteredTestPlans[0] || testPlans[0];

  // New Test Plan Form
  const [newPlanForm, setNewPlanForm] = useState({
    id: `TP-2026-00${testPlans.length + 1}`,
    engagementId: engagements[0]?.id || 'ENG-2026-001',
    controlId: controls[0]?.id || 'CTL-PMT-001',
    title: '',
    businessArea: 'Payments & Treasury',
    testingPeriod: '2026-07-01 to 2026-09-30',
    assignedTester: 'Sarah Jenkins, CISA',
    seniorReviewer: 'Marcus Vance, Director 2LoD',
    targetCompletionDate: '2026-10-15',
    status: 'Planning',
    objective: '',
    applicableCriteria: 'Corporate Assurance Testing Charter v4.2; SOX 404 Key Control Standards.',
    populationDescription: '',
    populationSource: '',
    populationCount: 1000,
    ipeCompletenessCheck: 'Reconciled transaction volume to general ledger control account with zero variance.',
    ipeAccuracyCheck: 'SQL query parameters inspected and approved by assurance tester.',
    ipeStatus: 'Approved - Reliable',
    samplingMethod: 'Stratified Random Sampling',
    samplingRationale: 'Sample size determined according to institutional testing matrix for daily control occurrences.',
    sampleSize: 25,
    sampleSizeTag: 'User-entered (Methodology Standard: 25 items)',
    designAssessment: {
      status: 'Under Review',
      walkthroughDate: new Date().toISOString().slice(0, 10),
      participants: 'Assurance Lead, Process Performer',
      walkthroughSummary: 'Observed process execution and confirmed segregation of duties.',
      conclusion: 'Design is under evaluation.'
    },
    operatingAssessment: {
      status: 'Not Started',
      periodTested: 'Q3 2026',
      samplesTestedCount: 0,
      samplesPassedCount: 0,
      samplesExceptionCount: 0,
      conclusion: 'Testing pending sample execution.'
    },
    testSteps: [
      {
        stepNumber: 1,
        title: "Population Completeness & IPE Verification",
        procedure: "Obtain master transaction extract and reconcile totals against external statement and general ledger.",
        expectedAttribute: "Report agrees to ledger without omitted transactions.",
        evidenceRef: "EVD-PMT-001",
        status: "Pass",
        testerComments: "Verified and reconciled."
      },
      {
        stepNumber: 2,
        title: "Control Execution Verification",
        procedure: "Verify that designated control attributes operate for each sample transaction.",
        expectedAttribute: "Control operated consistently without manual override.",
        evidenceRef: "EVD-PMT-002",
        status: "Pass",
        testerComments: "Tested sample items."
      }
    ]
  });

  const handleCreateTestPlan = (e) => {
    e.preventDefault();
    if (!newPlanForm.title || !newPlanForm.objective) return;
    addTestPlan(newPlanForm);
    setSelectedPlanId(newPlanForm.id);
    setShowNewPlanModal(false);
  };

  // Escalate sample exception to finding
  const handleEscalateToFinding = (sample) => {
    const newFinding = {
      id: `FND-2026-00${findings.length + 1}`,
      engagementId: activePlan.engagementId,
      controlId: activePlan.controlId,
      title: `Control Deviation: ${sample.expectedAttribute} [${sample.transactionRef}]`,
      dateRaised: new Date().toISOString().slice(0, 10),
      riskRating: 'High',
      businessArea: activePlan.businessArea,
      actionStatus: 'In Progress',
      condition: `Testing of Sample #${sample.sampleNumber} (${sample.transactionRef} for ${sample.amount}) identified exception: ${sample.exceptionNotes || 'Control execution failed to meet required attributes.'}`,
      criteria: activePlan.applicableCriteria,
      cause: 'Process execution deviation or system validation gap identified during sample testing.',
      impact: 'Potential financial loss, regulatory compliance breach, or unmitigated operational risk exposure.',
      agreedAction: '1. Investigate root cause with business operations.\n2. Implement corrective control check and re-test population.',
      actionOwner: 'Business Operations Lead',
      targetDate: '2026-10-31',
      daysOverdue: 0,
      managementResponse: 'Management acknowledged finding and initiated remediation plan.',
      validationEvidence: 'Awaiting corrective evidence.',
      closureDecision: 'Open - Under Remediation',
      closureRationale: 'Newly escalated from sample testing exception.'
    };

    addFinding(newFinding);
    setShowSampleModal(false);
    setActiveTab('findings');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Assurance Scoping & Workpapers
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">D&I Walkthroughs & OE Sampling</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Test Planning & Assurance Procedures
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Design effectiveness (walkthrough) and operating effectiveness testing plans with Information Produced by Entity (IPE) completeness verification, sampling rationale, and step-by-step procedures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewPlanModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>Create Test Plan</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout: Plan Selector & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Test Plan Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search test plans or controls..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>{filteredTestPlans.length} Test Plans</span>
              <span className="font-mono text-teal-700">Scope: {selectedEngagementId}</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTestPlans.map((tp) => {
              const isSelected = activePlan?.id === tp.id;
              const ctrl = controls.find(c => c.id === tp.controlId);

              return (
                <div
                  key={tp.id}
                  onClick={() => setSelectedPlanId(tp.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-white border-teal-500 shadow-md ring-1 ring-teal-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-mono font-bold text-teal-700">{tp.id}</span>
                    <Badge variant={tp.status} size="sm">{tp.status}</Badge>
                  </div>

                  <div className="font-bold text-slate-900 line-clamp-1">{tp.title}</div>
                  
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-mono font-medium text-slate-600">{tp.controlId}</span>
                    <span>•</span>
                    <span className="truncate">{tp.businessArea}</span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Tester: {tp.assignedTester.split(',')[0]}</span>
                    <span className="font-mono">{tp.testingPeriod}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Test Plan Workpaper */}
        <div className="lg:col-span-8 space-y-4">
          {activePlan ? (
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              {/* Header Box */}
              <div className="p-5 border-b border-slate-200 bg-slate-50/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-700">{activePlan.id}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        Control: {activePlan.controlId}
                      </span>
                      <Badge variant={activePlan.status} size="sm">{activePlan.status}</Badge>
                    </div>
                    <h2 className="text-base font-bold text-slate-900 mt-1">{activePlan.title}</h2>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Engagement: <strong className="text-slate-700">{activePlan.engagementId}</strong> • Testing Period: <span className="font-mono">{activePlan.testingPeriod}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSampleModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Sample Workbench</span>
                  </button>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/80 text-xs font-medium">
                  <button
                    onClick={() => setActiveSubTab('scoping')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeSubTab === 'scoping'
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    1. Scoping & IPE Verification
                  </button>
                  <button
                    onClick={() => setActiveSubTab('design')}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      activeSubTab === 'design'
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>2. Design Effectiveness (D&I)</span>
                    <Badge variant={activePlan.designAssessment.status} size="sm">
                      {activePlan.designAssessment.status}
                    </Badge>
                  </button>
                  <button
                    onClick={() => setActiveSubTab('operating')}
                    className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                      activeSubTab === 'operating'
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>3. Operating Effectiveness (OE)</span>
                    <Badge variant={activePlan.operatingAssessment.status} size="sm">
                      {activePlan.operatingAssessment.status}
                    </Badge>
                  </button>
                  <button
                    onClick={() => setActiveSubTab('steps')}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      activeSubTab === 'steps'
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4. Test Steps & Procedures ({activePlan.testSteps?.length || 0})
                  </button>
                </div>
              </div>

              {/* Tab 1: Scoping & IPE / C&A */}
              {activeSubTab === 'scoping' && (
                <div className="p-5 space-y-4 text-xs text-slate-700">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Testing Objective</div>
                      <p className="mt-0.5 p-3 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed font-medium text-slate-800">
                        {activePlan.objective}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Applicable Assurance Criteria</div>
                      <p className="mt-0.5 text-slate-600 font-mono text-[11px]">
                        {activePlan.applicableCriteria}
                      </p>
                    </div>
                  </div>

                  {/* Information Produced by Entity (IPE) / Completeness & Accuracy Section */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-teal-600" />
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Information Produced by Entity (IPE) Completeness & Accuracy Verification
                        </h3>
                      </div>
                      <Badge variant="Accepted" size="sm">{activePlan.ipeStatus}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Population Description & Scope</div>
                        <div className="text-slate-800 font-medium mt-0.5">{activePlan.populationDescription}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Source System / Database Table</div>
                        <div className="text-teal-800 font-mono text-[11px] mt-0.5">{activePlan.populationSource}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Completeness Check (Total Count & Value)</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {activePlan.ipeCompletenessCheck}
                        </p>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Accuracy Check (Parameters & Logic)</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {activePlan.ipeAccuracyCheck}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sampling Method & Methodology Rationale */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                      <Sliders className="w-4 h-4 text-teal-600" />
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Assurance Sampling Scoping & Methodology Rationale
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Population Count</div>
                        <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                          {activePlan.populationCount?.toLocaleString()} items
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Sampling Method</div>
                        <div className="font-semibold text-slate-900 mt-0.5">{activePlan.samplingMethod}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-400">Assurance Sample Size</div>
                        <div className="text-lg font-bold text-teal-700 font-mono mt-0.5">
                          {activePlan.sampleSize} items
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{activePlan.sampleSizeTag}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Methodology Rationale</div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                        {activePlan.samplingRationale}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Design Effectiveness (D&I) */}
              {activeSubTab === 'design' && (
                <div className="p-5 space-y-4 text-xs text-slate-700">
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-900">Design Effectiveness (Walkthrough / D&I) Assessment</span>
                        <Badge variant={activePlan.designAssessment.status}>
                          {activePlan.designAssessment.status}
                        </Badge>
                      </div>
                      <span className="font-mono text-slate-500">Walkthrough Date: {activePlan.designAssessment.walkthroughDate}</span>
                    </div>
                    <p className="text-[11px] text-blue-800 mt-1">
                      Assurance evaluation of whether the control, as designed and documented, appropriately mitigates the inherent risk and meets stated control objectives.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Walkthrough Participants</div>
                      <div className="mt-0.5 p-2 bg-slate-50 rounded border border-slate-200 font-medium text-slate-800">
                        {activePlan.designAssessment.participants}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Walkthrough Work Performed & Observation</div>
                      <p className="mt-0.5 p-3 bg-white rounded-lg border border-slate-200 leading-relaxed text-slate-700">
                        {activePlan.designAssessment.walkthroughSummary}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Design Conclusion & Limitations</div>
                      <p className="mt-0.5 p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-emerald-900 font-medium leading-relaxed">
                        {activePlan.designAssessment.conclusion}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Operating Effectiveness (OE) */}
              {activeSubTab === 'operating' && (
                <div className="p-5 space-y-4 text-xs text-slate-700">
                  <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-teal-900">Operating Effectiveness (OE Testing) Assessment</span>
                        <Badge variant={activePlan.operatingAssessment.status}>
                          {activePlan.operatingAssessment.status}
                        </Badge>
                      </div>
                      <span className="font-mono text-slate-500">Period: {activePlan.operatingAssessment.periodTested}</span>
                    </div>
                    <p className="text-[11px] text-teal-800 mt-1">
                      Assurance verification of whether the control functioned consistently as intended throughout the operational period over representative samples.
                    </p>
                  </div>

                  {/* OE Sample Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Samples Scoped</div>
                      <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">{activePlan.sampleSize}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Tested to Date</div>
                      <div className="text-xl font-bold text-teal-700 font-mono mt-0.5">
                        {activePlan.operatingAssessment.samplesTestedCount}
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="text-[10px] uppercase font-semibold text-emerald-700">Passed</div>
                      <div className="text-xl font-bold text-emerald-800 font-mono mt-0.5">
                        {activePlan.operatingAssessment.samplesPassedCount}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg border ${
                      activePlan.operatingAssessment.samplesExceptionCount > 0 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className={`text-[10px] uppercase font-semibold ${
                        activePlan.operatingAssessment.samplesExceptionCount > 0 ? 'text-rose-700' : 'text-slate-400'
                      }`}>
                        Exceptions
                      </div>
                      <div className={`text-xl font-bold font-mono mt-0.5 ${
                        activePlan.operatingAssessment.samplesExceptionCount > 0 ? 'text-rose-700' : 'text-slate-800'
                      }`}>
                        {activePlan.operatingAssessment.samplesExceptionCount}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Operating Effectiveness Conclusion</div>
                    <p className="mt-0.5 p-3 bg-white rounded-lg border border-slate-200 leading-relaxed text-slate-800">
                      {activePlan.operatingAssessment.conclusion}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setShowSampleModal(true)}
                      className="px-4 py-2 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs flex items-center gap-2 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-teal-400" />
                      <span>Execute & Review Individual Samples</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Step-by-Step Procedures */}
              {activeSubTab === 'steps' && (
                <div className="p-5 space-y-4 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">Step-by-Step Assurance Procedures</h3>
                      <p className="text-[11px] text-slate-500">Specific test steps executed across sample items</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activePlan.testSteps?.map((step) => (
                      <div key={step.stepNumber} className="p-4 border border-slate-200 rounded-xl bg-white space-y-2">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                              {step.stepNumber}
                            </span>
                            <span className="font-bold text-slate-900">{step.title}</span>
                          </div>
                          <Badge variant={step.status} size="sm">{step.status}</Badge>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-400">Testing Procedure</div>
                          <p className="text-slate-700 mt-0.5">{step.procedure}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                            <div className="text-[10px] uppercase font-semibold text-slate-400">Expected Attribute</div>
                            <div className="font-medium text-slate-800 mt-0.5">{step.expectedAttribute}</div>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                            <div className="text-[10px] uppercase font-semibold text-slate-400">Evidence Reference</div>
                            <div className="font-mono font-bold text-teal-700 mt-0.5">{step.evidenceRef}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-400">Tester Comments / Work Done</div>
                          <p className="text-slate-600 bg-slate-50/50 p-2 rounded border border-slate-100 mt-0.5 italic">
                            {step.testerComments}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400">
              No test plan selected.
            </div>
          )}
        </div>
      </div>

      {/* Interactive Sample Execution Workbench Modal */}
      {showSampleModal && activePlan && (
        <SampleExecutionModal
          isOpen={showSampleModal}
          onClose={() => setShowSampleModal(false)}
          testPlan={activePlan}
          onEscalateToFinding={handleEscalateToFinding}
        />
      )}

      {/* Create Test Plan Modal */}
      {showNewPlanModal && (
        <Modal
          isOpen={showNewPlanModal}
          onClose={() => setShowNewPlanModal(false)}
          title="Create Assurance Test Plan"
          subtitle="Scope control testing, document IPE verification, and define sampling rationale."
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleCreateTestPlan} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Test Plan ID *</label>
                <input
                  type="text"
                  required
                  value={newPlanForm.id}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Plan Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Q3 High-Value Wire Authorization OE Testing"
                  value={newPlanForm.title}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Control</label>
                <select
                  value={newPlanForm.controlId}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, controlId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  {controls.map(c => (
                    <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Engagement</label>
                <select
                  value={newPlanForm.engagementId}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, engagementId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  {engagements.map(eng => (
                    <option key={eng.id} value={eng.id}>{eng.period} - {eng.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Assurance Testing Objective *</label>
              <textarea
                rows={2}
                required
                placeholder="State the specific testing scope and assurance criteria..."
                value={newPlanForm.objective}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, objective: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sampling Method</label>
                <select
                  value={newPlanForm.samplingMethod}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, samplingMethod: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="Stratified Random Sampling">Stratified Random Sampling</option>
                  <option value="Random Statistical Sampling">Random Statistical Sampling</option>
                  <option value="Haphazard (Non-Statistical)">Haphazard (Non-Statistical)</option>
                  <option value="100% Automated Population Inspection">100% Population Inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sample Size</label>
                <input
                  type="number"
                  value={newPlanForm.sampleSize}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, sampleSize: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Date</label>
                <input
                  type="date"
                  value={newPlanForm.targetCompletionDate}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, targetCompletionDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowNewPlanModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
              >
                Save Test Plan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

