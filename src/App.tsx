import React, { useState, useEffect } from 'react';
import { JobApplication, ApplicationStage, CandidateProfile } from './types';
import { initialApplications, initialProfile } from './data/initialData';
import { Navbar } from './components/Navbar';
import { PipelineBoard } from './components/PipelineBoard';
import { CvCustomizer } from './components/CvCustomizer';
import { InterviewPrep } from './components/InterviewPrep';
import { PlatformSyncModal } from './components/PlatformSyncModal';
import { ApplicationModal } from './components/ApplicationModal';
import { FollowUpModal } from './components/FollowUpModal';
import { CloudRunDeployModal } from './components/CloudRunDeployModal';

export const App: React.FC = () => {
  // Local storage persistence
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('pathfinder_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [profile, setProfile] = useState<CandidateProfile>(() => {
    const saved = localStorage.getItem('pathfinder_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [activeTab, setActiveTab] = useState<'pipeline' | 'cv' | 'interview' | 'sync'>('pipeline');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [followUpApp, setFollowUpApp] = useState<JobApplication | null>(null);
  const [targetedAppId, setTargetedAppId] = useState<string | undefined>(undefined);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pathfinder_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('pathfinder_profile', JSON.stringify(profile));
  }, [profile]);

  // Stage updater
  const handleUpdateStage = (appId: string, newStage: ApplicationStage) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { ...app, stage: newStage, lastUpdated: new Date().toISOString() } 
        : app
    ));
  };

  // Save edited application
  const handleSaveApplication = (updatedApp: JobApplication) => {
    setApplications(prev => prev.map(app => app.id === updatedApp.id ? updatedApp : app));
  };

  // Delete application
  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  // Add new application
  const handleAddNewApplication = () => {
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      company: 'New Target Employer',
      role: 'Software Engineer',
      location: 'Remote / Hybrid',
      source: 'LinkedIn',
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      stage: 'applied',
      jobDescription: 'Enter the job requirements here to tailor your CV and get practice interview questions.',
      notes: 'Fresh application added.'
    };
    setApplications(prev => [newApp, ...prev]);
    setSelectedApp(newApp);
  };

  // Stale count (> 5 days without update on applied/screening)
  const staleCount = applications.filter(app => {
    const days = Math.floor(Math.abs(new Date().getTime() - new Date(app.lastUpdated).getTime()) / (1000 * 60 * 60 * 24));
    return days >= 5 && (app.stage === 'applied' || app.stage === 'screening');
  }).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewApplication={handleAddNewApplication}
        onOpenDeployGuide={() => setShowDeployGuide(true)}
        profile={profile}
        staleCount={staleCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeTab === 'pipeline' && (
          <PipelineBoard
            applications={applications}
            onSelectApplication={(app) => setSelectedApp(app)}
            onUpdateStage={handleUpdateStage}
            onOpenFollowUp={(app) => setFollowUpApp(app)}
            onOpenInterviewPrep={(app) => {
              setTargetedAppId(app.id);
              setActiveTab('interview');
            }}
            onOpenCvTailor={(app) => {
              setTargetedAppId(app.id);
              setActiveTab('cv');
            }}
            onQuickAddDemoJob={() => {
              const demoCompany = ['ByteDance', 'Agoda', 'Shopify', 'Atlassian'][Math.floor(Math.random() * 4)];
              const newApp: JobApplication = {
                id: `app-${Date.now()}`,
                company: demoCompany,
                role: 'Senior Full Stack Engineer',
                location: 'Remote / Singapore / KL',
                source: 'LinkedIn',
                appliedDate: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                stage: 'screening',
                salary: '$105,000 - $130,000 / yr',
                jobDescription: 'Build modern developer productivity tools using TypeScript, React, and GraphQL microservices.',
                notes: 'Imported via Quick Demo Job.',
                matchScore: 86
              };
              setApplications(prev => [newApp, ...prev]);
            }}
          />
        )}

        {activeTab === 'cv' && (
          <CvCustomizer
            profile={profile}
            applications={applications}
            selectedAppId={targetedAppId}
            onUpdateProfile={setProfile}
          />
        )}

        {activeTab === 'interview' && (
          <InterviewPrep
            applications={applications}
            selectedAppId={targetedAppId}
          />
        )}

        {activeTab === 'sync' && (
          <PlatformSyncModal
            onAddApplication={(newApp) => {
              setApplications(prev => [newApp, ...prev]);
              setActiveTab('pipeline');
            }}
          />
        )}

      </main>

      {/* Modals */}
      {selectedApp && (
        <ApplicationModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onSave={handleSaveApplication}
          onDelete={handleDeleteApplication}
          onOpenFollowUp={(app) => setFollowUpApp(app)}
          onOpenInterviewPrep={(app) => {
            setTargetedAppId(app.id);
            setActiveTab('interview');
          }}
          onOpenCvTailor={(app) => {
            setTargetedAppId(app.id);
            setActiveTab('cv');
          }}
        />
      )}

      {followUpApp && (
        <FollowUpModal
          application={followUpApp}
          onClose={() => setFollowUpApp(null)}
        />
      )}

      {showDeployGuide && (
        <CloudRunDeployModal
          onClose={() => setShowDeployGuide(false)}
        />
      )}

    </div>
  );
};

export default App;
