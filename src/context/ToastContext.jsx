import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';


const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* کانتینر شناور پیام‌ها (گوشه پایین-راست در دسکتاپ و وسط در موبایل) */}
      <div 
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none select-none"
        dir="rtl"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${
              toast.type === 'success'
                ? 'bg-zinc-900 text-white border-zinc-800'
                : toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-100 border-rose-800'
                : 'bg-zinc-900 text-white border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
              )}
              <span className="text-xs font-bold leading-relaxed">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white p-1 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);