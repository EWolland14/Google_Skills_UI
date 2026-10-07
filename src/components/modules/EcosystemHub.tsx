import React, { useState } from 'react';
import { 
  Network, 
  RefreshCw, 
  CheckCircle2, 
  Database, 
  Building, 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  Activity, 
  Radio, 
  Layers, 
  Server,
  Zap,
  Globe
} from 'lucide-react';
import { ingestionPipelinesList } from '../../data/mockData';
import { IngestionPipeline } from '../../types';

interface EcosystemHubProps {
  onNavigateToView: (view: string) => void;
}

export const EcosystemHub: React.FC<EcosystemHubProps> = ({ onNavigateToView }) => {
  const [pipelines, setPipelines] = useState<IngestionPipeline[]>(ingestionPipelinesList);
  const [isSyncing, setIsSyncing] = useState(false);
  const [liveLog, setLiveLog] = useState<string[]>([
    "[15:42:01 UTC] Banner DegreeWorks Webhook: 36 credits validated for Student ID AR-88492 (Georgia Tech)",
    "[15:45:12 UTC] Google Careers Pipeline: Ingested 14 new L6/L7 AI Product Lead requisitions",
    "[15:48:30 UTC] Jobs.com / Lightcast Stream: Processed 42,000 national telemetry points; refreshed salary curves"
  ]);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setPipelines(prev => prev.map(p => ({ ...p, status: 'Syncing' })));

    setTimeout(() => {
      setLiveLog(prev => [
        `[${new Date().toISOString().substring(11, 19)} UTC] On-Demand Sync: 3 Ingestion pipelines synchronized across 903,970 records. Latency optimal.`,
        ...prev.slice(0, 5)
      ]);
      setPipelines(prev => prev.map(p => ({
        ...p,
        status: 'Healthy',
        lastSyncTimestamp: 'Just now (Synced)',
        recordsIngested: p.recordsIngested + 12
      })));
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-100 text-teal-800 rounded-full">
                Module 5 Ecosystem
              </span>
              <span className="text-xs text-google-gray-500">Cross-Platform Ingestion Pipelines</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-google-gray-900 mt-1">
              Cross-Platform Ecosystem Ingestion Hub
            </h1>
            <p className="text-xs md:text-sm text-google-gray-600 mt-1">
              Unified ingestion pipelines synchronizing University Registrar systems (Georgia Tech Banner / DegreeWorks), Google Careers Job Architecture, and real-time labor market aggregators (Jobs.com & Lightcast).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all ${
                isSyncing 
                  ? 'bg-google-gray-200 text-google-gray-600 cursor-not-allowed' 
                  : 'bg-google-blue hover:bg-google-blue-hover text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing Pipelines...' : 'Trigger Pipeline Ingestion'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* THREE LIVE INGESTION PIPELINES STATUS TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pipeline 1: Georgia Tech Registrar */}
        <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm hover:shadow-google-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                Healthy
              </span>
            </div>

            <h3 className="text-base font-bold text-google-gray-900 mb-1">
              Georgia Tech Registrar Portal
            </h3>
            <p className="text-xs text-google-gray-600 mb-4">
              Banner & DegreeWorks Academic API
            </p>

            <div className="space-y-2 text-xs text-google-gray-700 bg-google-gray-50 p-3 rounded-xl border border-google-gray-200 mb-4">
              <div className="flex justify-between">
                <span className="text-google-gray-500">Protocol:</span>
                <span className="font-semibold text-google-gray-900">OAuth2 / OIDC REST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Latency:</span>
                <span className="font-semibold text-emerald-700">142 ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Verified Records:</span>
                <span className="font-bold text-google-gray-900">48,250 Transcripts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Last Sync:</span>
                <span className="font-medium text-google-gray-700">{pipelines[0].lastSyncTimestamp}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-google-gray-500 pt-2 border-t border-google-gray-100 flex items-center justify-between">
            <span>Student AR-88492 Verified</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* Pipeline 2: Google Careers */}
        <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm hover:shadow-google-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-google-blue">
                <Building className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                Healthy
              </span>
            </div>

            <h3 className="text-base font-bold text-google-gray-900 mb-1">
              Google Careers Job Architecture
            </h3>
            <p className="text-xs text-google-gray-600 mb-4">
              Internal & External Requisition Feed
            </p>

            <div className="space-y-2 text-xs text-google-gray-700 bg-google-gray-50 p-3 rounded-xl border border-google-gray-200 mb-4">
              <div className="flex justify-between">
                <span className="text-google-gray-500">Protocol:</span>
                <span className="font-semibold text-google-gray-900">gRPC / Cloud Pub/Sub</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Latency:</span>
                <span className="font-semibold text-emerald-700">45 ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Active Roles:</span>
                <span className="font-bold text-google-gray-900">1,420 Open Positions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Last Sync:</span>
                <span className="font-medium text-google-gray-700">{pipelines[1].lastSyncTimestamp}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-google-gray-500 pt-2 border-t border-google-gray-100 flex items-center justify-between">
            <span>Direct Hiring Bridge Active</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* Pipeline 3: Jobs.com & Market Aggregators */}
        <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm hover:shadow-google-hover transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Globe className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                Healthy
              </span>
            </div>

            <h3 className="text-base font-bold text-google-gray-900 mb-1">
              Jobs.com & Labor Aggregator
            </h3>
            <p className="text-xs text-google-gray-600 mb-4">
              Real-Time National Labor Exchange
            </p>

            <div className="space-y-2 text-xs text-google-gray-700 bg-google-gray-50 p-3 rounded-xl border border-google-gray-200 mb-4">
              <div className="flex justify-between">
                <span className="text-google-gray-500">Protocol:</span>
                <span className="font-semibold text-google-gray-900">Kafka / Cloud Dataflow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Latency:</span>
                <span className="font-semibold text-emerald-700">310 ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Aggregated Jobs:</span>
                <span className="font-bold text-google-gray-900">854,300 Telemetry Records</span>
              </div>
              <div className="flex justify-between">
                <span className="text-google-gray-500">Last Sync:</span>
                <span className="font-medium text-google-gray-700">{pipelines[2].lastSyncTimestamp}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-google-gray-500 pt-2 border-t border-google-gray-100 flex items-center justify-between">
            <span>Hourly Salary Index Refreshed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

      </div>

      {/* ARCHITECTURE PIPELINE TOPOLOGY */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-google-gray-900 flex items-center">
          <Server className="w-5 h-5 text-google-blue mr-2" />
          Cross-Platform Pipeline Architecture & Data Mapping Topology
        </h3>
        <p className="text-xs text-google-gray-600">
          How raw transcripts and job requisitions are transformed into semantic vector embeddings and unified profiles:
        </p>

        <div className="bg-google-gray-900 text-white rounded-xl p-5 font-mono text-xs overflow-x-auto leading-relaxed">
          <div className="text-slate-400">// Ingestion Pipeline Flow</div>
          <div className="text-emerald-400">1. [Georgia Tech Registrar (Banner/DegreeWorks)] --(OAuth2/OIDC)--&gt; [Cloud Functions Ingest Worker]</div>
          <div className="text-blue-400">2. [Google Careers + Jobs.com Stream] ----------(Pub/Sub Stream)----&gt; [Cloud Dataflow Stream Processor]</div>
          <div className="text-amber-400">3. [Combined Records] --------------------------&gt; [Gemini 1.5 Pro Vector Embeddings & Skill Extractor]</div>
          <div className="text-purple-400">4. [Unified Career Profile Graph] ---------------&gt; [BigQuery / Cloud Spanner Index (Readiness Delta)]</div>
          <div className="text-white">5. [Google Skills Cloud Run UI] &lt;=================(Live WebSocket / REST)=== [Instant Recommendation Update]</div>
        </div>
      </div>

      {/* LIVE INGESTION STREAM LOG */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-google-gray-200 pb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-google-gray-900">
              Live Ingestion Stream Telemetry
            </h4>
          </div>
          <span className="text-[11px] text-google-gray-500 font-mono">
            Status: STREAMING_ACTIVE
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {liveLog.map((log, index) => (
            <div key={index} className="p-2.5 bg-google-gray-50 rounded-lg border border-google-gray-200 text-google-gray-800 flex items-start space-x-2">
              <Zap className="w-3.5 h-3.5 text-google-blue mt-0.5 flex-shrink-0" />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
