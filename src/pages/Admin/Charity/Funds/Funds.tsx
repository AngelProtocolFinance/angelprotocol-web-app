import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Info } from "components/Status";
import { appRoutes } from "constants/routes";
import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { FundItem } from "./FundItem";
import type { LoaderData } from "./types";

type CreatorType = "others" | "ours";
export default function Funds() {
  const { funds, endow } = useLoaderData<LoaderData>();
  const [creatorType, setCreatorType] = useState<CreatorType>("ours");

  const filtered =
    creatorType === "ours"
      ? funds.filter((f) => f.creator_id === endow.id.toString())
      : funds.filter((f) => f.creator_id !== endow.id.toString());

  if (filtered.length === 0) {
    const msg =
      creatorType === "ours"
        ? "No fundraisers found"
        : "No fundraisers found for this nonprofit";
    return (
      <div className="mt-4">
        <Info classes="mt-4">{msg}</Info>
        {creatorType === "ours" && (
          <Link
            to={{
              pathname: appRoutes.funds + "/new",
              search: `npo=${endow.id}`,
            }}
            className="btn-blue text-sm px-6 py-2 inline-block"
          >
            Create
          </Link>
        )}
      </div>
    );
  }

  const items = filtered
    .toSorted(
      (a, b) =>
        (b.creator_id === endow.id.toString() ? 1 : 0) -
        (a.creator_id === endow.id.toString() ? 1 : 0)
    )
    .map((fund) => (
      <FundItem
        key={fund.id}
        {...fund}
        endowId={endow.id}
        isSelf={fund.creator_id === endow.id.toString()}
      />
    ));

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
              <Label className="text-sm bg-blue-l4 peer-data-[checked]:bg-blue-d1 peer-data-[checked]:text-white py-1 px-4 rounded-full hover:bg-blue-d1 hover:text-white">
                {opt === "ours" ? `By Nonprofit` : `By Supporters`}
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
      <div className="grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4">
        {items}
        {creatorType === "ours" && (
          <Link
            to={{
              pathname: appRoutes.funds + "/new",
              search: `npo=${endow.id}`,
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
