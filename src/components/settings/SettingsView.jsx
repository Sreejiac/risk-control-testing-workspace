import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Badge from '../common/Badge';
import {
  Settings as SettingsIcon,
  RotateCcw,
  Download,
  Upload,
  ShieldCheck,
  Building2,
  Table,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck
} from 'lucide-react';

export default function SettingsView() {
  const {
    methodology,
    setMethodology,
    resetToSampleData,
    exportWorkspaceData,
    importWorkspaceData,
    currentUser,
    setCurrentUser,
    showToast
  } = useWorkspace();

  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  const personaOptions = [
    {
      name: 'Sarah Jenkins, CISA',
      role: 'Senior 2LoD Assurance Lead',
      email: 's.jenkins@horizonbancorp.internal',
      initials: 'SJ'
    },
    {
      name: 'Marcus Vance, Director 2LoD',
      role: 'Assurance Reviewer / Director',
      email: 'm.vance@horizonbancorp.internal',
      initials: 'MV'
    },
    {
      name: 'Elena Rostova, Head of SOX',
      role: 'Head of Financial Compliance',
      email: 'e.rostova@horizonbancorp.internal',
      initials: 'ER'
    }
  ];

  const handleImportSubmit = () => {
    try {
      const parsed = JSON.parse(importText);
      importWorkspaceData(parsed);
      setShowImportBox(false);
      setImportText('');
    } catch (e) {
      showToast('Invalid JSON file format.', 'error');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importWorkspaceData(parsed);
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Assurance Methodology & Governance
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">Standards, Sampling & Roles</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Methodology Settings & Charter Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Configure institutional testing parameters, sampling frequency matrices, risk severity SLAs, role personas, and workspace persistence options.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline Sample Data</span>
          </button>
        </div>
      </div>

      {/* Grid: Sampling Matrix & Risk Definitions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Approved Testing Sampling Matrix */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">Institutional Sampling Frequency Matrix</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Charter Standard</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-b border-slate-200">Control Frequency</th>
                  <th className="p-2 border-b border-slate-200">Population</th>
                  <th className="p-2 border-b border-slate-200 text-center">Min Sample</th>
                  <th className="p-2 border-b border-slate-200">2LoD Scoping Guideline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {methodology.samplingMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 font-medium text-slate-900">{row.frequency}</td>
                    <td className="p-2 font-mono text-slate-500">{row.populationRange}</td>
                    <td className="p-2 font-mono font-bold text-center text-teal-700">{row.minimumSample}</td>
                    <td className="p-2 text-[11px] text-slate-600">{row.guideline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            <strong>Methodology Note:</strong> Sample sizes are baseline minimums. High-risk controls or controls subject to previous deficiencies may require expanded sample populations based on tester judgment.
          </div>
        </div>

        {/* Risk Rating Severity & SLA Definitions */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">Risk Severity & Remediation SLAs</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Escalation Thresholds</span>
          </div>

          <div className="space-y-2.5">
            {methodology.riskRatings.map((rating) => (
              <div key={rating.level} className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={rating.level} size="sm">{rating.level}</Badge>
                    <span className="font-mono text-[11px] font-bold text-slate-700">Remediation SLA: {rating.slaDays} Days</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {rating.definition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Personas & Data Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* User Persona Switcher */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">Active Assurance User Persona</h2>
            </div>
            <span className="text-[11px] text-slate-400">Simulation Switcher</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Switch between second-line testing roles to experience different sign-off authorities, reviewer workflows, and dashboard scopes.
          </p>

          <div className="space-y-2">
            {personaOptions.map((p) => {
              const isActive = currentUser.email === p.email;
              return (
                <div
                  key={p.email}
                  onClick={() => setCurrentUser(p)}
                  className={`p-3 rounded-lg border transition cursor-pointer text-xs flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500/20 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-300 font-bold flex items-center justify-center text-xs">
                      {p.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.role}</div>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="text-teal-700 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-4 h-4" />
                      Active Role
                    </span>
                  ) : (
                    <button className="text-xs text-slate-600 hover:text-slate-900 font-medium">
                      Select
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace Persistence & Data Backup */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">Workspace Data Management</h2>
            </div>
            <span className="text-[11px] text-slate-400">JSON Workpaper Backup</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            All assurance testing records, evidence entries, and findings are stored locally in browser state. You can export a full JSON backup or restore a previous workpaper state.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={exportWorkspaceData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Export Full Workspace (JSON)</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-slate-600" />
              <span>Restore from File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-[10px] text-slate-500 leading-relaxed">
            <strong>Prototype Security Notice:</strong> This prototype runs locally with illustrative data only. It does not connect to enterprise core banking, General Ledger, or Active Directory systems, and does not store actual employee, customer, or account information.
          </div>
        </div>
      </div>
    </div>
  );
}

