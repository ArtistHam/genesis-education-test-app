// node_modules
import React, { useRef, useEffect, useLayoutEffect } from "react";
// @ts-ignore
import Hls from "hls.js"; /* don't have declaration file */
// types
import { Course } from "../../types/Course.type";

interface IVideoPlayerProps {
  data?: Course["lessons"][number];
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ data }) => {
  const ref = useRef<HTMLVideoElement>(null);

  let hls = new Hls();

  // save lesson time at localStorage
  useLayoutEffect(() => {
    return () => {
      if (data && ref.current) {
        localStorage.setItem(
          `l-${data?.id}`,
          `${Math.floor(ref.current.currentTime)}`
        );
      }
    };
  }, [ref.current, data]);

  useEffect(() => {
    if (data) {
      const video = ref.current;
      const savedTimeStamp = localStorage.getItem(`l-${data.id}`);

      hls.loadSource(data.link);
      video && hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (video) {
          video.currentTime = savedTimeStamp ? +savedTimeStamp : 0;
        }
      });
    }
  }, [ref.current, data]);

  return (
    <>
      <video ref={ref} width="100%" autoPlay={true} controls={true} />
    </>
  );
};

export default VideoPlayer;
