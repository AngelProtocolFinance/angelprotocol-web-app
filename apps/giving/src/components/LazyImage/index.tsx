import { ContentLoader, ImageWrapper } from "@ap/components";
import Observer from "./Observer";

export default function LazyImage(props: {
  src: string;
  alt: string;
  classes: string;
}) {
  return (
    <Observer options={{ threshold: 0.5 }}>
      {(isVisible) =>
        isVisible ? (
          <ImageWrapper
            className={props.classes}
            src={props.src}
            alt={props.alt}
          />
        ) : (
          <ContentLoader className={props.classes} />
        )
      }
    </Observer>
  );
}
