import type { FundItem as TFundItem } from "@better-giving/fundraiser";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useCachedLoaderData } from "api/cache";
import { Info } from "components/status";
import { appRoutes } from "constants/routes";
import { useState } from "react";
import type { UserV2 } from "types/auth";
import type { LoaderData } from "./api";
import { FundItem } from "./fund-item";

type CreatorType = "others" | "ours";
export { action, loader } from "./api";
export { clientLoader } from "api/cache";
export { ErrorBoundary } from "components/error";
export default function Funds() {
  const { funds, endow, user } = useCachedLoaderData<LoaderData>();
  const [creatorType, setCreatorType] = useState<CreatorType>("ours");

  return (
    <div className="grid">
      <div className="">
        <h3 className="text-3xl border-b border-gray-l4 pb-2">Fundraisers</h3>
        <RadioGroup
          value={creatorType}
          onChange={setCreatorType}
          className="flex flex-col @2xl:flex-row @2xl:items-center mt-1 mb-6 gap-1"
        >
          {(["ours", "others"] satisfies CreatorType[]).map((opt) => (
            <Field key={opt} className="contents">
              <Radio value={opt} className="peer hidden" />
              <Label className="text-sm bg-blue-l4 peer-data-checked:bg-blue-d1 peer-data-checked:text-white py-1 px-4 rounded-full hover:bg-blue-d1 hover:text-white">
                {opt === "ours" ? `By Nonprofit` : `By Supporters`}
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
      <div className="grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4">
        {items({ funds, creatorType, endowId: endow.id, user })}
        {creatorType === "ours" && (
          <Link
            to={{
              pathname: appRoutes.funds + "/new",
              search: `npo=$ endowId}`,
            }}
            className="btn-blue text-sm px-6 py-2 rounded-full normal-case mt-4 col-span-full justify-self-start"
          >
            Create fundraiser
          </Link>
        )}
      </div>
    </div>
  );
}

interface IItems {
  endowId: number;
  creatorType: CreatorType;
  funds: TFundItem[];
  user: UserV2;
}
function items({ funds, creatorType, endowId, user }: IItems) {
  const filtered =
    creatorType === "ours"
      ? funds.filter((f) => f.creator_id === endowId.toString())
      : funds.filter((f) => f.creator_id !== endowId.toString());

  if (filtered.length === 0) {
    const msg =
      creatorType === "ours"
        ? "No fundraisers found"
        : "No fundraisers found for this nonprofit";
    return <Info classes="mt-4">{msg}</Info>;
  }

  return filtered
    .toSorted(
      (a, b) =>
        (b.creator_id === endowId.toString() ? 1 : 0) -
        (a.creator_id === endowId.toString() ? 1 : 0)
    )
    .map((fund) => (
      <FundItem
        key={fund.id}
        {...fund}
        isEditor={
          user.funds.includes(fund.id) || user.endowments.includes(endowId)
        }
        isSelf={fund.creator_id === endowId.toString()}
      />
    ));
}
