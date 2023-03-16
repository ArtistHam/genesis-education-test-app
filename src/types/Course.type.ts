export type Course = {
  containsLockedLessons: boolean;
  description: string;
  duration: number;
  id: string;
  launchDate: string;
  lessons: {
    duration: number;
    id: string;
    link: string;
    meta: null;
    order: string;
    previewImageLink: string;
    status: string;
    title: string;
    type: string;
  }[];
  meta: {
    courseVideoPreview: {
      duration: number;
      link: string;
      previewImageLink: string;
    };
    skills: string[];
    slug: string;
  };
  previewImageLink: string;
  rating: number;
  status: string;
  tags: string[];
  title: string;
};
