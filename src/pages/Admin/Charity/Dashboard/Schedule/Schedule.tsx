import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Icon from "components/Icon";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import type { ReactNode } from "react";
import { useEndowmentQuery } from "services/aws/aws";
import { Edit } from "./Edit";

interface Props {
  amount: number;
  classes?: string;
  periodNext: string;
  periodRemaining: string;
}
export function Schedule(props: Props) {
  const { id } = useAdminContext();
  const { showModal } = useModalContext();
  const { data: endow } = useEndowmentQuery({
    id,
    fields: ["allocation"],
  });

  return (
    <div className="p-4 grid rounded border border-gray-l4 mt-4">
      <div className="flex flex-row items-center justify-between space-y-0">
        <h4 className="mb-1">Allocation Settings</h4>
        <button
          disabled={!endow}
          type="button"
          className="hover:text-blue disabled:text-gray"
          onClick={() => {
            if (!endow) throw "@dev: no endow";
            showModal(Edit, {
              ...(endow.allocation ?? { cash: 0, liq: 50, lock: 50 }),
              amount: props.amount,
              id,
            });
          }}
        >
          <Icon type="Pencil" className="h-4 w-4" />
          <span className="sr-only">Edit allocation settings</span>
        </button>
      </div>
      <p className="text-sm mb-4 text-gray">
        will take effect on: {props.periodNext}{" "}
        <span className="text-xs bg-gray text-white px-2 py-1 rounded">
          in {props.periodRemaining}
        </span>
      </p>
      <div className="grid grid-cols-[auto_auto_auto_1fr_auto] gap-y-2 gap-x-2">
        <Row
          icon={<Icon type="ArrowRight" className="h-4 w-4 mr-2" />}
          title={
            <div className="flex items-center">
              <span>Grants</span>
              <Tooltip
                trigger={
                  <Icon
                    type="Question"
                    size={14}
                    className="text-navy-l1 ml-1"
                  />
                }
              >
                <Content className="max-w-xs bg-navy-d4 p-4 text-white text-sm shadow-lg rounded-lg">
                  Donations received through Better Giving that will distributed
                  to your bank account.
                  <Arrow />
                </Content>
              </Tooltip>
            </div>
          }
          pct={endow?.allocation?.cash ?? 0}
          amount={props.amount}
        />
        <Row
          icon={<img src={sendMoney} width={20} className="mr-2" />}
          title={<span>Savings</span>}
          pct={endow?.allocation?.liq ?? 50}
          amount={props.amount}
        />

        <Row
          icon={<img src={leaf} className="mr-2" />}
          title={<span>Investments</span>}
          pct={endow?.allocation?.lock ?? 50}
          amount={props.amount}
        />
      </div>
    </div>
  );
}

interface IRow {
  pct: number;
  icon: ReactNode;
  title: ReactNode;
  amount: number;
}
function Row({ pct, icon, title, amount }: IRow) {
  const num = (pct / 100) * amount;
  const isLessThanMin = num < 50 && num !== 0;
  return (
    <div className="grid grid-cols-subgrid col-span-full items-center">
      {icon}
      {title}
      <span className="ml-2 text-navy-l1 text-sm">{pct ?? 50} %</span>
      <span
        className={`justify-self-end font-bold ${
          isLessThanMin ? "text-amber" : ""
        }`}
      >
        $ {humanize((pct / 100) * amount)}
      </span>
      {isLessThanMin && (
        <Tooltip
          trigger={<Icon type="Info" size={14} className="text-amber" />}
        >
          <Content className="p-3 rounded-lg bg-navy-d4 text-white text-sm">
            Less than min
            <Arrow />
          </Content>
        </Tooltip>
      )}
    </div>
  );
}
