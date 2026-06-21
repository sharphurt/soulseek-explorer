import {Activity, AlertCircle, CheckCircle2, Clock3} from "lucide-react";

const FALLBACK_RULE = {
    icon: Clock3,
    className: 'border-slate-500/40 bg-slate-700/45 text-slate-200',
};

const STATUS_RULES = [
    {
        match: s => s.includes('failed') || s.includes('error'),
        icon: AlertCircle,
        className: 'border-rose-400/30 bg-rose-500/15 text-rose-200',
    },
    {
        match: s => s.includes('completed') || s.includes('succeeded'),
        icon: CheckCircle2,
        className: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200',
    },
    {
        match: s => s.includes('queued'),
        icon: Clock3,
        className: 'border-amber-300/30 bg-amber-400/15 text-amber-200',
    },
    {
        match: s => s.includes('downloading') || s.includes('active') || s.includes('running'),
        icon: Activity,
        className: 'border-cyan-300/30 bg-cyan-400/15 text-cyan-100',
    },
];


export const getStatusMeta = (download) => {
    const state = String(download.state || '');
    const stateDescription = String(download.stateDescription || download.status || '');
    const normalized = `${state} ${stateDescription}`.toLowerCase();
    const label = stateDescription || state || 'Unknown';
    const rule = STATUS_RULES.find(r => r.match(normalized)) ?? FALLBACK_RULE;

    return {label, icon: rule.icon, className: rule.className};
}
