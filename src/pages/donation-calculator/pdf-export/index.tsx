import { useSearchParams } from "@remix-run/react";
import { ogInput, ogInputDefault } from "types/donation-calculator";
import { safeParse } from "valibot";
import { bgView } from "../bg-view";
import { Page1 } from "./page1";
import { Page2 } from "./page2";
import { Page3 } from "./page3";
import { Page4 } from "./page4";

export default function Page() {
  const [params] = useSearchParams();
  const res = safeParse(ogInput, Object.fromEntries(params.entries()));
  console.log(res);
  const view = bgView(res.issues ? ogInputDefault : res.output);
  return (
    <div className="w-[1300px] [&>div]:h-[1838.571px] mx-auto font-heading">
      <Page1 v={view} />
      <Page2 v={view} />
      <Page3 />
      <Page4 />
    </div>
  );
}
