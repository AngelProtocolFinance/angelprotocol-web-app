import { PropsWithChildren } from "react";

const containerClass =
  "w-full p-6 rounded-md grid content-start rounded-md bg-white-grey gap-4";

export function DivContainer(props: PropsWithChildren<{}>) {
  return <div className={containerClass}>{props.children}</div>;
}

export function FormContainer(
  props: React.FormHTMLAttributes<HTMLFormElement>
) {
  return <form {...props} className={containerClass} />;
}

export function GroupContainer(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <div
      className={`p-3 rounded-md bg-light-grey shadow-inner-white-grey ${
        props.className || ""
      }`}
    >
      {props.children}
    </div>
  );
}
