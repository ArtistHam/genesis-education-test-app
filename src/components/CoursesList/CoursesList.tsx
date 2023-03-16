// node_modules
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// services
import { useGetCoursesListQuery } from "../../services/course.service";
// styles
import styles from "./CoursesList.module.css";
// types
import { Courses } from "../../types/Courses.type";

const CoursesList = () => {
  const { data, error, isLoading, isSuccess } = useGetCoursesListQuery();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentCourseList, setCurrentCourseList] = useState<Courses>([]);

  useEffect(() => {
    if (data && isSuccess) {
      setCurrentCourseList(
        [...data].slice(currentPage * 10, (currentPage + 1) * 10)
      );
    }
  }, [data, isSuccess, currentPage]);

  const onPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.page}>
      <header>Courses</header>
      <div className={styles.container}>
        <div className={styles.pagination}>
          <button onClick={onPrev} disabled={currentPage === 0}>
            {"<"}
          </button>
          <span>{currentPage + 1}</span>
          <button
            onClick={onNext}
            disabled={
              data ? Math.ceil(data.length / 10) === currentPage + 1 : false
            }
          >
            {">"}
          </button>
        </div>
        <div className={styles.listWrapper}>
          {currentCourseList.map((course: any) => (
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
