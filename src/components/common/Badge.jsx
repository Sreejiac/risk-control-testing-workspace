import React from 'react';

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs font-medium',
    lg: 'px-3 py-1 text-sm font-medium'
  };

  // Canonical styling for banking assurance statuses
  const variantMap = {
    // Control / Test Statuses
    'Tested - Effective': 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    'Effective': 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    'Pass': 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    'Accepted': 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    'Closed': 'bg-slate-100 text-slate-700 border border-slate-300',
    'Closed & Validated': 'bg-emerald-50 text-emerald-800 border border-emerald-300',

    // Deficiencies & Exceptions
    'Tested - Ineffective': 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold',
    'Ineffective': 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold',
    'Exception': 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold',
    'Overdue': 'bg-rose-50 text-rose-800 border border-rose-300 font-semibold animate-pulse',

    // In Progress & Review
    'Under Testing': 'bg-blue-50 text-blue-700 border border-blue-200',
    'In Progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Testing in Progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Under Review': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Follow-up Required': 'bg-amber-50 text-amber-800 border border-amber-300 font-medium',
    'Pending Validation': 'bg-purple-50 text-purple-700 border border-purple-200',
    'Inconclusive': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Planning': 'bg-slate-100 text-slate-700 border border-slate-200',
    'Not Started': 'bg-slate-100 text-slate-600 border border-slate-200',
    'Requested': 'bg-sky-50 text-sky-700 border border-sky-200',

    // Risk Ratings
    'Critical': 'bg-rose-100 text-rose-800 border border-rose-300 font-semibold',
    'High': 'bg-orange-50 text-orange-700 border border-orange-200 font-medium',
    'Medium': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Low': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Observational': 'bg-slate-100 text-slate-600 border border-slate-300',

    // Key Control
    'Key Control': 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold',
    'Non-Key Control': 'bg-slate-50 text-slate-600 border border-slate-200',

    // Control Nature & Method
    'Preventive': 'bg-teal-50 text-teal-700 border border-teal-200',
    'Detective': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    'Automated': 'bg-violet-50 text-violet-700 border border-violet-200',
    'Manual': 'bg-stone-100 text-stone-700 border border-stone-200',
    'IT-Dependent Manual': 'bg-indigo-50 text-indigo-700 border border-indigo-200',

    // Default
    'default': 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  const styleClass = variantMap[variant] || variantMap[children] || variantMap['default'];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md transition-colors ${sizeClasses[size]} ${styleClass} ${className}`}
    >
      {children}
    </span>
  );
}

