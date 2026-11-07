# Risk & Control Testing Workspace

A responsive second-line of defense (2LoD) Risk & Compliance Assurance web application designed specifically for banking and financial-services assurance professionals.

![License](https://img.shields.io/badge/governance-2LoD%20Assurance-0f172a)
![Framework](https://img.shields.io/badge/compliance-SOX%20404%20%7C%20FFIEC%20%7C%20BCBS%20239-0d9488)

---

## Key Capabilities

1. **Assurance Cockpit (Dashboard)**
   - Oversight of active testing engagements, controls due for testing, tests in progress, evidence awaiting review, and open findings/overdue actions.
   - Multi-facet filtering by business domain, testing cycle, control owner, and testing status.
   - Real-time analytical distribution charts and chronological assurance activity stream.

2. **Process Hierarchy & Risk Register (RCM)**
   - Traceability across Business Domains, Core Processes, and Sub-Processes.
   - Risk statements categorized across Operational, Financial Reporting (SOX 404), Technology/Cyber (ITGC), Regulatory/Compliance, and Credit Risk.
   - Direct mapping of mitigating internal controls to inherent and residual risks.

3. **Master Control Register**
   - Detailed control profiles: Control ID, Title, Objective, Description, 1LoD Owner, 2LoD Reviewer, Frequency, Nature (Preventive/Detective), Method (Automated/ITDM/Manual), Key Control classification, and Regulatory Policy alignment (SOX 404, FFIEC, BCBS 239).
   - Traceability drawer linking to Test Plans, Evidence Workpapers, and Exception Findings.

4. **Test Planning & Scoping (D&I vs. OE)**
   - Distinct sections for **Design Effectiveness (Walkthrough / D&I)** and **Operating Effectiveness (OE Testing)**.
   - **Information Produced by Entity (IPE) / Completeness & Accuracy (C&A)** verification check tracking.
   - Scoping and sampling methodology rationale (Stratified Random, Statistical, Haphazard, or 100% Automated Population Inspection).
   - User-entered sample sizes aligned to institutional frequency matrices.

5. **Sample Testing Workbench**
   - Interactive transaction sample testing execution.
   - Record expected control attributes, evidence inspected, work performed, and test result (Pass, Exception, Inconclusive).
   - One-click escalation from a sample testing exception directly into a formal Finding.

6. **Evidence Tracker & IPE Register**
   - Workpaper tracking with statuses: *Requested, Received, Under Review, Accepted, Follow-up Required, Not Applicable*.
   - Notes on data reliability, query parameter integrity, and GL reconciliation.
   - Simulated secure attachment inspector displaying SHA-256 integrity hashes, file metadata, and sanitized population excerpts.

7. **Findings & Remediation Register (4 C's Format)**
   - Standard assurance structure:
     - **Condition**: Observed factual deviation
     - **Criteria**: Policy, standard, or regulatory requirement
     - **Cause**: Root cause analysis
     - **Impact**: Potential financial loss, compliance sanction, or operational exposure
   - Risk rating severity matrix (Critical, High, Medium, Low, Observational).
   - Agreed action plans, action owners, milestone target dates, and days overdue counters.
   - Two-step 2LoD validation re-testing workflow prior to formal closure.

8. **Assurance Reporting Hub**
   - Formal printable report views:
     - Executive Summary Memorandum
     - Engagement Status & Milestone Progress
     - Detailed Control Test Results & Conclusions
     - Evidence Gaps & Outstanding IPE Requests
     - Comprehensive Findings & Action Plans (4 C's)
     - Overdue Actions Aging Report
   - Export to CSV, JSON full backup, and native browser print formatting with header/footer limitation notices.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Development
```bash
# Start the Vite development server
npm run dev
```

### Production Build & Preview
```bash
# Compile optimized production assets
npm run build

# Preview the production build locally
npm run preview
```

---

## Governance & Limitations Notice

> **SECOND-LINE ASSURANCE NOTICE**: All control testing conclusions require professional assurance judgment and documented review in accordance with the institution's approved testing charter. All data provided in this application is fictional, sanitized, and for prototype demonstration purposes only.

