import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Search, 
  Sparkles, 
  Database,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap,
  Flame
} from 'lucide-react';
import { FriendProfile, FriendCourse } from '../../types';
import { initialFriendsList } from '../../data/mockData';

interface FriendsNetworkProps {
  onNavigateToView: (view: string) => void;
  currentUserMajor?: string;
  currentUserMinor?: string;
}

export const FriendsNetwork: React.FC<FriendsNetworkProps> = ({ 
  onNavigateToView,
  currentUserMajor = "Business Administration (ITM)",
  currentUserMinor = "Computer Science"
}) => {
  const [activeNetworkTab, setActiveNetworkTab] = useState<'roster' | 'studypods'>('roster');
  const [friends, setFriends] = useState<FriendProfile[]>(initialFriendsList);
  const [selectedFriendId, setSelectedFriendId] = useState<string>(initialFriendsList[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendMajor, setNewFriendMajor] = useState('');
  const [newFriendMinor, setNewFriendMinor] = useState('');
  const [newFriendCourses, setNewFriendCourses] = useState('CS 1332 (A), MGT 4058 (A), BigQuery Omni');
  const [saveConfirmation, setSaveConfirmation] = useState<string | null>(null);

  const selectedFriend = friends.find(f => f.id === selectedFriendId) || friends[0];

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.minor && f.minor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const studyPods = [
    {
      id: "pod-1",
      title: "Enterprise GenAI & MLOps Sprint Pod",
      partner: "Sarah Chen",
      partnerAvatar: "SC",
      partnerMajor: "Computer Science (ML Specialization)",
      synergyScore: 96,
      skillSwap: {
        youOffer: "ITM Business Valuation & Database Architectures (MGT 4058, MGT 6500)",
        theyOffer: "Deep Learning Architectures & Pipeline Tuning (CS 4641, CS 3600)"
      },
      goalCourse: "Deploy and Manage Generative AI Models (MLOps)",
      sprintDeadline: "14 Days Remaining",
      status: "Ready to Launch"
    },
    {
      id: "pod-2",
      title: "Cloud Infrastructure & FinOps Sprint Pod",
      partner: "Marcus Vance",
      partnerAvatar: "MV",
      partnerMajor: "Industrial & Systems Engineering (Computing Minor)",
      synergyScore: 91,
      skillSwap: {
        youOffer: "Data Structures & Systems Organization (CS 1332, CS 2110)",
        theyOffer: "Financial Risk & Queuing Systems Optimization (ISYE 6767)"
      },
      goalCourse: "Managing Cloud Infrastructure with Terraform",
      sprintDeadline: "21 Days Remaining",
      status: "Active Sprint"
    }
  ];

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName) return;

    const parsedCourses: FriendCourse[] = newFriendCourses.split(',').map((cStr, idx) => {
      const trimmed = cStr.trim();
      return {
        code: `COURSE-${idx + 1}`,
        title: trimmed,
        grade: "A",
        institution: "Georgia Tech",
        term: "Spring 2026",
        isSharedWithUser: trimmed.toLowerCase().includes('cs 1332') || trimmed.toLowerCase().includes('mgt')
      };
    });

    const initials = newFriendName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const newFriendObj: FriendProfile = {
      id: `friend-${Date.now()}`,
      name: newFriendName,
      avatar: initials || 'FR',
      institution: "Georgia Institute of Technology",
      major: newFriendMajor || "Computer Science",
      minor: newFriendMinor || "Business ITM",
      sharedCoursesCount: parsedCourses.filter(c => c.isSharedWithUser).length,
      addedAt: new Date().toISOString().split('T')[0],
      coursesTaken: parsedCourses
    };

    try {
      await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFriendObj)
      });
    } catch (e) {
      // client fallback
    }

    setFriends([newFriendObj, ...friends]);
    setSelectedFriendId(newFriendObj.id);
    setShowAddModal(false);
    setNewFriendName('');
    setNewFriendMajor('');
    setNewFriendMinor('');

    setSaveConfirmation(`Friend "${newFriendObj.name}" successfully added to database: google-skills-ui-db`);
    setTimeout(() => setSaveConfirmation(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-google-blue rounded-full border border-blue-200">
              Community &amp; Cohort Network
            </span>
            <span className="text-xs text-google-gray-500 font-mono">DB: google-skills-ui-db</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-google-gray-900 mt-1">
            Friends Network &amp; Collaborative Study Pods
          </h1>
          <p className="text-xs text-google-gray-600">
            Track Georgia Tech classmates, compare course histories, and form AI Study Pods with complementary skill swaps.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center space-x-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Friend</span>
          </button>
        </div>
      </div>

      {/* Tabs: Peer Course Roster vs Study Pod Matchmaker */}
      <div className="flex items-center space-x-6 border-b border-google-gray-200 pb-2">
        <button
          onClick={() => setActiveNetworkTab('roster')}
          className={`text-xs md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
            activeNetworkTab === 'roster'
              ? 'border-google-blue text-google-blue'
              : 'border-transparent text-google-gray-500 hover:text-google-gray-800'
          }`}
        >
          Peer Course Histories ({friends.length})
        </button>
        <button
          onClick={() => setActiveNetworkTab('studypods')}
          className={`text-xs md:text-sm font-semibold pb-2 border-b-2 transition-colors flex items-center space-x-1.5 ${
            activeNetworkTab === 'studypods'
              ? 'border-google-blue text-google-blue'
              : 'border-transparent text-google-gray-500 hover:text-google-gray-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Study Pod Matchmaker &amp; Skill Swap</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">New</span>
        </button>
      </div>

      {/* Notification Toast */}
      {saveConfirmation && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-xl text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveConfirmation}</span>
          </div>
        </div>
      )}

      {/* TAB 1: PEER ROSTER & COURSES */}
      {activeNetworkTab === 'roster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Friends Roster */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white rounded-2xl border border-google-gray-200 p-4 shadow-2xs">
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-google-gray-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search friends by name or major..."
                  className="w-full pl-9 pr-3 py-1.5 bg-google-gray-50 border border-google-gray-200 rounded-xl text-xs text-google-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredFriends.map((friend) => {
                  const isSelected = friend.id === selectedFriendId;
                  return (
                    <div
                      key={friend.id}
                      onClick={() => setSelectedFriendId(friend.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-google-blue bg-blue-50/50 shadow-2xs'
                          : 'border-google-gray-200 hover:border-google-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-google-blue text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {friend.avatar}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-google-gray-900 truncate">
                              {friend.name}
                            </h4>
                            <span className="text-[10px] text-google-blue bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                              {friend.sharedCoursesCount} shared
                            </span>
                          </div>
                          <p className="text-[11px] text-google-gray-600 truncate">
                            {friend.major}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Selected Friend's Courses */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-google-gray-200 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-google-blue text-white font-black text-sm flex items-center justify-center">
                    {selectedFriend.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-google-gray-900">{selectedFriend.name}</h3>
                    <p className="text-xs text-google-gray-600">{selectedFriend.institution}</p>
                    <p className="text-xs text-google-blue font-semibold">{selectedFriend.major}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase">Course Overlap</span>
                  <p className="text-sm font-bold text-emerald-700">{selectedFriend.sharedCoursesCount} Shared Courses</p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-google-gray-200 text-google-gray-500 font-semibold">
                      <th className="pb-2">Course Code</th>
                      <th className="pb-2">Title</th>
                      <th className="pb-2">Term</th>
                      <th className="pb-2">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-google-gray-100">
                    {selectedFriend.coursesTaken.map((course, idx) => (
                      <tr key={idx} className="hover:bg-google-gray-50">
                        <td className="py-2.5 font-bold text-google-gray-900">{course.code}</td>
                        <td className="py-2.5 font-medium text-google-gray-800">
                          {course.title}
                          {course.isSharedWithUser && (
                            <span className="ml-1.5 px-1 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">
                              Shared with Emmett
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-google-gray-600">{course.term}</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {course.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FEATURE 5 - STUDY POD MATCHMAKER & SKILL SWAP */}
      {activeNetworkTab === 'studypods' && (
        <div className="space-y-4">
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Skill-Swap Algorithm:</strong> Pairs your Georgia Tech Business ITM background with peers possessing complementary computing and MLOps proficiencies.
              </span>
            </div>
            <span className="font-bold text-[11px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
              2 High-Synergy Pods Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyPods.map((pod) => (
              <div 
                key={pod.id}
                className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs hover:shadow-google-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-google-blue bg-blue-50 px-2 py-0.5 rounded">
                      Synergy Score: {pod.synergyScore}%
                    </span>
                    <span className="text-xs text-google-gray-500 font-medium">
                      {pod.sprintDeadline}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-google-gray-900 leading-snug">
                    {pod.title}
                  </h3>

                  <div className="flex items-center space-x-2 my-2 text-xs text-google-gray-600">
                    <span className="w-6 h-6 rounded-full bg-google-blue text-white font-bold text-[10px] flex items-center justify-center">
                      {pod.partnerAvatar}
                    </span>
                    <span>Paired with <strong>{pod.partner}</strong> ({pod.partnerMajor})</span>
                  </div>

                  {/* Skill Swap Box */}
                  <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-3 text-xs space-y-2 mt-3">
                    <div>
                      <span className="text-[10px] font-bold text-google-blue uppercase">What You Teach:</span>
                      <p className="text-google-gray-800 text-[11px] mt-0.5 font-medium">{pod.skillSwap.youOffer}</p>
                    </div>
                    <div className="pt-1.5 border-t border-google-gray-200">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">What They Teach:</span>
                      <p className="text-google-gray-800 text-[11px] mt-0.5 font-medium">{pod.skillSwap.theyOffer}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-google-gray-100 flex items-center justify-between">
                  <div className="text-[11px] text-google-gray-600 truncate max-w-xs">
                    Goal: <strong>{pod.goalCourse}</strong>
                  </div>
                  <button 
                    onClick={() => alert(`Launched Study Pod sprint with ${pod.partner} for ${pod.goalCourse}!`)}
                    className="px-3.5 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white text-xs font-semibold rounded-lg shadow-2xs whitespace-nowrap"
                  >
                    Launch Pod Sprint
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POPUP MODAL: Add Friend */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-google-gray-200 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-google-gray-200 pb-3 mb-4">
              <h3 className="text-sm font-bold text-google-gray-900">Add Peer to Database</h3>
              <button onClick={() => setShowAddModal(false)} className="text-google-gray-400 hover:text-google-gray-700">✕</button>
            </div>

            <form onSubmit={handleAddFriend} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  required
                  placeholder="e.g. Jordan Lee"
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Major</label>
                <input
                  type="text"
                  value={newFriendMajor}
                  onChange={(e) => setNewFriendMajor(e.target.value)}
                  required
                  placeholder="Computer Science"
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Courses (comma-separated)</label>
                <input
                  type="text"
                  value={newFriendCourses}
                  onChange={(e) => setNewFriendCourses(e.target.value)}
                  placeholder="CS 1332, MGT 4058"
                  className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-google-blue"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 border rounded-lg text-google-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-google-blue text-white rounded-lg font-semibold">Save Friend</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
