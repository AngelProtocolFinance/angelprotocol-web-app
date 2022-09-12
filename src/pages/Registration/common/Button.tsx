import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import Loader from "components/Loader";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: true | boolean;
    className?: string;
    submit?: boolean;
  }
>;

export function Button(props: Props) {
  const { isLoading, className, children, submit, disabled, ...rest } = props;

  const content = isLoading ? (
    <Loader bgColorClass="bg-white" widthClass="w-3" gapClass="gap-1" />
  ) : (
    children
  );

  return (
    <button
      type={submit ? "submit" : "button"}
      className={`disabled:bg-gray-300 disabled:cursor-auto rounded-xl uppercase font-bold text-white ${className}`}
      {...rest}
      disabled={disabled || isLoading}
    >
      {content}
    </button>
  );
}
