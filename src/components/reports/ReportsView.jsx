import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import {
  FileBarChart,
  Printer,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  FileText,
  FileSpreadsheet,
  Share2,
  Layers
} from 'lucide-react';

export default function ReportsView() {
  const {
    engagements,
    controls,
    testPlans,
    evidence,
    findings,
    selectedEngagementId,
    setSelectedEngagementId,
    methodology,
    currentUser,
    showToast
  } = useWorkspace();

  const [activeReportType, setActiveReportType] = useState('executive'); // 'executive', 'status', 'test_results', 'evidence_gaps', 'findings', 'overdue'

  const activeEngagement = selectedEngagementId === 'ALL'
    ? engagements[0]
    : engagements.find(e => e.id === selectedEngagementId) || engagements[0];

  const filteredControls = selectedEngagementId === 'ALL'
    ? controls
    : controls; // in production these are scoped to the engagement

  const filteredTestPlans = selectedEngagementId === 'ALL'
    ? testPlans
    : testPlans.filter(tp => tp.engagementId === selectedEngagementId);

  const filteredEvidence = selectedEngagementId === 'ALL'
    ? evidence
    : evidence.filter(ev => ev.engagementId === selectedEngagementId);

  const filteredFindings = selectedEngagementId === 'ALL'
    ? findings
    : findings.filter(f => f.engagementId === selectedEngagementId);

  // Summary counts
  const effectiveCount = filteredControls.filter(c => c.status === 'Tested - Effective').length;
  const ineffectiveCount = filteredControls.filter(c => c.status === 'Tested - Ineffective').length;
  const inProgressCount = filteredControls.filter(c => c.status === 'Under Testing').length;
  const overdueFindings = findings.filter(f => f.actionStatus === 'Overdue');

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Generate CSV data based on active report
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeReportType === 'findings') {
      csvContent += "Finding ID,Title,Risk Rating,Business Area,Control ID,Action Status,Target Date,Action Owner,Condition,Agreed Action\n";
      filteredFindings.forEach(f => {
        csvContent += `"${f.id}","${f.title.replace(/"/g, '""')}","${f.riskRating}","${f.businessArea}","${f.controlId}","${f.actionStatus}","${f.targetDate}","${f.actionOwner}","${f.condition.replace(/"/g, '""')}","${f.agreedAction.replace(/"/g, '""')}"\n`;
      });
    } else {
      csvContent += "Control ID,Title,Business Process,Key Classification,Nature,Method,Frequency,Status,Design Conclusion,Operating Conclusion\n";
      filteredControls.forEach(c => {
        csvContent += `"${c.id}","${c.title.replace(/"/g, '""')}","${c.businessProcess}","${c.keyClassification}","${c.nature}","${c.method}","${c.frequency}","${c.status}","${c.designConclusion}","${c.operatingConclusion}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Assurance_Report_${activeReportType}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Report exported as CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (No Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Assurance Deliverables & Governance Reports
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">Formal Committee Reporting</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Second-Line Assurance Reporting Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Generate clean, executive-ready assurance reports with scope periods, status definitions, IPE validation statements, and professional limitation notices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector Tabs (No Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveReportType('executive')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
            activeReportType === 'executive'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          1. Executive Assurance Summary
        </button>
        <button
          onClick={() => setActiveReportType('status')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
            activeReportType === 'status'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          2. Engagement Status & Progress
        </button>
        <button
          onClick={() => setActiveReportType('test_results')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
            activeReportType === 'test_results'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          3. Control Test Results & Conclusions
        </button>
        <button
          onClick={() => setActiveReportType('evidence_gaps')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
            activeReportType === 'evidence_gaps'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          4. Evidence Register & IPE Gaps
        </button>
        <button
          onClick={() => setActiveReportType('findings')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
            activeReportType === 'findings'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          5. Findings & Action Plans (4 C's)
        </button>
        <button
          onClick={() => setActiveReportType('overdue')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
            activeReportType === 'overdue'
              ? 'bg-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          6. Overdue Actions Aging Report
        </button>
      </div>

      {/* Formal Printable Document Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md text-slate-800 text-xs space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Institutional Report Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg tracking-tight">
              <Building2 className="w-5 h-5 text-teal-700" />
              <span>{methodology.institutionName}</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Second-Line Risk & Compliance Assurance Directorate
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Governing Charter: {methodology.assuranceCharter}
            </div>
          </div>

          <div className="text-right text-[11px] space-y-1">
            <div className="font-mono font-bold text-slate-900">
              REPORT DATE: {new Date().toISOString().slice(0, 10)}
            </div>
            <div className="text-slate-500">
              Reporting Cycle: <strong className="text-slate-800">{activeEngagement?.period || 'Q3 2026'}</strong>
            </div>
            <div className="text-slate-500">
              Assurance Lead: <strong className="text-slate-800">{currentUser.name}</strong>
            </div>
            <div className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold text-[10px] border border-slate-200">
              CONFIDENTIAL - FOR INTERNAL GOVERNANCE ONLY
            </div>
          </div>
        </div>

        {/* Report 1: Executive Summary */}
        {activeReportType === 'executive' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Executive Assurance Summary: Internal Control Environment
              </h2>
              <p className="text-slate-600 mt-1 leading-relaxed">
                This memorandum provides independent second-line assurance over the design and operating effectiveness of key internal controls governing wholesale payments, financial reporting, and privileged IT systems for the period ending {activeEngagement?.endDate || '2026-09-30'}.
              </p>
            </div>

            {/* High-Level Scorecard */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-slate-900 font-mono">{filteredControls.length}</div>
                <div className="text-[10px] uppercase font-semibold text-slate-500 mt-0.5">Controls Scoped</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-800 font-mono">{effectiveCount}</div>
                <div className="text-[10px] uppercase font-semibold text-emerald-700 mt-0.5">Tested Effective</div>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                <div className="text-2xl font-bold text-rose-800 font-mono">{ineffectiveCount}</div>
                <div className="text-[10px] uppercase font-semibold text-rose-700 mt-0.5">Deficiencies Noted</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-800 font-mono">{inProgressCount}</div>
                <div className="text-[10px] uppercase font-semibold text-blue-700 mt-0.5">Testing in Progress</div>
              </div>
            </div>

            {/* Key Assurance Conclusions */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Key Findings Requiring Committee Attention
              </h3>
              <div className="space-y-2.5">
                {findings.filter(f => f.actionStatus !== 'Closed').map((f) => (
                  <div key={f.id} className="p-3 rounded-lg border border-slate-200 bg-white space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{f.id}</span>
                        <span className="font-bold text-slate-800">{f.title}</span>
                      </div>
                      <Badge variant={f.riskRating} size="sm">{f.riskRating} Severity</Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      <strong>Impact Summary:</strong> {f.impact}
                    </p>
                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                      <span>Owner: <strong>{f.actionOwner}</strong></span>
                      <span className="font-mono">Target Date: <strong>{f.targetDate}</strong></span>
                      <span>Status: <strong className="text-amber-700">{f.actionStatus}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Report 2: Engagement Status */}
        {activeReportType === 'status' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Testing Engagement Status & Delivery Milestones
              </h2>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Overview of planned versus executed assurance engagements across banking lines of business.
              </p>
            </div>

            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 border border-slate-200">Engagement ID</th>
                  <th className="p-2.5 border border-slate-200">Title & Domain</th>
                  <th className="p-2.5 border border-slate-200">Lead Tester</th>
                  <th className="p-2.5 border border-slate-200">Period</th>
                  <th className="p-2.5 border border-slate-200 text-center">Progress</th>
                  <th className="p-2.5 border border-slate-200 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {engagements.map((eng) => (
                  <tr key={eng.id}>
                    <td className="p-2.5 font-mono font-bold text-teal-700 border border-slate-200">{eng.id}</td>
                    <td className="p-2.5 border border-slate-200">
                      <div className="font-semibold text-slate-900">{eng.name}</div>
                      <div className="text-[11px] text-slate-500">{eng.scopeDescription}</div>
                    </td>
                    <td className="p-2.5 border border-slate-200">{eng.leadTester}</td>
                    <td className="p-2.5 font-mono border border-slate-200">{eng.startDate} to {eng.endDate}</td>
                    <td className="p-2.5 text-center font-mono font-bold border border-slate-200">{eng.completionRate}%</td>
                    <td className="p-2.5 text-center border border-slate-200">
                      <Badge variant={eng.status} size="sm">{eng.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report 3: Detailed Control Test Results */}
        {activeReportType === 'test_results' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Detailed Internal Control Test Results & Conclusions
              </h2>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Design and operating effectiveness determination log for all evaluated key controls.
              </p>
            </div>

            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 border border-slate-200">Control ID</th>
                  <th className="p-2.5 border border-slate-200">Control Title & Process</th>
                  <th className="p-2.5 border border-slate-200">Type / Method</th>
                  <th className="p-2.5 border border-slate-200">Frequency</th>
                  <th className="p-2.5 border border-slate-200 text-center">Design Conclusion</th>
                  <th className="p-2.5 border border-slate-200 text-center">Operating Conclusion</th>
                  <th className="p-2.5 border border-slate-200 text-center">Overall</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredControls.map((ctrl) => (
                  <tr key={ctrl.id}>
                    <td className="p-2.5 font-mono font-bold text-teal-700 border border-slate-200">{ctrl.id}</td>
                    <td className="p-2.5 border border-slate-200">
                      <div className="font-semibold text-slate-900">{ctrl.title}</div>
                      <div className="text-[10px] text-slate-500">{ctrl.businessProcess} › {ctrl.subProcess}</div>
                    </td>
                    <td className="p-2.5 border border-slate-200">{ctrl.nature} / {ctrl.method}</td>
                    <td className="p-2.5 border border-slate-200">{ctrl.frequency}</td>
                    <td className="p-2.5 text-center border border-slate-200">
                      <span className={`px-1.5 py-0.5 rounded font-mono ${
                        ctrl.designConclusion === 'Effective' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100'
                      }`}>
                        {ctrl.designConclusion}
                      </span>
                    </td>
                    <td className="p-2.5 text-center border border-slate-200">
                      <span className={`px-1.5 py-0.5 rounded font-mono ${
                        ctrl.operatingConclusion === 'Effective' ? 'bg-emerald-50 text-emerald-700' : ctrl.operatingConclusion === 'Ineffective' ? 'bg-rose-50 text-rose-700 font-bold' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {ctrl.operatingConclusion}
                      </span>
                    </td>
                    <td className="p-2.5 text-center border border-slate-200">
                      <Badge variant={ctrl.status} size="sm">{ctrl.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report 4: Evidence Gaps */}
        {activeReportType === 'evidence_gaps' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Evidence Register & Outstanding IPE Documentation Requests
              </h2>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Log of requested audit documentation, completeness reconciliations, and overdue workpapers.
              </p>
            </div>

            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 border border-slate-200">Evidence ID</th>
                  <th className="p-2.5 border border-slate-200">Artifact Description</th>
                  <th className="p-2.5 border border-slate-200">Control</th>
                  <th className="p-2.5 border border-slate-200">Requested From</th>
                  <th className="p-2.5 border border-slate-200">Status</th>
                  <th className="p-2.5 border border-slate-200">Reliability / Gap Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredEvidence.map((ev) => (
                  <tr key={ev.id}>
                    <td className="p-2.5 font-mono font-bold text-teal-700 border border-slate-200">{ev.id}</td>
                    <td className="p-2.5 border border-slate-200 font-medium">{ev.name}</td>
                    <td className="p-2.5 font-mono border border-slate-200">{ev.controlId}</td>
                    <td className="p-2.5 border border-slate-200">{ev.requestedFrom}</td>
                    <td className="p-2.5 border border-slate-200">
                      <Badge variant={ev.reviewStatus} size="sm">{ev.reviewStatus}</Badge>
                    </td>
                    <td className="p-2.5 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                      {ev.reliabilityNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Report 5: Findings & Action Plans (4 C's) */}
        {activeReportType === 'findings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Comprehensive Findings & Corrective Action Plans (4 C's Format)
              </h2>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Condition, Criteria, Cause, and Impact analysis with agreed management actions and validation criteria.
              </p>
            </div>

            <div className="space-y-4">
              {filteredFindings.map((f) => (
                <div key={f.id} className="p-4 border border-slate-300 rounded-lg space-y-3 print-break-inside-avoid">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{f.id}</span>
                      <span className="font-bold text-slate-900">{f.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={f.riskRating} size="sm">{f.riskRating} Risk</Badge>
                      <Badge variant={f.actionStatus} size="sm">{f.actionStatus}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <strong className="text-slate-800 block text-[10px] uppercase">Condition (Observed Fact):</strong>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{f.condition}</p>
                    </div>
                    <div>
                      <strong className="text-slate-800 block text-[10px] uppercase">Criteria (Policy / Requirement):</strong>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{f.criteria}</p>
                    </div>
                    <div>
                      <strong className="text-slate-800 block text-[10px] uppercase">Cause (Root Cause):</strong>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{f.cause}</p>
                    </div>
                    <div>
                      <strong className="text-slate-800 block text-[10px] uppercase">Impact (Exposure):</strong>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{f.impact}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 bg-slate-50 p-2.5 rounded text-[11px]">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Action Owner: <strong>{f.actionOwner}</strong></span>
                      <span className="font-mono">Target Date: <strong>{f.targetDate}</strong></span>
                    </div>
                    <div className="mt-1">
                      <strong className="text-slate-800">Agreed Action Steps:</strong>
                      <p className="text-slate-700 whitespace-pre-line mt-0.5">{f.agreedAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Report 6: Overdue Actions */}
        {activeReportType === 'overdue' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Overdue Actions Aging & Escalation Report
              </h2>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Remediation actions past their target implementation date, escalated for committee governance review.
              </p>
            </div>

            {overdueFindings.length > 0 ? (
              <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                <thead className="bg-rose-50 text-rose-900 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5 border border-slate-200">Finding ID</th>
                    <th className="p-2.5 border border-slate-200">Finding Title</th>
                    <th className="p-2.5 border border-slate-200">Severity</th>
                    <th className="p-2.5 border border-slate-200">Action Owner</th>
                    <th className="p-2.5 border border-slate-200">Original Target</th>
                    <th className="p-2.5 border border-slate-200 text-center">Days Overdue</th>
                    <th className="p-2.5 border border-slate-200">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {overdueFindings.map((f) => (
                    <tr key={f.id} className="bg-rose-50/20">
                      <td className="p-2.5 font-mono font-bold text-slate-900 border border-slate-200">{f.id}</td>
                      <td className="p-2.5 border border-slate-200 font-medium">{f.title}</td>
                      <td className="p-2.5 border border-slate-200">
                        <Badge variant={f.riskRating} size="sm">{f.riskRating}</Badge>
                      </td>
                      <td className="p-2.5 border border-slate-200">{f.actionOwner}</td>
                      <td className="p-2.5 font-mono border border-slate-200">{f.targetDate}</td>
                      <td className="p-2.5 text-center font-bold font-mono text-rose-700 border border-slate-200">
                        {f.daysOverdue} Days
                      </td>
                      <td className="p-2.5 border border-slate-200">
                        <Badge variant="Overdue" size="sm">Overdue</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200 text-center text-emerald-800 font-medium">
                No overdue actions across currently scoped engagements.
              </div>
            )}
          </div>
        )}

        {/* Official Assurance Sign-Off Lines & Limitation Notice */}
        <div className="pt-6 border-t border-slate-300 space-y-4 print-break-inside-avoid">
          <div className="grid grid-cols-2 gap-8 text-[11px]">
            <div>
              <div className="text-slate-500 uppercase font-semibold text-[10px]">Prepared & Tested By:</div>
              <div className="mt-4 border-b border-slate-400 pb-1 font-semibold text-slate-800">
                {currentUser.name}
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5">{currentUser.role}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase font-semibold text-[10px]">Reviewed & Approved By:</div>
              <div className="mt-4 border-b border-slate-400 pb-1 font-semibold text-slate-800">
                Marcus Vance, Director of 2LoD Assurance
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5">Assurance Practice Director</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-[10px] text-slate-500 leading-relaxed">
            <strong>ASSURANCE LIMITATIONS & GOVERNANCE NOTICE:</strong> {methodology.governanceNotice} Second-line testing evaluations are conducted on a sample basis and do not substitute for First-Line operational controls or Third-Line Internal Audit independence.
          </div>
        </div>
      </div>
    </div>
  );
}

