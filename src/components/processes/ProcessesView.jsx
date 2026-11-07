import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import {
  GitFork,
  Search,
  Plus,
  Filter,
  ArrowRight,
  Shield,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Info,
  Check
} from 'lucide-react';

export default function ProcessesView() {
  const {
    processes,
    addProcess,
    risks,
    addRisk,
    controls,
    setActiveTab
  } = useWorkspace();

  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [selectedRiskCategory, setSelectedRiskCategory] = useState('ALL');
  const [expandedProcessId, setExpandedProcessId] = useState('PRC-001');
  const [selectedRiskDetail, setSelectedRiskDetail] = useState(null);

  // Modal states
  const [showAddProcessModal, setShowAddProcessModal] = useState(false);
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);

  // New process form
  const [newProcName, setNewProcName] = useState('');
  const [newProcArea, setNewProcArea] = useState('Payments & Treasury');
  const [newProcOwner, setNewProcOwner] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');

  // New risk form
  const [newRiskProcessId, setNewRiskProcessId] = useState('PRC-001');
  const [newRiskTitle, setNewRiskTitle] = useState('');
  const [newRiskCategory, setNewRiskCategory] = useState('Operational / Fraud');
  const [newRiskInherent, setNewRiskInherent] = useState('High');
  const [newRiskResidual, setNewRiskResidual] = useState('Medium');
  const [newRiskStatement, setNewRiskStatement] = useState('');

  // Filtering
  const filteredProcesses = processes.filter((p) => {
    if (selectedArea !== 'ALL' && p.businessArea !== selectedArea) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSub = p.subProcesses.some(sp => sp.name.toLowerCase().includes(q) || sp.description.toLowerCase().includes(q));
      if (!matchName && !matchSub) return false;
    }
    return true;
  });

  const handleCreateProcess = (e) => {
    e.preventDefault();
    if (!newProcName.trim()) return;

    const newProc = {
      id: `PRC-${String(processes.length + 1).padStart(3, '0')}`,
      businessArea: newProcArea,
      name: newProcName,
      owner: newProcOwner || 'Business Operations Lead',
      subProcesses: newSubName ? [
        {
          id: `SUB-${String(processes.length + 1).padStart(3, '0')}-A`,
          name: newSubName,
          description: newSubDesc || 'Core operational sub-process workflow.',
          risks: []
        }
      ] : []
    };

    addProcess(newProc);
    setShowAddProcessModal(false);
    setNewProcName('');
    setNewProcOwner('');
    setNewSubName('');
    setNewSubDesc('');
  };

  const handleCreateRisk = (e) => {
    e.preventDefault();
    if (!newRiskTitle.trim() || !newRiskStatement.trim()) return;

    const targetProc = processes.find(p => p.id === newRiskProcessId);
    const subId = targetProc?.subProcesses[0]?.id || 'SUB-001-A';

    const newRisk = {
      id: `RSK-${newRiskCategory.slice(0, 3).toUpperCase()}-${String(risks.length + 1).padStart(2, '0')}`,
      processId: newRiskProcessId,
      subProcessId: subId,
      title: newRiskTitle,
      category: newRiskCategory,
      inherentRating: newRiskInherent,
      residualRating: newRiskResidual,
      statement: newRiskStatement,
      linkedControls: []
    };

    addRisk(newRisk);
    setShowAddRiskModal(false);
    setNewRiskTitle('');
    setNewRiskStatement('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Risk & Control Matrix (RCM)
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">Process Hierarchy & Risk Linkage</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Business Processes & Risk Register
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Maintain the institution's business process hierarchy, identify operational, financial reporting, cyber, and compliance risks, and map mitigating internal controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddRiskModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition"
          >
            <Plus className="w-3.5 h-3.5 text-slate-600" />
            <span>Identify Risk</span>
          </button>
          <button
            onClick={() => setShowAddProcessModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>New Process</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search processes, sub-processes, or risks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Domain:</span>
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Business Domains</option>
            <option value="Payments & Treasury">Payments & Treasury</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Technology & Cyber">Technology & Cyber</option>
            <option value="Financial Crimes Compliance">Financial Crimes Compliance</option>
            <option value="Commercial Lending">Commercial Lending</option>
          </select>
        </div>
      </div>

      {/* Process & Risk Hierarchy Layout */}
      <div className="space-y-4">
        {filteredProcesses.map((proc) => {
          const isExpanded = expandedProcessId === proc.id;
          const procRisks = risks.filter(r => r.processId === proc.id);
          const procControls = controls.filter(c => c.businessProcess === proc.businessArea);

          return (
            <div
              key={proc.id}
              className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden transition-all"
            >
              {/* Process Bar Header */}
              <div
                onClick={() => setExpandedProcessId(isExpanded ? null : proc.id)}
                className="p-4 bg-slate-50/80 hover:bg-slate-100/60 transition cursor-pointer flex items-center justify-between gap-4 border-b border-slate-200/80"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">{proc.id}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">{proc.businessArea}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 tracking-tight mt-0.5">
                      {proc.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="hidden sm:flex items-center gap-3 text-slate-500">
                    <span>Owner: <strong className="text-slate-700 font-medium">{proc.owner}</strong></span>
                    <span>•</span>
                    <span className="font-mono font-medium text-slate-700">{proc.subProcesses.length} Sub-processes</span>
                    <span>•</span>
                    <span className="font-mono font-medium text-rose-700">{procRisks.length} Risks</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Sub-processes & Linked Risks Content */}
              {isExpanded && (
                <div className="p-5 space-y-6">
                  {proc.subProcesses.map((sub) => {
                    const subRisks = risks.filter(r => r.subProcessId === sub.id || (r.processId === proc.id && !r.subProcessId));

                    return (
                      <div key={sub.id} className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                          <div>
                            <div className="text-xs font-mono font-semibold text-slate-400">{sub.id}</div>
                            <div className="text-xs font-bold text-slate-800">{sub.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{sub.description}</div>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            {subRisks.length} Linked Risks
                          </span>
                        </div>

                        {/* Risk Cards within this Sub-process */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          {subRisks.map((risk) => {
                            const linkedControlsList = controls.filter(c => risk.linkedControls.includes(c.id));

                            return (
                              <div
                                key={risk.id}
                                className="p-3 rounded-lg border border-slate-200 hover:border-teal-400 transition bg-slate-50/50 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-1.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-mono text-[11px] font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                        {risk.id}
                                      </span>
                                      <span className="text-[11px] text-slate-500">{risk.category}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Badge variant={risk.inherentRating} size="sm">
                                        Inherent: {risk.inherentRating}
                                      </Badge>
                                      <Badge variant={risk.residualRating} size="sm">
                                        Residual: {risk.residualRating}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="text-xs font-bold text-slate-900 leading-snug">
                                    {risk.title}
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                                    {risk.statement}
                                  </p>
                                </div>

                                {/* Mitigating Controls mapping */}
                                <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <Shield className="w-3 h-3 text-teal-600" />
                                    <span className="text-slate-500 font-medium">Controls:</span>
                                    {linkedControlsList.length > 0 ? (
                                      linkedControlsList.map(ctrl => (
                                        <button
                                          key={ctrl.id}
                                          onClick={() => setActiveTab('controls')}
                                          className="font-mono text-[10px] font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-1.5 py-0.2 rounded transition"
                                          title={ctrl.title}
                                        >
                                          {ctrl.id}
                                        </button>
                                      ))
                                    ) : (
                                      <span className="text-amber-600 text-[10px] font-medium">No direct control mapped</span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => setSelectedRiskDetail(risk)}
                                    className="text-teal-600 hover:text-teal-700 font-semibold text-[10px] flex items-center gap-0.5"
                                  >
                                    Details →
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Risk Detail Modal */}
      {selectedRiskDetail && (
        <Modal
          isOpen={!!selectedRiskDetail}
          onClose={() => setSelectedRiskDetail(null)}
          title={`Risk Record: ${selectedRiskDetail.id}`}
          subtitle={`${selectedRiskDetail.category} | Inherent: ${selectedRiskDetail.inherentRating} → Residual: ${selectedRiskDetail.residualRating}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Risk Statement</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">{selectedRiskDetail.title}</div>
              <p className="mt-1 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed text-slate-700">
                {selectedRiskDetail.statement}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Inherent Risk Assessment</div>
                <div className="mt-1">
                  <Badge variant={selectedRiskDetail.inherentRating}>{selectedRiskDetail.inherentRating} Inherent Risk</Badge>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Evaluated without factoring compensating controls.</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Residual Risk Assessment</div>
                <div className="mt-1">
                  <Badge variant={selectedRiskDetail.residualRating}>{selectedRiskDetail.residualRating} Residual Risk</Badge>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Evaluated assuming effective mitigating control operation.</div>
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                Mitigating Internal Controls
              </div>
              <div className="space-y-2">
                {controls.filter(c => selectedRiskDetail.linkedControls.includes(c.id)).map(ctrl => (
                  <div key={ctrl.id} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-700">{ctrl.id}</span>
                        <Badge variant={ctrl.keyClassification} size="sm">{ctrl.keyClassification}</Badge>
                        <Badge variant={ctrl.status} size="sm">{ctrl.status}</Badge>
                      </div>
                      <div className="font-medium text-slate-800 mt-0.5">{ctrl.title}</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedRiskDetail(null);
                        setActiveTab('controls');
                      }}
                      className="px-2 py-1 text-[11px] text-slate-700 hover:text-white hover:bg-slate-900 border border-slate-300 rounded transition"
                    >
                      View Control
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* New Process Modal */}
      {showAddProcessModal && (
        <Modal
          isOpen={showAddProcessModal}
          onClose={() => setShowAddProcessModal(false)}
          title="Create Business Process Record"
          subtitle="Define a business function and core sub-processes for control mapping."
        >
          <form onSubmit={handleCreateProcess} className="space-y-3.5">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Business Domain *</label>
              <select
                value={newProcArea}
                onChange={(e) => setNewProcArea(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              >
                <option value="Payments & Treasury">Payments & Treasury</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Technology & Cyber">Technology & Cyber</option>
                <option value="Financial Crimes Compliance">Financial Crimes Compliance</option>
                <option value="Commercial Lending">Commercial Lending</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Process Name *</label>
              <input
                type="text"
                required
                placeholder="e.g., Foreign Exchange (FX) Trade Settlement"
                value={newProcName}
                onChange={(e) => setNewProcName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">First-Line Process Owner</label>
              <input
                type="text"
                placeholder="e.g., VP Foreign Exchange Operations"
                value={newProcOwner}
                onChange={(e) => setNewProcOwner(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="block text-slate-700 font-semibold mb-1">Initial Sub-Process Name</label>
              <input
                type="text"
                placeholder="e.g., FX Confirmation & Matching"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Sub-Process Workflow Description</label>
              <textarea
                rows={2}
                placeholder="Describe key transaction flow, handoffs, and systems..."
                value={newSubDesc}
                onChange={(e) => setNewSubDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddProcessModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
              >
                Save Process
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* New Risk Modal */}
      {showAddRiskModal && (
        <Modal
          isOpen={showAddRiskModal}
          onClose={() => setShowAddRiskModal(false)}
          title="Identify New Risk Statement"
          subtitle="Document operational, financial, compliance, or technology risk."
        >
          <form onSubmit={handleCreateRisk} className="space-y-3.5">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Associated Process *</label>
              <select
                value={newRiskProcessId}
                onChange={(e) => setNewRiskProcessId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              >
                {processes.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Risk Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Unmatched FX Trade Counterparty Default Risk"
                value={newRiskTitle}
                onChange={(e) => setNewRiskTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newRiskCategory}
                  onChange={(e) => setNewRiskCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Operational / Fraud">Operational / Fraud</option>
                  <option value="Financial Reporting (SOX)">Financial Reporting (SOX)</option>
                  <option value="Technology / Cyber (ITGC)">Technology / Cyber (ITGC)</option>
                  <option value="Regulatory / Compliance">Regulatory / Compliance</option>
                  <option value="Credit Risk">Credit Risk</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Inherent Rating</label>
                <select
                  value={newRiskInherent}
                  onChange={(e) => setNewRiskInherent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Residual Rating</label>
                <select
                  value={newRiskResidual}
                  onChange={(e) => setNewRiskResidual(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Risk Statement (Condition & Consequences) *</label>
              <textarea
                rows={3}
                required
                placeholder="State the specific event, vulnerability, and potential institutional impact..."
                value={newRiskStatement}
                onChange={(e) => setNewRiskStatement(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddRiskModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
              >
                Record Risk
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

