import type { ReactNode } from "react";
import { type ISort, Sort } from "./sort";

interface Props {
  k?: string;
  children: ReactNode;
  filter?: (k: string) => ReactNode;
  sort?: ISort;
}
export function H(props: Props) {
  return (
    <th>
      <div className="flex items-start gap-x-2">
        {props.sort && props.k && <Sort _key={props.k} {...props.sort} />}
        {props.children}
        {props.k && props.filter?.(props.k)}
      </div>
    </th>
  );
}
