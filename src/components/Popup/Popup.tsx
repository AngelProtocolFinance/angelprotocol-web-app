import { FaCheck } from "react-icons/fa";
import { AiFillWarning } from "react-icons/ai";
import { Icons, Styles, Props } from "./types";

const icons: Icons = {
  error: AiFillWarning,
  success: FaCheck,
};

const styles: Styles = {
  success: { accentBg: "blue-accent", textColor: "white-grey" },
  error: { accentBg: "red-400", textColor: "white-grey" },
};

export default function Popup(props: Props) {
  console.log("renders");
  const Icon = icons[props.type];
  const { accentBg, textColor } = styles[props.type];
  return (
    <div className="bg-white-grey w-72 rounded-sm shadow-lg">
      <div
        className={`bg-${accentBg} text-${textColor} text-xl font-semibold p-2 flex items-center`}
      >
        <Icon className={`mr-2 text-${textColor}`} /> {props.heading}
      </div>
      <p className="px-2 py-10 font-semibold text-angel-grey text-center">
        {props.message}
      </p>
      <div className="p-2 flex justify-end">
        <button
          className={`bg-${accentBg} text-${textColor} uppercase py-1 px-3 m-2 rounded-sm`}
          onClick={props.acknowledge}
        >
          OK
        </button>
      </div>
    </div>
  );
}
