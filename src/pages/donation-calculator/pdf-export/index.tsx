import { Page1 } from "./page1";
import { Page2 } from "./page2";

export default function Page() {
  return (
    <div className="w-full bg-gray-l5 border-x mx-auto">
      <Page1 />
      <Page2 />
      <div className="h-[70.16625rem] bg-green">page3</div>
      <div className="h-[70.16625rem] bg-amber">page4</div>
    </div>
  );
}
