// node_modules
import React, { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useParams } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
// services
import { useGetCourseQuery } from "../../services/course.service";
// styles
import styles from "./CoursePage.module.css";

const CoursePage = () => {
  const ref = useRef(null);
  const { id } = useParams();
  const { data, error } = useGetCourseQuery(id);
  return (
    <div className={styles.page}>
      <div className={styles.videoContainer}>
        <ReactHlsPlayer
          src={data ? data.lessons[0].link : ""}
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
          playerRef={ref}
          crossOrigin={"anonymous"}
        />
      </div>
      <div className={styles.list}>
        {data?.lessons.map((lesson) => (
          <div
            className={`${styles.lesson} ${
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
  );
};

export default CoursePage;
