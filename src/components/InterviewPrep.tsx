import React, { useState, useEffect } from 'react';
import { JobApplication, InterviewQuestion } from '../types';
import { sampleInterviewQuestions } from '../data/initialData';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  FileCheck, 
  Briefcase, 
  Brain, 
  MessageSquare, 
  BookOpen,
  ArrowRight,
  Lightbulb,
  Award,
  Play,
  RotateCcw,
  Check,
  Timer
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

interface InterviewPrepProps {
  applications: JobApplication[];
  selectedAppId?: string;
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({
  applications,
  selectedAppId
}) => {
  const [currentAppId, setCurrentAppId] = useState<string>(selectedAppId || 'app-2');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('q-1');
  const [practiceNotes, setPracticeNotes] = useState<Record<string, string>>({});
  const [masteredQuestions, setMasteredQuestions] = useState<Record<string, boolean>>({});
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Practice Timer (2 minutes / 120 seconds standard for behavioral questions)
  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const selectedApp = applications.find(a => a.id === currentAppId) || applications[0];
  const questions: InterviewQuestion[] = 
    sampleInterviewQuestions[currentAppId] || sampleInterviewQuestions['default'];

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'Technical', label: 'Technical & Architecture' },
    { key: 'Behavioral (STAR)', label: 'Behavioral (STAR Method)' },
    { key: 'Resume Deep Dive', label: 'Resume Verification' },
    { key: 'Questions to Ask Interviewer', label: 'Questions to Ask Interviewer' }
  ];

  const filteredQuestions = activeCategory === 'all'
    ? questions
    : questions.filter(q => q.category === activeCategory);

  const handleToggle = (id: string) => {
    setExpandedQuestionId(prev => prev === id ? null : id);
  };

  const handleSaveNote = (qId: string, note: string) => {
    setPracticeNotes(prev => ({ ...prev, [qId]: note }));
  };

  const toggleMastered = (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !masteredQuestions[qId];
    setMasteredQuestions(prev => ({ ...prev, [qId]: nextState }));
    if (nextState) {
      triggerConfetti();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const masteredCount = Object.values(masteredQuestions).filter(Boolean).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Interview Success & Preparation Coach
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                AI questions, STAR method answer frameworks, and practice timer customized for each company.
              </p>
            </div>
          </div>
        </div>

        {/* Company Selector & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-600">Company:</label>
            <select
              value={currentAppId}
              onChange={(e) => {
                setCurrentAppId(e.target.value);
                setExpandedQuestionId(null);
              }}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            >
              {applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.company} — {app.role}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCheatSheet(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>1-Page Cheat Sheet</span>
          </button>
        </div>
      </div>

      {/* Interactive Practice Bar & Timer */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Target Role</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-800 text-indigo-200 font-semibold">{selectedApp.source}</span>
          </div>
          <h3 className="font-extrabold text-lg sm:text-xl text-white">
            {selectedApp.role} @ {selectedApp.company}
          </h3>
          <p className="text-xs text-indigo-200">
            Mastered: <strong>{masteredCount} of {questions.length}</strong> questions ({Math.round((masteredCount / (questions.length || 1)) * 100)}%)
          </p>
        </div>

        {/* 2-Minute Interview Answer Timer */}
        <div className="bg-white/10 backdrop-blur border border-white/20 p-3 rounded-2xl flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-amber-300 animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-300 block">2-Min Answer Timer</span>
              <span className="font-mono text-xl font-black text-amber-300">{formatTime(secondsLeft)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-white/20">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-xs"
              title={isTimerRunning ? "Pause" : "Start"}
            >
              <Play className={`w-3.5 h-3.5 ${isTimerRunning ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setSecondsLeft(120);
              }}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
              activeCategory === cat.key
                ? 'bg-indigo-600 text-white shadow-xs scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/90'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedQuestionId === q.id;
          const isMastered = masteredQuestions[q.id];

          return (
            <div 
              key={q.id}
              className={`bg-white rounded-3xl border transition-all shadow-xs overflow-hidden ${
                isExpanded ? 'border-indigo-400 ring-4 ring-indigo-100' : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Question Header Card */}
              <div 
                onClick={() => handleToggle(q.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        q.category.includes('Technical') ? 'bg-blue-100 text-blue-800' :
                        q.category.includes('STAR') ? 'bg-amber-100 text-amber-900' :
                        q.category.includes('Resume') ? 'bg-emerald-100 text-emerald-900' :
                        'bg-purple-100 text-purple-900'
                      }`}>
                        {q.category}
                      </span>
                      {isMastered && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Mastered
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base mt-2 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleMastered(q.id, e)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isMastered 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Mark as ready/mastered"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{isMastered ? 'Ready' : 'Mark Ready'}</span>
                  </button>

                  <div className="text-slate-400 hover:text-slate-700 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Coaching Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs">

                  {/* Why this matters */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
                    <Brain className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-slate-800">What the Interviewer Is Actually Looking For:</span>
                      <p className="text-slate-600 mt-0.5 leading-relaxed font-medium">{q.whyItMatters}</p>
                    </div>
                  </div>

                  {/* STAR Method Hint */}
                  {q.starTip && (
                    <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-2xl space-y-2.5">
                      <div className="font-extrabold text-amber-950 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Recommended STAR Answer Framework (Mapped to Your Projects):</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-800">
                        <div className="bg-white p-3 rounded-xl border border-amber-200">
                          <strong className="text-amber-800 block text-[11px]">S (Situation):</strong>
                          <span className="text-slate-700">{q.starTip.situation}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-amber-200">
                          <strong className="text-amber-800 block text-[11px]">T (Task):</strong>
                          <span className="text-slate-700">{q.starTip.task}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-amber-200">
                          <strong className="text-amber-800 block text-[11px]">A (Action):</strong>
                          <span className="text-slate-700">{q.starTip.action}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-amber-200">
                          <strong className="text-amber-800 block text-[11px]">R (Result):</strong>
                          <span className="text-slate-700">{q.starTip.result}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggested Model Answer */}
                  <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-1.5">
                    <div className="font-extrabold text-emerald-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Model Answer Strategy:</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-sans text-xs font-normal">
                      {q.suggestedAnswer}
                    </p>
                  </div>

                  {/* Practice Notes Area */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-bold text-slate-700">
                        Your Personal Answer Draft / Talking Points:
                      </label>
                      <span className="text-[11px] text-indigo-600 font-semibold">Auto-saved</span>
                    </div>
                    <textarea
                      rows={3}
                      value={practiceNotes[q.id] || ''}
                      onChange={(e) => handleSaveNote(q.id, e.target.value)}
                      placeholder="Jot down numbers, names of systems, or metrics you want to mention..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                    />
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* 1-Page Cheat Sheet Modal */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {selectedApp.company} — 1-Page Interview Cheat Sheet
                </h3>
                <p className="text-xs text-slate-500">Quick refresh for {selectedApp.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Cheat Sheet</span>
                </button>
                <button
                  onClick={() => setShowCheatSheet(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border">
                <h4 className="font-bold text-slate-900 mb-1">Target Role Details</h4>
                <p><strong>Company:</strong> {selectedApp.company} | <strong>Role:</strong> {selectedApp.role}</p>
                <p><strong>Contact Recruiter:</strong> {selectedApp.contactPerson?.name || 'Recruiting Team'} ({selectedApp.contactPerson?.email || 'N/A'})</p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 mb-2">High-Frequency Questions & Key Strategies:</h4>
                <div className="space-y-3">
                  {questions.map((q, i) => (
                    <div key={q.id} className="p-3.5 border rounded-2xl bg-white space-y-1">
                      <p className="font-extrabold text-slate-900">{i + 1}. {q.question}</p>
                      <p className="text-slate-600"><strong>Strategy:</strong> {q.suggestedAnswer}</p>
                      {practiceNotes[q.id] && (
                        <p className="mt-1 text-indigo-800 bg-indigo-50/70 p-2 rounded-lg font-medium">
                          <strong>My Talking Points:</strong> {practiceNotes[q.id]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
