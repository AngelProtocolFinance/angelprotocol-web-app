import { LinkGroup } from "./types";
import Icon from "components/Icon";
import Logo from "components/Logo";

type Props = { linkGroups: LinkGroup[] };

export default function Sidebar(props: Props) {
  return (
    <div className="grid w-64 max-h-[1383px] bg-white border-r border-prim overflow-y-auto scroller">
      <div className="flex flex-col gap-3 w-full py-6 px-5">
        <div className="flex justify-between">
          <Logo className="w-14 h-14" />
          <button
            type="button"
            className="btn-outline gap-2 normal-case h-10 pr-4 pl-3"
          >
            <Icon type="Sync" />
            Switch
          </button>
        </div>

        <div className="grid gap-1">
          <h6 className="text-sm font-bold truncate">Endowment Name</h6>
          <span className="text-xs truncate">
            juno1rhaasmvq6t3a607ua90ufrr8srkr08lxauqnpz
          </span>
        </div>
      </div>
    </div>
  );
}
