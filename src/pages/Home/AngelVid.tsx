import transitionIn, { Direction } from "../../helpers/transitionIn";

interface Props {
  isVisible: boolean;
}

export default function AngelVid({ isVisible }: Props) {
  return (
    <div
      className={`${transitionIn(
        isVisible,
        Direction.fromLeft
      )} shadow-lg youtube-wrapper w-80 xl:w-video:xl lg:w-video:lg md:w-video:md sm:w-video:sm xl:w-video:xs`}
    >
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
