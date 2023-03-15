import { PropsWithChildren, useRef, useState } from "react";
import ContentLoader from "components/ContentLoader";
import ExtLink from "components/ExtLink";
import ImagePlaceholder from "./ImagePlaceholder";

export type ImageProps = {
  src?: string;
  isSrcLoading?: boolean;
} & ({ href: string; title: string } | { href?: never; title?: never });

type Props = {
  img?: ImageProps;
  className?: string;
};

export default function Image({ img, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoading, setLoading] = useState(!!img?.src || img?.isSrcLoading);

  if (!img?.src) {
    return <ImagePlaceholder className={className} />;
  }

  const shouldLoad = !ref.current?.complete && isLoading;

  return (
    <>
      {shouldLoad && <ContentLoader className={className} />}
      {!img.isSrcLoading && (
        <WithLink
          className={`${className} ${shouldLoad ? "hidden" : ""}`}
          href={img.href}
          title={img.title}
        >
          <img
            ref={ref}
            src={img.src}
            className="object-contain w-full h-full"
            alt=""
            onLoad={() => setLoading(false)}
          />
        </WithLink>
      )}
    </>
  );
}

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
