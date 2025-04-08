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
    <div className="bg-green-l5 p-4 rounded-lg grid grid-rows-subgrid row-span-10 content-start">
      <h3 className="text-center font-semibold mb-2">{title}</h3>
      <p className="text-center text-green text-2xl font-bold">{totalGrowth}</p>

      <div className="mt-4 text-sm">
        <div className="mb-3">
          <p className="font-semibold">Savings Account (4%)</p>
          <div className="flex justify-between">
            <span>Invested:</span>
            <span>{savings.invested}</span>
          </div>
          <div className="flex justify-between text-green">
            <span>Growth:</span>
            <span>{savings.growth}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Balance:</span>
            <span>{savings.balance}</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="font-semibold">Investment Account (20%)</p>
          <div className="flex justify-between">
            <span>Invested:</span>
            <span>{investment.invested}</span>
          </div>
          <div className="flex justify-between text-green">
            <span>Growth:</span>
            <span>{investment.growth}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Balance:</span>
            <span>{investment.balance}</span>
          </div>
        </div>

        <div className="flex justify-between text-green font-semibold">
          <span>Total Growth:</span>
          <span>{totalGrowth}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-l3">
        <p className="text-center font-semibold">1 Year Balance</p>
        <p className="text-center text-green text-xl font-bold">{balance}</p>
      </div>
    </div>
  );
}
