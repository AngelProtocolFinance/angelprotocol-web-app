import Icon from "components/Icon";
import { Arrow, Content } from "components/Tooltip";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import type { BalanceMovement, EndowmentBalances } from "types/aws";
import Figure from "./Figure";
import { MoveFundForm } from "./MoveFundForm";
import { Movements } from "./Movements";
import { PayoutHistory } from "./PayoutHistory";
import { Schedule } from "./Schedule";
import { monthPeriod } from "./monthPeriod";

export function Loaded({
  classes = "",
  ...props
}: EndowmentBalances & { classes?: string }) {
  const { id } = useAdminContext();
  const period = monthPeriod();
  const { showModal } = useModalContext();

  const mov = props.movementDetails ?? {
    "liq-cash": 0,
    "liq-lock": 0,
    "lock-cash": 0,
  };

  const liqDeductions = Object.entries(mov).reduce(
    (sum, [k, v]) => (k.startsWith("liq-") ? sum + v : sum),
    0
  );
  const lockDeductions = Object.entries(mov).reduce(
    (sum, [k, v]) => (k.startsWith("lock-") ? sum + v : sum),
    0
  );

  const grantFromBal = Object.entries(mov).reduce(
    (sum, [k, v]) => (k.endsWith("-cash") ? sum + v : sum),
    0
  );

  const balances: BalanceMovement = {
    "liq-cash": props.donationsBal - liqDeductions,
    "liq-lock": props.donationsBal - liqDeductions,
    "lock-cash": props.sustainabilityFundBal - lockDeductions,
  };

  return (
    <div className={`${classes} mt-6`}>
      <h3 className="uppercase mb-4 font-black">Account Balances</h3>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          tooltip={
            <Content className="bg-navy-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          icon={<Icon size={21} type="PiggyBank" strokeWidth={1.5} />}
          amount={`$ ${humanize(props.donationsBal - props.payoutsMade, 2)}`}
          actions={
            <div className="mt-8 flex justify-end gap-x-2">
              <button
                type="button"
                onClick={() =>
                  showModal(MoveFundForm, {
                    type: "liq-cash",
                    balance: balances["liq-cash"],
                    mov,
                    endowId: id,
                    effect: "append",
                  })
                }
                className="text-xs uppercase bg-blue-d1 text-white px-2 py-1 rounded-sm font-heading hover:bg-blue"
              >
                withdraw
              </button>
              <button
                type="button"
                onClick={() =>
                  showModal(MoveFundForm, {
                    type: "liq-lock",
                    balance: balances["liq-lock"],
                    mov,
                    endowId: id,
                    effect: "append",
                  })
                }
                className="text-xs uppercase bg-blue-d1 text-white px-2 py-1 rounded-sm font-heading hover:bg-blue"
              >
                invest
              </button>
            </div>
          }
        />
        <Figure
          title="Investments"
          tooltip={
            <Content className="bg-navy-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg shadow-lg">
              <span className="block mb-2">
                Funds invested in a diversified portfolio comprising
              </span>
              <div>
                <p>50% - Domestic and international equities</p>
                <p>30% - Fixed income</p>
                <p>15% - Crypto</p>
                <p>5% - Cash</p>
              </div>
              <Arrow />
            </Content>
          }
          icon={<Icon type="Stocks" size={16} />}
          amount={`$ ${humanize(props.sustainabilityFundBal, 2)}`}
          actions={
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  showModal(MoveFundForm, {
                    type: "lock-cash",
                    balance: balances["lock-cash"],
                    mov,
                    endowId: id,
                    effect: "append",
                  })
                }
                className="text-xs uppercase bg-blue-d1 text-white px-2 py-1 rounded-sm font-heading hover:bg-blue"
              >
                withdraw
              </button>
            </div>
          }
        />
        <Figure
          title="Contributions count"
          icon={<Icon type="Users" size={17} />}
          amount={props.contributionsCount.toString()}
        />
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      <h3 className="my-4 font-medium flex items-center">
        <span className="text-sm uppercase font-normal">Period</span>
        <span className="ml-2 uppercase text-sm">
          {period.from} - {period.to}
        </span>
        <p className="text-sm text-navy-l3 ml-auto">
          <span>Ends in </span>
          <span className="p-1 px-2 bg-navy-d4 text-gray-l4 text-xs rounded ml-1">
            in {period.distance}
          </span>
        </p>
      </h3>

      <Movements endowId={id} mov={mov} classes="mt-4" balances={balances} />
      <Schedule
        amount={props.payoutsPending}
        periodNext={period.next}
        periodRemaining={period.distance}
        grantFromBal={grantFromBal}
      />

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />
      <PayoutHistory endowId={id} classes="mt-2" />
    </div>
  );
}
