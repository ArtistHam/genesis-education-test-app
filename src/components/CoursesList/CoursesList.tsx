// node_modules
import React, { useEffect, useRef, useState } from "react";
// services
import { useGetCoursesListQuery } from "../../services/course.service";
// styles
import styles from "./CoursesList.module.css";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const { data, error, isLoading } = useGetCoursesListQuery();
  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <div className={styles.page}>
      <header>Courses</header>
      <div className={styles.container}>
        <div className={styles.pagination}>
          <button>{"<"}</button>
          <button>{currentPage}</button>
          <button>{">"}</button>
        </div>
        <div className={styles.listWrapper}>
          {data &&
            data.map((course: any) => (
              <Link key={course.id} to={`/course/${course.id}`}>
                <div className={styles.item}>
                  <div
                    className={styles.imageContainer}
                    style={{
                      backgroundImage: `url(${course.previewImageLink}/cover.webp)`,
                    }}
                  ></div>
                  <h2>{course.title}</h2>
                  <div>lessons count: {course.lessonsCount}</div>
                  <div>
                    tags:
                    {course.tags.map((tag: any) => (
                      <span>{tag}</span>
                    ))}
                  </div>
                  <div>Rating: {course.rating}</div>
                  <div>{course.description}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
