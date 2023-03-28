import React, {
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ContentLoader from "components/ContentLoader";
import ExtLink from "components/ExtLink";
import ImagePlaceholder from "./ImagePlaceholder";

export type ImageProps = {
  alt?: string;
  className?: string;
  isSrcLoading?: boolean;
  src?: string;
} & ({ href: string; title: string } | { href?: never; title?: never });

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (props, forwardRef) => {
    const ref = useRef<HTMLImageElement>(null);
    const [isLoading, setLoading] = useState(!!props.src || props.isSrcLoading);

    useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
      forwardRef,
      () => ref.current
    );

    if (!props.src) {
      return <ImagePlaceholder className={props.className} />;
    }

    const shouldLoad = !ref.current?.complete && isLoading;

    return (
      <>
        {shouldLoad && <ContentLoader className={props.className} />}
        {!props.isSrcLoading && (
          <WithLink
            className={`${props.className} ${shouldLoad ? "hidden" : ""}`}
            href={props.href}
            title={props.title}
          >
            <img
              ref={ref}
              src={props.src}
              className={`${props.className} object-contain w-full h-full`}
              alt={props.alt || ""}
              onLoad={() => setLoading(false)}
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
    <div className={className}>{children}</div>
  );
}

export default Image;
