import { BadgeCheck } from "lucide-react";
import { Arrow, Content, Tooltip } from "./tooltip";
type Props = { size: number; classes?: string };

export default function VerifiedIcon({ size, classes = "" }: Props) {
  return (
    <Tooltip
      tip={
        <Content className="bg-gray-d4 text-white px-4 py-2 rounded-sm text-sm shadow-md z-10">
          Verified
          <Arrow className="fill-gray-d4" />
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
