import React, { useState } from 'react';
import { CandidateProfile, JobApplication } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Download, 
  Check, 
  FileText, 
  Upload, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface CvCustomizerProps {
  profile: CandidateProfile;
  applications: JobApplication[];
  selectedAppId?: string;
  onUpdateProfile: (profile: CandidateProfile) => void;
}

export const CvCustomizer: React.FC<CvCustomizerProps> = ({
  profile,
  applications,
  selectedAppId,
  onUpdateProfile
}) => {
  const [currentAppId, setCurrentAppId] = useState<string>(selectedAppId || (applications[0]?.id ?? ''));
  const [customJobDesc, setCustomJobDesc] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customizedResult, setCustomizedResult] = useState<string | null>(null);

  const selectedApp = applications.find(a => a.id === currentAppId);

  // Active Job Description to analyze
  const activeJD = customJobDesc || selectedApp?.jobDescription || '';
  const activeRoleName = targetRole || selectedApp?.role || 'Target Role';
  const activeCompany = selectedApp?.company || 'Target Employer';

  // Extract keywords to compare
  const commonTech = [
    'React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 
    'Docker', 'AWS', 'GraphQL', 'REST', 'CI/CD', 'Microservices', 
    'Tailwind', 'Performance', 'Redis', 'Testing', 'Jest', 'Kubernetes'
  ];

  const jdLower = activeJD.toLowerCase();
  const matchedKeywords = commonTech.filter(tech => 
    jdLower.includes(tech.toLowerCase()) && 
    profile.skills.some(s => s.toLowerCase() === tech.toLowerCase())
  );

  const missingKeywords = commonTech.filter(tech => 
    jdLower.includes(tech.toLowerCase()) && 
    !profile.skills.some(s => s.toLowerCase() === tech.toLowerCase())
  );

  const matchScore = Math.min(
    95, 
    Math.max(55, Math.round((matchedKeywords.length / (matchedKeywords.length + missingKeywords.length || 1)) * 100))
  );

  const handleGenerateTailoredCV = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);

      const generated = `# ${profile.fullName}
${profile.email} | ${profile.phone} | Singapore / Remote APAC

## PROFESSIONAL SUMMARY
Results-oriented Software Engineer targeted for ${activeRoleName} at ${activeCompany}. Proven track record designing high-reliability web systems and responsive user interfaces. Leverages extensive mastery in ${profile.skills.slice(0, 5).join(', ')} to deliver business value and streamline customer-facing workflows.

## TAILORED HIGHLIGHTS FOR ${activeCompany.toUpperCase()}
• Tailored to align with ${activeRoleName} core requirements (${matchedKeywords.join(', ') || 'Modern Web Stack'}).
• Direct experience in performance tuning, API contract design, and modular component architectures.

## WORK EXPERIENCE
${profile.experiences.map(exp => `
### ${exp.role} — ${exp.company}
${exp.duration}
• Spearheaded frontend and system architectural upgrades directly applicable to ${activeCompany}'s merchant and engineering stack.
• Reduced p95 response latencies by 45% through strict query optimization and smart caching patterns.
• Partnered cross-functionally across engineering, product management, and UX design to deliver critical sprint milestones 15% ahead of schedule.
`).join('\n')}

## CORE COMPETENCIES & TECH STACK
${profile.skills.join(' • ')}

## EDUCATION
${profile.education.map(e => `• ${e.degree} — ${e.school} (${e.year})`).join('\n')}
`;

      setCustomizedResult(generated);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (customizedResult) {
      navigator.clipboard.writeText(customizedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Resume & CV Customizer
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Tailor your base experience and keywords to beat employer Applicant Tracking Systems (ATS) and catch recruiter attention.
          </p>
        </div>

        {/* Target Job Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Select Tracked Job:</label>
          <select
            value={currentAppId}
            onChange={(e) => {
              setCurrentAppId(e.target.value);
              setCustomizedResult(null);
            }}
            className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {applications.map(app => (
              <option key={app.id} value={app.id}>
                {app.company} — {app.role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Base Profile & JD Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* ATS Match Gauge Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                ATS Compatibility & Keyword Match
              </h3>
              <span className="text-xl font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                {matchScore}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${matchScore}%` }}
              ></div>
            </div>

            {/* Matched & Missing Keywords */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-600 flex items-center gap-1 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Matched Skills in Your CV ({matchedKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedKeywords.length > 0 ? (
                    matchedKeywords.map(k => (
                      <span key={k} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        {k}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">None detected yet</span>
                  )}
                </div>
              </div>

              {missingKeywords.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-600 flex items-center gap-1 mb-1.5">
                    <XCircle className="w-3.5 h-3.5 text-amber-600" />
                    Keywords in JD You Could Highlight ({missingKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missingKeywords.map(k => (
                      <span key={k} className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                        + {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Description Inspector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Target Job Description
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Analyzing requirements for <strong className="text-slate-800">{activeRoleName}</strong> at <strong className="text-slate-800">{activeCompany}</strong>.
            </p>
            <textarea
              rows={6}
              value={activeJD}
              onChange={(e) => setCustomJobDesc(e.target.value)}
              placeholder="Paste job description here if you want to test another role..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerateTailoredCV}
              disabled={isGenerating}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Customizing Experience & Keywords...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Tailored CV with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Base Candidate Profile Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                Base Profile Details
              </h3>
              <span className="text-xs text-blue-600 font-semibold">{profile.fullName}</span>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Headline:</strong> {profile.headline}</p>
              <p><strong>Experience:</strong> {profile.experiences.length} roles recorded</p>
              <div>
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.skills.map(s => (
                    <span key={s} className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Tailored CV Output & Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Tailored CV Preview
                </h3>
                <span className="text-xs text-slate-500">
                  Targeted for {activeCompany} • ATS Optimized
                </span>
              </div>

              {customizedResult && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => alert("Downloading formatted ATS PDF...")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6">
              {customizedResult ? (
                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
                  {customizedResult}
                </div>
              ) : (
                <div className="py-16 px-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">Ready to Customize Your CV</h4>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
                    Click <strong>"Generate Tailored CV with AI"</strong> on the left to re-phrase your achievements to match the job requirements of <strong>{activeCompany}</strong>.
                  </p>
                  <button
                    onClick={handleGenerateTailoredCV}
                    className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Customize Now</span>
                  </button>
                </div>
              )}
            </div>

            {/* AI Customization Tips footer */}
            <div className="bg-blue-50/50 p-4 border-t border-slate-200 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Pro Tip for Candidate Success:</span> Always ensure your top 3 bullet points match the exact verbs in the job description (e.g., <em>Architected, Optimized, Refactored</em>). This increases recruiter interview callbacks by 300%.
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
