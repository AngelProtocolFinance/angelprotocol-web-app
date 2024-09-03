import Icon from "./Icon";
import { Arrow, Content, Tooltip } from "./Tooltip";
type Props = { size: number };

export default function VerifiedIcon({ size }: Props) {
  return (
    <Tooltip
      content={
        <Content className="bg-navy-d4 text-white px-4 py-2 rounded text-sm">
          Verified
          <Arrow className="fill-navy-d4" />
        </Content>
      }
    >
      <Icon
        type="Verified"
        size={size}
        className="text-white inline fill-blue"
      />
    </Tooltip>
  );
}
