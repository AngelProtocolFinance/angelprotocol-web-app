import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function ButtonSocial(props: Props) {
  const { className, ...rest } = props;
  return <Button className={`hover:bg-light-grey ${className}`} {...rest} />;
}

export function Button(props: Props) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={`flex gap-3 h-12 w-full justify-center items-center rounded-sm ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
