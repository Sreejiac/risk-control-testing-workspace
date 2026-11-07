import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  FileSearch,
  ExternalLink,
  Plus,
  Save,
  AlertTriangle,
  FileText
} from 'lucide-react';

export default function SampleExecutionModal({ isOpen, onClose, testPlan, onEscalateToFinding }) {
  const { sampleItems, updateSampleItem, addSampleItem, evidence, setActiveTab } = useWorkspace();

  const planSamples = sampleItems.filter(s => s.testPlanId === testPlan?.id);

  const [activeSampleId, setActiveSampleId] = useState(planSamples[0]?.id || null);
  const activeSample = planSamples.find(s => s.id === activeSampleId) || planSamples[0];

  // Form edit states for active sample
  const [result, setResult] = useState(activeSample?.result || 'Pass');
  const [workPerformed, setWorkPerformed] = useState(activeSample?.workPerformed || '');
  const [exceptionNotes, setExceptionNotes] = useState(activeSample?.exceptionNotes || '');
  const [evidenceRef, setEvidenceRef] = useState(activeSample?.evidenceRef || '');

  // Keep form in sync when changing selected sample
  const handleSelectSample = (sample) => {
    setActiveSampleId(sample.id);
    setResult(sample.result);
    setWorkPerformed(sample.workPerformed);
    setExceptionNotes(sample.exceptionNotes);
    setEvidenceRef(sample.evidenceRef);
  };

  const handleSaveSample = () => {
    if (!activeSample) return;
    updateSampleItem(activeSample.id, {
      result,
      workPerformed,
      exceptionNotes,
      evidenceRef,
      testedDate: new Date().toISOString().slice(0, 10)
    });
  };

  // Add new sample item
  const handleAddNewSample = () => {
    const nextNum = planSamples.length + 1;
    const newSample = {
      id: `SMP-${Date.now().toString().slice(-4)}`,
      testPlanId: testPlan.id,
      sampleNumber: nextNum,
      transactionRef: `TX-2026-${8800 + nextNum * 15}`,
      transactionDate: new Date().toISOString().slice(0, 10),
      amount: '$500,000',
      initiator: 'Operations Specialist',
      approver: 'Treasury Manager',
      evidenceRef: 'EVD-PMT-002',
      expectedAttribute: testPlan.testSteps[0]?.expectedAttribute || 'Dual approval prior to release',
      workPerformed: 'Tested for dual control, signer authorization tier, and cryptographic MFA log.',
      result: 'Pass',
      exceptionNotes: '',
      testedBy: 'Sarah Jenkins, CISA',
      testedDate: new Date().toISOString().slice(0, 10)
    };
    addSampleItem(newSample);
    setActiveSampleId(newSample.id);
  };

  if (!testPlan) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Sample Execution Workbench: ${testPlan.id}`}
      subtitle={`${testPlan.title} | Control: ${testPlan.controlId}`}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-4 text-xs">
        {/* Top Summary Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-500">
              Sample Population: <strong className="text-slate-900">{testPlan.populationCount?.toLocaleString()} items</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-mono text-teal-700 font-semibold">
              Sample Size: {testPlan.sampleSize} items ({testPlan.sampleSizeTag})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Progress:</span>
            <span className="font-mono font-bold text-slate-800">
              {planSamples.filter(s => s.result === 'Pass').length} Pass / {planSamples.filter(s => s.result === 'Exception').length} Exception / {planSamples.filter(s => s.result === 'Inconclusive').length} Inconclusive
            </span>
            <button
              onClick={handleAddNewSample}
              className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-teal-400" />
              <span>Add Sample Item</span>
            </button>
          </div>
        </div>

        {/* 2-Column Workbench Layout: Sample List vs Test Workpaper Editor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Column: Sample Items Selector */}
          <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50 max-h-[480px] overflow-y-auto space-y-1.5">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1 pb-1">
              Sample Selection List ({planSamples.length})
            </div>
            {planSamples.map((s) => {
              const isSelected = activeSample?.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className={`p-2.5 rounded-lg border transition cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-white border-teal-500 shadow-xs ring-1 ring-teal-500/20'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono font-bold text-slate-800">
                      #{String(s.sampleNumber).padStart(2, '0')} - {s.transactionRef}
                    </span>
                    <Badge variant={s.result} size="sm">{s.result}</Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{s.amount}</span>
                    <span className="font-mono text-[10px]">{s.transactionDate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Workpaper Testing Form */}
          <div className="md:col-span-2 border border-slate-200 rounded-lg p-4 bg-white space-y-4">
            {activeSample ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-900">
                        Sample #{activeSample.sampleNumber}: {activeSample.transactionRef}
                      </span>
                      <span className="text-slate-400">|</span>
                      <span className="font-mono font-semibold text-teal-700">{activeSample.amount}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Date: {activeSample.transactionDate} • Initiator: {activeSample.initiator} • Approver: {activeSample.approver}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveSample}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Result</span>
                    </button>
                  </div>
                </div>

                {/* Expected Control Attribute */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Expected Control Attribute
                  </label>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800">
                    {activeSample.expectedAttribute}
                  </div>
                </div>

                {/* Work Performed */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Work Performed / Assurance Testing Procedures *
                  </label>
                  <textarea
                    rows={3}
                    value={workPerformed}
                    onChange={(e) => setWorkPerformed(e.target.value)}
                    placeholder="Document specific steps taken: user IDs verified, system timestamps cross-referenced, signer limits confirmed..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 leading-relaxed"
                  />
                </div>

                {/* Result Selector & Evidence Reference */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Sample Testing Result *
                    </label>
                    <select
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
                    >
                      <option value="Pass">Pass - Control Operated Effectively</option>
                      <option value="Exception">Exception - Control Deviation / Failure</option>
                      <option value="Inconclusive">Inconclusive - Pending Additional Evidence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Evidence Artifact Reference
                    </label>
                    <input
                      type="text"
                      value={evidenceRef}
                      onChange={(e) => setEvidenceRef(e.target.value)}
                      placeholder="e.g., EVD-PMT-002"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-800"
                    />
                  </div>
                </div>

                {/* Exception Details & Escalate Action (if Exception selected) */}
                {result === 'Exception' && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between text-rose-800 font-bold text-xs">
                      <div className="flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-rose-600" />
                        <span>Exception Identification & Root Cause Notes</span>
                      </div>
                      <button
                        onClick={() => onEscalateToFinding(activeSample)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs flex items-center gap-1 transition"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>Escalate to Formal Finding (4 C's)</span>
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={exceptionNotes}
                      onChange={(e) => setExceptionNotes(e.target.value)}
                      placeholder="Detail the exact deviation: policy violated, transaction reference, amount, and root cause identified..."
                      className="w-full bg-white border border-rose-300 rounded-lg p-2 text-xs text-rose-900 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-slate-400">
                No sample selected. Choose a sample from the left panel.
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

