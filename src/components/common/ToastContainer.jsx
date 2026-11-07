import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useWorkspace();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg shadow-lg border text-xs transition-all transform translate-y-0 ${
              isSuccess
                ? 'bg-slate-900 text-white border-emerald-500/50'
                : isError
                ? 'bg-rose-900 text-white border-rose-500/50'
                : 'bg-slate-900 text-white border-sky-500/50'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {isInfo && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
            
            <div className="flex-1 font-medium">{toast.message}</div>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

