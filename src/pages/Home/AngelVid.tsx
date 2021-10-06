import transitionIn, { Direction } from "../../helpers/transitionIn";

interface Props {
  isVisible: boolean;
}

export default function AngelVid({ isVisible }: Props) {
  return (
    <iframe
      className={`${transitionIn(
        isVisible,
        Direction.fromLeft
      )} w-80 h-56 sm:w-135 sm:h-80 lg:w-128 lg:h-64 xl:w-135 xl:h-80`}
      src="https://www.youtube.com/embed/Tv2ECcdPqzY"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
