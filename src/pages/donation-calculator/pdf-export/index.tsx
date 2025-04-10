import { forwardRef } from "react";
import type { View } from "../bg-view";
import sample from "./data.json";
import { Page1 } from "./page1";
import { Page2 } from "./page2";
import { Page3 } from "./page3";
import { Page4 } from "./page4";

interface IContent extends View {
  classes?: string;
}

export const Content = forwardRef<HTMLDivElement, IContent>(
  ({ classes = "", ...view }, ref) => {
    return (
      <div
        ref={ref}
        className={`${classes} w-[1300px] [&>div]:h-[1795.238px] mx-auto font-heading`}
      >
        <Page1 />
        <Page2 {...view} />
        <Page3 />
        <Page4 />
      </div>
    );
  }
);

export default function Page() {
  return <Content classes="" {...sample} />;
}
