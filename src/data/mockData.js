/**
 * Mock Data for Risk & Control Testing Workspace
 * Illustrative second-line assurance dataset for banking and financial services.
 * All records, names, amounts, and dates are fictional and for demonstration only.
 */

export const INITIAL_ENGAGEMENTS = [
  {
    id: "ENG-2026-001",
    name: "Q3 2026 Wholesale Payments & Wire Transfer Assurance Review",
    businessArea: "Payments & Treasury",
    period: "Q3 2026",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    leadTester: "Sarah Jenkins, CISA",
    reviewer: "Marcus Vance, Director 2LoD",
    status: "In Progress",
    completionRate: 72,
    scopeDescription: "Targeted second-line assurance over high-value wire transfers, automated Fedwire validation, and daily Nostro account reconciliation.",
    milestones: [
      { id: "m1", title: "Walkthroughs & Design Evaluation", dueDate: "2026-08-15", status: "Completed" },
      { id: "m2", title: "IPE Completeness & Accuracy Sign-off", dueDate: "2026-08-25", status: "Completed" },
      { id: "m3", title: "Sample Operating Effectiveness Testing", dueDate: "2026-09-15", status: "In Progress" },
      { id: "m4", title: "Exceptions Review & Management Actions", dueDate: "2026-09-25", status: "Pending" },
      { id: "m5", title: "Draft Assurance Report Issuance", dueDate: "2026-10-05", status: "Pending" }
    ]
  },
  {
    id: "ENG-2026-002",
    name: "2026 SOX 404 Financial Reporting Key Controls Review",
    businessArea: "Finance & Accounting",
    period: "Q3 2026",
    startDate: "2026-06-01",
    endDate: "2026-10-31",
    leadTester: "David Chen, CPA",
    reviewer: "Elena Rostova, Head of SOX",
    status: "In Progress",
    completionRate: 58,
    scopeDescription: "Annual second-line testing of Sarbanes-Oxley 404 key internal controls over financial reporting including manual journal entries and CECL credit loss estimates.",
    milestones: [
      { id: "m6", title: "RCM Scoping & Entity Level Controls", dueDate: "2026-06-30", status: "Completed" },
      { id: "m7", title: "Design Effectiveness Walkthroughs", dueDate: "2026-08-01", status: "Completed" },
      { id: "m8", title: "Interim Operating Effectiveness Testing", dueDate: "2026-09-30", status: "In Progress" },
      { id: "m9", title: "Year-End Rollforward Testing", dueDate: "2026-11-15", status: "Pending" }
    ]
  },
  {
    id: "ENG-2026-003",
    name: "2026 H2 Technology Risk & Privileged Access Control Testing",
    businessArea: "Technology & Cyber",
    period: "H2 2026",
    startDate: "2026-07-15",
    endDate: "2026-10-15",
    leadTester: "Sarah Jenkins, CISA",
    reviewer: "Marcus Vance, Director 2LoD",
    status: "In Progress",
    completionRate: 85,
    scopeDescription: "Evaluation of IT General Controls (ITGC) governing privileged user access recertification, emergency change management, and PAM tooling across core banking systems.",
    milestones: [
      { id: "m10", title: "Privileged User Population Extraction", dueDate: "2026-08-01", status: "Completed" },
      { id: "m11", title: "Quarterly Recertification Testing", dueDate: "2026-08-20", status: "Completed" },
      { id: "m12", title: "Emergency Change Review Sample Testing", dueDate: "2026-09-10", status: "In Progress" },
      { id: "m13", title: "Final IT Assurance Memo", dueDate: "2026-10-10", status: "Pending" }
    ]
  },
  {
    id: "ENG-2026-004",
    name: "2026 Q3 AML Sanctions & Transaction Monitoring QA",
    businessArea: "Financial Crimes Compliance",
    period: "Q3 2026",
    startDate: "2026-08-01",
    endDate: "2026-10-31",
    leadTester: "Priya Nair, CAMS",
    reviewer: "Elena Rostova, Head of SOX",
    status: "Planning",
    completionRate: 20,
    scopeDescription: "Second-line compliance assurance over OFAC real-time sanctions screening filters, alert adjudication timelines, and 30-day SAR filing QA checkpoints.",
    milestones: [
      { id: "m14", title: "Sanctions Filter Logic Scoping", dueDate: "2026-08-25", status: "Completed" },
      { id: "m15", title: "Adjudication Sample Selection", dueDate: "2026-09-15", status: "Pending" },
      { id: "m16", title: "QA Testing Execution", dueDate: "2026-10-10", status: "Pending" }
    ]
  }
];

export const INITIAL_PROCESSES = [
  {
    id: "PRC-001",
    businessArea: "Payments & Treasury",
    name: "Wholesale Wire Transfers & Settlement",
    owner: "Treasury Operations - VP Operations",
    subProcesses: [
      {
        id: "SUB-001-A",
        name: "High-Value Outgoing Fedwire Release",
        description: "Initiation, dual verification, and automated transmission of wires >= $250,000 via Fedline Direct.",
        risks: ["RSK-PMT-01", "RSK-PMT-02"]
      },
      {
        id: "SUB-001-B",
        name: "Nostro / Vostro Clearing Reconciliations",
        description: "Daily automated matching of bank clearing accounts with Federal Reserve and correspondent bank statements.",
        risks: ["RSK-PMT-03"]
      }
    ]
  },
  {
    id: "PRC-002",
    businessArea: "Finance & Accounting",
    name: "Financial Close & General Ledger Integrity",
    owner: "Corporate Controller",
    subProcesses: [
      {
        id: "SUB-002-A",
        name: "Manual Journal Entry Processing",
        description: "Creation, documentation, and supervisory approval of non-standard and top-side journal entries in ERP.",
        risks: ["RSK-FIN-01"]
      },
      {
        id: "SUB-002-B",
        name: "Credit Loss Reserve Modeling (CECL)",
        description: "Quarterly calculation, macroeconomic scenario weighting, and executive governance over allowance for credit losses.",
        risks: ["RSK-FIN-02"]
      }
    ]
  },
  {
    id: "PRC-003",
    businessArea: "Technology & Cyber",
    name: "Identity & Access Management (ITGC)",
    owner: "Chief Information Security Officer (CISO)",
    subProcesses: [
      {
        id: "SUB-003-A",
        name: "Privileged Access Management (PAM)",
        description: "Administration of Domain Admin, database DBA, and root credentials with quarterly recertification.",
        risks: ["RSK-IT-01", "RSK-IT-02"]
      },
      {
        id: "SUB-003-B",
        name: "Production Change Management",
        description: "Change Advisory Board approval, automated code scanning, and segregation of duties between developer and production deployment.",
        risks: ["RSK-IT-03"]
      }
    ]
  },
  {
    id: "PRC-004",
    businessArea: "Financial Crimes Compliance",
    name: "Sanctions & AML Transaction Surveillance",
    owner: "Chief Compliance Officer",
    subProcesses: [
      {
        id: "SUB-004-A",
        name: "Real-time Sanctions / OFAC Screening",
        description: "Automated fuzzy-logic interception of wire payments against OFAC SDN and global sanction lists.",
        risks: ["RSK-AML-01"]
      },
      {
        id: "SUB-004-B",
        name: "Suspicious Activity Report (SAR) Adjudication",
        description: "Investigation of automated alerts, case management, and timely filing of SARs within 30 days of detection.",
        risks: ["RSK-AML-02"]
      }
    ]
  },
  {
    id: "PRC-005",
    businessArea: "Commercial Lending",
    name: "Commercial Credit Underwriting & Exception Approval",
    owner: "Chief Credit Officer",
    subProcesses: [
      {
        id: "SUB-005-A",
        name: "Credit Committee Approval & Limit Overrides",
        description: "Dual sign-off and risk-rating committee approval for commercial loan facilities exceeding standard credit policy limits.",
        risks: ["RSK-CRD-01"]
      }
    ]
  }
];

export const INITIAL_RISKS = [
  {
    id: "RSK-PMT-01",
    processId: "PRC-001",
    subProcessId: "SUB-001-A",
    title: "Unauthorized or Fraudulent High-Value Wire Release",
    category: "Operational / Fraud",
    inherentRating: "High",
    residualRating: "Medium",
    statement: "Risk that a high-value outgoing payment is executed without proper dual authorization, resulting in financial loss, liquidity strain, or reputational damage.",
    linkedControls: ["CTL-PMT-001"]
  },
  {
    id: "RSK-PMT-02",
    processId: "PRC-001",
    subProcessId: "SUB-001-A",
    title: "Wire Transmission System Glitch or Interruption",
    category: "Technology / Resilience",
    inherentRating: "Medium",
    residualRating: "Low",
    statement: "Risk that automated interface between payment engine and Fedwire gateway drops transactions or generates duplicate processing.",
    linkedControls: ["CTL-PMT-004"]
  },
  {
    id: "RSK-PMT-03",
    processId: "PRC-001",
    subProcessId: "SUB-001-B",
    title: "Unreconciled Nostro Balance or Unidentified Clearing Break",
    category: "Financial / Operational",
    inherentRating: "High",
    residualRating: "Low",
    statement: "Risk that ledger balances diverge from central bank correspondent records without timely detection, leading to misstated cash reserves.",
    linkedControls: ["CTL-PMT-002"]
  },
  {
    id: "RSK-FIN-01",
    processId: "PRC-002",
    subProcessId: "SUB-002-A",
    title: "Management Override via Manual Journal Entries",
    category: "Financial Reporting (SOX)",
    inherentRating: "High",
    residualRating: "Low",
    statement: "Risk of intentional or erroneous manual journal entries posted without independent supervisory review, causing material misstatement in financial statements.",
    linkedControls: ["CTL-FIN-001"]
  },
  {
    id: "RSK-FIN-02",
    processId: "PRC-002",
    subProcessId: "SUB-002-B",
    title: "CECL Model Parameter Inaccuracy or Unauthorized Override",
    category: "Model Risk / Reporting",
    inherentRating: "High",
    residualRating: "Medium",
    statement: "Risk that allowance for credit losses incorporates unvalidated economic forecast weights, leading to under-reserved loan impairment balances.",
    linkedControls: ["CTL-FIN-002"]
  },
  {
    id: "RSK-IT-01",
    processId: "PRC-003",
    subProcessId: "SUB-003-A",
    title: "Excessive or Inappropriate Privileged System Access",
    category: "Technology / Cyber (ITGC)",
    inherentRating: "High",
    residualRating: "Medium",
    statement: "Risk that terminated employees, contractors, or unauthorized staff retain domain administrator or database DBA privileges without timely recertification.",
    linkedControls: ["CTL-ITGC-001"]
  },
  {
    id: "RSK-IT-02",
    processId: "PRC-003",
    subProcessId: "SUB-003-A",
    title: "Unapproved Emergency Production Changes",
    category: "Technology / ITGC",
    inherentRating: "High",
    residualRating: "Medium",
    statement: "Risk that urgent code patches are promoted directly to production core banking databases without independent post-implementation review.",
    linkedControls: ["CTL-ITGC-002"]
  },
  {
    id: "RSK-AML-01",
    processId: "PRC-004",
    subProcessId: "SUB-004-A",
    title: "Failure to Block OFAC Sanctioned Entity Wire Transfer",
    category: "Regulatory / Compliance",
    inherentRating: "Critical",
    residualRating: "Low",
    statement: "Risk that an outgoing or incoming payment involving a Specially Designated National (SDN) is not intercepted, resulting in severe regulatory fines and enforcement actions.",
    linkedControls: ["CTL-AML-001"]
  },
  {
    id: "RSK-CRD-01",
    processId: "PRC-005",
    subProcessId: "SUB-005-A",
    title: "Unauthorized Credit Limit Override or Policy Exception",
    category: "Credit Risk",
    inherentRating: "High",
    residualRating: "Medium",
    statement: "Risk that commercial loans exceeding loan officer delegated authority limits are booked without Credit Committee approval.",
    linkedControls: ["CTL-CRD-001"]
  }
];

export const INITIAL_CONTROLS = [
  {
    id: "CTL-PMT-001",
    title: "Dual Authorization of High-Value Wire Transfers (>= $250k)",
    businessProcess: "Payments & Treasury",
    subProcess: "High-Value Outgoing Fedwire Release",
    riskAddressed: "RSK-PMT-01 (Unauthorized High-Value Wire Release)",
    controlObjective: "Ensure all outgoing wire transfers equal to or exceeding $250,000 are independently verified and authorized by two authorized signers prior to release.",
    description: "The Enterprise Payment Engine enforces an automated rule requiring two distinct user credentials with designated Tier-2 or Tier-3 wire release authority. The initiator cannot act as approver. Cryptographic hardware tokens and timestamped audit logs are recorded.",
    controlOwner: "Robert Martinez (Director of Treasury Operations)",
    assignedReviewer: "Sarah Jenkins, CISA",
    frequency: "Daily / Event-Driven",
    nature: "Preventive",
    method: "Automated & ITDM",
    keyClassification: "Key Control",
    frameworks: ["SOX 404 Key Control", "FFIEC Payments Booklet", "Fedwire Security Compliance"],
    lastTestedDate: "2026-05-18",
    nextReviewDate: "2026-09-30",
    status: "Under Testing",
    designConclusion: "Effective",
    operatingConclusion: "Testing in Progress",
    notes: "Design verified via walkthrough with Wire Room Manager. Sample testing of 40 transactions underway."
  },
  {
    id: "CTL-PMT-002",
    title: "Daily Nostro & Federal Reserve Account Reconciliation",
    businessProcess: "Payments & Treasury",
    subProcess: "Nostro / Vostro Clearing Reconciliations",
    riskAddressed: "RSK-PMT-03 (Unreconciled Nostro Balance)",
    controlObjective: "Ensure all clearing transactions between internal general ledger accounts and Federal Reserve statements are reconciled daily with aged breaks investigated.",
    description: "Daily automated matching is performed via ReconPlus system by 09:00 EST. Reconciling breaks exceeding $50,000 or aged >3 business days must be documented with an assigned investigation ticket and signed off by Treasury Controller.",
    controlOwner: "Amanda Thorne (Treasury Accounting Manager)",
    assignedReviewer: "David Chen, CPA",
    frequency: "Daily",
    nature: "Detective",
    method: "IT-Dependent Manual",
    keyClassification: "Key Control",
    frameworks: ["SOX 404 Key Control", "BCBS 239 Data Aggregation"],
    lastTestedDate: "2026-04-12",
    nextReviewDate: "2026-09-28",
    status: "Tested - Effective",
    designConclusion: "Effective",
    operatingConclusion: "Effective",
    notes: "Tested 25 daily reconciliations across Q2 and Q3. All breaks aged >3 days had documented resolution tickets."
  },
  {
    id: "CTL-ITGC-001",
    title: "Quarterly Privileged Access Review & Recertification",
    businessProcess: "Technology & Cyber",
    subProcess: "Privileged Access Management (PAM)",
    riskAddressed: "RSK-IT-01 (Excessive Privileged System Access)",
    controlObjective: "Ensure all active Domain Admin, DBA, and root privileged accounts in Core Banking are recertified quarterly by business application owners and revoked within 24 hours if unneeded.",
    description: "Identity Governance platform automatically exports active privileged accounts on the 1st of each quarter. Application owners must approve or revoke access within 10 business days. Revocation requests trigger automated ticketing to Identity Operations.",
    controlOwner: "Kevin Zhao (Identity & Access Operations Lead)",
    assignedReviewer: "Sarah Jenkins, CISA",
    frequency: "Quarterly",
    nature: "Detective",
    method: "Manual / IT-Dependent",
    keyClassification: "Key Control",
    frameworks: ["SOX 404 ITGC", "FFIEC IT Handbook - InfoSec", "NIST SP 800-53 AC-2"],
    lastTestedDate: "2026-04-30",
    nextReviewDate: "2026-08-31",
    status: "Tested - Ineffective",
    designConclusion: "Effective",
    operatingConclusion: "Ineffective",
    notes: "Exception identified: 3 contractor accounts with Active Directory Domain Admin rights remained active 14 days after project completion without manager recertification. Finding FND-2026-001 logged."
  },
  {
    id: "CTL-ITGC-002",
    title: "Emergency Production Change Dual Approval & Post-Release Validation",
    businessProcess: "Technology & Cyber",
    subProcess: "Production Change Management",
    riskAddressed: "RSK-IT-02 (Unapproved Emergency Changes)",
    controlObjective: "Ensure all out-of-cycle emergency production system changes receive retrospective review and manager sign-off within 48 hours of deployment.",
    description: "Emergency changes executed outside standard CAB cycles require Incident Commander authorization prior to deployment, followed by documented post-implementation verification and IT Quality sign-off within two business days.",
    controlOwner: "Priya Sharma (IT Change Advisory Chair)",
    assignedReviewer: "Sarah Jenkins, CISA",
    frequency: "Event-Driven",
    nature: "Detective",
    method: "IT-Dependent Manual",
    keyClassification: "Key Control",
    frameworks: ["SOX 404 ITGC", "CISA Standard 300 - IT Governance"],
    lastTestedDate: "2026-05-10",
    nextReviewDate: "2026-09-15",
    status: "Under Testing",
    designConclusion: "Effective",
    operatingConclusion: "Testing in Progress",
    notes: "Design walkthrough verified. Sample testing of 15 emergency changes currently in progress."
  },
  {
    id: "CTL-FIN-001",
    title: "Non-Standard Manual Journal Entry Supervisory Review & Approval",
    businessProcess: "Finance & Accounting",
    subProcess: "Manual Journal Entry Processing",
    riskAddressed: "RSK-FIN-01 (Management Override via Journal Entries)",
    controlObjective: "Ensure all manual journal entries exceeding $100,000 are supported by business rationale, adequate documentation, and secondary approval by Accounting Director before posting.",
    description: "ERP system requires a secondary electronic signature for all manual journal entries >= $100,000. System blocks the posting user from self-approving. Attachments supporting calculation must be uploaded to the ledger document header.",
    controlOwner: "Karen Miller (Assistant Controller)",
    assignedReviewer: "David Chen, CPA",
    frequency: "Monthly",
    nature: "Preventive",
    method: "Automated & ITDM",
    keyClassification: "Key Control",
    frameworks: ["SOX 404 Key Control - Balance Sheet Integrity", "COSO Internal Control - Principle 10"],
    lastTestedDate: "2026-06-15",
    nextReviewDate: "2026-10-15",
    status: "Under Testing",
    designConclusion: "Effective",
    operatingConclusion: "Testing in Progress",
    notes: "Walkthrough completed. Population completeness verified against GL Transaction Audit Trail. Testing 25 sample journal entries."
  },
  {
    id: "CTL-FIN-002",
    title: "CECL Macroeconomic Scenario Weighting & Executive Governance Sign-Off",
    businessProcess: "Finance & Accounting",
    subProcess: "Credit Loss Reserve Modeling (CECL)",
    riskAddressed: "RSK-FIN-02 (CECL Parameter Inaccuracy)",
    controlObjective: "Ensure macroeconomic probability weightings (Baseline, Adverse, Severe) applied in CECL allowance calculation are formally reviewed and approved by the Asset-Liability Committee (ALCO).",
    description: "Quarterly CECL sensitivity models and economic scenario weightings are prepared by Quantitative Risk, reviewed by Model Governance, and formally signed off in ALCO minutes prior to financial statement recording.",
    controlOwner: "Marcus Vance (Director of Financial Risk)",
    assignedReviewer: "Elena Rostova, Head of SOX",
    frequency: "Quarterly",
    nature: "Preventive",
    method: "Manual",
    keyClassification: "Key Control",
    frameworks: ["SOX 404 Key Control", "OCC Bulletin 2011-12 / SR 11-7 Model Risk"],
    lastTestedDate: "2026-06-30",
    nextReviewDate: "2026-09-30",
    status: "Tested - Effective",
    designConclusion: "Effective",
    operatingConclusion: "Effective",
    notes: "Q1 and Q2 ALCO committee minutes and model input sign-offs inspected. Methodology alignment confirmed."
  },
  {
    id: "CTL-AML-001",
    title: "Real-Time OFAC Sanctions Screening & False Positive Adjudication",
    businessProcess: "Financial Crimes Compliance",
    subProcess: "Real-time Sanctions / OFAC Screening",
    riskAddressed: "RSK-AML-01 (OFAC Sanctioned Entity Wire Transfer)",
    controlObjective: "Ensure all domestic and international payment instructions are screened against updated OFAC SDN and PEP lists, with potential matches halted immediately until reviewed by Sanctions Operations.",
    description: "Filtering engine operates inline on payment messages. Any score >= 85% stops message dispatch. Sanctions Analyst must document verification of government ID, passport, or beneficial owner before release. Releases >$500k require Compliance Officer secondary sign-off.",
    controlOwner: "Tariq Al-Mansoor (VP Sanctions Compliance)",
    assignedReviewer: "Priya Nair, CAMS",
    frequency: "Per Occurrence / Continuous",
    nature: "Preventive",
    method: "Automated & ITDM",
    keyClassification: "Key Control",
    frameworks: ["Bank Secrecy Act / USA PATRIOT Act", "OFAC Compliance Commitments Framework", "FFIEC BSA/AML Manual"],
    lastTestedDate: "2026-03-20",
    nextReviewDate: "2026-09-30",
    status: "Planning",
    designConclusion: "Under Review",
    operatingConclusion: "Not Started",
    notes: "Scheduled for Q3 testing. Sanctions list update frequency and alert disposition samples being gathered."
  },
  {
    id: "CTL-CRD-001",
    title: "Commercial Credit Committee Approval for Facility Limit Overrides",
    businessProcess: "Commercial Lending",
    subProcess: "Credit Committee Approval & Limit Overrides",
    riskAddressed: "RSK-CRD-01 (Unauthorized Credit Limit Override)",
    controlObjective: "Ensure any commercial credit commitment exceeding regional executive delegated lending authority ($5,000,000) is submitted to Senior Credit Committee with quorum approval documented.",
    description: "Credit Origination System blocks loan package document generation for commitments >$5M until an approved Credit Committee resolution package with voting record is uploaded and signed by Senior Credit Officer.",
    controlOwner: "Gregory Hayes (Senior VP Commercial Credit)",
    assignedReviewer: "David Chen, CPA",
    frequency: "Event-Driven",
    nature: "Preventive",
    method: "IT-Dependent Manual",
    keyClassification: "Key Control",
    frameworks: ["OCC Comptroller's Handbook - Commercial Lending", "Credit Policy Directive 4.2"],
    lastTestedDate: "2026-02-15",
    nextReviewDate: "2026-10-30",
    status: "Tested - Effective",
    designConclusion: "Effective",
    operatingConclusion: "Effective",
    notes: "Tested 12 commercial loan originations over $5M. 100% had documented committee minutes with required voting quorum."
  }
];

export const INITIAL_TEST_PLANS = [
  {
    id: "TP-2026-001",
    engagementId: "ENG-2026-001",
    controlId: "CTL-PMT-001",
    title: "High-Value Wire Transfer Dual Authorization OE Testing",
    businessArea: "Payments & Treasury",
    testingPeriod: "2026-07-01 to 2026-09-30",
    assignedTester: "Sarah Jenkins, CISA",
    seniorReviewer: "Marcus Vance, Director 2LoD",
    targetCompletionDate: "2026-09-20",
    status: "Under Testing",
    
    // Testing objective & criteria
    objective: "Verify that all outgoing wire payments >= $250,000 executed during Q3 2026 were subjected to independent dual authorization by certified Tier-2/Tier-3 approvers prior to transmission.",
    applicableCriteria: "Corporate Treasury Policy Sec 4.2; FFIEC Wholesale Payment Systems Handbook; 2026 2LoD Assurance Testing Charter.",

    // Population & IPE Verification
    populationDescription: "All outgoing wholesale wire transfers >= $250,000 executed via Fedwire Gateway between 2026-07-01 and 2026-09-30.",
    populationSource: "Enterprise Wire Database (Table: PMT_TXN_MASTER, filtered on TXN_AMT >= 250000 and STATUS = 'RELEASED')",
    populationCount: 14280,
    ipeCompletenessCheck: "Verified total row count against Fedwire Gateway message log and General Ledger Clearing Account 1002-FED. Reconciled total dollar volume ($18.42B) with $0.00 variance.",
    ipeAccuracyCheck: "Inspected SQL extraction query script (hash SHA-256: 4a9f...b12c) generated by IT Database Administrator. Verified date range bounds and status filters without manual manipulation.",
    ipeStatus: "Approved - Reliable",

    // Sampling Method & Rationale
    samplingMethod: "Stratified Random Sampling (High-Dollar / Non-Standard Windows)",
    samplingRationale: "In accordance with institutional methodology for daily/event-driven key controls (>250 occurrences/yr), sample size of 40 representative transactions selected across all business days, including peak quarter-end dates.",
    sampleSize: 40,
    sampleSizeTag: "User-entered (Methodology Standard: 40 items)",

    // Design Effectiveness Section
    designAssessment: {
      status: "Effective",
      walkthroughDate: "2026-08-12",
      participants: "Sarah Jenkins (2LoD Tester), Robert Martinez (Treasury Ops VP), Alice Wong (Wire Lead)",
      walkthroughSummary: "Observed live creation and approval of wire reference TX-2026-8841 ($1,250,000). System prevented initiator from approving. Secondary approver credentials validated with hardware token. Audit trail captured user IDs, timestamps, and IP addresses.",
      conclusion: "Design is adequate to prevent unauthorized high-value wire execution."
    },

    // Operating Effectiveness Section
    operatingAssessment: {
      status: "In Progress",
      periodTested: "Q3 2026 (July 1 - September 30)",
      samplesTestedCount: 32,
      samplesPassedCount: 31,
      samplesExceptionCount: 1,
      conclusion: "Preliminary: One exception identified where a wire of $450,000 was released with a single approval due to a temporary emergency delegation role glitch. Under review for finding escalation."
    },

    // Step-by-step procedures
    testSteps: [
      {
        stepNumber: 1,
        title: "Population Completeness & IPE Verification",
        procedure: "Obtain the master wire transaction extract for Q3 2026. Reconcile total count and value to Fedline statement and GL ledger.",
        expectedAttribute: "Extract matches external gateway totals with no unmapped transactions.",
        evidenceRef: "EVD-PMT-001",
        status: "Pass",
        testerComments: "Reconciled with 0 dollar variance. Database script verified."
      },
      {
        stepNumber: 2,
        title: "Dual Approval Identity Separation",
        procedure: "For each sample transaction, inspect user IDs of initiator and approver. Verify that User ID (Initiator) != User ID (Approver).",
        expectedAttribute: "Initiator and approver are two distinct individuals.",
        evidenceRef: "EVD-PMT-002",
        status: "Pass",
        testerComments: "Tested 32 items; all had distinct user IDs."
      },
      {
        stepNumber: 3,
        title: "Approver Delegation & Authority Tier Verification",
        procedure: "Cross-reference the secondary approver against the Corporate Authorized Signer Matrix effective on the transaction date.",
        expectedAttribute: "Approver possesses active Tier-2 or Tier-3 authority for transaction dollar amount.",
        evidenceRef: "EVD-PMT-003",
        status: "Exception",
        testerComments: "Sample #18 (TX-2026-9214 for $450,000) was approved by an analyst granted temporary Tier-2 delegation that expired 3 days prior to approval date."
      },
      {
        stepNumber: 4,
        title: "Cryptographic Hardware Token Authentication",
        procedure: "Verify that secondary approval log reflects valid MFA token signature and timestamp prior to transmission dispatch timestamp.",
        expectedAttribute: "MFA challenge successfully verified; approval timestamp precedes gateway release.",
        evidenceRef: "EVD-PMT-004",
        status: "Pass",
        testerComments: "Tested 32 items. All timestamps sequence correctly."
      }
    ]
  },
  {
    id: "TP-2026-002",
    engagementId: "ENG-2026-003",
    controlId: "CTL-ITGC-001",
    title: "Privileged Access Quarterly Recertification Testing",
    businessArea: "Technology & Cyber",
    testingPeriod: "2026-07-01 to 2026-08-31",
    assignedTester: "Sarah Jenkins, CISA",
    seniorReviewer: "Marcus Vance, Director 2LoD",
    targetCompletionDate: "2026-09-01",
    status: "Completed - Exceptions Noted",

    objective: "Verify that all active Domain Admin, DBA, and root privileged accounts were reviewed, recertified, or revoked by authorized managers within 10 business days of Q2/Q3 cycle initiation.",
    applicableCriteria: "IT Security Access Policy Sec 8.4; CISA IT Control Guidelines; SOX 404 ITGC Framework.",

    populationDescription: "Active privileged accounts across Active Directory Domain Admins, Oracle DBAs, and UNIX Root groups.",
    populationSource: "CyberArk PAM Vault & Active Directory Group Extraction (AD_GROUP_MEMBERS where GROUP in ('Domain Admins', 'Enterprise Admins', 'DBA_PROD'))",
    populationCount: 148,
    ipeCompletenessCheck: "Compared AD group export timestamp and active account count with Domain Controller live query. Reconciled 148 active privileged accounts.",
    ipeAccuracyCheck: "Reviewed PowerShell extraction script hash and validated filter logic with IT Security Audit Lead.",
    ipeStatus: "Approved - Reliable",

    samplingMethod: "100% Population Inspection (All 148 Privileged Accounts)",
    samplingRationale: "Due to high inherent risk of Domain Admin and DBA credentials, full population inspection was performed rather than statistical sampling.",
    sampleSize: 148,
    sampleSizeTag: "100% Population Automated Inspection",

    designAssessment: {
      status: "Effective",
      walkthroughDate: "2026-07-22",
      participants: "Sarah Jenkins (Tester), Kevin Zhao (IAM Lead)",
      walkthroughSummary: "Observed workflow in SailPoint IdentityNow platform. Automated notifications dispatched to managers. Approval and revocation workflows functional.",
      conclusion: "Design meets control objective."
    },

    operatingAssessment: {
      status: "Ineffective",
      periodTested: "Q2 Recertification Cycle (executed July 2026)",
      samplesTestedCount: 148,
      samplesPassedCount: 145,
      samplesExceptionCount: 3,
      conclusion: "Control operated ineffectively. 3 contractor accounts with Domain Admin privileges were revoked 14 business days after contract termination instead of within 24 hours. Formal finding FND-2026-001 issued."
    },

    testSteps: [
      {
        stepNumber: 1,
        title: "Recertification Campaign Timeliness",
        procedure: "Verify that Q2 campaign was launched on 2026-07-01 and concluded by managers within 10 business days.",
        expectedAttribute: "All accounts reviewed and signed off by 2026-07-15.",
        evidenceRef: "EVD-ITGC-001",
        status: "Pass",
        testerComments: "Campaign closed on 2026-07-14 with 98% timely manager response."
      },
      {
        stepNumber: 2,
        title: "Timely Deprovisioning of Revoked Access",
        procedure: "For accounts flagged for revocation or associated with departed personnel, verify access was disabled in Active Directory within 24 hours.",
        expectedAttribute: "Account disabled timestamp <= 24 hours from revocation decision or termination date.",
        evidenceRef: "EVD-ITGC-002",
        status: "Exception",
        testerComments: "3 contractor accounts remained active 14 days after contract end date. Ticketing system failed to route auto-task to local sysadmin."
      }
    ]
  },
  {
    id: "TP-2026-003",
    engagementId: "ENG-2026-002",
    controlId: "CTL-FIN-001",
    title: "Manual Journal Entry Supervisory Review Testing",
    businessArea: "Finance & Accounting",
    testingPeriod: "2026-06-01 to 2026-09-30",
    assignedTester: "David Chen, CPA",
    seniorReviewer: "Elena Rostova, Head of SOX",
    targetCompletionDate: "2026-10-15",
    status: "Under Testing",

    objective: "Test that manual journal entries >= $100,000 posted during Q2-Q3 2026 were independently reviewed and approved prior to posting, with adequate supporting documentation.",
    applicableCriteria: "SOX 404 Key Financial Controls; Corporate Accounting Policy 2.1.",

    populationDescription: "All manual journal entries (Doc Type 'SA', 'AB') posted to general ledger between June 1 and September 30, 2026 with absolute value >= $100,000.",
    populationSource: "SAP S/4HANA Finance Table BKPF / BSEG",
    populationCount: 842,
    ipeCompletenessCheck: "Reconciled total entries and balances against SAP GL Trial Balance summary report. Verified no missing document numbers.",
    ipeAccuracyCheck: "SQL query parameters verified: Doc Type filter, posting date bounds, and amount threshold.",
    ipeStatus: "Approved - Reliable",

    samplingMethod: "Stratified Random Sampling",
    samplingRationale: "Standard methodology sample of 25 manual entries, stratified across quarter-end close entries and mid-month adjustments.",
    sampleSize: 25,
    sampleSizeTag: "User-entered (Methodology Standard: 25 items)",

    designAssessment: {
      status: "Effective",
      walkthroughDate: "2026-08-05",
      participants: "David Chen (2LoD), Karen Miller (Assistant Controller)",
      walkthroughSummary: "Observed workflow in SAP. System enforces separation of duties; posting user cannot approve. Secondary approval required before posting.",
      conclusion: "Design effective."
    },

    operatingAssessment: {
      status: "In Progress",
      periodTested: "June - August 2026",
      samplesTestedCount: 18,
      samplesPassedCount: 18,
      samplesExceptionCount: 0,
      conclusion: "Testing underway. 18 samples tested to date with no exceptions. 7 remaining entries for September to be tested upon month-end close."
    },

    testSteps: [
      {
        stepNumber: 1,
        title: "Electronic Secondary Approval Verification",
        procedure: "Verify that SAP workflow log contains electronic sign-off from designated Accounting Manager prior to ledger posting.",
        expectedAttribute: "Approval timestamp precedes posting timestamp. Approver is distinct from preparer.",
        evidenceRef: "EVD-FIN-001",
        status: "Pass",
        testerComments: "All 18 items reviewed possess appropriate manager approval."
      },
      {
        stepNumber: 2,
        title: "Supporting Calculation & Source Documentation",
        procedure: "Inspect attached calculation workpapers, contracts, or bank statements supporting entry justification.",
        expectedAttribute: "Mathematical recalculation agrees; documentation supports underlying business transaction.",
        evidenceRef: "EVD-FIN-002",
        status: "Pass",
        testerComments: "Workpapers reconciled to underlying contract and calculations."
      }
    ]
  }
];

export const INITIAL_EVIDENCE = [
  {
    id: "EVD-PMT-001",
    engagementId: "ENG-2026-001",
    controlId: "CTL-PMT-001",
    testPlanId: "TP-2026-001",
    testStepRef: "Step 1: Population C&A",
    sampleRef: "Full Population (14,280 items)",
    name: "Q3 2026 Fedwire Master Extract & GL Clearing Reconciliation",
    requestedFrom: "Robert Martinez (Treasury Ops VP)",
    dateRequested: "2026-08-01",
    dateReceived: "2026-08-05",
    periodCovered: "2026-07-01 to 2026-09-30",
    reviewer: "Sarah Jenkins, CISA",
    reviewStatus: "Accepted",
    reliabilityNotes: "Direct database extraction performed by Senior IT DBA in presence of assurance tester. SQL script hash validated against production repository. Reconciled to General Ledger Account 1002-FED with zero variance.",
    attachmentFilename: "Fedwire_Q3_2026_Population_Reconciled_Extract.xlsx",
    fileSize: "14.2 MB",
    fileHash: "SHA256: 4a9f82d0e74b31a89c22e519df901237a91bb40215cfa99017e81df983b12c55",
    mockType: "Spreadsheet"
  },
  {
    id: "EVD-PMT-002",
    engagementId: "ENG-2026-001",
    controlId: "CTL-PMT-001",
    testPlanId: "TP-2026-001",
    testStepRef: "Step 2 & 3: Dual Authorization & Signer Matrix",
    sampleRef: "Sample Items #01 to #40",
    name: "Enterprise Payment Engine Dual Authorization Audit Logs & Signer Matrix",
    requestedFrom: "Alice Wong (Wire Lead)",
    dateRequested: "2026-08-05",
    dateReceived: "2026-08-10",
    periodCovered: "2026-07-01 to 2026-09-30",
    reviewer: "Sarah Jenkins, CISA",
    reviewStatus: "Follow-up Required",
    reliabilityNotes: "Log extracts contain user IDs, IP addresses, and digital cert timestamps. However, Sample #18 revealed approver delegation expired on 2026-07-28 prior to release. Requested Treasury management confirmation regarding expired delegation policy.",
    attachmentFilename: "PaymentEngine_DualAuth_Sample_AuditLogs_Q3.pdf",
    fileSize: "6.8 MB",
    fileHash: "SHA256: 8b11c38e92fa073b64c4d516aa882310f76cd30922eba87125e64ef812a45d01",
    mockType: "Audit Log PDF"
  },
  {
    id: "EVD-PMT-003",
    engagementId: "ENG-2026-001",
    controlId: "CTL-PMT-001",
    testPlanId: "TP-2026-001",
    testStepRef: "Step 4: Token Authentication",
    sampleRef: "Sample Items #01 to #32",
    name: "RSA SecurID Hard Token Authentication Server Event Log",
    requestedFrom: "Kevin Zhao (IAM Lead)",
    dateRequested: "2026-08-10",
    dateReceived: "2026-08-15",
    periodCovered: "2026-07-01 to 2026-08-31",
    reviewer: "Sarah Jenkins, CISA",
    reviewStatus: "Accepted",
    reliabilityNotes: "Syslog extract direct from authentication cluster. Timestamp integrity verified against enterprise NTP clock.",
    attachmentFilename: "SecurID_MFA_Authentication_Logs_Aug2026.csv",
    fileSize: "3.4 MB",
    fileHash: "SHA256: 12f45ea98b71d440c9e6231ba8019aa53cd981b238f42a0018ef231bca554902",
    mockType: "CSV Data"
  },
  {
    id: "EVD-ITGC-001",
    engagementId: "ENG-2026-003",
    controlId: "CTL-ITGC-001",
    testPlanId: "TP-2026-002",
    testStepRef: "Step 1: Recertification Campaign",
    sampleRef: "100% Population (148 Accounts)",
    name: "Q2 2026 SailPoint IdentityNow Campaign Attestation Certificate",
    requestedFrom: "Kevin Zhao (IAM Lead)",
    dateRequested: "2026-07-16",
    dateReceived: "2026-07-18",
    periodCovered: "2026-07-01 to 2026-07-15",
    reviewer: "Sarah Jenkins, CISA",
    reviewStatus: "Accepted",
    reliabilityNotes: "System-generated PDF report signed digitally by CISO. All manager approval timestamps recorded.",
    attachmentFilename: "SailPoint_Q2_Privileged_Recertification_Summary.pdf",
    fileSize: "8.1 MB",
    fileHash: "SHA256: d912fa874c55e9021bf90123ca87611ab5498e2190cdfa4512398bfae8701932",
    mockType: "Executive Report"
  },
  {
    id: "EVD-ITGC-002",
    engagementId: "ENG-2026-003",
    controlId: "CTL-ITGC-001",
    testPlanId: "TP-2026-002",
    testStepRef: "Step 2: Deprovisioning Timeliness",
    sampleRef: "Revocation Sample (3 contractor accounts)",
    name: "Active Directory Event 4726 (User Account Deleted) Syslog Export",
    requestedFrom: "David Miller (Active Directory Administrator)",
    dateRequested: "2026-07-20",
    dateReceived: "2026-07-25",
    periodCovered: "2026-07-01 to 2026-07-25",
    reviewer: "Sarah Jenkins, CISA",
    reviewStatus: "Accepted",
    reliabilityNotes: "Corroborated delayed deprovisioning. Accounts 'c-todd.m', 'c-alicia.v', and 'c-samir.k' remained in Domain Admins until manual ticket intervention on 2026-07-22.",
    attachmentFilename: "AD_Security_Log_Event4726_Audit_Extract.csv",
    fileSize: "1.2 MB",
    fileHash: "SHA256: 77a1bc901e2394fd55a8014523cba9910e821dfbc4501a2399ef0142bcae9912",
    mockType: "CSV Log"
  },
  {
    id: "EVD-FIN-001",
    engagementId: "ENG-2026-002",
    controlId: "CTL-FIN-001",
    testPlanId: "TP-2026-003",
    testStepRef: "Step 1: Workflow Sign-offs",
    sampleRef: "Sample Items #01 to #18",
    name: "SAP S/4HANA Workflow Electronic Sign-Off Log Extracts",
    requestedFrom: "Karen Miller (Assistant Controller)",
    dateRequested: "2026-08-01",
    dateReceived: "2026-08-08",
    periodCovered: "2026-06-01 to 2026-08-31",
    reviewer: "David Chen, CPA",
    reviewStatus: "Under Review",
    reliabilityNotes: "SAP standard audit report /BSEG/BKPF with workflow log history. Verifying manager approval limits match corporate matrix.",
    attachmentFilename: "SAP_JournalEntry_Workflow_Audit_Q2_Q3.pdf",
    fileSize: "4.5 MB",
    fileHash: "SHA256: 55ca9910fe2389a012bca871923dfbc55610ea98231bcde450198afe770142a1",
    mockType: "ERP Export"
  },
  {
    id: "EVD-AML-001",
    engagementId: "ENG-2026-004",
    controlId: "CTL-AML-001",
    testPlanId: "TP-2026-004",
    testStepRef: "Step 1: Sanctions Filter Logic",
    sampleRef: "N/A (Configuration)",
    name: "OFAC Sanctions Screening Rule Tuning & Fuzzy Match Threshold Config",
    requestedFrom: "Tariq Al-Mansoor (VP Sanctions Compliance)",
    dateRequested: "2026-08-15",
    dateReceived: null,
    periodCovered: "2026-01-01 to 2026-08-15",
    reviewer: "Priya Nair, CAMS",
    reviewStatus: "Requested",
    reliabilityNotes: "Awaiting configuration export and model tuning documentation from Financial Crimes IT team.",
    attachmentFilename: "Pending_Sanctions_Engine_Config_v4.2.json",
    fileSize: "Pending",
    fileHash: "Pending",
    mockType: "Config"
  }
];

export const INITIAL_FINDINGS = [
  {
    id: "FND-2026-001",
    engagementId: "ENG-2026-003",
    controlId: "CTL-ITGC-001",
    title: "Untimely Deprovisioning of Active Directory Domain Administrator Privileges for External Contractors",
    dateRaised: "2026-07-28",
    riskRating: "High",
    businessArea: "Technology & Cyber",
    actionStatus: "In Progress",

    // The 4 C's
    condition: "Testing of 148 privileged accounts revealed that three external contractor accounts with Active Directory Domain Admin rights ('c-todd.m', 'c-alicia.v', and 'c-samir.k') remained fully enabled for 14 business days following their contract termination date.",
    criteria: "Enterprise IT Information Security Access Policy Sec 8.4 requires privileged access for departing personnel to be revoked within 24 hours of contract end or formal notification.",
    cause: "The automated offboarding integration between the Contractor Vendor Management System (VMS) and Active Directory Identity Engine failed to parse a contract completion status code, and no manual reconciliation fallback was performed by the IAM team.",
    impact: "Unmonitored privileged accounts with Domain Administrator credentials introduce significant risk of unauthorized directory modification, credential compromise, lateral movement, and non-compliance with SOX ITGC and CISA security standards.",

    // Remediation & Action Tracking
    agreedAction: "1. Immediately revoke the three identified contractor accounts (Completed 2026-07-22).\n2. Implement a daily automated reconciliation script between Active Directory privileged groups and active HR/VMS contractor records.\n3. Implement automated alert notifications to IAM On-Call for any privileged account linked to an expired contractor record.",
    actionOwner: "Kevin Zhao (Identity & Access Operations Lead)",
    targetDate: "2026-09-30",
    daysOverdue: 0,
    managementResponse: "Management agrees with the finding. The three accounts were disabled upon notification. Engineering is developing the daily automated AD-VMS synchronization check with target deployment by September 25, 2026.",
    validationEvidence: "Validation testing scheduled for 2026-10-05 upon deployment of daily sync script. Second-line tester will inspect 30-day offboarding run logs.",
    closureDecision: "Open - Pending Implementation & 2LoD Re-testing",
    closureRationale: "Action remains In Progress until automated reconciliation script is in production and validated."
  },
  {
    id: "FND-2026-002",
    engagementId: "ENG-2026-001",
    controlId: "CTL-PMT-001",
    title: "High-Value Wire Release Approved Under Expired Delegation Authority",
    dateRaised: "2026-08-16",
    riskRating: "Medium",
    businessArea: "Payments & Treasury",
    actionStatus: "Pending Validation",

    condition: "Testing of Sample #18 (Wire TX-2026-9214 for $450,000) identified that the secondary approver held a temporary Tier-2 delegation of authority that had expired 3 calendar days prior to the wire release timestamp.",
    criteria: "Corporate Treasury Policy Sec 4.2 stipulates that wire release authorizations must be executed solely by individuals with currently active, unexpired delegation authority documented in the master Treasury Signer Matrix.",
    cause: "The payment engine's user permission table relies on a weekly batch sync to expire temporary delegation roles, rather than real-time expiration date validation at the moment of electronic signing.",
    impact: "Risk of unauthorized disbursement or execution of payments by personnel whose delegated authority has expired, potentially breaching dual-control controls and internal governance limits.",

    agreedAction: "1. Treasury Operations to perform retrospective review of all wires approved by the subject individual during the 3-day gap (Completed - no discrepancies found).\n2. Treasury IT to update the Payment Engine release module to perform an inline, real-time date check on delegation expiration before granting final approval.",
    actionOwner: "Robert Martinez (Director of Treasury Operations)",
    targetDate: "2026-08-31",
    daysOverdue: 0,
    managementResponse: "Treasury confirmed that the wire was legitimate and subsequently countersigned. IT deployed emergency patch PR-8821 on 2026-08-28 enforcing inline delegation expiry validation.",
    validationEvidence: "Patch release notes and system configuration screenshot provided under EVD-PMT-005. 2LoD tester to execute test wire with expired role to confirm system rejection.",
    closureDecision: "Pending 2LoD Validation Re-test",
    closureRationale: "Retesting scheduled during upcoming sprint to confirm patch functionality."
  },
  {
    id: "FND-2025-009",
    engagementId: "ENG-2026-002",
    controlId: "CTL-FIN-001",
    title: "Absence of Documented Secondary Review for Journal Entries Created by Regional Finance Officers",
    dateRaised: "2025-11-12",
    riskRating: "Medium",
    businessArea: "Finance & Accounting",
    actionStatus: "Closed",

    condition: "During 2025 testing, 4 of 25 manual journal entries between $100k-$250k originating from regional branches lacked attached supervisory sign-off sheets.",
    criteria: "Accounting Policy 2.1 requires secondary supervisory sign-off for all manual entries >= $100,000.",
    cause: "Regional branches relied on local email approvals without attaching the confirmation to the ERP document header.",
    impact: "Lack of audit trail for financial reporting controls; increased risk of unapproved manual adjustments.",

    agreedAction: "Enforce mandatory attachment upload in SAP ERP prior to workflow submission for all manual entries >= $100,000.",
    actionOwner: "Karen Miller (Assistant Controller)",
    targetDate: "2026-03-31",
    daysOverdue: 0,
    managementResponse: "SAP system validation rule activated on 2026-02-15 preventing entry posting without uploaded attachment.",
    validationEvidence: "2LoD tested 15 post-implementation manual entries in Q2 2026. 100% contained valid attached calculation sheets.",
    closureDecision: "Closed & Validated",
    closureRationale: "System automated validation rule verified operational and effective in Q2 2026."
  },
  {
    id: "FND-2026-003",
    engagementId: "ENG-2026-001",
    controlId: "CTL-PMT-002",
    title: "Overdue Nostro Reconciliation Clearing Breaks Exceeding 10 Business Days",
    dateRaised: "2026-06-15",
    riskRating: "Low",
    businessArea: "Payments & Treasury",
    actionStatus: "Overdue",

    condition: "Inspection of Nostro reconciliation logs revealed two currency breaks (EUR 42,000 and GBP 18,500) that remained unresolved for 14 and 18 business days respectively, exceeding the 5-day standard resolution window.",
    criteria: "Treasury Reconciliation Procedure TR-04 requires all Nostro clearing breaks to be investigated and resolved within 5 business days, with escalation to VP Treasury at 10 days.",
    cause: "Staff turnover in Correspondent Banking operations led to unassigned inquiry tickets at the correspondent clearing institution.",
    impact: "Delayed resolution of clearing discrepancies increases liquidity forecasting variance and potential credit risk with correspondent counterparties.",

    agreedAction: "Implement bi-weekly Nostro break escalation meetings with Treasury VP and automated notification for any ticket aged >5 days.",
    actionOwner: "Amanda Thorne (Treasury Accounting Manager)",
    targetDate: "2026-07-31",
    daysOverdue: 38,
    managementResponse: "Escalation committee charter drafted. Staffing backfill delayed due to recruitment freeze. Expected completion revised to late September.",
    validationEvidence: "Awaiting implementation of automated notification dashboard.",
    closureDecision: "Overdue - Escalated to Risk Committee",
    closureRationale: "Target date exceeded by >30 days without completed mitigation."
  }
];

export const INITIAL_METHODOLOGY = {
  institutionName: "Horizon National Bancorp",
  assuranceCharter: "Second-Line-of-Defense (2LoD) Risk & Compliance Assurance Charter v4.2",
  lastMethodologyUpdate: "2026-01-15",
  signOffAuthority: "Head of Operational Risk & Compliance Assurance",
  samplingMatrix: [
    { frequency: "Annual", populationRange: "1", minimumSample: 1, guideline: "100% of occurrences" },
    { frequency: "Quarterly", populationRange: "4", minimumSample: 2, guideline: "2 to 4 quarters tested" },
    { frequency: "Monthly", populationRange: "12", minimumSample: 5, guideline: "5 to 10 months tested" },
    { frequency: "Weekly", populationRange: "52", minimumSample: 15, guideline: "15 to 25 weekly instances" },
    { frequency: "Daily", populationRange: "250 - 365", minimumSample: 25, guideline: "25 to 40 operating days" },
    { frequency: "Multiple times per day (Event-Driven)", populationRange: "> 250", minimumSample: 40, guideline: "40 to 60 representative samples stratified across periods" },
    { frequency: "Automated / Application Control", populationRange: "Continuous", minimumSample: 1, guideline: "Test of 1 transaction + ITGC change management verification" }
  ],
  riskRatings: [
    { level: "Critical", definition: "Direct regulatory non-compliance, severe financial loss exposure (> $5M), or total absence of key control over critical business process.", slaDays: 15 },
    { level: "High", definition: "Material control deficiency, failure of key SOX or safety & soundness control, potential significant financial loss ($1M-$5M), or formal regulatory scrutiny.", slaDays: 30 },
    { level: "Medium", definition: "Moderate control gap, operating exception without direct financial loss, or non-key control failure mitigated by compensating controls.", slaDays: 60 },
    { level: "Low", definition: "Minor procedural deviation, isolated documentation omission, or process enhancement opportunity.", slaDays: 90 },
    { level: "Observational", definition: "Process optimization or efficiency recommendation; not a formal control failure.", slaDays: 120 }
  ],
  governanceNotice: "SECOND-LINE ASSURANCE NOTICE: All control testing conclusions require professional assurance judgment and documented review in accordance with the institution's approved testing charter. Testing records, IPE verifications, and sample sizes must adhere to approved 2LoD assurance policies and supervisory expectations."
};

export const INITIAL_ACTIVITY_LOG = [
  { id: "act-1", timestamp: "2026-11-07 13:45", user: "Sarah Jenkins, CISA", action: "Updated Test Plan TP-2026-001 operating effectiveness testing status to 'In Progress'." },
  { id: "act-2", timestamp: "2026-11-07 11:20", user: "Marcus Vance, Director 2LoD", action: "Approved IPE Completeness & Accuracy assessment for Test Plan TP-2026-001." },
  { id: "act-3", timestamp: "2026-11-06 16:30", user: "Sarah Jenkins, CISA", action: "Logged Evidence item EVD-PMT-003 with cryptographic hash verification." },
  { id: "act-4", timestamp: "2026-11-06 14:15", user: "Kevin Zhao (IAM Lead)", action: "Submitted management remediation update for Finding FND-2026-001." },
  { id: "act-5", timestamp: "2026-11-05 09:10", user: "David Chen, CPA", action: "Executed 18 sample journal entry tests for Test Plan TP-2026-003 with zero exceptions." },
  { id: "act-6", timestamp: "2026-11-04 15:45", user: "Elena Rostova, Head of SOX", action: "Closed and validated Finding FND-2025-009 following Q2 re-testing." }
];
// Append sample testing records for the interactive Test Results Workbench
export const INITIAL_SAMPLE_ITEMS = [
  {
    id: "SMP-001",
    testPlanId: "TP-2026-001",
    sampleNumber: 1,
    transactionRef: "TX-2026-8801",
    transactionDate: "2026-07-02",
    amount: "$350,000",
    initiator: "J. Adams (Treasury Analyst)",
    approver: "R. Martinez (VP Treasury)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-2 signer before release",
    workPerformed: "Inspected wire creation log and release authorization record. Verified initiator and approver user IDs are distinct. Confirmed R. Martinez held active Tier-2 authority ($1M limit). Verified cryptographic token challenge timestamp at 10:14:22 EST preceding release transmission at 10:15:01 EST.",
    result: "Pass",
    exceptionNotes: "",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-16"
  },
  {
    id: "SMP-002",
    testPlanId: "TP-2026-001",
    sampleNumber: 2,
    transactionRef: "TX-2026-8845",
    transactionDate: "2026-07-05",
    amount: "$1,200,000",
    initiator: "T. Henderson (Cash Mgmt)",
    approver: "E. Rostova (Treasury Director)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-3 signer before release",
    workPerformed: "Verified segregation of duties between initiator and approver. Confirmed Tier-3 signer authority for amounts >$1M. Verified RSA SecurID hardware token authentication log.",
    result: "Pass",
    exceptionNotes: "",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-16"
  },
  {
    id: "SMP-003",
    testPlanId: "TP-2026-001",
    sampleNumber: 3,
    transactionRef: "TX-2026-8910",
    transactionDate: "2026-07-09",
    amount: "$420,000",
    initiator: "A. Wong (Wire Room Lead)",
    approver: "R. Martinez (VP Treasury)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-2 signer before release",
    workPerformed: "Verified dual control. Distinct user IDs. Valid active authorization on signer matrix.",
    result: "Pass",
    exceptionNotes: "",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-17"
  },
  {
    id: "SMP-004",
    testPlanId: "TP-2026-001",
    sampleNumber: 4,
    transactionRef: "TX-2026-9012",
    transactionDate: "2026-07-14",
    amount: "$280,000",
    initiator: "K. Vance (Settlement Clerk)",
    approver: "A. Thorne (Accounting Mgr)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-2 signer before release",
    workPerformed: "Verified segregation of duties and active delegation authority. Token verification confirmed.",
    result: "Pass",
    exceptionNotes: "",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-17"
  },
  {
    id: "SMP-005",
    testPlanId: "TP-2026-001",
    sampleNumber: 5,
    transactionRef: "TX-2026-9214",
    transactionDate: "2026-07-31",
    amount: "$450,000",
    initiator: "L. Smith (Treasury Ops)",
    approver: "M. Davies (Acting Lead)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-2 signer before release",
    workPerformed: "Inspected release authorization. While initiator and approver were distinct, review of the Corporate Authorized Signer Matrix revealed M. Davies held temporary Tier-2 delegation that expired on 2026-07-28, three calendar days before approval of this wire.",
    result: "Exception",
    exceptionNotes: "CONTROL EXCEPTION: Wire released under expired delegation authority. The Payment Engine failed to validate real-time expiry dates. Escalated to Finding FND-2026-002.",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-18"
  },
  {
    id: "SMP-006",
    testPlanId: "TP-2026-001",
    sampleNumber: 6,
    transactionRef: "TX-2026-9400",
    transactionDate: "2026-08-04",
    amount: "$5,100,000",
    initiator: "T. Henderson (Cash Mgmt)",
    approver: "E. Rostova (Treasury Director)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-3 signer before release",
    workPerformed: "Inspected wire authorization for $5.1M. Confirmed dual executive signer verification and manual callback to originating corporate client.",
    result: "Pass",
    exceptionNotes: "",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-19"
  },
  {
    id: "SMP-007",
    testPlanId: "TP-2026-001",
    sampleNumber: 7,
    transactionRef: "TX-2026-9580",
    transactionDate: "2026-08-11",
    amount: "$750,000",
    initiator: "J. Adams (Treasury Analyst)",
    approver: "R. Martinez (VP Treasury)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-2 signer before release",
    workPerformed: "Verified dual sign-off, signer credentials, and audit trail.",
    result: "Pass",
    exceptionNotes: "",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-20"
  },
  {
    id: "SMP-008",
    testPlanId: "TP-2026-001",
    sampleNumber: 8,
    transactionRef: "TX-2026-9720",
    transactionDate: "2026-08-18",
    amount: "$310,000",
    initiator: "A. Wong (Wire Room Lead)",
    approver: "A. Thorne (Accounting Mgr)",
    evidenceRef: "EVD-PMT-002",
    expectedAttribute: "Dual independent approval by active Tier-2 signer before release",
    workPerformed: "Pending test step completion. Evidence requested.",
    result: "Inconclusive",
    exceptionNotes: "Awaiting secondary token log confirmation from IAM team.",
    testedBy: "Sarah Jenkins, CISA",
    testedDate: "2026-08-21"
  }
];
