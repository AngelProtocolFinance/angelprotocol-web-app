import ContentLoader from "components/ContentLoader";
import ExtLink from "components/ExtLink";
import React, {
  type PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ImagePlaceholder from "./ImagePlaceholder";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  isSrcLoading?: boolean;
} & ({ href: string; title: string } | { href?: never; title?: never });

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    { alt = "", className, isSrcLoading, href, title, onError, ...props },
    forwardRef
  ) => {
    const ref = useRef<HTMLImageElement>(null);
    const [isError, setError] = useState(false);

    // https://legacy.reactjs.org/docs/hooks-reference.html#useimperativehandle
    useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(
      forwardRef,
      () => ref.current
    );

    if ((!props.src && !isSrcLoading) || isError) {
      return <ImagePlaceholder className={className} />;
    }

    /**
     *
     * Using `ref.current.complete` instead of some internal `isLoading` state to check if image
     * was already loaded as it maintains state on re-render.
     *
     * Were we to use some `isLoading` state, then `Image` would flicker on every render.
     *
     * Explanation for the flicker:
     * 1. Let's assume the image was already loaded and rendered, but the user navigated away from
     *    the page/component that displayed it.
     * 2. The user decides to navigate back to the page/component with the loaded image.
     * 3. As the default `isLoading` state is `true`, the `img` component is hidden and
     *    `ContentLoader` component is displayed.
     * 4. As  the image is already loaded and cached, the `img.onLoad` triggers immediately and
     *    updates `isLoading` to `false` triggering a new render
     * 5. Component `Image` flickers as it transitions from displaying `ContentLoader` to displaying `img`
     *
     */
    const isLoading = !ref.current?.complete && isSrcLoading;
    const commonClasses = `${className} ${isLoading ? "hidden" : ""}`;

    return (
      <>
        {isLoading && <ContentLoader className={className} />}
        {/**
         *
         * Setting the logic to add `hidden` class name is necessary on both
         * `WithLink` wrapper and on the child `img`.
         *
         * Reason:
         * if no `href` was passed, that means only the image would be returned and since
         * it is returned without a wrapper, we need to apply `hidden` className manually.
         * Otherwise (if `href` was passed), we need to apply `hidden` to the link component
         * wrapping the `img`.
         *
         */}
        <WithLink className={commonClasses} href={href} title={title}>
          <img
            ref={ref}
            className={`object-contain ${commonClasses}`}
            alt={alt}
            onError={(e) => (onError ? onError(e) : setError(true))}
            {...props}
          />
        </WithLink>
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
