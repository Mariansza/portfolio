export type ProjectId = 'tessan' | 'unet' | 'ecg';

export type ProjectStatus = 'production' | 'completed' | 'archived';

export type Project = {
  id: ProjectId;
  num: string;
  year: string;
  tags: readonly string[];
  caseStudyReady: boolean;
  status: ProjectStatus;
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: readonly Project[] = [
  {
    id: 'tessan',
    num: '01',
    year: '2026',
    tags: ['Python', 'Next.js', 'FastAPI', 'pgvector', 'RAG', 'GCP'],
    caseStudyReady: true,
    status: 'production',
  },
  {
    id: 'unet',
    num: '02',
    year: '2025',
    tags: ['Keras', 'TensorFlow', 'OpenCV', 'U-Net'],
    caseStudyReady: false,
    status: 'completed',
  },
  {
    id: 'ecg',
    num: '03',
    year: '2024',
    tags: ['PyTorch', 'Signal', 'MLP', 'CNN', 'RNN'],
    caseStudyReady: false,
    status: 'completed',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
