import Icon from "components/Icon";
import Logo from "components/Logo";

type Props = {};

export default function Sidebar(props: Props) {
  return (
    <div className="grid w-64 max-h-[1383px] bg-white border-r border-prim overflow-y-auto scroller">
      <div className="grid gap-3 w-full py-6 px-5">
        <div className="flex justify-between">
          <Logo />
          <button
            type="button"
            className="btn-outline gap-2 normal-case h-10 pr-4 pl-3"
          >
            <Icon type="Sync" />
            Switch
          </button>
        </div>
      </div>
    </div>
  );
}
