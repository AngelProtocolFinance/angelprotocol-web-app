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
