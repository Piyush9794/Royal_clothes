import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function ToastNotification({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-5 right-5 z-50 max-w-sm w-full p-4 rounded-xl shadow-2xl border flex items-start gap-3 bg-[#0d0c22] text-white border-[#2b2759]"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#ea4c89] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs leading-relaxed">
            <p className="font-semibold text-white">
              {toast.type === 'error' ? 'Notice' : 'Royal Collection Update'}
            </p>
            <p className="text-gray-300 mt-0.5">{toast.message}</p>
          </div>

          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-white p-0.5 transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
