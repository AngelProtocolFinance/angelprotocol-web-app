import { ReactNode, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

type Props =
  | { text: string; children?: never }
  | { text: string; children: ReactNode };
export default function Heading(props: Props) {
  const [hovered, setHovered] = useState(false);
  const toolkit = !!props.children;

  const enter = () => {
    toolkit && setHovered(true);
  };
  const exit = () => {
    toolkit && setHovered(false);
  };

  //when hover is not available
  const handleClick = () => {
    toolkit && setHovered((prev) => !prev);
  };

  return (
    <th
      onClick={handleClick}
      onMouseEnter={enter}
      onMouseLeave={exit}
      className={`${
        toolkit ? "cursor-help relative" : "cursor-text"
      } text-left uppercase font-heading text-md p-2 pl-0 text-angel-grey`}
    >
      {props.text}{" "}
      {toolkit && <AiOutlineQuestionCircle className="inline text-lg mb-1" />}
      {hovered && props.children}
    </th>
  );
}
