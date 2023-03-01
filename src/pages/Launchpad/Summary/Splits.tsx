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
      <div className="mb-6">
        <span>To locked</span>
        <span>{def} %</span>
      </div>
      <div>
        <span>To liquid</span>
        <span>{100 - +def} %</span>
      </div>

      {isCustom && (
        <>
          <p className="font-semibold mb-2">Maximum and minimums</p>
          <div>
            <span>To locked</span>
            <span>
              {min}% to {max}%
            </span>
          </div>
          <div>
            <span>To locked</span>
            <span>
              {100 - +max}% to {100 - +min}%
            </span>
          </div>
        </>
      )}
    </Section>
  );
}
