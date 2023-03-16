export type Courses = {
  containsLockedLessons: boolean;
  description: string;
  duration: number;
  id: string;
  launchDate: string;
  lessonsCount: number;
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
}[];
