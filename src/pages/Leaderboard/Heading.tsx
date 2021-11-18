import useTooltip from "hooks/useTooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import _Tooltip from "./Charity/Tooltip";

type Props = { text: string; withTooltip?: true };
export default function Heading(props: Props) {
  const { enter, exit, handleClick, Tooltip } = useTooltip(_Tooltip);
  return (
    <th
      onClick={handleClick}
      onMouseEnter={enter}
      onMouseLeave={exit}
      className={`${
        props.withTooltip ? "cursor-help relative" : "cursor-text"
      } text-left uppercase font-heading text-md p-2 pl-0 text-angel-grey`}
    >
      {props.text}{" "}
      {props.withTooltip && (
        <AiOutlineQuestionCircle className="inline text-lg mb-1" />
      )}
      {props.withTooltip && <Tooltip />}
    </th>
  );
}
