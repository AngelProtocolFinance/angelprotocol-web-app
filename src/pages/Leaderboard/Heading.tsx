import useTooltip from "hooks/useTooltip";
import _Tooltip from "./Charity/Tooltip";

type Props = { text: string };

export default function Heading(props: Props) {
  const { enter, exit, handleClick } = useTooltip(_Tooltip);
  return (
    <th
      onClick={handleClick}
      onMouseEnter={enter}
      onMouseLeave={exit}
      className={`text-left uppercase font-heading text-md p-2 pl-0 text-angel-grey`}
    >
      {props.text}
    </th>
  );
}
