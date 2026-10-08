import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  Award, 
  Zap, 
  ArrowRight,
  Flame,
  Activity
} from 'lucide-react';

interface OutageSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutageSimulatorModal: React.FC<OutageSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(1185); // 19:45
  const [resolvedTasks, setResolvedTasks] = useState<number[]>([]);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    if (!isOpen || isResolved) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isResolved]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const tasks = [
    {
      id: 1,
      title: "Kill Runaway BigQuery Full-Table Scan",
      desc: "Query ID `job_bq_88492` is scanning 42TB without partition pruning, burning $210 in 15 mins.",
      actionLabel: "Issue `bq cancel` & Add Partition Filter"
    },
    {
      id: 2,
      title: "Resolve GKE Kubernetes CrashLoopBackOff",
      desc: "Microservice `cart-checkout-api` exceeds memory limit (OOMKilled) under sudden load spike.",
      actionLabel: "Update Pod Memory Request (1Gi -> 2Gi) & Rolling Restart"
    },
    {
      id: 3,
      title: "Patch IAM Security Permission Leak",
      desc: "Service account `sa-analytics-dev` possesses unconstrained `roles/owner` privilege.",
      actionLabel: "Downgrade to Least-Privilege `roles/bigquery.jobUser`"
    }
  ];

  const handleToggleTask = (id: number) => {
    if (resolvedTasks.includes(id)) {
      setResolvedTasks(resolvedTasks.filter(t => t !== id));
    } else {
      const next = [...resolvedTasks, id];
      setResolvedTasks(next);
      if (next.length === tasks.length) {
        setIsResolved(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121316] text-white rounded-2xl max-w-2xl w-full border border-red-500/40 shadow-2xl relative my-8 overflow-hidden">
        
        {/* Outage Header with Timer */}
        <div className="bg-red-950/80 border-b border-red-800/60 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-300">
                  CRITICAL SEV-1 PRODUCTION INCIDENT
                </span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-mono">
                  #GCP-INCIDENT-409
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Chaos Engineering: Live Infrastructure Breakdown
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Incident Status Banner */}
        <div className="bg-red-900/30 border-b border-red-800/40 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-red-200">
            <Activity className="w-4 h-4 text-red-400 animate-spin" />
            <span>Cost Burn Rate: <strong>$540 / hour</strong> • Error Rate: <strong>28.4%</strong></span>
          </div>

          <div className="flex items-center space-x-1 font-mono font-bold text-amber-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{timeDisplay} REMAINING</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {isResolved ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  INCIDENT SUCCESSFULLY RESOLVED
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Battle-Tested Cloud Resilience Badge Earned!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  You successfully halted runaway BigQuery costs, restarted the GKE pod cluster, and patched the IAM security vulnerability before SLA breach.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl max-w-sm mx-auto text-left text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Incident Duration:</span>
                  <span className="text-white font-mono">3 mins 15 secs</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Financial Loss Averted:</span>
                  <span className="text-emerald-400 font-bold">$1,620.00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Credential Issued:</span>
                  <span className="text-google-blue font-bold">Chaos SRE Specialist (GCP)</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-google-blue hover:bg-google-blue-hover text-white text-xs font-bold rounded-xl"
              >
                Claim Resilience Badge &amp; Exit
              </button>
            </div>
          ) : (
            <>
              {/* Terminal Log */}
              <div className="bg-black/80 rounded-xl p-3.5 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-slate-500 flex items-center">
                  <Terminal className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>// Cloud Operations Real-Time Telemetry</span>
                </div>
                <div className="text-red-400">[16:34:02] ERROR: GKE Pod cart-checkout-api-7b89f OOMKilled (Exit Code 137)</div>
                <div className="text-amber-400">[16:34:15] WARN: BigQuery Billing Alert: Query job_bq_88492 cost threshold exceeded</div>
                <div className="text-red-400">[16:34:28] ALERT: IAM Policy Audit: roles/owner detected on non-admin principal</div>
              </div>

              {/* Triage Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Remediation Tasks ({resolvedTasks.length} of {tasks.length} Completed):
                </h4>

                {tasks.map(task => {
                  const isDone = resolvedTasks.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-600/50 text-slate-300'
                          : 'bg-white/5 border-white/10 hover:border-red-500/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-bold ${isDone ? 'text-emerald-400 line-through' : 'text-white'}`}>
                            {task.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {task.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-2xs'
                        }`}
                      >
                        {isDone ? '✓ Resolved' : task.actionLabel}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
