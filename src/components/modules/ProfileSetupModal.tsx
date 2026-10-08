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
  ArrowRight
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
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-google-gray-300 shadow-2xl relative my-8 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="border-b border-google-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-google-gray-900">
              Profile &amp; Academic Settings
            </h2>
            <p className="text-xs text-google-gray-500">
              Target Database: <span className="font-mono text-google-blue">google-skills-ui-db</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-google-gray-500 hover:text-google-gray-800 p-1 rounded-full hover:bg-google-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Alert */}
        {(localConfirmation || lastSavedConfirmation) && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-6 py-2.5 flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{localConfirmation || lastSavedConfirmation}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Identity Section */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-google-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Emmett Wolland"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-lg text-xs font-semibold text-google-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-700 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-lg text-xs text-google-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-google-gray-700 mb-1">
                  Major
                </label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 bg-google-gray-50 border border-google-gray-300 rounded-lg text-xs text-google-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-700 mb-1">
                  Concentration
                </label>
                <input
                  type="text"
                  value={concentration}
                  onChange={(e) => setConcentration(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 bg-google-gray-50 border border-google-gray-300 rounded-lg text-xs text-google-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-700 mb-1">
                  Minor
                </label>
                <input
                  type="text"
                  value={minor}
                  onChange={(e) => setMinor(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 bg-google-gray-50 border border-google-gray-300 rounded-lg text-xs text-google-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-3 pt-3 border-t border-google-gray-100">
            <h3 className="text-xs font-bold text-google-gray-700 uppercase tracking-wider">
              Documents &amp; Verification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Transcript */}
              <div 
                onClick={() => setTranscriptUploaded(true)}
                className="border border-google-gray-300 hover:border-google-blue bg-google-gray-50 rounded-xl p-3 text-center cursor-pointer transition-colors"
              >
                <FileText className="w-5 h-5 text-google-blue mx-auto mb-1" />
                <p className="text-xs font-bold text-google-gray-800">Georgia Tech Transcript</p>
                <p className="text-[10px] text-google-gray-500 truncate">{transcriptFileName}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700">
                  ✓ 42 Credits Verified
                </span>
              </div>

              {/* Resume */}
              <div 
                onClick={() => setResumeUploaded(true)}
                className="border border-google-gray-300 hover:border-google-blue bg-google-gray-50 rounded-xl p-3 text-center cursor-pointer transition-colors"
              >
                <Briefcase className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-google-gray-800">Professional Resume</p>
                <p className="text-[10px] text-google-gray-500 truncate">{resumeFileName}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700">
                  ✓ Ready for Jobs.com
                </span>
              </div>
            </div>
          </div>

          {/* Fields of Interest Section */}
          <div className="space-y-2 pt-3 border-t border-google-gray-100">
            <h3 className="text-xs font-bold text-google-gray-700 uppercase tracking-wider">
              Career Interests
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {availableInterests.map((interest) => {
                const isSelected = fieldsOfInterest.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      isSelected
                        ? 'bg-google-blue text-white font-medium shadow-2xs'
                        : 'bg-google-gray-100 hover:bg-google-gray-200 text-google-gray-700'
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
          <div className="pt-4 border-t border-google-gray-200 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-google-gray-300 rounded-lg text-xs font-medium text-google-gray-700 hover:bg-google-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-lg text-xs font-medium shadow-2xs transition-colors flex items-center space-x-1.5"
            >
              <span>{isSaving ? 'Saving...' : 'Save to Database'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
