import { useEffect, useState } from "react";
import ContentLoader from "components/ContentLoader";
import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import useObserve from "hooks/useObserver";

export default function LazyImage(props: {
  src: string;
  alt: string;
  classes: string;
}) {
  const [entered, setEntered] = useState(false);
  const { isVisible, ref } = useObserve({ threshold: 0.15 });

  useEffect(() => {
    if (entered) return;
    setEntered(isVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div ref={ref}>
      {(entered && (
        <ImageWrapper
          className={props.classes}
          src={props.src}
          alt={props.alt}
        />
      )) || <ContentLoader className={props.classes} />}
    </div>
  );
}
