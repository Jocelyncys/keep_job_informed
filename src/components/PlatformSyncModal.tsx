import React, { useState } from 'react';
import { JobApplication, JobPlatform } from '../types';
import { 
  RefreshCw, 
  CheckCircle2, 
  Link2, 
  Mail, 
  Chrome, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Check, 
  Globe 
} from 'lucide-react';

interface PlatformSyncModalProps {
  onAddApplication: (app: JobApplication) => void;
}

export const PlatformSyncModal: React.FC<PlatformSyncModalProps> = ({
  onAddApplication
}) => {
  const [pastedEmail, setPastedEmail] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState<string | null>(null);

  const platforms = [
    { name: 'LinkedIn', icon: '💼', status: 'Connected', autoSync: 'Easy Apply & InMail', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { name: 'JobStreet', icon: '🌏', status: 'Connected', autoSync: 'Southeast Asia Job Portal', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { name: 'Indeed', icon: '🔍', status: 'Connected', autoSync: 'Job alerts & Resume matches', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { name: 'Workday & Greenhouse ATS', icon: '🏢', status: 'Active via Email Sync', autoSync: 'Transactional Status Webhooks', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  ];

  const handleParseEmail = () => {
    if (!pastedEmail.trim()) return;
    setIsParsing(true);

    setTimeout(() => {
      setIsParsing(false);
      const isInterview = pastedEmail.toLowerCase().includes('interview') || pastedEmail.toLowerCase().includes('schedule');
      const isReceived = pastedEmail.toLowerCase().includes('received') || pastedEmail.toLowerCase().includes('thank you for applying');

      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        company: pastedEmail.includes('Grab') ? 'Grab' : pastedEmail.includes('Shopee') ? 'Shopee' : 'AirAsia Tech',
        role: 'Full Stack Engineer',
        location: 'Kuala Lumpur / Remote',
        source: pastedEmail.includes('JobStreet') ? 'JobStreet' : pastedEmail.includes('LinkedIn') ? 'LinkedIn' : 'Company Portal',
        appliedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        stage: isInterview ? 'interviewing' : isReceived ? 'received' : 'applied',
        jobDescription: `Extracted from email: ${pastedEmail.slice(0, 180)}...`,
        notes: `Imported via Email Sync Parser on ${new Date().toLocaleDateString()}`
      };

      onAddApplication(newApp);
      setParseSuccess(`Successfully synced: ${newApp.company} (${newApp.stage.toUpperCase()})`);
      setPastedEmail('');
      setTimeout(() => setParseSuccess(null), 4000);
    }, 1000);
  };

  const handleImportUrl = () => {
    if (!jobUrl.trim()) return;
    setIsParsing(true);

    setTimeout(() => {
      setIsParsing(false);
      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        company: 'Wise (TransferWise)',
        role: 'Senior Software Engineer (Payments)',
        location: 'Singapore / Remote',
        source: jobUrl.includes('linkedin') ? 'LinkedIn' : jobUrl.includes('indeed') ? 'Indeed' : 'Company Portal',
        appliedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        stage: 'applied',
        jobUrl: jobUrl,
        jobDescription: 'Leading financial infrastructure platform. Core skills: TypeScript, Java/Node, Microservices, Kafka.',
        notes: `Imported from URL: ${jobUrl}`
      };

      onAddApplication(newApp);
      setParseSuccess(`Imported job from URL: ${newApp.company} - ${newApp.role}`);
      setJobUrl('');
      setTimeout(() => setParseSuccess(null), 4000);
    }, 900);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-blue-600" />
          Job Platform & ATS Synchronization Hub
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Automatically pull application stages from LinkedIn, Indeed, JobStreet, and company ATS portals (Workday, Greenhouse, Lever).
        </p>
      </div>

      {/* Connected Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((plat) => (
          <div key={plat.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{plat.icon}</span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {plat.status}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{plat.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{plat.autoSync}</p>
            </div>
          </div>
        ))}
      </div>

      {parseSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{parseSuccess}</span>
        </div>
      )}

      {/* 2 Methods to Sync Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Method 1: Email Confirmation Parser */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Smart Email & ATS Status Parser
              </h3>
              <p className="text-xs text-slate-500">
                Paste any recruiter reply or "Application received" email to auto-update stage
              </p>
            </div>
          </div>

          <textarea
            rows={5}
            value={pastedEmail}
            onChange={(e) => setPastedEmail(e.target.value)}
            placeholder="Example: 'Thank you for applying to Grab for the Senior Frontend Engineer role. We have received your application and will review it shortly...'"
            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />

          <button
            onClick={handleParseEmail}
            disabled={isParsing || !pastedEmail.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all disabled:opacity-50"
          >
            {isParsing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing Email & Extracting Stage...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Parse & Update Tracking Board</span>
              </>
            )}
          </button>
        </div>

        {/* Method 2: Import by Job Link */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Import from Job Posting URL
              </h3>
              <p className="text-xs text-slate-500">
                Paste a LinkedIn, JobStreet, Indeed, or career portal link
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://www.linkedin.com/jobs/view/... or jobstreet.com.my/job/..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
            />
            <p className="text-[11px] text-slate-500">
              The AI will extract the role title, company, requirements, and create an application tracking card.
            </p>
          </div>

          <button
            onClick={handleImportUrl}
            disabled={isParsing || !jobUrl.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fetch Job & Add to Board</span>
          </button>

          {/* Browser Extension Pill */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Chrome className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-slate-700">Chrome Extension Companion</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Auto 1-Click
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
