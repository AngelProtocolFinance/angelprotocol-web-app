import { Page1 } from "./page1";
import { Page2 } from "./page2";
import { Page3 } from "./page3";

export default function Page() {
  return (
    <div className="w-full border-x mx-auto">
      <Page1 />
      <Page2 />
      <Page3 />
      <div className="h-[70.16625rem] bg-amber">page4</div>
    </div>
  );
}
