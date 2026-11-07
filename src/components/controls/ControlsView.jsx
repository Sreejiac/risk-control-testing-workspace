import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import {
  Shield,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  ExternalLink,
  ClipboardList,
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  User,
  Layers,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

export default function ControlsView() {
  const {
    controls,
    addControl,
    updateControl,
    testPlans,
    evidence,
    findings,
    setActiveTab
  } = useWorkspace();

  const [search, setSearch] = useState('');
  const [filterProcess, setFilterProcess] = useState('ALL');
  const [filterKey, setFilterKey] = useState('ALL');
  const [filterNature, setFilterNature] = useState('ALL');
  const [filterMethod, setFilterMethod] = useState('ALL');
  const [filterFrequency, setFilterFrequency] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // Control detail modal/drawer
  const [selectedControl, setSelectedControl] = useState(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatusValue, setNewStatusValue] = useState('');
  const [newDesignConclusion, setNewDesignConclusion] = useState('');
  const [newOperatingConclusion, setNewOperatingConclusion] = useState('');

  // Add Control modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    id: `CTL-OPS-00${controls.length + 1}`,
    title: '',
    businessProcess: 'Payments & Treasury',
    subProcess: 'High-Value Outgoing Fedwire Release',
    riskAddressed: 'RSK-PMT-01',
    controlObjective: '',
    description: '',
    controlOwner: '',
    assignedReviewer: 'Sarah Jenkins, CISA',
    frequency: 'Daily',
    nature: 'Preventive',
    method: 'Automated & ITDM',
    keyClassification: 'Key Control',
    frameworks: 'SOX 404 Key Control, FFIEC Payments Booklet',
    lastTestedDate: new Date().toISOString().slice(0, 10),
    nextReviewDate: '2026-11-30',
    status: 'Planning',
    designConclusion: 'Under Review',
    operatingConclusion: 'Not Started',
    notes: ''
  });

  // Filter logic
  const filteredControls = controls.filter((ctrl) => {
    if (filterProcess !== 'ALL' && ctrl.businessProcess !== filterProcess) return false;
    if (filterKey !== 'ALL' && ctrl.keyClassification !== filterKey) return false;
    if (filterNature !== 'ALL' && ctrl.nature !== filterNature) return false;
    if (filterMethod !== 'ALL' && !ctrl.method.includes(filterMethod)) return false;
    if (filterFrequency !== 'ALL' && !ctrl.frequency.includes(filterFrequency)) return false;
    if (filterStatus !== 'ALL' && ctrl.status !== filterStatus) return false;

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchId = ctrl.id.toLowerCase().includes(q);
      const matchTitle = ctrl.title.toLowerCase().includes(q);
      const matchOwner = ctrl.controlOwner.toLowerCase().includes(q);
      const matchDesc = ctrl.description.toLowerCase().includes(q);
      const matchRisk = ctrl.riskAddressed.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchOwner && !matchDesc && !matchRisk) return false;
    }
    return true;
  });

  // Sorting
  const sortedControls = [...filteredControls].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleCreateControl = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const newCtrl = {
      ...formData,
      frameworks: formData.frameworks.split(',').map(f => f.trim())
    };

    addControl(newCtrl);
    setShowAddModal(false);
  };

  const handleUpdateControlStatus = () => {
    if (!selectedControl) return;
    updateControl(selectedControl.id, {
      status: newStatusValue || selectedControl.status,
      designConclusion: newDesignConclusion || selectedControl.designConclusion,
      operatingConclusion: newOperatingConclusion || selectedControl.operatingConclusion
    });
    setSelectedControl({
      ...selectedControl,
      status: newStatusValue || selectedControl.status,
      designConclusion: newDesignConclusion || selectedControl.designConclusion,
      operatingConclusion: newOperatingConclusion || selectedControl.operatingConclusion
    });
    setIsEditingStatus(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Master Control Register
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">SOX 404 & Operational Controls</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Internal Controls Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Inventory of preventive and detective key controls, design evaluations, operating effectiveness determinations, and regulatory framework cross-references.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>Add Control</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filter by Control ID, title, owner, keyword, or risk reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Showing <strong className="text-slate-900 font-mono">{filteredControls.length}</strong> of {controls.length} controls</span>
          </div>
        </div>

        {/* Multi-facet Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Domain */}
          <select
            value={filterProcess}
            onChange={(e) => setFilterProcess(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Domains</option>
            <option value="Payments & Treasury">Payments & Treasury</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Technology & Cyber">Technology & Cyber</option>
            <option value="Financial Crimes Compliance">Financial Crimes Compliance</option>
            <option value="Commercial Lending">Commercial Lending</option>
          </select>

          {/* Key vs Non-Key */}
          <select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Classifications</option>
            <option value="Key Control">Key Control Only</option>
            <option value="Non-Key Control">Non-Key Control</option>
          </select>

          {/* Nature */}
          <select
            value={filterNature}
            onChange={(e) => setFilterNature(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">Nature (Prev/Det)</option>
            <option value="Preventive">Preventive</option>
            <option value="Detective">Detective</option>
          </select>

          {/* Method */}
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">Method (Auto/Manual/ITDM)</option>
            <option value="Automated">Automated</option>
            <option value="Manual">Manual</option>
            <option value="IT-Dependent">IT-Dependent Manual</option>
          </select>

          {/* Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">All Testing Statuses</option>
            <option value="Tested - Effective">Tested - Effective</option>
            <option value="Under Testing">Under Testing</option>
            <option value="Tested - Ineffective">Tested - Ineffective</option>
            <option value="Planning">Planning</option>
          </select>

          {(filterProcess !== 'ALL' || filterKey !== 'ALL' || filterNature !== 'ALL' || filterMethod !== 'ALL' || filterStatus !== 'ALL') && (
            <button
              onClick={() => {
                setFilterProcess('ALL');
                setFilterKey('ALL');
                setFilterNature('ALL');
                setFilterMethod('ALL');
                setFilterStatus('ALL');
              }}
              className="text-xs text-teal-600 hover:text-teal-800 underline font-medium ml-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Dense Assurance Controls Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3.5 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1">
                    <span>Control ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3.5 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('title')}>
                  <div className="flex items-center gap-1">
                    <span>Title & Process</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Classification</th>
                <th className="py-3 px-3">Nature / Method</th>
                <th className="py-3 px-3">Frequency</th>
                <th className="py-3 px-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">
                    <span>Testing Status</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Design / OE</th>
                <th className="py-3 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedControls.map((ctrl) => {
                const linkedTest = testPlans.find(tp => tp.controlId === ctrl.id);
                const linkedFindings = findings.filter(f => f.controlId === ctrl.id);

                return (
                  <tr
                    key={ctrl.id}
                    className="hover:bg-slate-50/80 transition cursor-pointer group"
                    onClick={() => setSelectedControl(ctrl)}
                  >
                    <td className="py-3 px-3.5 font-mono font-bold text-teal-700 whitespace-nowrap">
                      {ctrl.id}
                    </td>

                    <td className="py-3 px-3.5 max-w-sm">
                      <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition">
                        {ctrl.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="text-slate-600 font-medium">{ctrl.businessProcess}</span>
                        <span>›</span>
                        <span className="truncate">{ctrl.subProcess}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge variant={ctrl.keyClassification} size="sm">
                        {ctrl.keyClassification}
                      </Badge>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-medium text-slate-700">{ctrl.nature}</span>
                        <span className="text-[10px] text-slate-500">{ctrl.method}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {ctrl.frequency}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <Badge variant={ctrl.status} size="sm">
                        {ctrl.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[10px]">
                        <span 
                          title={`Design: ${ctrl.designConclusion}`}
                          className={`px-1.5 py-0.5 rounded font-mono font-medium ${
                            ctrl.designConclusion === 'Effective' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          D: {ctrl.designConclusion === 'Effective' ? 'Pass' : 'Rev'}
                        </span>
                        <span 
                          title={`Operating: ${ctrl.operatingConclusion}`}
                          className={`px-1.5 py-0.5 rounded font-mono font-medium ${
                            ctrl.operatingConclusion === 'Effective' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : ctrl.operatingConclusion === 'Ineffective'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          OE: {ctrl.operatingConclusion === 'Effective' ? 'Pass' : ctrl.operatingConclusion === 'Ineffective' ? 'Fail' : 'Prog'}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedControl(ctrl);
                        }}
                        className="p-1 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded transition"
                        title="View Control Details & Linked Workpapers"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Control Detail Drawer / Modal */}
      {selectedControl && (
        <Modal
          isOpen={!!selectedControl}
          onClose={() => {
            setSelectedControl(null);
            setIsEditingStatus(false);
          }}
          title={`Control Specification: ${selectedControl.id}`}
          subtitle={`${selectedControl.title} | ${selectedControl.businessProcess}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-5 text-xs text-slate-700">
            {/* Header Status & Key Attributes Strip */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={selectedControl.keyClassification}>{selectedControl.keyClassification}</Badge>
                <Badge variant={selectedControl.status}>{selectedControl.status}</Badge>
                <Badge variant={selectedControl.nature}>{selectedControl.nature}</Badge>
                <Badge variant={selectedControl.method}>{selectedControl.method}</Badge>
                <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Freq: {selectedControl.frequency}
                </span>
              </div>

              <button
                onClick={() => {
                  setNewStatusValue(selectedControl.status);
                  setNewDesignConclusion(selectedControl.designConclusion);
                  setNewOperatingConclusion(selectedControl.operatingConclusion);
                  setIsEditingStatus(!isEditingStatus);
                }}
                className="px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition"
              >
                {isEditingStatus ? 'Cancel Edit' : 'Update Testing Conclusion'}
              </button>
            </div>

            {/* Quick Status Update Form */}
            {isEditingStatus && (
              <div className="p-3.5 bg-teal-50/60 rounded-xl border border-teal-200 space-y-3">
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600" />
                  <span>Update Assurance Testing Conclusion</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Overall Status</label>
                    <select
                      value={newStatusValue}
                      onChange={(e) => setNewStatusValue(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
                    >
                      <option value="Planning">Planning</option>
                      <option value="Under Testing">Under Testing</option>
                      <option value="Tested - Effective">Tested - Effective</option>
                      <option value="Tested - Ineffective">Tested - Ineffective</option>
                      <option value="Remediated">Remediated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Design Effectiveness (D&I)</label>
                    <select
                      value={newDesignConclusion}
                      onChange={(e) => setNewDesignConclusion(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
                    >
                      <option value="Effective">Effective</option>
                      <option value="Deficient">Deficient</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Operating Effectiveness (OE)</label>
                    <select
                      value={newOperatingConclusion}
                      onChange={(e) => setNewOperatingConclusion(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
                    >
                      <option value="Effective">Effective</option>
                      <option value="Ineffective">Ineffective (Exceptions Noted)</option>
                      <option value="Testing in Progress">Testing in Progress</option>
                      <option value="Not Started">Not Started</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={handleUpdateControlStatus}
                    className="px-3 py-1 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
                  >
                    Save Conclusion
                  </button>
                </div>
              </div>
            )}

            {/* Description & Objective */}
            <div className="space-y-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Control Objective</div>
                <p className="mt-0.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-medium leading-relaxed">
                  {selectedControl.controlObjective}
                </p>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Detailed Control Description</div>
                <p className="mt-0.5 p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedControl.description}
                </p>
              </div>
            </div>

            {/* Ownership, Frequency & Governance Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">1LoD Control Performer / Owner</div>
                <div className="font-semibold text-slate-900 mt-0.5">{selectedControl.controlOwner}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Assigned 2LoD Reviewer</div>
                <div className="font-semibold text-teal-800 mt-0.5">{selectedControl.assignedReviewer}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Last Tested Date</div>
                <div className="font-mono text-slate-700 mt-0.5">{selectedControl.lastTestedDate}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Next Review Due</div>
                <div className="font-mono text-slate-700 mt-0.5">{selectedControl.nextReviewDate}</div>
              </div>
            </div>

            {/* Regulatory & Policy Framework References */}
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1.5">
                Related Frameworks & Regulatory Policies
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedControl.frameworks.map((fw, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs border border-slate-300 font-medium">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Linked Test Plans, Evidence, and Findings Traceability */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Associated Assurance Artifacts</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Linked Test Plan */}
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-[10px] font-semibold uppercase">Test Plan</span>
                    <ClipboardList className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  {testPlans.filter(tp => tp.controlId === selectedControl.id).map(tp => (
                    <div key={tp.id} className="mt-1">
                      <div className="font-mono font-bold text-teal-700">{tp.id}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-1">{tp.title}</div>
                      <button
                        onClick={() => {
                          setSelectedControl(null);
                          setActiveTab('testplans');
                        }}
                        className="mt-2 text-[10px] font-semibold text-teal-600 hover:underline flex items-center gap-1"
                      >
                        Open Test Plan →
                      </button>
                    </div>
                  ))}
                  {testPlans.filter(tp => tp.controlId === selectedControl.id).length === 0 && (
                    <div className="text-slate-400 text-[11px] italic mt-1">No test plan scheduled</div>
                  )}
                </div>

                {/* Linked Evidence */}
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-[10px] font-semibold uppercase">Evidence Items</span>
                    <FileSearch className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {evidence.filter(e => e.controlId === selectedControl.id).length} Items Logged
                  </div>
                  <button
                    onClick={() => {
                      setSelectedControl(null);
                      setActiveTab('evidence');
                    }}
                    className="mt-2 text-[10px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View in Evidence Register →
                  </button>
                </div>

                {/* Linked Findings */}
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-[10px] font-semibold uppercase">Exceptions & Findings</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {findings.filter(f => f.controlId === selectedControl.id).length} Active Findings
                  </div>
                  <button
                    onClick={() => {
                      setSelectedControl(null);
                      setActiveTab('findings');
                    }}
                    className="mt-2 text-[10px] font-semibold text-amber-600 hover:underline flex items-center gap-1"
                  >
                    View Findings Register →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Control Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Create Internal Control Record"
          subtitle="Add a new banking control to the Master Control Register."
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleCreateControl} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Control ID *</label>
                <input
                  type="text"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">Control Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Secondary Wire Authorization for > $250k"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Business Domain</label>
                <select
                  value={formData.businessProcess}
                  onChange={(e) => setFormData({ ...formData, businessProcess: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="Payments & Treasury">Payments & Treasury</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Technology & Cyber">Technology & Cyber</option>
                  <option value="Financial Crimes Compliance">Financial Crimes Compliance</option>
                  <option value="Commercial Lending">Commercial Lending</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sub-Process</label>
                <input
                  type="text"
                  placeholder="e.g., Outgoing Fedwire Settlement"
                  value={formData.subProcess}
                  onChange={(e) => setFormData({ ...formData, subProcess: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Control Objective *</label>
              <textarea
                rows={2}
                required
                placeholder="State the intended purpose and assurance outcome of the control..."
                value={formData.controlObjective}
                onChange={(e) => setFormData({ ...formData, controlObjective: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Detailed Control Description *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe how the control is performed, segregation of duties, systems used, frequency, and audit trail produced..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Classification</label>
                <select
                  value={formData.keyClassification}
                  onChange={(e) => setFormData({ ...formData, keyClassification: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-slate-900"
                >
                  <option value="Key Control">Key Control</option>
                  <option value="Non-Key Control">Non-Key Control</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nature</label>
                <select
                  value={formData.nature}
                  onChange={(e) => setFormData({ ...formData, nature: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-slate-900"
                >
                  <option value="Preventive">Preventive</option>
                  <option value="Detective">Detective</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Method</label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-slate-900"
                >
                  <option value="Automated & ITDM">Automated & ITDM</option>
                  <option value="Automated">Automated</option>
                  <option value="IT-Dependent Manual">IT-Dependent Manual</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-slate-900"
                >
                  <option value="Daily">Daily</option>
                  <option value="Daily / Event-Driven">Daily / Event-Driven</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">1LoD Control Owner</label>
                <input
                  type="text"
                  placeholder="e.g., Robert Martinez (VP Treasury)"
                  value={formData.controlOwner}
                  onChange={(e) => setFormData({ ...formData, controlOwner: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Related Frameworks (comma-separated)</label>
                <input
                  type="text"
                  placeholder="SOX 404, FFIEC, BCBS 239"
                  value={formData.frameworks}
                  onChange={(e) => setFormData({ ...formData, frameworks: e.target.value })}
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
                className="px-4 py-1.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
              >
                Save Control
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

