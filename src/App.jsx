import React, { useState } from 'react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import Header from './components/common/Header';
import SubNav from './components/common/SubNav';
import Sidebar from './components/common/Sidebar';
import ToastContainer from './components/common/ToastContainer';
import ServiceNowHeroView from './components/overview/ServiceNowHeroView';
import DashboardView from './components/dashboard/DashboardView';
import ProcessesView from './components/processes/ProcessesView';
import ControlsView from './components/controls/ControlsView';
import TestPlansView from './components/testplans/TestPlansView';
import EvidenceView from './components/evidence/EvidenceView';
import FindingsView from './components/findings/FindingsView';
import ReportsView from './components/reports/ReportsView';
import SettingsView from './components/settings/SettingsView';

function WorkspaceContent() {
  const { activeTab, currentTheme } = useWorkspace();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Background styling per theme
  const getAppBg = () => {
    switch (currentTheme) {
      case 'teal':
        return 'bg-[#021317] text-white';
      case 'violet':
        return 'bg-[#080413] text-white';
      case 'light':
        return 'bg-slate-100 text-slate-900';
      case 'sapphire':
      default:
        return 'bg-[#060b14] text-white';
    }
  };

  const isOverview = activeTab === 'overview';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${getAppBg()}`}>
      {/* 1. Global ServiceNow-style Top Navigation */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* 2. Secondary GRC Navigation Bar */}
      <SubNav />

      {/* 3. Main Body */}
      {isOverview ? (
        /* The ServiceNow GRC Hero Showcase View (Requested Image Layout with New Color Themes) */
        <main className="flex-1">
          <ServiceNowHeroView />
        </main>
      ) : (
        /* Assurance Workspaces View (Dashboard, Controls, Test Plans, Evidence, Findings, Reports, Settings) */
        <div className="flex-1 flex overflow-hidden">
          {/* Collapsible Left Navigation Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Dynamic Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'processes' && <ProcessesView />}
            {activeTab === 'controls' && <ControlsView />}
            {activeTab === 'testplans' && <TestPlansView />}
            {activeTab === 'evidence' && <EvidenceView />}
            {activeTab === 'findings' && <FindingsView />}
            {activeTab === 'reports' && <ReportsView />}
            {activeTab === 'settings' && <SettingsView />}

            {/* Institutional Footer */}
            <footer className="mt-12 pt-6 pb-4 border-t border-white/10 text-center text-xs text-white/50 no-print space-y-1">
              <p className="font-medium text-white/70">
                Horizon National Bancorp • Second-Line Risk & Compliance Assurance Directorate
              </p>
              <p className="text-[11px] text-white/40">
                Risk & Control Testing Workspace • Illustrative Fictional Banking Data Only • Subject to 2LoD Testing Charter v4.2
              </p>
            </footer>
          </main>
        </div>
      )}

      {/* Floating Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceContent />
    </WorkspaceProvider>
  );
}
