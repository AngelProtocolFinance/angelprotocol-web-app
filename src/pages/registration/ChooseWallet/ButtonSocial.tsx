import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string | JSX.Element;
  text?: string;
  alt?: string;
};

export default function ButtonSocial(props: Props) {
  const { icon, text, alt = "", className, ...buttonProps } = props;

  return (
    <button
      className={`flex gap-3 h-12 w-full justify-center items-center bg-white rounded-sm ${className}`}
      {...buttonProps}
    >
      {typeof icon === "string" ? (
        <img src={icon} alt={alt} height={30} width={30} />
      ) : (
        icon
      )}
      {text}
    </button>
  );
}
