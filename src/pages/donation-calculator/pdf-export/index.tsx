import { Page1 } from "./page1";
import { Page2 } from "./page2";
import { Page3 } from "./page3";
import { Page4 } from "./page4";

export default function Page() {
  return (
    <div className="w-[1300px] [&>div]:h-[1795.238px] mx-auto font-heading border border-gray-l4">
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </div>
  );
}
