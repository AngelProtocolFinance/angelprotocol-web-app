import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Icon from "components/Icon";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import type { ReactNode } from "react";
import { useEndowmentQuery } from "services/aws/aws";
import type { Allocation } from "types/aws";
import { Edit } from "./Edit";
import {
  MIN_PROCESSING_AMOUNT,
  allocationOptions,
  toAllocOptValue,
} from "./common";

interface Props {
  amount: number;
  classes?: string;
  periodNext: string;
  periodRemaining: string;
  grantFromBal: number;
}
export function Schedule(props: Props) {
  const { id } = useAdminContext();
  const { showModal } = useModalContext();
  const { data: endow } = useEndowmentQuery({
    id,
    fields: ["allocation"],
  });

  const allocation: Allocation =
    !endow || !endow.allocation
      ? { cash: 0, liq: 100, lock: 0 }
      : endow.allocation;

  const presetOpt = allocationOptions.find(
    (opt) => opt.value === toAllocOptValue(allocation)
  );

  return (
    <div className="p-4 grid rounded border border-gray-l4 mt-4">
      <div className="grid border-b border-gray-l4 w-full pb-2">
        <h4 className="mb-1">Donations received</h4>
        <p className="font-heading font-medium">$ {humanize(props.amount)}</p>
      </div>
      <div className="flex items-center mt-4 gap-x-2">
        <h4 className="mb-1">Distribution</h4>
        {presetOpt ? (
          <div className="text-sm flex items-center gap-x-1 bg-blue-l4 rounded-full px-3 py-1">
            <span className="scale-75">{presetOpt.icon}</span>
            <span className="text-xs text-navy-l1">{presetOpt.label}</span>
          </div>
        ) : null}

        <button
          disabled={!endow}
          type="button"
          className="hover:text-blue disabled:text-gray"
          onClick={() => {
            if (!endow) throw "@dev: no endow";
            showModal(Edit, { ...allocation, amount: props.amount, id });
          }}
        >
          <Icon type="Pencil" className="h-4 w-4" />
          <span className="sr-only">Edit allocation settings</span>
        </button>
      </div>

      <div className="grid grid-cols-[auto_auto_auto_1fr_auto_auto] gap-y-3 gap-x-2 mt-4">
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
                <Content className="max-w-xs bg-navy-d4 p-4 text-gray-l4 text-sm shadow-lg rounded-lg">
                  Donations received through Better Giving that will distributed
                  to your bank account.
                  <Arrow />
                </Content>
              </Tooltip>
            </div>
          }
          pct={allocation.cash}
          amount={props.amount}
          tooltip={(val) =>
            val !== 0 &&
            /** include additional grant from bal */
            val + props.grantFromBal < MIN_PROCESSING_AMOUNT && (
              <Tooltip
                trigger={
                  <Icon
                    type="Info"
                    size={16}
                    className="inline mr-auto text-amber"
                  />
                }
              >
                <Content className="max-w-xs text-sm bg-navy-d4 text-gray-l4 p-3 rounded-lg">
                  Grant amount of $ {humanize(val)} is less than minimum
                  processing amount of ${MIN_PROCESSING_AMOUNT} and would be
                  carried over to the next month.
                  <Arrow />
                </Content>
              </Tooltip>
            )
          }
        />
        <Row
          icon={<img src={sendMoney} width={20} className="mr-2" />}
          title={<span>Savings</span>}
          pct={allocation.liq}
          amount={props.amount}
        />

        <Row
          icon={<img src={leaf} className="mr-2" />}
          title={<span>Investments</span>}
          pct={allocation.lock}
          amount={props.amount}
        />
      </div>
    </div>
  );
}

interface IRow {
  amount: number;
  pct: number;
  icon: ReactNode;
  title: ReactNode;
  tooltip?: (val: number) => ReactNode;
}
function Row(props: IRow) {
  const val = props.amount * (props.pct / 100);
  return (
    <div className="grid grid-cols-subgrid col-span-full items-center">
      {props.icon}
      {props.title}
      <span className="ml-2 text-navy-l1 font-medium text-sm font-heading">
        {props.pct ?? 50} %
      </span>
      <span className="text-right">$</span>
      <span className="text-left font-heading font-medium">
        {humanize(val)}
      </span>
      {props.tooltip?.(val)}
    </div>
  );
}
