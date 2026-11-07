import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ENGAGEMENTS,
  INITIAL_PROCESSES,
  INITIAL_RISKS,
  INITIAL_CONTROLS,
  INITIAL_TEST_PLANS,
  INITIAL_EVIDENCE,
  INITIAL_FINDINGS,
  INITIAL_SAMPLE_ITEMS,
  INITIAL_METHODOLOGY,
  INITIAL_ACTIVITY_LOG
} from '../data/mockData';

const WorkspaceContext = createContext(null);

const STORAGE_KEY = 'horizon_assurance_workspace_v1';

export function WorkspaceProvider({ children }) {
  // Load state from localStorage or initialize with mockData
  const [engagements, setEngagements] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_engagements`);
      return saved ? JSON.parse(saved) : INITIAL_ENGAGEMENTS;
    } catch (e) {
      return INITIAL_ENGAGEMENTS;
    }
  });

  const [processes, setProcesses] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_processes`);
      return saved ? JSON.parse(saved) : INITIAL_PROCESSES;
    } catch (e) {
      return INITIAL_PROCESSES;
    }
  });

  const [risks, setRisks] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_risks`);
      return saved ? JSON.parse(saved) : INITIAL_RISKS;
    } catch (e) {
      return INITIAL_RISKS;
    }
  });

  const [controls, setControls] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_controls`);
      return saved ? JSON.parse(saved) : INITIAL_CONTROLS;
    } catch (e) {
      return INITIAL_CONTROLS;
    }
  });

  const [testPlans, setTestPlans] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_testPlans`);
      return saved ? JSON.parse(saved) : INITIAL_TEST_PLANS;
    } catch (e) {
      return INITIAL_TEST_PLANS;
    }
  });

  const [sampleItems, setSampleItems] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sampleItems`);
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ITEMS;
    } catch (e) {
      return INITIAL_SAMPLE_ITEMS;
    }
  });

  const [evidence, setEvidence] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_evidence`);
      return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
    } catch (e) {
      return INITIAL_EVIDENCE;
    }
  });

  const [findings, setFindings] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_findings`);
      return saved ? JSON.parse(saved) : INITIAL_FINDINGS;
    } catch (e) {
      return INITIAL_FINDINGS;
    }
  });

  const [activityLog, setActivityLog] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activityLog`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOG;
    } catch (e) {
      return INITIAL_ACTIVITY_LOG;
    }
  });

  const [methodology, setMethodology] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_methodology`);
      return saved ? JSON.parse(saved) : INITIAL_METHODOLOGY;
    } catch (e) {
      return INITIAL_METHODOLOGY;
    }
  });

  // Global Context & Filters
  const [selectedEngagementId, setSelectedEngagementId] = useState('ALL');
  const [businessAreaFilter, setBusinessAreaFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_theme`) || 'sapphire';
    } catch (e) {
      return 'sapphire';
    }
  });
  const [toasts, setToasts] = useState([]);

  // Active User Persona
  const [currentUser, setCurrentUser] = useState({
    name: 'Sarah Jenkins, CISA',
    role: 'Senior 2LoD Assurance Lead',
    email: 's.jenkins@horizonbancorp.internal',
    initials: 'SJ'
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_engagements`, JSON.stringify(engagements));
      localStorage.setItem(`${STORAGE_KEY}_processes`, JSON.stringify(processes));
      localStorage.setItem(`${STORAGE_KEY}_risks`, JSON.stringify(risks));
      localStorage.setItem(`${STORAGE_KEY}_controls`, JSON.stringify(controls));
      localStorage.setItem(`${STORAGE_KEY}_testPlans`, JSON.stringify(testPlans));
      localStorage.setItem(`${STORAGE_KEY}_sampleItems`, JSON.stringify(sampleItems));
      localStorage.setItem(`${STORAGE_KEY}_evidence`, JSON.stringify(evidence));
      localStorage.setItem(`${STORAGE_KEY}_findings`, JSON.stringify(findings));
      localStorage.setItem(`${STORAGE_KEY}_activityLog`, JSON.stringify(activityLog));
      localStorage.setItem(`${STORAGE_KEY}_methodology`, JSON.stringify(methodology));
      localStorage.setItem(`${STORAGE_KEY}_theme`, currentTheme);
    } catch (e) {
      console.error('LocalStorage sync error:', e);
    }
  }, [engagements, processes, risks, controls, testPlans, sampleItems, evidence, findings, activityLog, methodology, currentTheme]);

  // Toast feedback helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add activity log entry
  const logActivity = (actionText) => {
    const newEntry = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: currentUser.name,
      action: actionText
    };
    setActivityLog((prev) => [newEntry, ...prev.slice(0, 49)]);
  };

  // Reset to default sample data
  const resetToSampleData = () => {
    setEngagements(INITIAL_ENGAGEMENTS);
    setProcesses(INITIAL_PROCESSES);
    setRisks(INITIAL_RISKS);
    setControls(INITIAL_CONTROLS);
    setTestPlans(INITIAL_TEST_PLANS);
    setSampleItems(INITIAL_SAMPLE_ITEMS);
    setEvidence(INITIAL_EVIDENCE);
    setFindings(INITIAL_FINDINGS);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setMethodology(INITIAL_METHODOLOGY);
    setSelectedEngagementId('ALL');
    setBusinessAreaFilter('ALL');
    localStorage.clear();
    showToast('Workspace reset to baseline sample data.', 'info');
    logActivity('Reset all workspace records to institutional sample baseline.');
  };

  // CRUD for Controls
  const addControl = (newControl) => {
    setControls((prev) => [newControl, ...prev]);
    logActivity(`Created control record: ${newControl.id} - ${newControl.title}`);
    showToast(`Control ${newControl.id} created successfully.`);
  };

  const updateControl = (id, updatedFields) => {
    setControls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    logActivity(`Updated control ${id} attributes.`);
    showToast(`Control ${id} updated.`);
  };

  // CRUD for Test Plans
  const addTestPlan = (newPlan) => {
    setTestPlans((prev) => [newPlan, ...prev]);
    logActivity(`Created test plan ${newPlan.id} for control ${newPlan.controlId}`);
    showToast(`Test Plan ${newPlan.id} created.`);
  };

  const updateTestPlan = (id, updatedFields) => {
    setTestPlans((prev) =>
      prev.map((tp) => (tp.id === id ? { ...tp, ...updatedFields } : tp))
    );
    logActivity(`Updated test plan ${id}.`);
    showToast(`Test Plan ${id} updated.`);
  };

  // CRUD for Evidence
  const addEvidence = (newEvidence) => {
    setEvidence((prev) => [newEvidence, ...prev]);
    logActivity(`Registered evidence ${newEvidence.id} - ${newEvidence.name}`);
    showToast(`Evidence ${newEvidence.id} registered.`);
  };

  const updateEvidence = (id, updatedFields) => {
    setEvidence((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updatedFields } : ev))
    );
    logActivity(`Updated evidence record ${id}.`);
    showToast(`Evidence ${id} updated.`);
  };

  // CRUD for Findings & Actions
  const addFinding = (newFinding) => {
    setFindings((prev) => [newFinding, ...prev]);
    logActivity(`Raised new finding ${newFinding.id}: ${newFinding.title} [${newFinding.riskRating}]`);
    showToast(`Finding ${newFinding.id} recorded.`);
  };

  const updateFinding = (id, updatedFields) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedFields } : f))
    );
    logActivity(`Updated finding ${id} remediation action.`);
    showToast(`Finding ${id} updated.`);
  };

  // CRUD for Sample Testing Items
  const updateSampleItem = (id, updatedFields) => {
    setSampleItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    logActivity(`Recorded test result for sample item ${id}.`);
    showToast(`Sample item ${id} result recorded.`);
  };

  const addSampleItem = (newSample) => {
    setSampleItems((prev) => [...prev, newSample]);
    logActivity(`Added sample item ${newSample.transactionRef} to test plan.`);
    showToast(`Sample item added.`);
  };

  // Process and Risk helpers
  const addProcess = (proc) => {
    setProcesses((prev) => [...prev, proc]);
    logActivity(`Added business process: ${proc.name}`);
    showToast(`Process added.`);
  };

  const addRisk = (risk) => {
    setRisks((prev) => [...prev, risk]);
    logActivity(`Added risk record: ${risk.id} - ${risk.title}`);
    showToast(`Risk ${risk.id} added.`);
  };

  // Export full workspace state as JSON
  const exportWorkspaceData = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      institution: methodology.institutionName,
      engagements,
      processes,
      risks,
      controls,
      testPlans,
      sampleItems,
      evidence,
      findings,
      activityLog,
      methodology
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Risk_Control_Assurance_Workspace_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported entire workspace state as JSON.');
  };

  // Import workspace state
  const importWorkspaceData = (imported) => {
    try {
      if (imported.controls && imported.testPlans) {
        if (imported.engagements) setEngagements(imported.engagements);
        if (imported.processes) setProcesses(imported.processes);
        if (imported.risks) setRisks(imported.risks);
        if (imported.controls) setControls(imported.controls);
        if (imported.testPlans) setTestPlans(imported.testPlans);
        if (imported.sampleItems) setSampleItems(imported.sampleItems);
        if (imported.evidence) setEvidence(imported.evidence);
        if (imported.findings) setFindings(imported.findings);
        if (imported.activityLog) setActivityLog(imported.activityLog);
        if (imported.methodology) setMethodology(imported.methodology);
        showToast('Workspace backup successfully imported.');
        logActivity('Imported external workspace state.');
      } else {
        showToast('Invalid backup file structure.', 'error');
      }
    } catch (e) {
      showToast('Failed to import backup.', 'error');
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        engagements,
        setEngagements,
        selectedEngagementId,
        setSelectedEngagementId,
        businessAreaFilter,
        setBusinessAreaFilter,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        currentTheme,
        setCurrentTheme,
        processes,
        addProcess,
        risks,
        addRisk,
        controls,
        addControl,
        updateControl,
        testPlans,
        addTestPlan,
        updateTestPlan,
        sampleItems,
        updateSampleItem,
        addSampleItem,
        evidence,
        addEvidence,
        updateEvidence,
        findings,
        addFinding,
        updateFinding,
        activityLog,
        logActivity,
        methodology,
        setMethodology,
        currentUser,
        setCurrentUser,
        toasts,
        showToast,
        removeToast,
        resetToSampleData,
        exportWorkspaceData,
        importWorkspaceData
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
