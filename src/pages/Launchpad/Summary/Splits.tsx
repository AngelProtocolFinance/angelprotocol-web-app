import { PropsWithChildren } from "react";
import { TSplits } from "slices/launchpad/types";
import Section, { SectionProps } from "./Section";

export default function Splits({
  isCustom,
  min,
  max,
  default: def,
  ...props
}: SectionProps<TSplits>) {
  return (
    <Section {...props}>
      <p className="font-semibold mb-2">Default values</p>
      <ul className="list-disc list-inside mb-6">
        <Item classes="mb-2" title="To locked">
          {def} %
        </Item>
        <Item classes="mb-2" title="To liquid">
          {100 - +def} %
        </Item>
      </ul>

      {isCustom && (
        <>
          <p className="font-semibold mb-2">Maximum and minimums</p>
          <Item classes="mb-2" title="To locked">
            {min}% to {max}%
          </Item>
          <Item classes="mb-2" title="To liquid">
            {100 - +max}% to {100 - +min}%
          </Item>
        </>
      )}
    </Section>
  );
}

function Item({
  title,
  classes = "",
  children,
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <li className={classes}>
      <span className="w-40 inline-block mr-6">{title}</span>
      <span className="font-semibold">{children}</span>
    </li>
  );
}
