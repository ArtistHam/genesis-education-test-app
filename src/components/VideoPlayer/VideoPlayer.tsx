// node_modules
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Hls from "hls.js"; /* don't have declaration file */
// styles
import styles from "./VideoPlayer.module.css";

interface IVideoPlayerProps {
  data?: {
    link?: string;
    id?: string;
  };
  settings?: {
    loop?: boolean;
    muted?: boolean;
    autoPlay?: boolean;
    controls?: boolean;
    showToolbar?: boolean;
  };
  pageId?: string;
  loading?: boolean;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  data,
  settings,
  pageId,
  loading,
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(false);
  const [playBack, setPlayBack] = useState<number>(1);

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
  }, [data]);

  // save lesson time if page refreshed
  window.onbeforeunload = function (e) {
    if (ref.current) {
      localStorage.setItem(
        `l-${data?.id}`,
        `${Math.floor(ref.current.currentTime)}`
      );
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const video = ref.current;
      const savedTimeStamp = localStorage.getItem(`l-${data.id}`);

      if (data.link) {
        hls.loadSource(data.link);
      } else {
        setError(true);
      }

      video && hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (video) {
          video.currentTime = savedTimeStamp ? +savedTimeStamp : 0;
          video.volume = 0.3;
        }
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.type === "networkError") {
          setError(true);
        }
      });
    }
  }, [data]);

  const enablePiP = () => {
    const video = ref.current;
    if (video) {
      video.requestPictureInPicture();

      video.addEventListener("leavepictureinpicture", () => {
        navigate(`/course/${pageId}`);
        video.pause();
        localStorage.setItem(
          `l-${data?.id}`,
          `${Math.floor(video.currentTime)}`
        );
      });
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (video) {
      video.playbackRate = playBack;
    }
  }, [playBack]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "Space":
        const video = ref.current;
        if (video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
        break;
      case "Period":
        if (e.shiftKey) {
          console.log(playBack);
          setPlayBack((playBack) => {
            if (playBack < 2) {
              return playBack + 0.25;
            }
            return playBack;
          });
        }
        break;
      case "Comma":
        if (e.shiftKey) {
          console.log(playBack);
          setPlayBack((playBack) => {
            if (playBack > 0.5) {
              return playBack - 0.25;
            }
            return playBack;
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!loading && (
        <>
          {error ? (
            <div className={styles.error}>{"No preview"}</div>
          ) : (
            <>
              <video
                ref={ref}
                width="100%"
                autoPlay={
                  settings?.autoPlay !== undefined ? settings.autoPlay : true
                }
                controls={
                  settings?.controls !== undefined ? settings.controls : true
                }
                muted={settings?.muted !== undefined ? settings.muted : false}
                loop={settings?.loop !== undefined ? settings.loop : false}
              />
              {settings?.showToolbar ? (
                <div className={styles.toolbar}>
                  <div className={styles.tooltip}>
                    To change speed use "<code>{"Shift + <"}</code>" or "
                    <code>{"Shift + >"}</code>". Current speed is: {playBack}x
                  </div>
                  {"pictureInPictureEnabled" in document &&
                    document.pictureInPictureEnabled && (
                      <button onClick={enablePiP}>Picture-in-Picture</button>
                    )}
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};

export default VideoPlayer;
