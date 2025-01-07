import { BadgeCheck } from "lucide-react";
import { Arrow, Content, Tooltip } from "./Tooltip";
type Props = { size: number; classes?: string };

export default function VerifiedIcon({ size, classes = "" }: Props) {
  return (
    <Tooltip
      tip={
        <Content className="bg-navy-d4 text-white px-4 py-2 rounded text-sm shadow-md z-10">
          Verified
          <Arrow className="fill-navy-d4" />
        </Content>
      }
    >
      <BadgeCheck
        size={size}
        className={`text-white inline fill-blue ${classes}`}
      />
    </Tooltip>
  );
}
