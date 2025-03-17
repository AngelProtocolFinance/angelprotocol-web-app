import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface ActiveSort {
  key: string;
  direction: "asc" | "desc";
}

export interface ISort {
  value?: ActiveSort;
  onChange: (value: ActiveSort) => void;
}

interface Props extends ISort {
  _key: string;
  classes?: string;
}

export function Sort({ _key, value, onChange, classes = "" }: Props) {
  const Icon =
    value && value.key === _key
      ? value.direction === "asc"
        ? ChevronUp
        : ChevronDown
      : ChevronsUpDown;

  return (
    <button
      type="button"
      className={`${classes} text-sm`}
      onClick={() =>
        onChange &&
        onChange({
          key: _key,
          direction: value?.direction === "asc" ? "desc" : "asc",
        })
      }
    >
      <Icon size={16} />
      <span className="text-left"> sort</span>
    </button>
  );
}
