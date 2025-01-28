import poster from "assets/images/about-video-preview.webp";
import { useEffect, useRef, useState } from "react";

type VideoStatus = "loading" | "error" | "loaded";

const videoUrl =
  "https://elktqtbc25yfiipw.public.blob.vercel-storage.com/about-better-giving-HXqlfIWwctto66xyOTStih3rWj9Ajg";
export const AboutVideo = ({ classes = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [status, setStatus] = useState<VideoStatus>("loading");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "50px", threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && status === "loading") {
      const video = videoRef.current;
      if (video) {
        video.load();
        setStatus("loaded");
      }
    }
  }, [isIntersecting, status]);

  const handleError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ): void => {
    setStatus("error");
    console.error("Video loading error:", e);
  };

  return (
    <div className={`w-full ${classes}`}>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ paddingBottom: "56.25%" }}
      >
        <div className="absolute inset-0 bg-gray-l4 rounded-lg overflow-hidden">
          {status === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}
          {status === "error" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-red-500">Failed to load video</div>
            </div>
          )}
          <video
            poster={poster}
            src={videoUrl}
            ref={videoRef}
            className={`absolute top-0 left-0 w-full h-full object-cover`}
            playsInline
            controls
            preload="none"
            onError={handleError}
          >
            <track
              kind="captions"
              src="captions.vtt"
              srcLang="en"
              label="English"
              default
            />
            <p>Your browser doesn't support HTML5 video.</p>
          </video>
        </div>
      </div>
    </div>
  );
};
