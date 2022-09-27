import { useFormContext } from "react-hook-form";
import { Vote } from "types/contracts";
import Icon from "components/Icon";

type VoteOptionContextType = { vote: Vote };
export default function VoteOption<T extends VoteOptionContextType>(
  props: Pick<T, "vote"> & { label: string }
) {
  const { register, watch } = useFormContext<VoteOptionContextType>();
  const vote = watch("vote");
  const is_active = vote === props.vote;

  const iconClasses = `opacity-90 ${
    is_active ? vote_colors[props.vote].icon : "text-gray-d2 "
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
        className={`cursor-pointer grid place-items-center rounded-md p-4 w-full bg-gray-l2/10 ${
          is_active
            ? `${
                vote_colors[props.vote].bg
              } shadow-inner-white pointer-events-none`
            : "bg-gray-l2"
        }`}
        htmlFor={`__${props.vote}`}
      >
        <span
          className={`text-xl font-heading uppercase text-center ${
            is_active ? vote_colors[props.vote].text : "text-gray-d2"
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
        id={`__${props.vote}`}
        value={props.vote}
      />
    </div>
  );
}

const vote_colors: { [key in Vote]: { [index: string]: string } } = {
  yes: {
    bg: "bg-green-l1/10",
    icon: "text-green-l1",
    text: "text-green-l1",
  },
  no: {
    bg: "bg-red-l1/10",
    icon: "text-red-l1",
    text: "text-red-l1",
  },
};
