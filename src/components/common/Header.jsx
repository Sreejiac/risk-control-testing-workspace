import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import {
  Search,
  Globe,
  ChevronDown,
  Shield,
  Palette,
  Check,
  UserCheck,
  Sparkles,
  ExternalLink,
  Layers,
  Building2,
  Menu,
  X
} from 'lucide-react';

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  const {
    activeTab,
    setActiveTab,
    currentTheme,
    setCurrentTheme,
    currentUser,
    setCurrentUser,
    selectedEngagementId,
    setSelectedEngagementId,
    engagements,
    methodology
  } = useWorkspace();

  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const themeOptions = [
    {
      id: 'sapphire',
      name: 'Sapphire & Royal Navy',
      tag: 'Default Financial',
      bgPreview: 'bg-blue-600',
      accent: '#2563eb',
      description: 'Deep midnight navy with vibrant royal blue and ice accents.'
    },
    {
      id: 'teal',
      name: 'Refined Sea-Teal & Obsidian',
      tag: 'Asset Management',
      bgPreview: 'bg-teal-600',
      accent: '#0d9488',
      description: 'Sophisticated dark obsidian with refined executive sea-teal.'
    },
    {
      id: 'violet',
      name: 'Royal Amethyst & Midnight',
      tag: 'Institutional',
      bgPreview: 'bg-purple-600',
      accent: '#7c3aed',
      description: 'Deep midnight violet with royal amethyst and indigo accents.'
    },
    {
      id: 'light',
      name: 'Executive Platinum Light',
      tag: 'Daylight Mode',
      bgPreview: 'bg-slate-300 text-slate-800',
      accent: '#1d4ed8',
      description: 'Crisp high-contrast daylight slate with deep navy typography.'
    }
  ];

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

  const navDropdowns = [
    {
      id: 'products',
      label: 'Products',
      items: [
        { title: 'Governance, Risk, and Compliance (GRC)', desc: 'Enterprise risk, policy, and compliance management' },
        { title: 'Risk & Control Testing Workspace (2LoD)', desc: 'Design walkthroughs, IPE evidence, and sample testing' },
        { title: 'SOX 404 Financial Reporting Key Controls', desc: 'Automated scoping, walkthroughs, and deficiency tracking' },
        { title: 'IT General Controls (ITGC) & Privileged Access', desc: 'PAM recertification, change control, and CISA assurance' }
      ]
    },
    {
      id: 'industries',
      label: 'Industries',
      items: [
        { title: 'Banking & Financial Services', desc: 'Wholesale payments, retail lending, treasury settlement' },
        { title: 'Asset & Wealth Management', desc: 'Investment compliance, fiduciary risk, model governance' },
        { title: 'Insurance & Reinsurance', desc: 'Solvency II, claims adjudication, actuarial controls' },
        { title: 'FinTech & Digital Payments', desc: 'Real-time sanctions screening, AML transaction monitoring' }
      ]
    },
    {
      id: 'learning',
      label: 'Learning',
      items: [
        { title: '2LoD Assurance Testing Charter v4.2', desc: 'Institutional methodology, sampling frequency, IPE standards' },
        { title: 'COSO 2013 & SOX 404 Guide', desc: 'Evaluating design and operating effectiveness' },
        { title: 'The 4 C\'s of Audit Findings', desc: 'Condition, Criteria, Cause, and Impact drafting masterclass' }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      items: [
        { title: 'Assurance Helpdesk & Methodological Guidance', desc: 'Consult second-line testing directors' },
        { title: 'Regulatory Examination Preparation', desc: 'OCC, Federal Reserve, and FINRA examination support' }
      ]
    },
    {
      id: 'partners',
      label: 'Partners',
      items: [
        { title: 'Big 4 Assurance Ecosystem', desc: 'Standardized workpaper integration and external auditor sign-off' },
        { title: 'CyberArk PAM & SailPoint IAM Connectors', desc: 'Automated privileged access population verification' }
      ]
    },
    {
      id: 'company',
      label: 'Company',
      items: [
        { title: 'About Horizon Bancorp Risk & Assurance', desc: 'Second-line independent risk management division' },
        { title: 'Governance & Regulatory Charters', desc: 'Board Risk Committee mandate and oversight' }
      ]
    }
  ];

  // Dynamic theme colors for header button
  const getButtonClass = () => {
    switch (currentTheme) {
      case 'teal':
        return 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold';
      case 'violet':
        return 'bg-purple-600 hover:bg-purple-500 text-white font-bold';
      case 'light':
        return 'bg-blue-600 hover:bg-blue-500 text-white font-bold';
      case 'sapphire':
      default:
        return 'bg-blue-600 hover:bg-blue-500 text-white font-bold';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#000000] text-white border-b border-white/10 select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo + Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Logo with ServiceNow-style lowercase brand mark */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                servicenow
              </span>
              <span className={`inline-block w-2.5 h-2.5 rounded-full ml-1 mb-1 transition-all ${
                currentTheme === 'teal' ? 'bg-teal-400' :
                currentTheme === 'violet' ? 'bg-purple-400' :
                currentTheme === 'light' ? 'bg-blue-600' :
                'bg-blue-400'
              }`} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 border-l border-white/20 pl-2 ml-1 hidden lg:inline">
              GRC
            </span>
          </div>

          {/* Desktop Nav Dropdown Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-white/80">
            {navDropdowns.map((drop) => (
              <div 
                key={drop.id} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(drop.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md hover:text-white hover:bg-white/5 transition text-xs font-semibold ${
                    activeDropdown === drop.id ? 'text-white bg-white/5' : 'text-white/80'
                  }`}
                >
                  <span>{drop.label}</span>
                  <ChevronDown className="w-3 h-3 text-white/50" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === drop.id && (
                  <div className="absolute left-0 mt-1 w-80 bg-slate-950 border border-white/15 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-fadeIn">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 py-1 font-semibold">
                      {drop.label} Capabilities
                    </div>
                    {drop.items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setActiveDropdown(null);
                          if (item.title.includes('Testing Workspace') || item.title.includes('2LoD')) {
                            setActiveTab('dashboard');
                          } else if (item.title.includes('SOX')) {
                            setActiveTab('controls');
                          } else if (item.title.includes('Charter')) {
                            setActiveTab('settings');
                          } else {
                            setActiveTab('overview');
                          }
                        }}
                        className="p-2.5 rounded-lg hover:bg-white/10 transition cursor-pointer text-left"
                      >
                        <div className="font-semibold text-white text-xs">{item.title}</div>
                        <div className="text-[11px] text-white/50 mt-0.5 line-clamp-1">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side Controls: Search, Globe, Theme Switcher, Persona, Action CTA */}
        <div className="flex items-center gap-3">
          {/* Quick Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-white transition"
              title="Change Color Theme"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden md:inline capitalize">{currentTheme} Theme</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>

            {showThemeMenu && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-slate-950 border border-white/20 rounded-xl shadow-2xl p-2 z-50 text-xs"
                onMouseLeave={() => setShowThemeMenu(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-white/50 tracking-wider border-b border-white/10">
                  Select Theme Palette (Requested)
                </div>
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setCurrentTheme(opt.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg flex items-start gap-2.5 transition mt-1 ${
                      currentTheme === opt.id
                        ? 'bg-white/15 text-white ring-1 ring-white/20'
                        : 'hover:bg-white/5 text-white/80'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mt-0.5 shrink-0 ${opt.bgPreview}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{opt.name}</span>
                        {currentTheme === opt.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <div className="text-[10px] text-white/50 mt-0.5">{opt.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Icon */}
          <button 
            onClick={() => setActiveTab('controls')}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
            title="Search Risk & Controls"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Globe / Region */}
          <button 
            className="hidden sm:flex p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
            title="Global Assurance Jurisdiction"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Persona Switcher / Sign In */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="hidden lg:flex items-center gap-1.5 text-xs text-white/80 hover:text-white px-2 py-1 rounded transition"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-[10px]">
                {currentUser.initials}
              </div>
              <span className="font-semibold">{currentUser.name.split(',')[0]}</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-slate-950 border border-white/20 rounded-xl shadow-2xl p-1.5 z-50 text-xs"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-white/50 tracking-wider border-b border-white/10">
                  Active Assurance Persona
                </div>
                {personaOptions.map((persona) => (
                  <button
                    key={persona.email}
                    onClick={() => {
                      setCurrentUser(persona);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition ${
                      currentUser.email === persona.email ? 'bg-white/15 text-white' : 'text-white/80'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-[10px]">
                      {persona.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{persona.name}</div>
                      <div className="text-[10px] text-white/50">{persona.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pill Action Button: "Get Started" / "Launch Workspace" */}
          <button
            onClick={() => setActiveTab(activeTab === 'overview' ? 'dashboard' : 'overview')}
            className={`px-5 py-2 rounded-full text-xs transition shadow-lg ${getButtonClass()}`}
          >
            {activeTab === 'overview' ? 'Launch Workspace' : 'Portal Overview'}
          </button>
        </div>
      </div>
    </header>
  );
}
