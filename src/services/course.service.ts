// node_modules
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Courses = {
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

type Course = {
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

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8010/proxy/api/v1/core",
  prepareHeaders: (headers) => {
    headers.set(
      "authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMWY2OWUyMC0xMGY2LTQ4YjktODBhYi0xOTA5NzJiMWJmYjMiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg4Njk1MjksImV4cCI6MTY3OTc2OTUyOX0.ceQn0PlX4PbQx6X3lIZYG1Qb8w9yAAAV4xGer1E0EtE"
    );
  },
});

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCoursesList: builder.query<Courses, void>({
      query: () => "/preview-courses",
      transformResponse: (response: { courses: Courses }) => response.courses,
    }),

    getCourse: builder.query<Course, string | undefined>({
      query: (courseId) => `/preview-courses/${courseId}`,
    }),
  }),
});

export const { useGetCoursesListQuery, useGetCourseQuery } = courseApi;
