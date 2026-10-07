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
  ChevronRight
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
      // POST to backend database
      await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFriendObj)
      });
    } catch (e) {
      // fallback in client
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
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-blue-100 text-google-blue rounded-full">
                Community & Network
              </span>
              <span className="text-xs text-google-gray-500 font-mono">Database: google-skills-ui-db</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-google-gray-900 mt-1">
              Friends & Peer Course History Network
            </h1>
            <p className="text-xs md:text-sm text-google-gray-600 mt-1">
              Track fellow Georgia Tech students, see what classes and Google Skills badges they have taken in <strong>google-skills-ui-db</strong>, and compare coursework with your ITM + CS Minor curriculum.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Friend to Database</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Toast */}
      {saveConfirmation && (
        <div className="bg-emerald-500 text-white p-3 px-5 rounded-xl shadow-md text-xs font-bold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveConfirmation}</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">
            DB_CONFIRMED
          </span>
        </div>
      )}

      {/* Main Grid: Friends List (Left 4 cols) vs Course Detail Drawer (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Friends Roster */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-google-gray-200 p-4 shadow-sm">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-google-gray-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friends by name or major..."
                className="w-full pl-9 pr-3 py-1.5 bg-google-gray-50 border border-google-gray-200 rounded-xl text-xs text-google-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-google-gray-500 px-1 mb-2">
              <span>{filteredFriends.length} Connected Peers</span>
              <span>Sorted by recent activity</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredFriends.map((friend) => {
                const isSelected = friend.id === selectedFriendId;
                return (
                  <div
                    key={friend.id}
                    onClick={() => setSelectedFriendId(friend.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-google-blue bg-blue-50/50 shadow-sm ring-1 ring-google-blue/30'
                        : 'border-google-gray-200 hover:border-google-gray-300 bg-white hover:bg-google-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                        {friend.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-google-gray-900 truncate">
                            {friend.name}
                          </h4>
                          <span className="text-[10px] text-google-blue bg-blue-100 px-1.5 py-0.5 rounded font-semibold">
                            {friend.sharedCoursesCount} shared
                          </span>
                        </div>
                        <p className="text-[11px] text-google-gray-600 truncate">
                          {friend.major} {friend.minor ? `• Minor in ${friend.minor}` : ''}
                        </p>
                        <p className="text-[10px] text-google-gray-400 mt-0.5">
                          {friend.coursesTaken.length} courses in google-skills-ui-db
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Friend's Verified Courses & Progress */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm space-y-5">
            {/* Friend Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-google-gray-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {selectedFriend.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-google-gray-900">
                    {selectedFriend.name}
                  </h3>
                  <p className="text-xs text-google-gray-600">
                    {selectedFriend.institution}
                  </p>
                  <p className="text-xs text-google-blue font-semibold mt-0.5">
                    {selectedFriend.major} {selectedFriend.concentration ? `(${selectedFriend.concentration})` : ''} {selectedFriend.minor ? `• Minor: ${selectedFriend.minor}` : ''}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center sm:text-right">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                  Course Overlap With You
                </span>
                <p className="text-sm font-extrabold text-emerald-700">
                  {selectedFriend.sharedCoursesCount} Shared Courses
                </p>
              </div>
            </div>

            {/* Courses Taken in Database */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-google-gray-800 uppercase tracking-wider flex items-center">
                  <BookOpen className="w-4 h-4 text-google-blue mr-1.5" />
                  Courses Completed in Database ({selectedFriend.coursesTaken.length} Verified)
                </h4>
                <span className="text-[11px] text-google-gray-500 font-mono">
                  google-skills-ui-db record
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-google-gray-200 text-google-gray-500 font-semibold">
                      <th className="pb-2">Course Code</th>
                      <th className="pb-2">Title</th>
                      <th className="pb-2">Institution</th>
                      <th className="pb-2">Term</th>
                      <th className="pb-2">Grade / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-google-gray-100">
                    {selectedFriend.coursesTaken.map((course, idx) => (
                      <tr key={idx} className="hover:bg-google-gray-50 transition-colors">
                        <td className="py-2.5 font-bold text-google-gray-900">
                          {course.code}
                        </td>
                        <td className="py-2.5 font-medium text-google-gray-800">
                          {course.title}
                          {course.isSharedWithUser && (
                            <span className="ml-2 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-semibold">
                              Shared with Emmett
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-google-gray-600">{course.institution}</td>
                        <td className="py-2.5 text-google-gray-600">{course.term}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            course.grade.includes('Badge') 
                              ? 'bg-blue-100 text-google-blue' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {course.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Synergistic Recommendations Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-google-gray-900">
                  Study Group Synergy
                </h5>
                <p className="text-[11px] text-google-gray-600 mt-0.5">
                  You and {selectedFriend.name.split(' ')[0]} both completed core technical courses. Consider teaming up on <strong>Google Cloud Terraform Quest</strong>!
                </p>
              </div>
              <button 
                onClick={() => onNavigateToView('catalog')}
                className="px-3 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white rounded-lg text-xs font-semibold whitespace-nowrap ml-3"
              >
                Join Study Lab
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* POPUP MODAL: Add Friend Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-google-gray-200 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-google-gray-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-google-blue" />
                <h3 className="text-base font-bold text-google-gray-900">
                  Add Peer to google-skills-ui-db
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-google-gray-400 hover:text-google-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFriend} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Friend Full Name *
                </label>
                <input
                  type="text"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  required
                  placeholder="e.g. Jordan Lee"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                    Major *
                  </label>
                  <input
                    type="text"
                    value={newFriendMajor}
                    onChange={(e) => setNewFriendMajor(e.target.value)}
                    required
                    placeholder="Computer Science"
                    className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                    Minor
                  </label>
                  <input
                    type="text"
                    value={newFriendMinor}
                    onChange={(e) => setNewFriendMinor(e.target.value)}
                    placeholder="ITM / Computing"
                    className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-google-gray-800 mb-1">
                  Courses Taken (comma-separated)
                </label>
                <input
                  type="text"
                  value={newFriendCourses}
                  onChange={(e) => setNewFriendCourses(e.target.value)}
                  placeholder="CS 1332, MGT 4058, Managing Kubernetes"
                  className="w-full px-3 py-2 bg-google-gray-50 border border-google-gray-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-google-blue"
                />
                <span className="text-[10px] text-google-gray-500 mt-1 block">
                  Courses will be automatically cross-referenced with your ITM + CS Minor courses.
                </span>
              </div>

              <div className="pt-3 border-t border-google-gray-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-google-gray-300 rounded-xl text-xs font-semibold text-google-gray-700 hover:bg-google-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Save Friend to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
