export type ProjectId = 'tessan' | 'unet' | 'ecg';

export type Project = {
  id: ProjectId;
  num: string;
  year: string;
  tags: readonly string[];
};

export const projects: readonly Project[] = [
  {
    id: 'tessan',
    num: '01',
    year: '2025',
    tags: ['Python', 'React', 'LLM', 'FastAPI', 'Postgres'],
  },
  {
    id: 'unet',
    num: '02',
    year: '2025',
    tags: ['Keras', 'TensorFlow', 'OpenCV', 'U-Net'],
  },
  {
    id: 'ecg',
    num: '03',
    year: '2024',
    tags: ['PyTorch', 'Signal', 'MLP', 'CNN', 'RNN'],
  },
];
