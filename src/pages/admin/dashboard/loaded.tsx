import { min_payout_amount } from "@better-giving/endowment/schema";
import { Info } from "components/status";
import { Arrow, Content } from "components/tooltip";
import { humanize } from "helpers/decimal";
import { ArrowDownToLineIcon, ArrowLeftRightIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { use_admin_data } from "../use-admin-data";
import type { DashboardData } from "./api";
import { GrantsTable } from "./common/grants-table";
import { PayoutsTable } from "./common/payouts-table";
import { Figure } from "./figure";
import { Payout } from "./payout";

interface Props extends DashboardData {
  classes?: string;
}

export function Loaded({ classes = "", ...props }: Props) {
  const data = use_admin_data();
  const payout_min = data?.endow.payout_minimum ?? min_payout_amount;

  const navigate = useNavigate();

  return (
    <div className={`${classes} mt-6`}>
      <div className="grid gap-4 @lg:grid-cols-2">
        <Figure
          title="Savings"
          to="../savings"
          tooltip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg">
              Funds held in Fidelity Government Money Market (SPAXX) consisting
              of cash, US Government Securities and Repurchase Agreements
              <Arrow />
            </Content>
          }
          amount={`$${humanize(props.bal_liq, 2)}`}
        />
        <Figure
          title="Investments"
          to="../investments"
          tooltip={
            <Content className="bg-gray-d4 text-gray-l4 text-sm max-w-xs p-4 rounded-lg shadow-lg">
              <span className="block mb-2">
                Funds invested in a diversified portfolio comprising:
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
          amount={`$ ${humanize(props.bal_lock, 2)}`}
          // perf={<SfPerf id={props.id} />}
        />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <NavLink
          to="withdraw"
          className="btn-outline rounded px-4.5 py-2.5 text-sm flex items-center gap-2"
        >
          <ArrowDownToLineIcon size={16} />
          Withdraw
        </NavLink>
        <NavLink
          to="transfer"
          className="btn-amber rounded px-4.5 py-2.5 text-sm flex items-center gap-2"
        >
          <ArrowLeftRightIcon size={16} />
          Transfer
        </NavLink>
      </div>

      <div className="w-full mt-16 h-1.5 bg-gray-l5 rounded-full shadow-inner" />

      {/** div scopes when the sticky header ends */}
      <div className="@container/period mt-2">
        <div className="flex items-center gap-x-2 mb-2">
          <h4 className="text-lg">Grant items</h4>
          {props.recent_payouts.items.length > 0 && (
            <NavLink to="payouts" className="text-blue text-sm">
              see all
            </NavLink>
          )}
        </div>

        {props.recent_payouts.items.length > 0 ? (
          <PayoutsTable
            classes="mt-2 mb-3"
            items={props.recent_payouts.items}
          />
        ) : (
          <Info classes="mt-2 mb-3">No grant items</Info>
        )}

        {props.recent_payouts.items.length > 0 && (
          <Payout
            next_payout={props.next_payout}
            bal_cash={props.bal_cash}
            threshold={payout_min}
            pm={props.pm}
            classes=""
          />
        )}

        {props.recent_settlements.items.length > 0 && (
          <h4 className="text-lg mb-2 mt-8">Payout history</h4>
        )}
        {props.recent_settlements.items.length > 0 ? (
          <GrantsTable
            items={props.recent_settlements.items}
            load_next={
              props.recent_settlements.next
                ? () => navigate("grants")
                : undefined
            }
          />
        ) : (
          <Info>No payout records</Info>
        )}
      </div>
    </div>
  );
}
