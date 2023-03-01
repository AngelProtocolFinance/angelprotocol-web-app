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
      <div>
        <span>To locked</span>
        <span>{def} %</span>
      </div>
      <div>
        <span>To liquid</span>
        <span>{100 - +def} %</span>
      </div>

      {isCustom && (
        <>
          <h5>Maximum and minimums</h5>
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
