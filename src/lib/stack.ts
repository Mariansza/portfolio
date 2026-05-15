export type StackGroupId = 'langages' | 'web' | 'ml' | 'ops';

export type StackGroup = {
  id: StackGroupId;
  items: readonly string[];
};

export const stackGroups: readonly StackGroup[] = [
  { id: 'langages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { id: 'web', items: ['React', 'Next.js', 'FastAPI', 'Node', 'Tailwind'] },
  {
    id: 'ml',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'Transformers'],
  },
  { id: 'ops', items: ['Docker', 'Postgres', 'Linux', 'Vercel', 'GCP'] },
];
