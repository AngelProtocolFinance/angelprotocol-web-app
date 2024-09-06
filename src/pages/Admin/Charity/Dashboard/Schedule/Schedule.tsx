import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Icon from "components/Icon";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { useModalContext } from "contexts/ModalContext";
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
      <div className="flex items-center gap-x-4 pb-2 border-b border-gray-l4 w-full">
        <h4 className="mb-1">Allocation Settings</h4>
        {presetOpt ? (
          <div className="text-sm flex items-center gap-x-1 bg-blue-l4 rounded-full px-3 py-1">
            <span className="scale-75">{presetOpt.icon}</span>
            <span className="text-xs text-navy-l1">{presetOpt.label}</span>
          </div>
        ) : null}

        <button
          disabled={!endow}
          type="button"
          className="hover:text-blue disabled:text-gray ml-auto"
          onClick={() => {
            if (!endow) throw "@dev: no endow";
            showModal(Edit, { ...allocation, amount: props.amount, id });
          }}
        >
          <Icon type="Pencil" className="h-4 w-4" />
          <span className="sr-only">Edit allocation settings</span>
        </button>
      </div>

      <div className="grid grid-cols-[auto_auto_1fr] gap-y-3 gap-x-2 mt-4">
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
          pct={endow?.allocation?.cash ?? 0}
        />
        <Row
          icon={<img src={sendMoney} width={20} className="mr-2" />}
          title={<span>Savings</span>}
          pct={endow?.allocation?.liq ?? 50}
        />

        <Row
          icon={<img src={leaf} className="mr-2" />}
          title={<span>Investments</span>}
          pct={endow?.allocation?.lock ?? 50}
        />
      </div>
      <p className="text-sm text-gray mt-6 text-right">
        Will take effect on: {props.periodNext}{" "}
        <span className="text-xs bg-gray text-white px-2 py-1 rounded">
          in {props.periodRemaining}
        </span>
        <Tooltip
          trigger={
            <Icon type="Info" size={16} className="text-navy-l1 ml-2 inline" />
          }
        >
          <Content className="max-w-xs text-sm bg-navy-d4 text-gray-l4 p-3 rounded-lg">
            We process donations monthly, with a minimum balance requirement of
            ${MIN_PROCESSING_AMOUNT} per bucket. If your balance in any bucket
            is below ${MIN_PROCESSING_AMOUNT}, it will be carried over to the
            next month until it exceeds $50
            <Arrow />
          </Content>
        </Tooltip>
      </p>
    </div>
  );
}

interface IRow {
  pct: number;
  icon: ReactNode;
  title: ReactNode;
}
function Row({ pct, icon, title }: IRow) {
  return (
    <div className="grid grid-cols-subgrid col-span-full items-center">
      {icon}
      {title}
      <span className="ml-2 text-navy-l1 font-medium text-right">
        {pct ?? 50} %
      </span>
    </div>
  );
}
