import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Terminal, 
  ShieldCheck, 
  Share2, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Database,
  Layers,
  Cpu
} from 'lucide-react';

interface ProofOfWorkShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
}

export const ProofOfWorkShowcase: React.FC<ProofOfWorkShowcaseProps> = ({
  isOpen,
  onClose,
  studentName = "Emmett Wolland"
}) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'terraform' | 'topology'>('sql');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText("https://skills.google.com/portfolio/emmett-wolland-gt");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const sampleSql = `-- BigQuery Omni: Cross-Cloud AWS S3 In-Situ Query
-- Authored by: Emmett Wolland (Georgia Tech ITM + CS Minor)
-- Verified against 42TB dataset in Google Cloud lab environment

CREATE OR REPLACE EXTERNAL TABLE \`enterprise_lake.aws_s3_telemetry\`
OPTIONS (
  format = 'PARQUET',
  uris = ['s3://gt-telemetry-bucket-us-east-1/partitions/year=2026/*.parquet']
);

-- Distributed in-situ query executing in AWS us-east-1 without egress penalty
SELECT 
  DATE(event_timestamp) AS event_date,
  device_platform,
  COUNT(DISTINCT user_session_id) AS active_sessions,
  APPROX_QUANTILES(latency_ms, 100)[OFFSET(95)] AS p95_latency_ms
FROM \`enterprise_lake.aws_s3_telemetry\`
WHERE _PARTITIONDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY 1, 2
ORDER BY event_date DESC;

-- Verification Result: 0 bytes cross-cloud egress. Execution time: 1.84s.`;

  const sampleTerraform = `/**
 * Terraform Infrastructure-as-Code: Multi-Region GKE Cluster
 * Authored by: Emmett Wolland (Georgia Tech ITM + CS Minor)
 * Target: Google Cloud Enterprise Resilience Architecture
 */

terraform {
  required_version = ">= 1.8.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.20.0"
    }
  }
}

resource "google_container_cluster" "primary" {
  name     = "gt-enterprise-ai-cluster"
  location = "us-central1"

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = "projects/gt-cloud/global/networks/vpc-enterprise"
  subnetwork = "projects/gt-cloud/regions/us-central1/subnetworks/subnet-ai"

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }

  workload_identity_config {
    workload_pool = "gt-cloud.svc.id.goog"
  }
}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-google-gray-200 shadow-2xl relative my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="border-b border-google-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-google-blue border border-blue-200 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-google-gray-900">
                  Interactive Live Proof of Work
                </h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  W3C Cryptographically Verified
                </span>
              </div>
              <p className="text-xs text-google-gray-500">
                Candidate: <strong>{studentName}</strong> (Georgia Tech ITM + CS Minor)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-google-gray-400 hover:text-google-gray-700 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Recruiter Share Bar */}
          <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-google-blue" />
              <span className="font-semibold text-google-gray-800">
                Shareable Recruiter Verification URL:
              </span>
              <span className="font-mono text-google-gray-600 truncate max-w-xs">
                skills.google.com/portfolio/emmett-wolland-gt
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white hover:bg-google-gray-100 border border-google-gray-300 rounded-lg text-xs font-semibold text-google-gray-800 flex items-center space-x-1 transition-colors self-end sm:self-auto"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-google-gray-500" />
                  <span>Copy Verification Link</span>
                </>
              )}
            </button>
          </div>

          {/* Artifact Selector Tabs */}
          <div className="flex items-center space-x-2 border-b border-google-gray-200 pb-2">
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'sql'
                  ? 'bg-blue-50 text-google-blue border border-blue-200'
                  : 'text-google-gray-600 hover:bg-google-gray-100'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>BigQuery Omni SQL Artifact</span>
            </button>

            <button
              onClick={() => setActiveTab('terraform')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'terraform'
                  ? 'bg-blue-50 text-google-blue border border-blue-200'
                  : 'text-google-gray-600 hover:bg-google-gray-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Terraform GKE IaC Artifact</span>
            </button>

            <button
              onClick={() => setActiveTab('topology')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'topology'
                  ? 'bg-blue-50 text-google-blue border border-blue-200'
                  : 'text-google-gray-600 hover:bg-google-gray-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Cloud Architecture Graph</span>
            </button>
          </div>

          {/* Code Viewer Panel */}
          {activeTab === 'sql' && (
            <div className="bg-[#1e1e1e] text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-700">
              <pre>{sampleSql}</pre>
            </div>
          )}

          {activeTab === 'terraform' && (
            <div className="bg-[#1e1e1e] text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-700">
              <pre>{sampleTerraform}</pre>
            </div>
          )}

          {activeTab === 'topology' && (
            <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-6 text-center space-y-3">
              <div className="max-w-md mx-auto p-4 bg-white rounded-xl border border-google-gray-300 shadow-2xs font-mono text-xs text-google-gray-800">
                [AWS S3 us-east-1] &lt;---(Anthos In-Situ RPC)---&gt; [Google BigQuery Omni Control]
                <br />
                │
                <br />
                ▼
                <br />
                [Google Cloud Run API &amp; GKE Pods] ───&gt; [Enterprise User Dashboard]
              </div>
              <p className="text-xs text-google-gray-600">
                Live sandbox simulation verified in Google Skills Lab #GCP-BQ-OMNI.
              </p>
            </div>
          )}

          {/* Verification Ledger Footer */}
          <div className="pt-2 border-t border-google-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-google-gray-500">
            <span className="font-mono text-[10px]">
              SHA-256 Hash: 0x8f4c2e91b539a2d670f5e13028c7793d562f...
            </span>
            <button
              onClick={() => alert('Launching Google Cloud Sandbox Live Test for Emmett Wolland')}
              className="px-3.5 py-1.5 bg-google-blue text-white rounded-lg text-xs font-semibold hover:bg-google-blue-hover transition-colors"
            >
              Run Interactive Recruiter Sandbox Test
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
