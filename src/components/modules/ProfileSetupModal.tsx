import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Database, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => Promise<boolean>;
  lastSavedConfirmation: string | null;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  lastSavedConfirmation
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [major, setMajor] = useState(currentProfile.major);
  const [concentration, setConcentration] = useState(currentProfile.concentration);
  const [minor, setMinor] = useState(currentProfile.minor);
  const [institution, setInstitution] = useState(currentProfile.institution);
  const [transcriptUploaded, setTranscriptUploaded] = useState(currentProfile.transcriptUploaded);
  const [transcriptFileName, setTranscriptFileName] = useState(currentProfile.transcriptFileName || 'Emmett_Wolland_GeorgiaTech_Official_Transcript.pdf');
  const [resumeUploaded, setResumeUploaded] = useState(currentProfile.resumeUploaded);
  const [resumeFileName, setResumeFileName] = useState(currentProfile.resumeFileName || 'Emmett_Wolland_Resume_2026.pdf');
  const [fieldsOfInterest, setFieldsOfInterest] = useState<string[]>(currentProfile.fieldsOfInterest);
  const [isSaving, setIsSaving] = useState(false);
  const [localConfirmation, setLocalConfirmation] = useState<string | null>(null);

  if (!isOpen) return null;

  const availableInterests = [
    "AI Product Management",
    "Cloud Enterprise Architecture",
    "IT Consulting & Digital Strategy",
    "FinTech & Data Engineering",
    "MLOps & Systems Infrastructure",
    "Human-AI Interaction (UX)",
    "Quantitative Strategy"
  ];

  const toggleInterest = (interest: string) => {
    if (fieldsOfInterest.includes(interest)) {
      setFieldsOfInterest(fieldsOfInterest.filter(i => i !== interest));
    } else {
      setFieldsOfInterest([...fieldsOfInterest, interest]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setLocalConfirmation(null);

    const updated: UserProfile = {
      ...currentProfile,
      name,
      major,
      concentration,
      minor,
      institution,
      transcriptUploaded: true,
      transcriptFileName,
      resumeUploaded: true,
      resumeFileName,
      fieldsOfInterest,
    };

    const success = await onSaveProfile(updated);
    setIsSaving(false);
    if (success) {
      setLocalConfirmation(`Successfully written to database: google-skills-ui-db`);
      setTimeout(() => {
        onClose();
      }, 1600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-google-gray-200 shadow-2xl relative my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
            <Database className="w-4 h-4" />
            <span>google-skills-ui-db Profile Synchronization</span>
          </div>

          <h2 className="text-xl md:text-2xl font-black tracking-tight">
            Welcome to Google Skills Intelligence
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-lg">
            Verify your academic identity, transcript, resume, and interest vectors. Every update is committed directly to <strong>google-skills-ui-db</strong>.
          </p>
        </div>

        {/* Prominent Database Confirmation Alert */}
        {(localConfirmation || lastSavedConfirmation) && (
          <div className="bg-emerald-500 text-white px-6 py-3 flex items-center justify-between text-xs font-bold shadow-md animate-in slide-in-from-top duration-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{localConfirmation || lastSavedConfirmation}</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
              CONFIRMED
            </span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Identity Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-google-gray-700 uppercase tracking-wider flex items-center">
              <GraduationCap className="w-4 h-4 text-google-blue mr-1.5" />
              Academic Identity & Georgia Tech Program
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Emmett Wolland"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-bold text-google-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Institution *
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs text-google-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Major *
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  required
                  placeholder="Business Administration"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium text-google-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Concentration *
                </label>
                <input
                  type="text"
                  value={concentration}
                  onChange={(e) => setConcentration(e.target.value)}
                  required
                  placeholder="ITM (Info Tech Mgmt)"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium text-google-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Minor *
                </label>
                <input
                  type="text"
                  value={minor}
                  onChange={(e) => setMinor(e.target.value)}
                  required
                  placeholder="Computer Science"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium text-google-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>
            </div>
          </div>

          {/* Transcript & Resume Upload Section */}
          <div className="space-y-3 pt-3 border-t border-google-gray-200">
            <h3 className="text-xs font-bold text-google-gray-700 uppercase tracking-wider flex items-center">
              <Upload className="w-4 h-4 text-google-blue mr-1.5" />
              Document Ingestion & Verification
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Transcript Dropzone */}
              <div 
                onClick={() => setTranscriptUploaded(true)}
                className="border-2 border-dashed border-blue-200 hover:border-google-blue bg-blue-50/30 rounded-2xl p-4 text-center cursor-pointer transition-all hover:bg-blue-50/60"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-google-blue flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-google-gray-900">
                  {transcriptUploaded ? "Official Transcript Loaded" : "Upload Georgia Tech Transcript"}
                </div>
                <p className="text-[11px] text-google-gray-600 mt-0.5 truncate">
                  {transcriptFileName}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                  ✓ Verified (42 Credits Extracted)
                </span>
              </div>

              {/* Resume Dropzone */}
              <div 
                onClick={() => setResumeUploaded(true)}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/30 rounded-2xl p-4 text-center cursor-pointer transition-all hover:bg-indigo-50/60"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-google-gray-900">
                  {resumeUploaded ? "Resume Attached" : "Upload Professional Resume"}
                </div>
                <p className="text-[11px] text-google-gray-600 mt-0.5 truncate">
                  {resumeFileName}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-bold">
                  ✓ Ready for Jobs.com Matching
                </span>
              </div>
            </div>
          </div>

          {/* Fields of Interest Section */}
          <div className="space-y-3 pt-3 border-t border-google-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-google-gray-700 uppercase tracking-wider flex items-center">
                <Sparkles className="w-4 h-4 text-amber-500 mr-1.5" />
                Fields of Interest & Career Vectors
              </h3>
              <span className="text-[11px] text-google-gray-500">
                Select areas for Jobs.com matching
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = fieldsOfInterest.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-google-blue text-white shadow-2xs font-semibold'
                        : 'bg-google-gray-100 hover:bg-google-gray-200 text-google-gray-700 border border-google-gray-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-google-gray-200 flex items-center justify-between">
            <div className="text-[11px] text-google-gray-500 font-mono flex items-center">
              <Database className="w-3.5 h-3.5 text-google-blue mr-1" />
              Target DB: <strong>google-skills-ui-db</strong>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-google-gray-300 rounded-xl text-xs font-semibold text-google-gray-700 hover:bg-google-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5"
              >
                <span>{isSaving ? 'Writing to DB...' : 'Save Profile to Database'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
