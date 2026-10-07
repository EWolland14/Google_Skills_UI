import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Download, 
  Key, 
  Share2, 
  Sparkles,
  Search,
  ChevronRight
} from 'lucide-react';
import { corporateMandatesData } from '../../data/mockData';
import { ProofOfLiteracy } from '../../types';

interface EnterpriseB2BProps {
  onNavigateToView: (view: string) => void;
}

export const EnterpriseB2B: React.FC<EnterpriseB2BProps> = ({ onNavigateToView }) => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const sampleProofOfLiteracy: ProofOfLiteracy = {
    recipientName: "Alex Rivera",
    employeeId: "EMP-GT-88492",
    organization: "Alphabet Enterprise Client Network",
    credentialTitle: "Enterprise Generative AI & Cloud Architecture Proof of Literacy",
    issueDate: "October 07, 2026",
    verificationHash: "0x8f4c2e91b539a2d670f5e13028c7793d562f7596adba71e0c384812a61f22b79",
    standardsCompliance: ["W3C Verifiable Credentials 2.0", "SOC2 Type II Skill Audit", "NIST AI RMF 1.0"],
    skillsDemonstrated: [
      "Enterprise LLM Guardrails & Prompt Engineering",
      "BigQuery Multi-Cloud Data Analytics",
      "Kubernetes Enterprise Security",
      "Cloud Cost & Architecture Optimization"
    ]
  };

  const handleSendNudge = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-google-blue rounded-full">
                Module 4 B2B Layer
              </span>
              <span className="text-xs text-google-gray-500">Corporate Governance & Compliance</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-google-gray-900 mt-1">
              Enterprise "Proof of Literacy" Framework
            </h1>
            <p className="text-xs md:text-sm text-google-gray-600 mt-1">
              Enable enterprise organizations to mandate ongoing skill literacy, audit cross-departmental skill debt, and issue tamper-evident credentials.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-4 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Inspect My Proof of Literacy</span>
            </button>
          </div>
        </div>
      </div>

      {/* CORPORATE MANDATE BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-lg border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold rounded-full">
                Active Corporate Mandate
              </span>
              <span className="text-xs text-indigo-300">
                Organization: {corporateMandatesData.organization}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              {corporateMandatesData.title}
            </h2>
            <p className="text-xs text-slate-300">
              Mandatory completion required for all cloud architects, product leads, and data strategists to maintain active production deployment rights.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Compliance Rate</p>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">
                {corporateMandatesData.compliancePercentage}%
              </p>
              <p className="text-[10px] text-slate-400">2,605 / 3,200 Certified</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Time Remaining</p>
              <p className="text-2xl font-black text-amber-400 mt-0.5">
                {corporateMandatesData.daysRemaining} Days
              </p>
              <p className="text-[10px] text-slate-400">Due {corporateMandatesData.deadline}</p>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col justify-center">
              <button
                onClick={handleSendNudge}
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded-lg shadow-sm transition-colors text-center"
              >
                {notificationSent ? 'Nudge Dispatched!' : 'Dispatch Nudge'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DEPARTMENTAL SKILL DEBT HEATMAP */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-google-gray-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-google-gray-900 flex items-center">
              <Building2 className="w-5 h-5 text-google-blue mr-2" />
              Departmental Skill Debt Matrix & Literacy Heatmap
            </h3>
            <p className="text-xs text-google-gray-600">
              Real-time audit across business units highlighting skill deficits before enterprise security and deployment audits.
            </p>
          </div>
          <span className="text-xs font-semibold text-google-gray-600">
            Audit Standard: SOC2 Type II Certified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {corporateMandatesData.departments.map((dept, idx) => {
            const isCritical = dept.skillDebtStatus === 'Critical';
            const isModerate = dept.skillDebtStatus === 'Moderate';
            return (
              <div 
                key={idx}
                className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isCritical 
                    ? 'border-red-300 bg-red-50/40' 
                    : isModerate 
                    ? 'border-amber-300 bg-amber-50/40'
                    : 'border-emerald-200 bg-emerald-50/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-google-gray-600 font-medium">
                      {dept.headcount} Team Members
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCritical ? 'bg-red-200 text-red-900' :
                      isModerate ? 'bg-amber-200 text-amber-900' :
                      'bg-emerald-200 text-emerald-900'
                    }`}>
                      {dept.skillDebtStatus} Skill Debt
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-google-gray-900 mb-2">
                    {dept.name}
                  </h4>

                  {/* Progress bar */}
                  <div className="w-full bg-google-gray-200 h-2 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-red-500' :
                        isModerate ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${dept.complianceRate}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-google-gray-700 font-semibold">
                    <span>Literacy Completed:</span>
                    <span>{dept.complianceRate}%</span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-google-gray-200/60">
                  <button 
                    onClick={() => onNavigateToView('catalog')}
                    className="w-full py-1.5 text-xs font-semibold rounded-lg bg-white border border-google-gray-300 text-google-gray-800 hover:bg-google-gray-50 flex items-center justify-center space-x-1"
                  >
                    <span>Assign Bridge Track</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VERIFIABLE CREDENTIAL & CRYPTOGRAPHIC PROOF CARD */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-google-gray-200 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-google-blue">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-google-gray-900">
                Alex Rivera: Verified "Proof of Literacy" Token
              </h3>
              <p className="text-xs text-google-gray-600">
                Cryptographically anchored on-chain ledger with W3C Verifiable Credentials standard.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Active Mandate Satisfied
            </span>
          </div>
        </div>

        <div className="bg-google-gray-50 rounded-xl p-4 border border-google-gray-200 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-google-gray-500 font-medium">Employee Name & ID:</span>
              <p className="font-bold text-google-gray-900 mt-0.5">{sampleProofOfLiteracy.recipientName} ({sampleProofOfLiteracy.employeeId})</p>
            </div>
            <div>
              <span className="text-google-gray-500 font-medium">Issued By Organization:</span>
              <p className="font-bold text-google-gray-900 mt-0.5">{sampleProofOfLiteracy.organization}</p>
            </div>
            <div>
              <span className="text-google-gray-500 font-medium">Issue Date & Validity:</span>
              <p className="font-bold text-google-gray-900 mt-0.5">{sampleProofOfLiteracy.issueDate} (Valid 2 Years)</p>
            </div>
          </div>

          <div className="pt-2 border-t border-google-gray-200">
            <span className="text-[11px] font-bold text-google-gray-500 uppercase flex items-center">
              <Key className="w-3 h-3 mr-1 text-google-blue" />
              Tamper-Evident SHA-256 Hash
            </span>
            <div className="font-mono text-[11px] text-google-gray-800 bg-white p-2 rounded border border-google-gray-200 mt-1 truncate">
              {sampleProofOfLiteracy.verificationHash}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {sampleProofOfLiteracy.standardsCompliance.map((std, i) => (
                <span key={i} className="text-[10px] font-semibold bg-blue-100 text-google-blue px-2 py-0.5 rounded">
                  ✓ {std}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="px-3 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Verifiable Credential</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL: Certificate Preview */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-google-blue/30 p-8 shadow-2xl relative">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-google-gray-400 hover:text-google-gray-700 text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 mx-auto flex items-center justify-center text-google-blue">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-google-gray-900 tracking-tight">
                Enterprise Proof of Literacy
              </h2>
              <p className="text-xs text-google-gray-500 uppercase tracking-widest font-semibold">
                Google Skills B2B Compliance & Verification Protocol
              </p>
            </div>

            <div className="bg-google-gray-50 rounded-2xl p-6 border border-google-gray-200 space-y-4 text-center">
              <p className="text-xs text-google-gray-600">This certifies that</p>
              <h3 className="text-xl font-bold text-google-blue">
                {sampleProofOfLiteracy.recipientName}
              </h3>
              <p className="text-xs text-google-gray-700 max-w-lg mx-auto">
                has successfully completed all required academic and cloud competencies fulfilling the <strong>{sampleProofOfLiteracy.credentialTitle}</strong> mandate under <strong>{sampleProofOfLiteracy.organization}</strong>.
              </p>

              <div className="grid grid-cols-2 gap-2 text-left pt-3 border-t border-google-gray-200">
                {sampleProofOfLiteracy.skillsDemonstrated.map((skill, idx) => (
                  <div key={idx} className="text-xs text-google-gray-800 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 flex-shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-google-gray-200 font-mono text-[10px] text-google-gray-500 break-all">
                Hash: {sampleProofOfLiteracy.verificationHash}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 border border-google-gray-300 rounded-xl text-xs font-semibold text-google-gray-700 hover:bg-google-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Proof of Literacy downloaded as W3C Verifiable Credential JSON-LD');
                  setShowCertificateModal(false);
                }}
                className="px-4 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Download PDF / JSON-LD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
