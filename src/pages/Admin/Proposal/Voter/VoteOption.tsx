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
    is_active ? vote_colors[props.vote].icon : ""
  }`;

  const icon =
    props.vote === "yes" ? (
      <Icon type="Like" className={iconClasses} />
    ) : (
      <Icon type="Dislike" className={iconClasses} />
    );

  return (
    <div className="grid place-items-center border border-gray-l2 dark:border-bluegray rounded bg-orange-l6 dark:bg-blue-d7">
      <label
        className={`cursor-pointer grid place-items-center rounded-md p-4 w-full ${
          is_active ? "pointer-events-none" : ""
        }`}
        htmlFor={`__${props.vote}`}
      >
        <span
          className={`text-xl font-heading uppercase text-center ${
            is_active ? vote_colors[props.vote].text : ""
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
    icon: "text-green dark:text-green-l2",
    text: "text-green dark:text-green-l2",
  },
  no: {
    icon: "text-red dark:text-red-l2",
    text: "text-red dark:text-red-l2",
  },
};
