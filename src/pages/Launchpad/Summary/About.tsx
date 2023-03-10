import { TAbout } from "slices/launchpad/types";
import Section, { SectionProps } from "./Section";

export default function About({
  name,
  tagline,
  ...props
}: SectionProps<TAbout>) {
  return (
    <Section {...props}>
      <p className="mb-2">{name}</p>
      <p>{tagline}</p>
    </Section>
  );
}
