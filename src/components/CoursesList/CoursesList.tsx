// node_modules
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import VideoPlayer from "../VideoPlayer";
// services
import { useGetCoursesListQuery } from "../../services/course.service";
// styles
import styles from "./CoursesList.module.css";
// icons
import { MdStarRate } from "react-icons/md";
// types
import { Courses } from "../../types/Courses.type";

const CoursesList = () => {
  const { data, isLoading, isSuccess } = useGetCoursesListQuery();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentCourseList, setCurrentCourseList] = useState<Array<Courses>>([]);
  const [hoveredId, setHoveredId] = useState<string>();

  useEffect(() => {
    if (isSuccess) {
      const coursePage = localStorage.getItem("coursePage");
      setCurrentPage(coursePage ? +coursePage : 0);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data && isSuccess) {
      setCurrentCourseList(
        [...data].slice(currentPage * 10, (currentPage + 1) * 10)
      );
    }
  }, [data, isSuccess, currentPage]);

  const onPrev = () => {
    localStorage.setItem("coursePage", `${currentPage - 1}`);
    setCurrentPage(currentPage - 1);
  };

  const onNext = () => {
    localStorage.setItem("coursePage", `${currentPage + 1}`);
    setCurrentPage(currentPage + 1);
  };

  const handleMouseEnter = (id: string) => () => {
    setHoveredId(id);
  };

  return (
    <div className={styles.page}>
      <header>Courses</header>
      <div className={styles.container}>
        <div className={styles.pagination}>
          {isLoading ? (
            <div className={styles.skeletonPagination} />
          ) : (
            <button onClick={onPrev} disabled={currentPage === 0}>
              {"<"}
            </button>
          )}
          {isLoading ? (
            <div className={styles.skeletonPagination} />
          ) : (
            <span>{currentPage + 1}</span>
          )}
          {isLoading ? (
            <div className={styles.skeletonPagination} />
          ) : (
            <button
              onClick={onNext}
              disabled={
                data ? Math.ceil(data.length / 10) === currentPage + 1 : false
              }
            >
              {">"}
            </button>
          )}
        </div>
        <div className={styles.listWrapper}>
          {isLoading
            ? [...Array(10)].map((item, index) => {
                return (
                  <div key={index} className={styles.itemWrapper}>
                    <div className={styles.skeleton} />
                  </div>
                );
              })
            : currentCourseList.map((course: Courses) => (
                <div key={course.id} className={styles.itemWrapper}>
                  <Link key={course.id} to={`/course/${course.id}`}>
                    <div
                      className={styles.item}
                      onMouseEnter={handleMouseEnter(course.id)}
                      onMouseLeave={() => setHoveredId(undefined)}
                    >
                      <div
                        className={styles.imageContainer}
                        style={{
                          backgroundImage: `url(${course.previewImageLink}/cover.webp)`,
                        }}
                      >
                        {hoveredId === course.id && (
                          <VideoPlayer
                            data={{
                              link: course?.meta?.courseVideoPreview?.link,
                            }}
                            settings={{
                              muted: true,
                              loop: true,
                              controls: false,
                            }}
                          />
                        )}
                      </div>

                      <h2>{course.title}</h2>

                      <div className={styles.additionalInfo}>
                        <div className={styles.lessonsCount}>
                          {course.lessonsCount} lesson
                          {course.lessonsCount > 1 && "s"}
                        </div>

                        <div className={styles.rating}>
                          {course.rating}
                          <MdStarRate color="#FFD700" />
                        </div>
                      </div>

                      <div>{course.description}</div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
