import React from "react";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import toCurrency from "helpers/toCurrency";

export default function TestPage() {
  return (
    <div className="grid content-start padded-container pb-16 text-white-grey">
      <h3 className="text-3xl font-bold text-center">Splits and Allocations</h3>
      <div className="mt-4 flex gap-2 items-baseline">
        <h4 className="text-xl font-extrabold uppercase">Donations Split</h4>
        <p className="text-5xl font-heading font-bold text-angel-orange">70%</p>
        <PrimaryBtn className="uppercase font-heading text-xs justify-self-center px-2 py-1 rounded-sm self-center">
          update split
        </PrimaryBtn>
      </div>
      <input
        min={0}
        max={100}
        step={1}
        type="range"
        className="my-4 max-w-lg"
      />
      <p className="text-white-grey text-white-grey/80 max-w-md">
        Percentage of donations to split off into the Current Account. The
        maximum that can be split into the Current Account as present is set at
        80% by the Angel Protocol DANO.
      </p>

      <h4 className="text-xl font-extrabold my-4 uppercase border-t border-white/10 pt-2">
        Endowment Allocation
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <table>
          <TableSection type="thead" rowClass="text-left uppercase">
            <Cells type="th" cellClass="">
              <>name</>
              <>target</>
              <>value</>
            </Cells>
          </TableSection>
          <TableSection
            type="tbody"
            rowClass="border-b border-white/10 last:border-none"
          >
            {holdings
              .map((holding) => (
                <Cells type="td" cellClass="py-2" key={holding.name}>
                  <div className="flex items-center gap-2">
                    {holding.status === "closed" ? (
                      <Icon type="Warning" className="text-amber-400" />
                    ) : (
                      <Icon type="Circle" className="text-emerald-300" />
                    )}
                    <span>{holding.name}</span>
                  </div>
                  <>{toCurrency(holding.target * 100, 2)} %</>
                  <>$ {toCurrency(holding.value, 2)}</>
                </Cells>
              ))
              .concat(
                <Cells type="td" cellClass="py-2" key="__add_vault">
                  <PrimaryBtn className="px-2 py-1 text-xs uppercase flex items-center gap-1 rounded-sm">
                    <Icon type="Plus" />
                    <span>add vault</span>
                  </PrimaryBtn>
                </Cells>
              )}
          </TableSection>
        </table>
        <div className="bg-sky-300">graph here</div>
      </div>
    </div>
  );
}

function PrimaryBtn({
  className,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...restProps}
      className={
        "text-white-grey bg-angel-blue hover:bg-bright-blue active:bg-angel-orange disabled:bg-grey-accent " +
        className
      }
    />
  );
}

type Holding = {
  status: "open" | "closed";
  name: string;
  target: number;
  value: number;
};

const holdings: Holding[] = [
  {
    name: "Astroport Vault",
    target: 0.6,
    value: 1000,
    status: "open",
  },
  {
    name: "Cosmos ETF",
    target: 0.15,
    value: 200,
    status: "open",
  },
  {
    name: "Anchor Vault",
    target: 0.15,
    value: 200,
    status: "open",
  },
  {
    name: "DoKwon Vault",
    target: 0.1,
    value: 200,
    status: "closed",
  },
];

type Vault = {
  name: string;
  pctApy: number;
  riskLevel: "high" | "medium";
  prospectusUrl: string;
};
