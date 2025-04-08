import { Page1 } from "./page1";

export default function Page() {
  return (
    <div className="w-full bg-gray-l5 border-x mx-auto">
      <Page1 />
      <div className="h-[70.16625rem] bg-blue">page2</div>
      <div className="h-[70.16625rem] bg-green">page3</div>
      <div className="h-[70.16625rem] bg-amber">page4</div>
    </div>
  );
}
