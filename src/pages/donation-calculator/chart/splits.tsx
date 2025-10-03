import { to_usd } from "helpers/to-usd";
interface Props {
  classes?: string;
  notGranted: number;
  savingsRate: number;
  investedRate: number;
  savings: number;
  invested: number;
}

export function Splits({ classes = "", ...v }: Props) {
  return (
    <div
      className={`text-xs flex @max-lg:flex-col justify-end gap-4 ${classes}`}
    >
      <div className="grid @lg:pb-2 border-gray-l3 @lg:px-2">
        <p className="text-right font-semibold text-xs">
          Annual Saved/Invested
        </p>
        <span className="text-right">{to_usd(v.notGranted)}</span>
      </div>
      <div className="grid @lg:pb-2 border-gray-l3 @lg:px-2">
        <p>
          <span className="text-right font-semibold text-xs mr-1">
            Annual Saved
          </span>
          <span className="text-right">
            ({(v.savingsRate * 100).toFixed(0)}%)
          </span>
        </p>
        <span className="text-right">{to_usd(v.savings)}</span>
      </div>
      <div className="grid @lg:pb-2 border-gray-l3 @lg:px-2">
        <p>
          <span className="text-right font-semibold text-xs mr-1">
            Annual Invested
          </span>
          <span className="text-right">
            ({(v.investedRate * 100).toFixed(0)}%)
          </span>
        </p>
        <span className="text-right">{to_usd(v.invested)}</span>
      </div>
    </div>
  );
}
