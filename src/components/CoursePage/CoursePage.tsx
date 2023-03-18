// node_modules
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// @ts-ignore
import Hls from "hls.js"; /* don't have declaration file */
// components
import VideoPlayer from "../VideoPlayer";
// services
import { useGetCourseQuery } from "../../services/course.service";
// styles
import styles from "./CoursePage.module.css";
// icons
import { MdLockOutline, MdKeyboardArrowLeft } from "react-icons/md";
// types
import { Course } from "../../types/Course.type";

const CoursePage = () => {
  const { id } = useParams();
  const { data, error, isSuccess, isLoading } = useGetCourseQuery(id);
  const [currentLesson, setCurrentLesson] =
    useState<Course["lessons"][number]>();

  const getUnlockedLessons = (allLessons: Course["lessons"]) => {
    if (allLessons) {
      return allLessons.filter((lesson) => lesson.status === "unlocked");
    }
  };

  useEffect(() => {
    if (data && currentLesson) {
      localStorage.setItem(`c-${data?.id}`, `${currentLesson?.id}`);
    }
  }, [currentLesson, data]);

  useEffect(() => {
    if (data && isSuccess) {
      const unlockedLessons = getUnlockedLessons(data.lessons);
      const lastWatchedLessonId = localStorage.getItem(`c-${data.id}`);
      if (unlockedLessons) {
        const current = unlockedLessons.find(
          (unlockedLesson) => unlockedLesson.id === lastWatchedLessonId
        );
        current
          ? setCurrentLesson(current)
          : setCurrentLesson(unlockedLessons[0]);
      }
    }
  }, [data, isSuccess]);

  const chooseLesson =
    (lesson: Course["lessons"][number]) =>
    (e: React.MouseEvent<HTMLElement>) => {
      setCurrentLesson(lesson);
    };

  return (
    <div className={styles.page}>
      <header>
        <div className={styles.back}>
          <Link to="/">
            <MdKeyboardArrowLeft />
          </Link>
        </div>

        {data ? data.title : "Title is loading..."}
      </header>
      <div className={styles.container}>
        <div className={styles.videoContainer}>
          {isLoading && <div className={styles.videoSkeleton} />}
          {currentLesson && currentLesson.type !== "video" ? (
            <div>{"This lesson is not a video :("}</div>
          ) : (
            <VideoPlayer
              data={currentLesson}
              settings={{ showToolbar: true }}
              pageId={id}
              loading={isLoading}
            />
          )}
        </div>
        <div className={styles.list}>
          {isLoading
            ? [...Array(5)].map((item, index) => (
                <div className={styles.itemSkeleton} />
              ))
            : data?.lessons.map((lesson) => (
                <div
                  onClick={chooseLesson(lesson)}
                  className={`${styles.lesson} ${
                    currentLesson && currentLesson.id === lesson.id
                      ? `${styles.active}`
                      : ""
                  } ${
                    lesson.status === "unlocked" ? "" : `${styles.disabled}`
                  }`}
                  key={lesson.id}
                >
                  <div
                    className={styles.preview}
                    style={{
                      backgroundImage: `url(${lesson.previewImageLink}/lesson-${lesson.order}.webp)`,
                    }}
                  >
                    {lesson.status === "unlocked" ? "" : <MdLockOutline />}
                  </div>
                  <h2>{lesson.title}</h2>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
