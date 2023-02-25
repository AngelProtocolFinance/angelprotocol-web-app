import { LogoProps } from "@giving/types/components/logo";
import ExtLink from "./ExtLink";

type Props = { className?: string; logo: LogoProps };

export default function Logo({ className, logo }: Props) {
  return (
    <ExtLink href={logo.href} title={logo.title} className={className}>
      <img src={logo.src} alt="" className="w-full h-full" />
    </ExtLink>
  );
}
