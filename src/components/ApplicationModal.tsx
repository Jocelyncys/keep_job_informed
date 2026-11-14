import React, { useState } from 'react';
import { JobApplication, ApplicationStage, JobPlatform } from '../types';
import { X, Building2, MapPin, Calendar, Clock, Sparkles, Trash2, ExternalLink } from 'lucide-react';

interface ApplicationModalProps {
  application: JobApplication | null;
  onClose: () => void;
  onSave: (app: JobApplication) => void;
  onDelete: (id: string) => void;
  onOpenFollowUp: (app: JobApplication) => void;
  onOpenInterviewPrep: (app: JobApplication) => void;
  onOpenCvTailor: (app: JobApplication) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  application,
  onClose,
  onSave,
  onDelete,
  onOpenFollowUp,
  onOpenInterviewPrep,
  onOpenCvTailor
}) => {
  if (!application) return null;

  const [formData, setFormData] = useState<JobApplication>({ ...application });

  const handleChange = (field: keyof JobApplication, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      lastUpdated: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {formData.source}
              </span>
              <span className="text-xs text-slate-400">
                Applied on {new Date(formData.appliedDate).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{formData.role}</h3>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              {formData.company} • {formData.location}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Application Stage:</label>
            <select
              value={formData.stage}
              onChange={(e) => handleChange('stage', e.target.value as ApplicationStage)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800"
            >
              <option value="applied">1. Applied / Awaiting Response</option>
              <option value="screening">2. Under Review / Screening</option>
              <option value="action_required">3. Action Required (Test / Form)</option>
              <option value="interviewing">4. Interviewing</option>
              <option value="offered">5. Offer Extended</option>
              <option value="archived">Closed / Archived</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Expected Salary / Range:</label>
            <input
              type="text"
              value={formData.salary || ''}
              onChange={(e) => handleChange('salary', e.target.value)}
              placeholder="e.g. RM 9,000 / mo or $100k/yr"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Action Required Alert (if any):</label>
            <input
              type="text"
              value={formData.actionRequiredNotice || ''}
              onChange={(e) => handleChange('actionRequiredNotice', e.target.value)}
              placeholder="e.g. Submit Take-home assignment by Sunday night"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Contact Recruiter / Manager:</label>
            <input
              type="text"
              value={formData.contactPerson?.name || ''}
              onChange={(e) => handleChange('contactPerson', { ...formData.contactPerson, name: e.target.value })}
              placeholder="Recruiter Name"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Recruiter Email:</label>
            <input
              type="email"
              value={formData.contactPerson?.email || ''}
              onChange={(e) => handleChange('contactPerson', { ...formData.contactPerson, email: e.target.value })}
              placeholder="recruiter@company.com"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Notes & Next Steps:</label>
            <textarea
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Interview impressions, questions asked, referrals..."
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Job Description Snippet:</label>
            <textarea
              rows={4}
              value={formData.jobDescription || ''}
              onChange={(e) => handleChange('jobDescription', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-mono text-[11px]"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to remove this application?")) {
                onDelete(formData.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-xs font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Application</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenInterviewPrep(formData);
              }}
              className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold"
            >
              Prep Interview
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCvTailor(formData);
              }}
              className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold"
            >
              Tailor CV
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
