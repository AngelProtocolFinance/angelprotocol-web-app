import { PropsWithChildren } from "react";

const containerClass =
  "w-full p-6 rounded-md grid content-start rounded-md bg-white gap-4";

export function DivContainer(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <div className={containerClass + " " + props.classes}>{props.children}</div>
  );
}

export function FormContainer({
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} className={containerClass + " " + className} />;
}

export function GroupContainer(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <div
      className={`p-3 rounded-md bg-gray-l4 shadow-inner-white ${
        props.className || ""
      }`}
    >
      {props.children}
    </div>
  );
}
