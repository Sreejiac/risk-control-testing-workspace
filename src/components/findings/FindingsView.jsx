import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import {
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Calendar,
  User,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FileCheck,
  Building2,
  FileText
} from 'lucide-react';

export default function FindingsView() {
  const {
    findings,
    addFinding,
    updateFinding,
    controls,
    engagements,
    selectedEngagementId,
    setActiveTab
  } = useWorkspace();

  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClosureModal, setShowClosureModal] = useState(false);

  // Closure & Validation state
  const [closureDecision, setClosureDecision] = useState('Closed & Validated');
  const [validationEvidence, setValidationEvidence] = useState('');
  const [closureRationale, setClosureRationale] = useState('');

  // New Finding form
  const [newFindingForm, setNewFindingForm] = useState({
    id: `FND-2026-00${findings.length + 1}`,
    engagementId: engagements[0]?.id || 'ENG-2026-001',
    controlId: controls[0]?.id || 'CTL-PMT-001',
    title: '',
    dateRaised: new Date().toISOString().slice(0, 10),
    riskRating: 'High',
    businessArea: 'Payments & Treasury',
    actionStatus: 'In Progress',
    condition: '',
    criteria: '',
    cause: '',
    impact: '',
    agreedAction: '',
    actionOwner: '',
    targetDate: '2026-10-31',
    daysOverdue: 0,
    managementResponse: '',
    validationEvidence: 'Pending implementation.',
    closureDecision: 'Open - Under Remediation',
    closureRationale: 'Remediation currently in progress.'
  });

  const filteredFindings = findings.filter((f) => {
    if (selectedEngagementId !== 'ALL' && f.engagementId !== selectedEngagementId) return false;
    if (filterSeverity !== 'ALL' && f.riskRating !== filterSeverity) return false;
    if (filterStatus !== 'ALL' && f.actionStatus !== filterStatus) return false;

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchId = f.id.toLowerCase().includes(q);
      const matchTitle = f.title.toLowerCase().includes(q);
      const matchCtrl = f.controlId.toLowerCase().includes(q);
      const matchOwner = f.actionOwner.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchCtrl && !matchOwner) return false;
    }
    return true;
  });

  const handleCreateFinding = (e) => {
    e.preventDefault();
    if (!newFindingForm.title || !newFindingForm.condition || !newFindingForm.agreedAction) return;
    addFinding(newFindingForm);
    setShowAddModal(false);
  };

  const handleOpenClosure = (finding) => {
    setSelectedFinding(finding);
    setValidationEvidence(finding.validationEvidence || '');
    setClosureRationale(finding.closureRationale || '');
    setShowClosureModal(true);
  };

  const handleConfirmClosure = () => {
    if (!selectedFinding) return;
    updateFinding(selectedFinding.id, {
      actionStatus: closureDecision === 'Closed & Validated' ? 'Closed' : selectedFinding.actionStatus,
      closureDecision,
      validationEvidence,
      closureRationale,
      daysOverdue: 0
    });
    setSelectedFinding({
      ...selectedFinding,
      actionStatus: closureDecision === 'Closed & Validated' ? 'Closed' : selectedFinding.actionStatus,
      closureDecision,
      validationEvidence,
      closureRationale,
      daysOverdue: 0
    });
    setShowClosureModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Deficiency & Remediation Register
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">4 C's Assurance Methodology</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Assurance Findings & Corrective Action Plans
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Track control deficiencies, Condition, Criteria, Cause, and Impact (4 C's), agreed remediation action plans, target milestone dates, and second-line validation re-testing before closure.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 text-rose-400" />
            <span>Raise Formal Finding</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search findings by ID, title, action owner, or control reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Severity:</span>
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Risk Ratings</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Action Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Validation">Pending Validation</option>
            <option value="Overdue">Overdue</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Findings List (Dense Banking Cards) */}
      <div className="space-y-3.5">
        {filteredFindings.map((finding) => {
          const isOverdue = finding.actionStatus === 'Overdue' || finding.daysOverdue > 0;

          return (
            <div
              key={finding.id}
              onClick={() => setSelectedFinding(finding)}
              className={`bg-white border rounded-xl p-4 shadow-xs hover:border-slate-400 transition cursor-pointer text-xs space-y-3 ${
                isOverdue ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
              }`}
            >
              {/* Top Row: IDs, Severity, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {finding.id}
                  </span>
                  <Badge variant={finding.riskRating} size="sm">{finding.riskRating} Risk</Badge>
                  <Badge variant={finding.actionStatus} size="sm">{finding.actionStatus}</Badge>
                  <span className="font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Control: {finding.controlId}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span>Raised: <strong className="font-mono text-slate-700">{finding.dateRaised}</strong></span>
                  <span>•</span>
                  <span>Target: <strong className="font-mono text-slate-700">{finding.targetDate}</strong></span>
                  {isOverdue && (
                    <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                      {finding.daysOverdue} Days Overdue
                    </span>
                  )}
                </div>
              </div>

              {/* Title & 4 C's Summary */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">{finding.title}</h2>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 uppercase text-[10px] block">Condition (What was found):</span>
                    <p className="text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{finding.condition}</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-slate-700 uppercase text-[10px] block">Agreed Remediation Action:</span>
                    <p className="text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{finding.agreedAction}</p>
                  </div>
                </div>
              </div>

              {/* Footer: Owner, Engagement & Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Owner: <strong className="text-slate-800">{finding.actionOwner}</strong></span>
                  <span>•</span>
                  <span>Domain: <strong className="text-slate-800">{finding.businessArea}</strong></span>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {finding.actionStatus !== 'Closed' && (
                    <button
                      onClick={() => handleOpenClosure(finding)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded transition"
                    >
                      Validate & Close
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedFinding(finding)}
                    className="p-1 text-slate-400 hover:text-teal-600 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive 4 C's Detail Modal */}
      {selectedFinding && (
        <Modal
          isOpen={!!selectedFinding}
          onClose={() => setSelectedFinding(null)}
          title={`Assurance Finding Record: ${selectedFinding.id}`}
          subtitle={`${selectedFinding.title} | Risk Rating: ${selectedFinding.riskRating}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4 text-xs text-slate-700">
            {/* Metadata Bar */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={selectedFinding.riskRating}>{selectedFinding.riskRating} Risk</Badge>
                <Badge variant={selectedFinding.actionStatus}>{selectedFinding.actionStatus}</Badge>
                <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Control: {selectedFinding.controlId}
                </span>
                <span className="font-mono text-slate-500">Target: {selectedFinding.targetDate}</span>
              </div>

              {selectedFinding.actionStatus !== 'Closed' && (
                <button
                  onClick={() => handleOpenClosure(selectedFinding)}
                  className="px-3 py-1 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  Validate & Close Action
                </button>
              )}
            </div>

            {/* The 4 C's of Assurance Grid */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>The 4 C's Assurance Analysis</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 1. Condition */}
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-rose-700 mb-1">
                    1. Condition (What is happening)
                  </div>
                  <p className="text-slate-800 leading-relaxed">{selectedFinding.condition}</p>
                </div>

                {/* 2. Criteria */}
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-blue-700 mb-1">
                    2. Criteria (What should happen / Policy)
                  </div>
                  <p className="text-slate-800 leading-relaxed">{selectedFinding.criteria}</p>
                </div>

                {/* 3. Cause */}
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-amber-700 mb-1">
                    3. Cause (Root cause analysis)
                  </div>
                  <p className="text-slate-800 leading-relaxed">{selectedFinding.cause}</p>
                </div>

                {/* 4. Impact */}
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-purple-700 mb-1">
                    4. Impact (Potential exposure / Regulatory risk)
                  </div>
                  <p className="text-slate-800 leading-relaxed">{selectedFinding.impact}</p>
                </div>
              </div>
            </div>

            {/* Remediation Action Plan & Management Response */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Management Action Plan & Oversight
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-slate-600 text-[11px]">
                  <span>Action Owner: <strong className="text-slate-900">{selectedFinding.actionOwner}</strong></span>
                  <span>Target Date: <strong className="font-mono text-slate-900">{selectedFinding.targetDate}</strong></span>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Agreed Action Steps</div>
                  <p className="text-slate-800 mt-0.5 whitespace-pre-line font-medium leading-relaxed">
                    {selectedFinding.agreedAction}
                  </p>
                </div>
                {selectedFinding.managementResponse && (
                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-[10px] uppercase font-semibold text-slate-400">Management Response</div>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedFinding.managementResponse}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 2LoD Validation Re-testing & Closure Decision */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Second-Line Validation & Closure Sign-off
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Validation Evidence</span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedFinding.validationEvidence}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Closure Decision & Rationale</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={selectedFinding.actionStatus === 'Closed' ? 'Accepted' : 'Under Review'}>
                      {selectedFinding.closureDecision}
                    </Badge>
                    <span className="text-slate-600">{selectedFinding.closureRationale}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedFinding(null)}
                className="px-3.5 py-1.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300"
              >
                Close Finding
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Validate & Close Modal */}
      {showClosureModal && selectedFinding && (
        <Modal
          isOpen={showClosureModal}
          onClose={() => setShowClosureModal(false)}
          title={`Validate & Sign Off Remediation: ${selectedFinding.id}`}
          subtitle="Second-line assurance re-testing verification required before closing."
          maxWidth="max-w-2xl"
        >
          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
              <strong>Assurance Closure Governance:</strong> A finding may only be marked as Closed once the 2LoD tester has inspected remediation evidence and verified that the control is operating effectively.
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Closure Decision *</label>
              <select
                value={closureDecision}
                onChange={(e) => setClosureDecision(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
              >
                <option value="Closed & Validated">Closed & Validated - Re-testing Confirmed Effective</option>
                <option value="Pending 2LoD Validation Re-test">Pending Re-testing - Retain Open Status</option>
                <option value="Overdue - Escalated to Risk Committee">Overdue - Escalate to Governance Committee</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Validation Evidence Reviewed *</label>
              <textarea
                rows={3}
                required
                placeholder="Document specific sample re-tests, log extracts, or system configuration checks performed to validate remediation..."
                value={validationEvidence}
                onChange={(e) => setValidationEvidence(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Assurance Sign-Off Rationale *</label>
              <textarea
                rows={2}
                required
                placeholder="Document professional conclusion supporting closure..."
                value={closureRationale}
                onChange={(e) => setClosureRationale(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowClosureModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClosure}
                className="px-4 py-1.5 font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                Confirm Sign-Off
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Finding Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Raise Formal Assurance Finding (4 C's)"
          subtitle="Document control deficiency, root cause, and agreed management action plan."
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleCreateFinding} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Finding ID *</label>
                <input
                  type="text"
                  required
                  value={newFindingForm.id}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Finding Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Wire Authorization Released Under Expired Authority"
                  value={newFindingForm.title}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Related Control</label>
                <select
                  value={newFindingForm.controlId}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, controlId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  {controls.map(c => (
                    <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Risk Severity</label>
                <select
                  value={newFindingForm.riskRating}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, riskRating: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Observational">Observational</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Date</label>
                <input
                  type="date"
                  value={newFindingForm.targetDate}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, targetDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            {/* 4 C's Inputs */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Condition (Factual observation) *</label>
              <textarea
                rows={2}
                required
                placeholder="State the specific exception observed during testing..."
                value={newFindingForm.condition}
                onChange={(e) => setNewFindingForm({ ...newFindingForm, condition: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Criteria (Policy / Standard) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Policy reference or regulatory expectation violated..."
                  value={newFindingForm.criteria}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, criteria: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Cause (Root cause) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Underlying reason why deviation occurred..."
                  value={newFindingForm.cause}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, cause: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Impact (Financial / Compliance / Operational risk) *</label>
              <textarea
                rows={2}
                required
                placeholder="Potential institutional loss or consequence..."
                value={newFindingForm.impact}
                onChange={(e) => setNewFindingForm({ ...newFindingForm, impact: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Agreed Remediation Action *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Action steps agreed with management..."
                  value={newFindingForm.agreedAction}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, agreedAction: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Action Owner</label>
                <input
                  type="text"
                  placeholder="e.g., Robert Martinez (VP Treasury Operations)"
                  value={newFindingForm.actionOwner}
                  onChange={(e) => setNewFindingForm({ ...newFindingForm, actionOwner: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
              >
                Record Finding
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

