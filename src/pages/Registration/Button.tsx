import Loader from "components/Loader/Loader";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: true | boolean;
    classes?: string;
    submit?: boolean;
  }
>;

export default function Button(props: Props) {
  const { isLoading, classes, children, submit, ...rest } = props;

  const content = isLoading ? (
    <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />
  ) : (
    children
  );

  return (
    <button
      type={submit ? "submit" : "button"}
      className={`disabled:bg-gray-300 disabled:cursor-auto rounded-xl uppercase font-bold text-white ${classes}`}
      {...rest}
    >
      {content}
    </button>
  );
}
