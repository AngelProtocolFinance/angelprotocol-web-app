import { useFormContext } from "react-hook-form";
import Icon from "components/Icons/Icons";
import { Vote } from "contracts/types";
import { VoteValues } from "./types";

export default function Option(props: { label: string; vote: Vote }) {
  const { register, watch } = useFormContext<VoteValues>();
  const vote = watch("vote");
  const is_active = vote === props.vote;

  const iconClasses = `opacity-90 ${
    is_active ? vote_colors[props.vote].icon : "text-angel-grey "
  }`;

  const icon =
    props.vote === "yes" ? (
      <Icon type="Like" className={iconClasses} />
    ) : (
      <Icon type="Dislike" className={iconClasses} />
    );

  return (
    <div className="grid place-items-center">
      <label
        className={`cursor-pointer grid place-items-center rounded-md p-4 w-full bg-light-grey/10 ${
          is_active
            ? `${
                vote_colors[props.vote].bg
              } shadow-inner-white-grey pointer-events-none`
            : "bg-light-grey"
        }`}
        htmlFor={props.label}
      >
        <span
          className={`text-xl font-heading uppercase text-center ${
            is_active ? vote_colors[props.vote].text : "text-angel-grey"
          }`}
        >
          {props.label}
        </span>
        <span className="text-5xl">{icon}</span>
      </label>
      <input
        className="absolute h-0 w-0"
        type="radio"
        {...register("vote")}
        id={props.label}
        value={props.vote}
      />
    </div>
  );
}

const vote_colors: { [key in Vote]: { [index: string]: string } } = {
  yes: {
    bg: "bg-green-400",
    icon: "text-green-400",
    text: "text-green-400",
  },
  no: {
    bg: "bg-red-400",
    icon: "text-red-400",
    text: "text-red-400",
  },
};
