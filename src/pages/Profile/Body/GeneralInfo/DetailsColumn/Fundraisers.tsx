import type { Fields } from "@better-giving/fundraiser/cloudsearch";
import { useFundsEndowMemberOfQuery } from "services/aws/endow-funds";

interface Props {
  endowId: number;
  classes?: string;
}
/** fundraisers that `endowId` is the only member of (not an index fund)  */
export function Fundraisers({ endowId, classes = "" }: Props) {
  const { data: funds = [] } = useFundsEndowMemberOfQuery({
    endowId,
    npoProfileFeatured: true,
  });

  return (
    <div
      className={`${classes} p-8 border border-gray-l4 rounded divide-y divide-gray-l4`}
    >
      <h3 className="mb-4">Fundraisers</h3>
      {funds.map((f) => (
        <Fund key={f.id} {...f} />
      ))}
    </div>
  );
}

function Fund(props: Fields) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-2">
      <img
        src={props.logo}
        alt="fundraiser logo"
        width={40}
        height={40}
        className="row-span-2 shrink-0"
      />
      <p>{props.name}</p>
      <p className="whitespace-pre-line text-navy-l1 text-sm">
        {props.description}
      </p>
    </div>
  );
}
