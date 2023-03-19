// node_modules
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// types
import { Courses } from "../types/Courses.type";
import { Course } from "../types/Course.type";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.wisey.app/api/v1/core",
  prepareHeaders: (headers) => {
    headers.set(
      "authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0.Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM"
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
