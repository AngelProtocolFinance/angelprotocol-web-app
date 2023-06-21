import { TPermission } from "../types";
import { DrawerIcon } from "components/Icon";
import { Cells } from "components/TableSection";
import LockButton from "./LockButton";

type Props = TPermission & {
  title: string;
  isOpen: boolean;
  onToggle(): void;
};

export default function Permission(p: Props) {
  return (
    <Cells type="td" cellClass="py-4 px-4 border-r border-prim last:border-r-0">
      <td className="sm:hidden relative">
        <button type="button" onClick={p.onToggle} className="w-full contents">
          <DrawerIcon
            size={25.5}
            className={`${p.isOpen ? "text-orange" : ""} absolute-center`}
            isOpen={p.isOpen}
          />
        </button>
      </td>
      <td className="text-sm uppercase font-work w-full max-sm:col-start-2 max-sm:col-span-11 max-sm:border-r-0">
        <div className="h-full flex items-center sm:contents">{p.title}</div>
      </td>
      <td
        className={`${
          p.isOpen
            ? "max-sm:flex max-sm:items-center gap-3 max-sm:justify-center"
            : "hidden"
        } relative max-sm:col-span-6 max-sm:col-start-1 max-sm:border-r-0 max-sm:border-t`}
      >
        <p className="sm:hidden font-work font-bold text-xs uppercase">
          Admin wallet
        </p>
        <Checkbox checked={p.ownerControlled} />
      </td>
      <td
        className={`${
          p.isOpen
            ? "max-sm:flex max-sm:items-center gap-3 max-sm:justify-center"
            : "hidden"
        } relative max-sm:col-span-6 max-sm:col-start-7 max-sm:border-r-0 max-sm:border-t`}
      >
        <p className="order-2 sm:hidden font-work font-bold text-xs uppercase">
          Delegate
        </p>
        <Checkbox checked={p.isActive} />
      </td>
      <td
        className={`${
          p.isOpen ? "" : "hidden"
        } relative max-sm:col-span-full max-sm:w-full max-sm:border-r-0 max-sm:border-t`}
      >
        <p className="sm:hidden font-work font-bold text-xs mb-3 uppercase">
          Delegate address
        </p>
        <div className="relative">{p.addr}</div>
      </td>
      <td
        className={`${
          p.isOpen
            ? "max-sm:flex max-sm:justify-between max-sm:items-center"
            : "hidden"
        } relative max-sm:col-span-full max-sm:w-full max-sm:border-r-0 max-sm:border-t`}
      >
        <p className="sm:hidden font-work font-bold text-xs uppercase">
          Actions
        </p>
        <LockButton {...p} />
      </td>
    </Cells>
  );
}

function Checkbox(props: { checked: boolean }) {
  return (
    <input
      type="checkbox"
      disabled
      readOnly
      className="checkbox"
      checked={props.checked}
    />
  );
}
