import { Link, LinkProps } from "react-router-dom";

type Props = LinkProps & {
  disabled?: boolean;
  bgColorClass: string;
};

export default function LinkButton(props: Props) {
  const { disabled, className, bgColorClass, ...rest } = props;
  return (
    <Link
      className={`rounded-xl uppercase font-bold text-white flex justify-center items-center ${className} ${
        disabled ? "bg-gray-300 cursor-default" : bgColorClass
      }`}
      {...rest}
    />
  );
}
