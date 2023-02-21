import { angelGivingLogo } from "@ap/assets";
import { ExtLink } from "@ap/components";

export type LogoProps = {
  href?: string;
  src: string;
  title?: string;
};

export const DEFAULT_LOGO: LogoProps = {
  href: "https://angelprotocol.io/",
  src: angelGivingLogo,
  title: "Go to Marketing page",
};

type Props = { className?: string; logo?: LogoProps };

export default function Logo({ className, logo = DEFAULT_LOGO }: Props) {
  return (
    <ExtLink href={logo.href} title={logo.title} className={className}>
      <img src={logo.src} alt="" className="w-full h-full" />
    </ExtLink>
  );
}
