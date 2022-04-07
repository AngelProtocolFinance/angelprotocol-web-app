import { PropsWithChildren } from "react";

export default function FormContainer(props: PropsWithChildren<{}>) {
  return (
    <div className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey gap-4">
      {props.children}
    </div>
  );
}
