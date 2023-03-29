import React, {
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ContentLoader from "components/ContentLoader";
import ExtLink from "components/ExtLink";
import ImagePlaceholder from "./ImagePlaceholder";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  isSrcLoading?: boolean;
} & ({ href: string; title: string } | { href?: never; title?: never });

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, forwardRef) => {
    const ref = useRef<HTMLImageElement>(null);
    const [isLoading, setLoading] = useState(!!props.src || props.isSrcLoading);
    const [isError, setError] = useState(false);

    // https://legacy.reactjs.org/docs/hooks-reference.html#useimperativehandle
    useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
      forwardRef,
      () => ref.current
    );

    if (!props.src || isError) {
      return <ImagePlaceholder className={className} />;
    }

    const shouldLoad = !ref.current?.complete && isLoading;

    return (
      <>
        {shouldLoad && <ContentLoader className={className} />}
        {!props.isSrcLoading && (
          /**
           * Setting the logic to add `hidden` class name is necessary on both
           * `WithLink` wrapper and on the child `img`.
           *
           * Reason:
           * if no `href` was passed, that means only the image would be returned and since
           * it is returned without a wrapper, we need to apply `hidden` className manually.
           * Otherwise (if `href` was passed), we need to apply `hidden` to the link component
           * wrapping the `img`.
           */
          <WithLink
            className={`${className} ${shouldLoad ? "hidden" : ""}`}
            href={props.href}
            title={props.title}
          >
            <img
              ref={ref}
              src={props.src}
              className={`object-contain ${
                shouldLoad ? "hidden" : ""
              } ${className}`}
              alt={props.alt || ""}
              loading={props.loading}
              onLoad={() => setLoading(false)}
              onError={(e) =>
                props.onError ? props.onError(e) : setError(true)
              }
            />
          </WithLink>
        )}
      </>
    );
  }
);

function WithLink({
  className,
  href,
  title,
  children,
}: PropsWithChildren<{
  className?: string;
  href?: string;
  title?: string;
}>) {
  return href ? (
    <ExtLink href={href} title={title} className={className}>
      {children}
    </ExtLink>
  ) : (
    <>{children}</>
  );
}

export default Image;
