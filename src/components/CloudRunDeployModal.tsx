import React, { useState } from 'react';
import { X, Cloud, Terminal, Check, Copy, ExternalLink, ShieldCheck, Zap, Server } from 'lucide-react';

interface CloudRunDeployModalProps {
  onClose: () => void;
}

export const CloudRunDeployModal: React.FC<CloudRunDeployModalProps> = ({ onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const command = `gcloud run deploy candidate-hub --source . --port 8080 --region us-central1 --allow-unauthenticated`;

  const copyCommand = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Deploy to Google Cloud Run
              </h3>
              <p className="text-xs text-slate-500">
                The fastest, 1-command serverless container deployment
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Why Cloud Run is Great here */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>1-Command Push</span>
            </div>
            <p className="text-slate-600">Uses Cloud Run Source-to-Cloud build. No manual Docker registry required.</p>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
              <Server className="w-4 h-4 text-emerald-600" />
              <span>100% Free Tier</span>
            </div>
            <p className="text-slate-600">Scales to zero when not in use. Generous Google Cloud free tier covers personal apps.</p>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/80">
            <div className="flex items-center gap-1.5 font-bold text-purple-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Auto HTTPS & CDN</span>
            </div>
            <p className="text-slate-600">Automatic SSL certificate, custom domain support, and global low-latency edge.</p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            The 3-Step Easiest Deployment:
          </h4>

          {/* Step 1 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Step 1: Authenticate Google Cloud CLI</span>
              <button
                onClick={() => copyCommand("gcloud auth login", 1)}
                className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px]">
              gcloud auth login
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Step 2: Set your GCP Project ID</span>
              <button
                onClick={() => copyCommand("gcloud config set project YOUR_PROJECT_ID", 2)}
                className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 2 ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px]">
              gcloud config set project YOUR_PROJECT_ID
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950">Step 3: Deploy directly from this directory (1 command!)</span>
              <button
                onClick={() => copyCommand(command, 3)}
                className="text-blue-700 hover:text-blue-900 flex items-center gap-1 font-semibold"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 3 ? "Copied" : "Copy Command"}</span>
              </button>
            </div>
            <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-[11px] leading-relaxed break-all">
              {command}
            </div>
            <p className="text-[11px] text-blue-900">
              ✓ Our pre-configured multi-stage <code className="bg-white/80 px-1 py-0.5 rounded font-mono">Dockerfile</code> automatically packages the production build with Nginx Alpine on port 8080!
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <a
            href="https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-service-other-languages"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Cloud Run Documentation</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
