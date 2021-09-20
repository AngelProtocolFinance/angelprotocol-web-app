export default function AngelVid() {
  return (
    <div className="youtube-wrapper w-80 xl:w-video:xl lg:w-video:lg md:w-video:md sm:w-video:sm xl:w-video:xs">
      <iframe
        className="youtube-iframe"
        src="https://www.youtube.com/embed/Tv2ECcdPqzY"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
