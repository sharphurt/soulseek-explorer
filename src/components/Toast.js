import {useEffect} from 'react';
import {AlertCircle, CheckCircle2, X} from 'lucide-react';

const toastStyles = {
    success: {
        icon: CheckCircle2,
        className: 'border-emerald-300/30 bg-emerald-500/15 text-emerald-50',
    },
    error: {
        icon: AlertCircle,
        className: 'border-rose-300/30 bg-rose-500/15 text-rose-50',
    },
};

export default function Toast({toast, onDismiss}) {
    useEffect(() => {
        if (!toast) {
            return undefined;
        }

        const timeoutId = window.setTimeout(onDismiss, 3600);

        return () => window.clearTimeout(timeoutId);
    }, [toast, onDismiss]);

    if (!toast) {
        return null;
    }

    const variant = toastStyles[toast.type] || toastStyles.success;
    const Icon = variant.icon;

    return (
        <div
            className="fixed bottom-5 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0">
            <div
                className={`glass-panel flex items-start gap-3 rounded-xl px-4 py-3 ${variant.className}`}
                role="status"
            >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true"/>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{toast.title}</p>
                    {toast.message ? (
                        <p className="mt-0.5 line-clamp-2 text-xs text-slate-200">
                            {toast.message}
                        </p>
                    ) : null}
                </div>
                <button
                    type="button"
                    className="focus-ring rounded-md p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    onClick={onDismiss}
                    aria-label="Dismiss notification"
                >
                    <X className="h-4 w-4" aria-hidden="true"/>
                </button>
            </div>
        </div>
    );
}
