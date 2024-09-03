import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Icon from "components/Icon";
import { Arrow, Content, Tooltip } from "components/Tooltip";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
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

  const val = (pct?: number) =>
    pct || pct === 0 ? `$ ${humanize((pct / 100) * props.amount)}` : "---";

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
      <div className="grid grid-cols-[auto_auto_auto_1fr] gap-y-2 gap-x-2">
        <div className="grid grid-cols-subgrid col-span-full items-center">
          <Icon type="ArrowRight" className="h-4 w-4 mr-2" />

          <div className="flex items-center">
            <span>Grants</span>
            <Tooltip
              content={
                <Content className="max-w-xs bg-navy-d4 p-4 text-white text-sm shadow-lg rounded-lg">
                  Donations received through Better Giving that will distributed
                  to your bank account.
                  <Arrow />
                </Content>
              }
            >
              <Icon type="Question" size={14} className="text-navy-l1 ml-1" />
            </Tooltip>
          </div>

          <span className="ml-2 text-navy-l1 text-sm">
            {endow?.allocation?.cash ?? 0} %
          </span>
          <span className="justify-self-end font-bold">
            {val(endow ? endow.allocation?.cash ?? 0 : undefined)}
          </span>
        </div>
        <div className="grid grid-cols-subgrid col-span-full items-center">
          <img src={sendMoney} width={20} className="mr-2" />
          <span>Savings</span>
          <span className="ml-2 text-navy-l1 text-sm">
            {endow?.allocation?.liq ?? 50} %
          </span>
          <span className="justify-self-end font-bold">
            {val(endow ? endow.allocation?.liq ?? 50 : undefined)}
          </span>
        </div>
        <div className="grid grid-cols-subgrid col-span-full items-center">
          <img src={leaf} className="mr-2" />
          <span>Investments</span>
          <span className="ml-2 text-navy-l1 text-sm">
            {endow?.allocation?.lock ?? 50} %
          </span>
          <span className="justify-self-end font-bold">
            {val(endow ? endow.allocation?.lock ?? 50 : undefined)}
          </span>
        </div>
      </div>
    </div>
  );
}
