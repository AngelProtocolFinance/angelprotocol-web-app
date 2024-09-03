import { useRef } from "react";
import Icon from "./Icon";
import Tooltip from "./Tooltip";
type Props = {
  classes?: string;
  size: number;
};

export default function VerifiedIcon({ classes = "", size }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Tooltip anchorRef={ref} content="Verified" />
      <div ref={ref} className={classes}>
        <Icon
          type="Verified"
          size={size}
          className="text-white inline fill-blue"
        />
      </div>
    </>
  );
}
