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
  ({ className, alt = "", ...props }, forwardRef) => {
    const ref = useRef<HTMLImageElement>(null);
    const [isLoading, setLoading] = useState(!!props.src || props.isSrcLoading);
    const [isError, setError] = useState(false);

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
          <WithLink
            className={`${className} ${shouldLoad ? "hidden" : ""}`}
            href={props.href}
            title={props.title}
          >
            <img
              ref={ref}
              src={props.src}
              className={`object-contain ${className}`}
              alt={alt || ""}
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
