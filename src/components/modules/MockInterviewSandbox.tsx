import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  BrainCircuit, 
  Award, 
  Clock, 
  ArrowRight,
  Bot,
  User,
  RotateCcw
} from 'lucide-react';

interface MockInterviewSandboxProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole?: string;
}

interface InterviewStep {
  id: number;
  question: string;
  context: string;
  suggestedPoints: string[];
  userAnswer?: string;
  aiFeedback?: {
    score: number;
    technicalDepth: string;
    communication: string;
    critique: string;
  };
}

export const MockInterviewSandbox: React.FC<MockInterviewSandboxProps> = ({
  isOpen,
  onClose,
  targetRole = "Associate Product Manager (APM) - AI & Cloud Platform"
}) => {
  const [selectedRole, setSelectedRole] = useState(targetRole);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([
    {
      id: 1,
      question: "You completed Georgia Tech's MGT 4058 (Database Systems) and the BigQuery Omni lab. How would you design a multi-cloud data architecture querying customer telemetry stored in AWS S3 from Google Cloud without incurring severe data egress costs?",
      context: "Tests ITM database architecture + Google Cloud multi-cloud federation (BigQuery Omni).",
      suggestedPoints: [
        "Deploy BigQuery Omni Anthos control plane in the AWS S3 region to process queries in-situ",
        "Avoid cross-cloud bulk data transfers; return only aggregated result sets",
        "Leverage partitioned Parquet/ORC tables in S3 to prune unnecessary byte reads"
      ]
    },
    {
      id: 2,
      question: "Contrasting your cognitive engineering coursework (PSYC 6010) with your computer science algorithms (CS 1332), how do you balance LLM inference latency against user mental models when launching an enterprise generative AI tool?",
      context: "Tests your unique divergent vector: Human-AI UX vs. Computational Engineering.",
      suggestedPoints: [
        "Implement progressive streaming tokens to align with human reading speed and reduce perceived latency",
        "Design clear cognitive affordances and prompt guardrails to prevent hallucination over-reliance",
        "Cache frequent query embeddings using vector similarity search to minimize model roundtrips"
      ]
    },
    {
      id: 3,
      question: "Imagine our engineering team suggests deploying Kubernetes across 3 regions, but your financial modeling (MGT 6500) indicates budget constraints. How do you reconcile enterprise reliability with cost optimization?",
      context: "Tests ITM Strategic Product Management & Cloud Infrastructure Tradeoffs.",
      suggestedPoints: [
        "Analyze SLA requirements: determine if active-active or active-passive cross-region failover is truly necessary",
        "Implement automated GKE cluster autoscaling and Spot VMs for non-critical batch processing",
        "Establish FinOps observability dashboards using Google Cloud Monitoring and BigQuery billing exports"
      ]
    }
  ]);

  if (!isOpen) return null;

  const currentStep = interviewSteps[currentStepIndex];

  const handleQuickAddPoint = (point: string) => {
    setInputAnswer(prev => prev ? `${prev} Additionally, ${point.toLowerCase()}.` : point);
  };

  const handleSubmitAnswer = () => {
    if (!inputAnswer.trim()) return;

    setIsEvaluating(true);

    setTimeout(() => {
      const updatedSteps = [...interviewSteps];
      updatedSteps[currentStepIndex] = {
        ...currentStep,
        userAnswer: inputAnswer,
        aiFeedback: {
          score: 93 - currentStepIndex * 2,
          technicalDepth: "Exemplary (Demonstrates GT ITM + GCP lab depth)",
          communication: "Structured & Executive-Ready",
          critique: "Strong synthesis of multi-cloud architecture and business tradeoffs. You effectively cited BigQuery Omni in-situ compute."
        }
      };

      setInterviewSteps(updatedSteps);
      setIsEvaluating(false);
      setInputAnswer('');

      if (currentStepIndex < interviewSteps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        setIsComplete(true);
      }
    }, 1200);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsComplete(false);
    setInputAnswer('');
    setInterviewSteps(prev => prev.map(s => ({ ...s, userAnswer: undefined, aiFeedback: undefined })));
  };

  const overallScore = Math.round(
    interviewSteps
      .filter(s => s.aiFeedback)
      .reduce((acc, curr) => acc + (curr.aiFeedback?.score || 0), 0) / 
    (interviewSteps.filter(s => s.aiFeedback).length || 1)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-google-gray-200 shadow-2xl relative my-8 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold">AI Mock Interview Sandbox</h2>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
                  Gemini Evaluator
                </span>
              </div>
              <p className="text-[11px] text-blue-100">
                Simulating interview for: <strong className="text-white">{selectedRole}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-google-gray-600 pb-2 border-b border-google-gray-100">
            <span className="font-semibold text-google-gray-800">
              Question {currentStepIndex + 1} of {interviewSteps.length}
            </span>
            <div className="flex items-center space-x-1.5">
              {interviewSteps.map((s, i) => (
                <div
                  key={s.id}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    s.aiFeedback
                      ? 'bg-emerald-500'
                      : i === currentStepIndex
                      ? 'bg-google-blue'
                      : 'bg-google-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Completion Screen */}
          {isComplete ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Interview Completed
                </span>
                <h3 className="text-2xl font-black text-google-gray-900 mt-1">
                  Overall Readiness Score: {overallScore}%
                </h3>
                <p className="text-xs text-google-gray-600 max-w-md mx-auto mt-1">
                  Excellent performance. Your responses seamlessly linked your Georgia Tech coursework with hands-on Google Skills labs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
                <div className="bg-google-gray-50 p-3 rounded-xl border border-google-gray-200">
                  <span className="text-[10px] text-google-gray-500 font-semibold uppercase">Technical Depth</span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">Top 5% Cohort</p>
                </div>
                <div className="bg-google-gray-50 p-3 rounded-xl border border-google-gray-200">
                  <span className="text-[10px] text-google-gray-500 font-semibold uppercase">Communication</span>
                  <p className="text-sm font-bold text-google-blue mt-0.5">Executive (L6/L7)</p>
                </div>
                <div className="bg-google-gray-50 p-3 rounded-xl border border-google-gray-200">
                  <span className="text-[10px] text-google-gray-500 font-semibold uppercase">Verified Badge</span>
                  <p className="text-sm font-bold text-purple-700 mt-0.5">Interview-Ready</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center space-x-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-google-gray-300 rounded-xl text-xs font-semibold text-google-gray-700 hover:bg-google-gray-50 flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Interview</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-bold shadow-2xs"
                >
                  Save Score to Profile &amp; Exit
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Question Card */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4.5 space-y-2">
                <div className="flex items-center space-x-2 text-google-blue">
                  <Bot className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Gemini Hiring Manager:
                  </span>
                </div>
                <p className="text-sm font-bold text-google-gray-900 leading-snug">
                  {currentStep.question}
                </p>
                <p className="text-[11px] text-google-gray-500 italic">
                  Context: {currentStep.context}
                </p>
              </div>

              {/* Talking Points Suggestions */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-google-gray-600 flex items-center">
                  <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
                  Quick Key Talking Points from your Georgia Tech &amp; Google Labs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStep.suggestedPoints.map((point, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleQuickAddPoint(point)}
                      className="text-left text-[11px] px-2.5 py-1 bg-google-gray-100 hover:bg-google-gray-200 text-google-gray-700 rounded-lg border border-google-gray-200 transition-colors"
                    >
                      + {point}
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-google-gray-800">
                  Your Answer:
                </label>
                <textarea
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  rows={4}
                  placeholder="Type your response or click suggested talking points above..."
                  className="w-full p-3 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs text-google-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2 text-[11px] text-google-gray-500">
                  <Mic className="w-3.5 h-3.5 text-google-blue animate-pulse" />
                  <span>Speech-to-text simulation ready</span>
                </div>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={isEvaluating || !inputAnswer.trim()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                    isEvaluating || !inputAnswer.trim()
                      ? 'bg-google-gray-200 text-google-gray-500 cursor-not-allowed'
                      : 'bg-google-blue hover:bg-google-blue-hover text-white shadow-2xs'
                  }`}
                >
                  <span>{isEvaluating ? 'Gemini Evaluating...' : 'Submit Response & Next'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Prior Feedback if exists */}
              {interviewSteps[currentStepIndex - 1]?.aiFeedback && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Previous Question Feedback ({interviewSteps[currentStepIndex - 1].aiFeedback?.score}%):</span>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      {interviewSteps[currentStepIndex - 1].aiFeedback?.critique}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
