// node_modules
import React from "react";
import { RouteObject } from "react-router-dom";
// components
import CoursesList from "./components/CoursesList";
import CoursePage from "./components/CoursePage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <CoursesList />,
  },
  {
    path: "/course/:id",
    element: <CoursePage />,
  },
];

export default routes;
