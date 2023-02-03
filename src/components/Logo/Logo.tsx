import { PropsWithChildren, useState } from "react";
import ContentLoader from "components/ContentLoader";
import ExtLink from "components/ExtLink";
import LogoPlaceholder from "./LogoPlaceholder";

export type LogoProps = {
  src?: string;
} & ({ href: string; title: string } | { href?: never; title?: never });

type Props = {
  logo: LogoProps;
  className?: string;
};

export default function Logo({ logo, className }: Props) {
  const [isLoading, setLoading] = useState(!!logo.src);

  return (
    <>
      {isLoading && <ContentLoader className={className} />}
      {!logo.src && (
        <LogoPlaceholder
          classes={{ container: className, icon: "w-1/2 h-1/2" }}
        />
      )}
      {!!logo.src && (
        <WithLink className={className} href={logo.href} title={logo.title}>
          <img
            src={logo.src}
            className={`object-contain w-full h-full ${
              isLoading ? "hidden" : ""
            }`}
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
}: PropsWithChildren<
  | {
      className?: string;
      href: never;
      title: never;
    }
  | {
      className?: string;
      href?: string;
      title?: string;
    }
>) {
  return href ? (
    <ExtLink href={href} title={title} className={className}>
      {children}
    </ExtLink>
  ) : (
    <div className={className}>{children}</div>
  );
}
