import { NpoName } from "components/npo-name";
import { humanize } from "helpers/decimal";

interface Props {
  amount: number;
  shares: Record<string, number>;
  classes?: string;
}

export function Review({ classes = "", amount, shares }: Props) {
  return (
    <div className={`overflow-auto ${classes} p-6`}>
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2 text-sm">
        <thead>
          <tr>
            <th className="font-medium text-sm text-gray">Holder</th>
            <th className="font-medium text-sm text-gray">Share</th>
            <th className="font-medium text-sm text-gray">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(shares)
            .toSorted(([, a], [, b]) => b - a)
            .map(([npo, share]) => (
              <tr key={npo} className="text-sm text-gray-d4">
                <td>
                  <NpoName id={npo} />
                </td>
                <td className="text-right">{humanize(share * 100)}</td>
                <td className="text-right">${humanize(share * amount)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
