import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import {
  FileSearch,
  Search,
  Filter,
  Plus,
  FileText,
  FileSpreadsheet,
  FileCheck,
  Calendar,
  User,
  Clock,
  AlertCircle,
  Download,
  Eye,
  CheckCircle2,
  Lock,
  Hash,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function EvidenceView() {
  const {
    evidence,
    addEvidence,
    updateEvidence,
    engagements,
    controls,
    testPlans,
    selectedEngagementId,
    setActiveTab
  } = useWorkspace();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterControl, setFilterControl] = useState('ALL');
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  // New Evidence Form
  const [formData, setFormData] = useState({
    id: `EVD-NEW-00${evidence.length + 1}`,
    engagementId: engagements[0]?.id || 'ENG-2026-001',
    controlId: controls[0]?.id || 'CTL-PMT-001',
    testPlanId: testPlans[0]?.id || 'TP-2026-001',
    testStepRef: 'Step 1: Population Completeness & Accuracy',
    sampleRef: 'Representative Sample Extract',
    name: '',
    requestedFrom: '',
    dateRequested: new Date().toISOString().slice(0, 10),
    dateReceived: new Date().toISOString().slice(0, 10),
    periodCovered: '2026-07-01 to 2026-09-30',
    reviewer: 'Sarah Jenkins, CISA',
    reviewStatus: 'Under Review',
    reliabilityNotes: 'Report generated directly by Database Administrator with validated script hash; reconciled to General Ledger.',
    attachmentFilename: 'Evidence_Extract_Workpaper_Sanitized.xlsx',
    fileSize: '4.8 MB',
    fileHash: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    mockType: 'Spreadsheet'
  });

  const filteredEvidence = evidence.filter((ev) => {
    if (selectedEngagementId !== 'ALL' && ev.engagementId !== selectedEngagementId) return false;
    if (filterStatus !== 'ALL' && ev.reviewStatus !== filterStatus) return false;
    if (filterControl !== 'ALL' && ev.controlId !== filterControl) return false;

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchName = ev.name.toLowerCase().includes(q);
      const matchId = ev.id.toLowerCase().includes(q);
      const matchCtrl = ev.controlId.toLowerCase().includes(q);
      const matchFile = ev.attachmentFilename?.toLowerCase().includes(q);
      if (!matchName && !matchId && !matchCtrl && !matchFile) return false;
    }
    return true;
  });

  const handleCreateEvidence = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addEvidence(formData);
    setShowAddModal(false);
  };

  const handleUpdateStatus = (evId, newStatus) => {
    updateEvidence(evId, { reviewStatus: newStatus });
    if (selectedEvidence?.id === evId) {
      setSelectedEvidence({ ...selectedEvidence, reviewStatus: newStatus });
    }
  };

  const handleOpenPreview = (item) => {
    setPreviewItem(item);
    setShowPreviewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Workpaper Documentation Register
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">IPE & Audit Trail Evaluation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Evidence Tracker & IPE Register
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Track requested documentation, verify Information Produced by Entity (IPE) reliability and data integrity, and maintain cryptographic audit hashes linked to control testing procedures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>Log Evidence Item</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search evidence by name, ID, control reference, or filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Review Statuses</option>
            <option value="Accepted">Accepted (Verified)</option>
            <option value="Under Review">Under Review</option>
            <option value="Follow-up Required">Follow-up Required</option>
            <option value="Requested">Requested (Pending)</option>
            <option value="Not Applicable">Not Applicable</option>
          </select>

          <select
            value={filterControl}
            onChange={(e) => setFilterControl(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Controls</option>
            {controls.map(c => (
              <option key={c.id} value={c.id}>{c.id}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3.5">Evidence ID</th>
                <th className="py-3 px-3.5">Artifact Name & Description</th>
                <th className="py-3 px-3">Linked Control & Step</th>
                <th className="py-3 px-3">Period Covered</th>
                <th className="py-3 px-3">Custodian (1LoD)</th>
                <th className="py-3 px-3">Review Status</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvidence.map((ev) => (
                <tr
                  key={ev.id}
                  onClick={() => setSelectedEvidence(ev)}
                  className="hover:bg-slate-50/80 transition cursor-pointer group"
                >
                  <td className="py-3 px-3.5 font-mono font-bold text-teal-700 whitespace-nowrap">
                    {ev.id}
                  </td>

                  <td className="py-3 px-3.5 max-w-sm">
                    <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition">
                      {ev.name}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-slate-500 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        {ev.attachmentFilename}
                      </span>
                      <span>•</span>
                      <span>{ev.fileSize}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-700">{ev.controlId}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[150px]">{ev.testStepRef}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                    {ev.periodCovered}
                  </td>

                  <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                    <div>{ev.requestedFrom}</div>
                    <div className="text-[10px] text-slate-400">Recv: {ev.dateReceived || 'Pending'}</div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={ev.reviewStatus} size="sm">
                      {ev.reviewStatus}
                    </Badge>
                  </td>

                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenPreview(ev)}
                        className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded transition"
                        title="Simulate Document & Integrity Hash Inspection"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedEvidence(ev)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                        title="View Full Evidence Record"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evidence Detail Modal */}
      {selectedEvidence && (
        <Modal
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          title={`Evidence Workpaper: ${selectedEvidence.id}`}
          subtitle={`${selectedEvidence.name} | Control: ${selectedEvidence.controlId}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4 text-xs text-slate-700">
            {/* Status Strip & Quick Action */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Review Status:</span>
                <Badge variant={selectedEvidence.reviewStatus}>{selectedEvidence.reviewStatus}</Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Change Status:</span>
                <select
                  value={selectedEvidence.reviewStatus}
                  onChange={(e) => handleUpdateStatus(selectedEvidence.id, e.target.value)}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800"
                >
                  <option value="Requested">Requested</option>
                  <option value="Received">Received</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </div>
            </div>

            {/* Custodian & Verification Dates */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">1LoD Provider</div>
                <div className="font-semibold text-slate-900 mt-0.5">{selectedEvidence.requestedFrom}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Requested / Received</div>
                <div className="font-mono text-slate-700 mt-0.5">{selectedEvidence.dateRequested} / {selectedEvidence.dateReceived || 'Pending'}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Period Covered</div>
                <div className="font-mono text-slate-700 mt-0.5">{selectedEvidence.periodCovered}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">2LoD Reviewer</div>
                <div className="font-semibold text-teal-800 mt-0.5">{selectedEvidence.reviewer}</div>
              </div>
            </div>

            {/* IPE Reliability, Completeness & Accuracy Evaluation Notes */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                IPE Reliability & Completeness Evaluation Notes (Information Produced by Entity)
              </div>
              <p className="p-3 bg-white rounded-lg border border-slate-200 leading-relaxed text-slate-800 font-medium">
                {selectedEvidence.reliabilityNotes}
              </p>
            </div>

            {/* Secure Attachment Simulation Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-600" />
                  <span className="font-bold text-slate-900">Workpaper File Attachment (Simulated Secure Storage)</span>
                </div>
                <button
                  onClick={() => handleOpenPreview(selectedEvidence)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Attachment</span>
                </button>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-bold text-slate-800">{selectedEvidence.attachmentFilename}</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">{selectedEvidence.fileHash}</div>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{selectedEvidence.fileSize}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEvidence(null)}
                className="px-3.5 py-1.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300"
              >
                Close Workpaper
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Simulated Document Preview & Hash Verification Modal */}
      {showPreviewModal && previewItem && (
        <Modal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          title={`Workpaper File Inspection: ${previewItem.attachmentFilename}`}
          subtitle="Cryptographic audit integrity verification & sanitized sample excerpt"
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4 text-xs text-slate-700">
            {/* Integrity Certificate */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cryptographic Audit Trail & IPE Integrity Verified</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                The extraction query hash matches the production code repository, confirming no unauthorized alterations or manual record omissions.
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">File Name</span>
                <span className="text-slate-800 font-bold">{previewItem.attachmentFilename}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-sans">File Size & Format</span>
                <span className="text-slate-800">{previewItem.fileSize} • {previewItem.mockType}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-sans">SHA-256 Checksum</span>
                <span className="text-teal-800 break-all">{previewItem.fileHash}</span>
              </div>
            </div>

            {/* Sanitized Sample Excerpt Window */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Sanitized Population Excerpt (Sample Rows)</span>
                <span className="text-[10px] text-slate-400 font-normal">Confidential Banking Prototype View</span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-900 text-slate-200 p-3 font-mono text-[11px] space-y-1.5">
                <div className="text-slate-400 border-b border-slate-800 pb-1">
                  TXN_ID | VALUE_DATE | CURR | AMOUNT_USD | INITIATOR_ID | APPROVER_ID | MFA_STATUS | FED_ACK
                </div>
                <div>TX-2026-8801 | 2026-07-02 | USD | $350,000.00 | U_44021 [Adams] | U_11094 [Martinez] | AUTH_TOKEN_VALID | ACK_RCVD_OK</div>
                <div>TX-2026-8845 | 2026-07-05 | USD | $1,200,000.00 | U_89102 [Henderson] | U_22901 [Rostova] | AUTH_TOKEN_VALID | ACK_RCVD_OK</div>
                <div>TX-2026-8910 | 2026-07-09 | USD | $420,000.00 | U_33100 [Wong] | U_11094 [Martinez] | AUTH_TOKEN_VALID | ACK_RCVD_OK</div>
                <div>TX-2026-9214 | 2026-07-31 | USD | $450,000.00 | U_66120 [Smith] | U_99014 [Davies] | AUTH_TOKEN_VALID | ACK_RCVD_OK [FLAG: DELEGATION EXP]</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-3.5 py-1.5 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Evidence Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Register Evidence Item"
          subtitle="Document IPE workpaper source, custodian, and reliability evaluation."
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleCreateEvidence} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Evidence ID *</label>
                <input
                  type="text"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Associated Control</label>
                <select
                  value={formData.controlId}
                  onChange={(e) => setFormData({ ...formData, controlId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  {controls.map(c => (
                    <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Evidence Name / Description *</label>
              <input
                type="text"
                required
                placeholder="e.g., Q3 2026 Fedwire Master Transaction Extract"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Requested From (Custodian)</label>
                <input
                  type="text"
                  placeholder="e.g., VP Treasury Operations"
                  value={formData.requestedFrom}
                  onChange={(e) => setFormData({ ...formData, requestedFrom: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Period Covered</label>
                <input
                  type="text"
                  placeholder="2026-07-01 to 2026-09-30"
                  value={formData.periodCovered}
                  onChange={(e) => setFormData({ ...formData, periodCovered: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Information Produced by Entity (IPE) Reliability Evaluation *</label>
              <textarea
                rows={2}
                required
                placeholder="Document verification of system script, report parameters, completeness reconciliations, and no unauthorized manual modifications..."
                value={formData.reliabilityNotes}
                onChange={(e) => setFormData({ ...formData, reliabilityNotes: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sample Placeholder Filename</label>
                <input
                  type="text"
                  value={formData.attachmentFilename}
                  onChange={(e) => setFormData({ ...formData, attachmentFilename: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Initial Status</label>
                <select
                  value={formData.reviewStatus}
                  onChange={(e) => setFormData({ ...formData, reviewStatus: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Requested">Requested</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                </select>
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
                className="px-4 py-1.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
              >
                Save Evidence
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

