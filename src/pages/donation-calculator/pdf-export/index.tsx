import { Page1 } from "./page1";
import { Page2 } from "./page2";
import { Page3 } from "./page3";
import { Page4 } from "./page4";

export default function Page() {
  return (
    <div className="w-full border-x mx-auto">
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
    </div>
  );
}
