import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import ContentLoader from "components/ContentLoader";
import QueryLoader from "components/QueryLoader";
import { Info } from "components/Status";
import { appRoutes } from "constants/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFundsEndowMemberOfQuery } from "services/aws/endow-funds";
import { useEndowment } from "services/aws/useEndowment";
import { useAdminContext } from "../../Context";
import { FundItem } from "./FundItem";

type CreatorType = "others" | "ours";
export function Funds() {
  const { id } = useAdminContext();
  const endow = useEndowment(id, ["name"]);
  const npoName = endow.data?.name ?? "this nonprofit";
  const query = useFundsEndowMemberOfQuery({ endowId: id });
  const [creatorType, setCreatorType] = useState<CreatorType>("ours");
  return (
    <div className="grid gap-y-4 grid-cols-[auto_1fr_auto_auto_auto_auto] justify-items-start">
      <div className="col-span-full w-full">
        <h3 className="text-3xl border-b border-gray-l4 w-full pb-2">
          Fundraisers
        </h3>
        <RadioGroup
          value={creatorType}
          onChange={setCreatorType}
          className="flex flex-col @2xl:flex-row @2xl:items-center mt-1 gap-1"
        >
          {(["ours", "others"] satisfies CreatorType[]).map((opt) => (
            <Field key={opt} className="contents">
              <Radio value={opt} className="peer hidden" />
              <Label className="text-sm bg-blue-l4 peer-data-[checked]:bg-blue-d1 peer-data-[checked]:text-white py-1 px-4 rounded-full hover:bg-blue-d1 hover:text-white">
                {opt === "ours"
                  ? `Created by ${npoName}`
                  : `Where ${npoName} is included`}
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
      <QueryLoader
        messages={{
          loading: (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ),
          error: "Failed to get fundraisers",
          empty:
            creatorType === "ours" ? (
              <div className="mt-4">
                <Info classes="mb-4">
                  {npoName} hasn't created any fundraiser yet
                </Info>
                <Link
                  to={{
                    pathname: appRoutes.funds + "/new",
                    search: `npo=${id}`,
                  }}
                  className="btn-blue text-sm px-6 py-2"
                >
                  Create
                </Link>
              </div>
            ) : (
              <div className="mt-4">
                <Info>{npoName} has not been included in any fundraisers</Info>
              </div>
            ),
        }}
        filterFn={(f) =>
          creatorType === "ours"
            ? f.creator_id === id.toString()
            : f.creator_id !== id.toString()
        }
        queryState={query}
      >
        {(funds) => (
          <div className="grid @xl:grid-cols-2 @2xl:grid-cols-3 gap-4 w-full col-span-full">
            {funds
              .toSorted(
                (a, b) =>
                  (b.creator_id === id.toString() ? 1 : 0) -
                  (a.creator_id === id.toString() ? 1 : 0)
              )
              .map((fund) => (
                <FundItem
                  key={fund.id}
                  {...fund}
                  endowId={id}
                  isSelf={fund.creator_id === id.toString()}
                />
              ))}
            {creatorType === "ours" && (
              <Link
                to={{ pathname: appRoutes.funds + "/new", search: `npo=${id}` }}
                className="btn-blue text-sm px-6 py-2 rounded-full normal-case mt-4 col-span-full justify-self-start"
              >
                Create fundraiser
              </Link>
            )}
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

export function Skeleton() {
  return (
    <div
      className="flex items-center gap-x-2 w-full col-span-full"
      aria-disabled={true}
    >
      <ContentLoader className="size-10 rounded-full" />
      <ContentLoader className="w-full h-10 rounded" />
    </div>
  );
}
