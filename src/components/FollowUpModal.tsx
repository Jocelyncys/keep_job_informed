import React, { useState } from 'react';
import { JobApplication } from '../types';
import { Mail, Copy, Check, ExternalLink, X, Clock, Sparkles } from 'lucide-react';

interface FollowUpModalProps {
  application: JobApplication | null;
  onClose: () => void;
}

export const FollowUpModal: React.FC<FollowUpModalProps> = ({
  application,
  onClose
}) => {
  if (!application) return null;

  const [tone, setTone] = useState<'polite' | 'value' | 'urgent'>('polite');
  const [copied, setCopied] = useState(false);

  const contactName = application.contactPerson?.name || "Hiring Team";
  const contactEmail = application.contactPerson?.email || "recruitment@" + application.company.toLowerCase().replace(/[^a-z0-9]/g, '') + ".com";

  const templates = {
    polite: {
      subject: `Following up on Application for ${application.role} - Alex Chen`,
      body: `Dear ${contactName},

I hope this email finds you well.

I am writing to politely follow up on my application for the ${application.role} position at ${application.company}, which I submitted recently via ${application.source}.

I remain very enthusiastic about the opportunity to contribute to ${application.company}'s engineering initiatives. Could you please let me know if there are any updates regarding the hiring timeline, or if you need any additional portfolio samples or information from my side?

Thank you very much for your time and consideration.

Best regards,
Alex Chen
+60 12-345 6789
alex.chen.dev@example.com`
    },
    value: {
      subject: `Update & Continued Interest in ${application.role} at ${application.company}`,
      body: `Hi ${contactName},

I wanted to touch base regarding the ${application.role} role at ${application.company}.

Since submitting my application, I recently completed a project involving high-performance frontend optimization and microservices, which directly reflects the key goals outlined in ${application.company}'s engineering roadmap.

I would love to discuss how my background can help your team ship reliable products faster. Looking forward to any updates on next steps when convenient.

Warm regards,
Alex Chen
alex.chen.dev@example.com`
    },
    urgent: {
      subject: `Status Update - ${application.role} / Application Timeline - Alex Chen`,
      body: `Dear ${contactName},

I hope you are having a productive week.

I am checking in on the status of my application for ${application.role}. ${application.company} remains my top choice; however, I am currently navigating timelines with another interview process and wanted to respectfully check where things stand with your team so I can plan accordingly.

Please let me know if we can schedule a brief conversation or if there are next steps in progress.

Thank you again for your consideration!

Sincerely,
Alex Chen`
    }
  };

  const currentTemplate = templates[tone];

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${currentTemplate.subject}\n\n${currentTemplate.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Follow-up Email Generator
              </h3>
              <p className="text-xs text-slate-500">
                Break the silence with {application.company}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tone Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Email Tone:</span>
          <button
            onClick={() => setTone('polite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tone === 'polite' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Polite Status Check (5-7d)
          </button>
          <button
            onClick={() => setTone('value')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tone === 'value' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Value-Add Project Update
          </button>
          <button
            onClick={() => setTone('urgent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tone === 'urgent' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Timeline / Competing Offer
          </button>
        </div>

        {/* Email Subject & Body Box */}
        <div className="space-y-2 text-xs">
          <div>
            <label className="font-semibold text-slate-700">Recipient:</label>
            <div className="p-2 bg-slate-50 border rounded-lg text-slate-800 font-mono">
              {contactName} &lt;{contactEmail}&gt;
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700">Subject:</label>
            <div className="p-2 bg-slate-50 border rounded-lg text-slate-800 font-medium">
              {currentTemplate.subject}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700">Message Body:</label>
            <div className="p-3 bg-slate-50 border rounded-lg text-slate-800 whitespace-pre-wrap font-sans text-xs leading-relaxed max-h-56 overflow-y-auto">
              {currentTemplate.body}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t">
          <a
            href={`mailto:${contactEmail}?subject=${encodeURIComponent(currentTemplate.subject)}&body=${encodeURIComponent(currentTemplate.body)}`}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Email Client</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
