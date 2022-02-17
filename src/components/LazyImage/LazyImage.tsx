import ContentLoader from "components/ContentLoader/ContentLoader";
import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import useObserve from "hooks/useObserver";
import { useEffect, useState } from "react";

type Props = {
  src?: string;
  alt: string;
  classes: string;
  altSrc?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
};

export default function LazyImage(props: Props) {
  const [entered, setEntered] = useState(false);
  const { isVisible, ref } = useObserve({ threshold: 0.15 });

  useEffect(() => {
    if (entered) return;
    setEntered(isVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div ref={ref} className={props.classes}>
      {!entered && <ContentLoader {...props} />}
      {entered && <ImageWrapper {...props} />}
    </div>
  );
}
