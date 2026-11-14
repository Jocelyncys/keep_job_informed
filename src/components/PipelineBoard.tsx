import React, { useState } from 'react';
import { 
  JobApplication, 
  ApplicationStage, 
  JobPlatform 
} from '../types';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Filter, 
  Search,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FileText,
  Plus,
  ArrowRightCircle,
  PartyPopper
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

interface PipelineBoardProps {
  applications: JobApplication[];
  onSelectApplication: (app: JobApplication) => void;
  onUpdateStage: (appId: string, newStage: ApplicationStage) => void;
  onOpenFollowUp: (app: JobApplication) => void;
  onOpenInterviewPrep: (app: JobApplication) => void;
  onOpenCvTailor: (app: JobApplication) => void;
  onQuickAddDemoJob: () => void;
}

const STAGES: { key: ApplicationStage; label: string; shortLabel: string; color: string; badge: string; iconBg: string }[] = [
  { key: 'applied', label: '1. Applied / Awaiting', shortLabel: 'Applied', color: 'border-slate-300 bg-slate-50', badge: 'bg-slate-100 text-slate-700', iconBg: 'bg-slate-200 text-slate-700' },
  { key: 'screening', label: '2. Under Review', shortLabel: 'Review', color: 'border-blue-300 bg-blue-50/30', badge: 'bg-blue-100 text-blue-800', iconBg: 'bg-blue-200 text-blue-800' },
  { key: 'action_required', label: '3. Action Required', shortLabel: 'Action Req', color: 'border-amber-400 bg-amber-50/40', badge: 'bg-amber-100 text-amber-900 font-bold', iconBg: 'bg-amber-400 text-amber-950' },
  { key: 'interviewing', label: '4. Interviewing', shortLabel: 'Interview', color: 'border-indigo-400 bg-indigo-50/40', badge: 'bg-indigo-100 text-indigo-900 font-semibold', iconBg: 'bg-indigo-200 text-indigo-800' },
  { key: 'offered', label: '5. Offer Received', shortLabel: 'Offered 🎉', color: 'border-emerald-400 bg-emerald-50/40', badge: 'bg-emerald-100 text-emerald-900 font-bold', iconBg: 'bg-emerald-400 text-white' },
  { key: 'archived', label: 'Closed / Inactive', shortLabel: 'Closed', color: 'border-slate-200 bg-slate-50/20', badge: 'bg-slate-100 text-slate-500', iconBg: 'bg-slate-200 text-slate-500' }
];

export const PipelineBoard: React.FC<PipelineBoardProps> = ({
  applications,
  onSelectApplication,
  onUpdateStage,
  onOpenFollowUp,
  onOpenInterviewPrep,
  onOpenCvTailor,
  onQuickAddDemoJob
}) => {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  // Calculate elapsed days
  const getDaysAgo = (dateStr: string) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(dateStr).getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || app.source === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  // Identify applications with >5 days without update
  const staleApps = applications.filter(app => {
    const days = getDaysAgo(app.lastUpdated);
    return days >= 5 && (app.stage === 'applied' || app.stage === 'screening');
  });

  // Handle fast stage advancement
  const handleAdvanceStage = (app: JobApplication, e: React.MouseEvent) => {
    e.stopPropagation();
    const stageOrder: ApplicationStage[] = ['applied', 'screening', 'action_required', 'interviewing', 'offered'];
    const currentIndex = stageOrder.indexOf(app.stage);
    if (currentIndex !== -1 && currentIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentIndex + 1];
      onUpdateStage(app.id, nextStage);
      if (nextStage === 'offered') {
        triggerConfetti();
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* Top Banner: Silence / Black-Hole Alert */}
      {staleApps.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-orange-500/10 border-2 border-amber-300 rounded-3xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-amber-500 text-white mt-0.5 shadow-md shadow-amber-500/30">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-amber-950 text-base flex items-center gap-2">
                  <span>{staleApps.length} Application{staleApps.length > 1 ? 's' : ''} in the Silence Zone (&gt;5 Days No Response)</span>
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/90 mt-1">
                  Hiring managers often get overwhelmed. A friendly, well-timed follow-up boosts candidate response rates by up to <strong>40%</strong>.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {staleApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => onOpenFollowUp(app)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-50 transition-all shadow-xs hover:scale-105 active:scale-95"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-600" />
                      <span>Follow up with {app.company} ({getDaysAgo(app.lastUpdated)}d quiet)</span>
                      <ArrowRightCircle className="w-3.5 h-3.5 text-amber-500 ml-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Bar: Search, Filters, Stats & Fast Demo */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by company, role, or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* Platform Filters */}
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Platform:</span>
          </div>
          {['all', 'LinkedIn', 'Indeed', 'JobStreet', 'Company Portal'].map((plat) => {
            const count = plat === 'all' 
              ? applications.length 
              : applications.filter(a => a.source === plat).length;

            return (
              <button
                key={plat}
                onClick={() => setPlatformFilter(plat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  platformFilter === plat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{plat === 'all' ? 'All' : plat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  platformFilter === plat ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Demo Job + View Toggle */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={onQuickAddDemoJob}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-blue-400 bg-blue-50/50 text-blue-700 hover:bg-blue-100/70 text-xs font-bold transition-all"
            title="Import a realistic sample job application"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Demo Job</span>
          </button>

          <div className="border-l border-slate-200 pl-2 flex items-center gap-1">
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'board' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Board View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              List View
            </button>
          </div>
        </div>

      </div>

      {/* Kanban Board View */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
          {STAGES.map((col) => {
            const stageApps = filteredApps.filter(app => app.stage === col.key);

            return (
              <div 
                key={col.key} 
                className="bg-slate-100/75 rounded-3xl p-3 border border-slate-200/90 flex flex-col min-h-[500px] shadow-2xs"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                      {col.shortLabel}
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold ${col.badge}`}>
                    {stageApps.length}
                  </span>
                </div>

                {/* Application Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageApps.map((app) => {
                    const daysAgo = getDaysAgo(app.lastUpdated);
                    const isStale = daysAgo >= 5 && (app.stage === 'applied' || app.stage === 'screening');

                    return (
                      <div
                        key={app.id}
                        className={`bg-white rounded-2xl p-4 border transition-all hover:shadow-lg cursor-pointer group relative ${
                          app.stage === 'action_required'
                            ? 'border-amber-400 ring-2 ring-amber-300/40 bg-gradient-to-b from-amber-50/20 to-white'
                            : app.stage === 'interviewing'
                            ? 'border-indigo-400 ring-2 ring-indigo-300/40 bg-gradient-to-b from-indigo-50/20 to-white'
                            : app.stage === 'offered'
                            ? 'border-emerald-400 ring-2 ring-emerald-300/40 bg-gradient-to-b from-emerald-50/20 to-white'
                            : 'border-slate-200/90 hover:border-blue-400'
                        }`}
                        onClick={() => onSelectApplication(app)}
                      >
                        {/* Header Badges */}
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <span className={`px-2.5 py-0.5 rounded-lg font-bold ${
                            app.source === 'LinkedIn' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            app.source === 'JobStreet' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                            app.source === 'Indeed' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                            'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {app.source}
                          </span>

                          {app.matchScore && (
                            <span className="flex items-center gap-1 font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                              <TrendingUp className="w-3 h-3 text-emerald-600" />
                              {app.matchScore}%
                            </span>
                          )}
                        </div>

                        {/* Role & Company */}
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                          {app.role}
                        </h4>
                        <p className="text-xs font-bold text-slate-700 mt-1 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.company}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{app.location}</span>
                        </p>

                        {/* Action Notice Alert */}
                        {app.actionRequiredNotice && (
                          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-amber-950 font-bold flex items-start gap-2 shadow-2xs">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{app.actionRequiredNotice}</span>
                          </div>
                        )}

                        {/* Silence Alert Card */}
                        {isStale && (
                          <div className="mt-2.5 p-2 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-950 font-bold flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-red-600" />
                              {daysAgo}d silent
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenFollowUp(app);
                              }}
                              className="text-[10px] font-black text-red-700 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded-md transition-colors"
                            >
                              Follow up
                            </button>
                          </div>
                        )}

                        {/* Interactive Stage Stepper Shortcut */}
                        {app.stage !== 'offered' && app.stage !== 'archived' && (
                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 text-[10px]">Next stage:</span>
                            <button
                              onClick={(e) => handleAdvanceStage(app, e)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-all"
                              title="Advance to next application stage"
                            >
                              <span>Next step</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {/* Quick AI Buttons */}
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
                          {app.stage === 'interviewing' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenInterviewPrep(app);
                              }}
                              className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold shadow-xs hover:shadow transition-all"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
                              <span>Prep Interview Q&A</span>
                            </button>
                          ) : app.stage === 'offered' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerConfetti();
                              }}
                              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                            >
                              <PartyPopper className="w-3.5 h-3.5" />
                              <span>Celebrate Offer! 🎉</span>
                            </button>
                          ) : (
                            <div className="flex items-center justify-between w-full">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenCvTailor(app);
                                }}
                                className="flex items-center gap-1 text-slate-700 hover:text-blue-700 font-bold py-1 px-2 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                <FileText className="w-3 h-3 text-blue-600" />
                                <span>Tailor CV</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenFollowUp(app);
                                }}
                                className="flex items-center gap-1 text-slate-700 hover:text-amber-800 font-bold py-1 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                              >
                                <Mail className="w-3 h-3 text-amber-600" />
                                <span>Follow up</span>
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}

                  {stageApps.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200/90 rounded-2xl p-8 text-center text-xs text-slate-400">
                      No jobs in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                <th className="py-4 px-5">Role & Company</th>
                <th className="py-4 px-5">Platform</th>
                <th className="py-4 px-5">Stage</th>
                <th className="py-4 px-5">Silence Status</th>
                <th className="py-4 px-5">ATS Match</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => {
                const daysAgo = getDaysAgo(app.lastUpdated);
                const isStale = daysAgo >= 5 && (app.stage === 'applied' || app.stage === 'screening');

                return (
                  <tr 
                    key={app.id}
                    onClick={() => onSelectApplication(app)}
                    className="hover:bg-slate-50/90 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-5">
                      <div className="font-extrabold text-slate-900">{app.role}</div>
                      <div className="text-xs font-semibold text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="text-slate-800">{app.company}</span>
                        <span>•</span>
                        <span>{app.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold">
                        {app.source}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <select
                        value={app.stage}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const newStage = e.target.value as ApplicationStage;
                          onUpdateStage(app.id, newStage);
                          if (newStage === 'offered') triggerConfetti();
                        }}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white shadow-2xs"
                      >
                        {STAGES.map(s => (
                          <option key={s.key} value={s.key}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-5">
                      {isStale ? (
                        <span className="inline-flex items-center gap-1 text-xs font-black text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                          <Clock className="w-3.5 h-3.5 text-red-600" />
                          {daysAgo} days quiet
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-500">
                          Updated {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      {app.matchScore ? (
                        <span className="font-extrabold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {app.matchScore}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onOpenInterviewPrep(app)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                        >
                          Interview Prep
                        </button>
                        <button
                          onClick={() => onOpenFollowUp(app)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors"
                        >
                          Follow-up
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
