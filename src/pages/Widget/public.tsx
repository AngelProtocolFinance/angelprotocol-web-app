import { Widget } from "./Widget";

export function Component() {
  // Widget.tsx is also used as one of the Admin pages and so
  // where its styles depend on the width of the parent component;
  // We copy/paste src/pages/Admin/Layout.tsx container setup & styles
  // here so that Widget.tsx styles are applied correctly on both pages.
  return (
    <div className="px-6 py-8 md:p-10 @container">
      <Widget />
    </div>
  );
}
