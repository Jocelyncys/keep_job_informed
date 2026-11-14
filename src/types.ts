export type ApplicationStage =
  | 'applied'
  | 'received'
  | 'screening'
  | 'action_required'
  | 'interviewing'
  | 'offered'
  | 'rejected'
  | 'archived';

export type JobPlatform =
  | 'LinkedIn'
  | 'Indeed'
  | 'JobStreet'
  | 'Company Portal'
  | 'Referral'
  | 'Direct';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  source: JobPlatform;
  appliedDate: string;
  lastUpdated: string;
  stage: ApplicationStage;
  salary?: string;
  jobDescription: string;
  jobUrl?: string;
  contactPerson?: {
    name: string;
    title: string;
    email: string;
  };
  actionRequiredNotice?: string;
  notes?: string;
  tailoredCvVersion?: string;
  matchScore?: number;
}

export interface CandidateExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

export interface CandidateProfile {
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  summary: string;
  skills: string[];
  experiences: CandidateExperience[];
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
}

export interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'Behavioral (STAR)' | 'Culture & Alignment' | 'Resume Deep Dive' | 'Questions to Ask Interviewer';
  question: string;
  starTip?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  suggestedAnswer: string;
  whyItMatters: string;
}

export interface FollowUpTemplate {
  subject: string;
  body: string;
  timingAdvice: string;
}
