import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  text?: string;
  alt?: string;
};

export default function ButtonSocial(props: Props) {
  const { icon, text, alt = "", className, ...buttonProps } = props;

  return (
    <button
      className={`flex gap-3 h-12 justify-center items-center bg-white text-dark-grey rounded-sm ${className}`}
      {...buttonProps}
    >
      <img src={icon} alt={alt} height={30} width={30} />
      {text}
    </button>
  );
}
