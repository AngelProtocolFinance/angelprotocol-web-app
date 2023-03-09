import { PropsWithChildren, useRef, useState } from "react";
import ContentLoader from "components/ContentLoader";
import ExtLink from "components/ExtLink";
import LogoPlaceholder from "./LogoPlaceholder";

export type LogoProps = {
  src?: string;
  isSrcLoading?: boolean;
} & ({ href: string; title: string } | { href?: never; title?: never });

type Props = {
  logo?: LogoProps;
  className?: string;
};

export default function Logo({ logo, className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoading, setLoading] = useState(!!logo?.src);

  if (!logo?.src) {
    return <LogoPlaceholder className={className} />;
  }

  return (
    <>
      {isLoading && !ref.current?.complete && (
        <ContentLoader className={className} />
      )}
      {!logo.isSrcLoading && (
        <WithLink
          className={`${className} ${
            isLoading && !ref.current?.complete ? "hidden" : ""
          }`}
          href={logo.href}
          title={logo.title}
        >
          <img
            ref={ref}
            src={logo.src}
            className="object-contain w-full h-full"
            alt=""
            loading="lazy"
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
