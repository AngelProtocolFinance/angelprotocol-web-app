interface Props {
  title: string;
  totalGrowth: string;
  balance: string;
  savings: {
    invested: string;
    growth: string;
    balance: string;
  };
  investment: {
    invested: string;
    growth: string;
    balance: string;
  };
}

export function ImpactCard({
  title,
  totalGrowth,
  balance,
  savings,
  investment,
}: Props) {
  return (
    <div className="grid grid-rows-subgrid row-span-[13] content-start group">
      <div className="bg-green-l5 grid grid-rows-subgrid row-span-2 py-2 px-2">
        <h3 className="text-right font-semibold">{title}</h3>
        <p className="text-right text-green text-2xl font-bold">
          {totalGrowth}
        </p>
      </div>

      <p className="font-semibold text-right mt-6 px-2">Savings Account (4%)</p>
      <p className="text-right px-2">
        <span className="mr-2">Invested:</span>
        <span>{savings.invested}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Growth:</span>
        <span>{savings.growth}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Balance:</span>
        <span>{savings.balance}</span>
      </p>

      <p className="font-semibold text-right mt-6 px-2">
        Investment Account (20%)
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Invested:</span>
        <span>{investment.invested}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Growth:</span>
        <span className="text-green">{investment.growth}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Balance:</span>
        <span>{investment.balance}</span>
      </p>

      <p className="text-right px-2">
        <span className="mr-2">Total Growth:</span>
        <span className="text-green">{totalGrowth}</span>
      </p>

      <div className="grid grid-rows-subgrid row-span-2 mt-6 bg-green-l5 py-4 px-2">
        <p className="text-right font-semibold">1 Year Balance</p>
        <p className="text-right text-green text-xl font-bold">{balance}</p>
      </div>
    </div>
  );
}
