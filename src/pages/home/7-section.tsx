import { Globe2Icon, LayoutPanelLeftIcon, SproutIcon } from "lucide-react";

export function Section7({ classes = "" }) {
  return (
    <div className={`${classes} grid md:grid-cols-3 pb-24 gap-8`}>
      <div className="grid p-4 pb-8 rounded-lg shadow-xl shadow-gray-l4 border-t border-gray-l4 justify-items-center">
        <LayoutPanelLeftIcon />
        <p className="mt-2 capitalize font-bold text-lg md:text-xl">
          All-in one donation form
        </p>
        <p className="text-center mt-4 text-lg">
          Raise more with a conversion-optimized form-cash, stock, and crypto in
          one flow.
        </p>
      </div>
      <div className="grid p-4 pb-8 rounded-lg shadow-xl shadow-gray-l4 border-t border-gray-l4 justify-items-center">
        <SproutIcon className="stroke-green" size={26} />
        <p className="mt-2 capitalize font-bold text-lg md:text-xl">
          Sustainability fund management
        </p>
        <p className="text-center mt-4 text-lg">
          Raise more with a conversion-optimized form-cash, stock, and crypto in
          one flow.
        </p>
      </div>
      <div className="grid p-4 pb-8 rounded-lg shadow-xl shadow-gray-l4 border-t border-gray-l4 justify-items-center">
        <Globe2Icon className="stroke-blue" />
        <p className="mt-2 capitalize font-bold text-lg md:text-xl">
          Fiscal sponsorship
        </p>
        <p className="text-center mt-4 text-lg">
          Raise more with a conversion-optimized form-cash, stock, and crypto in
          one flow.
        </p>
      </div>
    </div>
  );
}
