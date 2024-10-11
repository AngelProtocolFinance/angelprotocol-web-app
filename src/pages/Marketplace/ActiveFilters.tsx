import type { UNSDG_NUM } from "@better-giving/registration/models";
import { categories, sdgGroups } from "constants/unsdgs";
import { CircleX } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { toParsed, toRaw } from "./helpers";

export default function ActiveFilters() {
  const [params, setParams] = useSearchParams();
  const parsed = toParsed(params);

  const endowDesignations = (parsed.endow_designation || []).map(
    (designation) => (
      <Item
        key={designation}
        onRemove={() =>
          setParams(
            toRaw({
              ...parsed,
              endow_designation: parsed.endow_designation?.filter(
                (val) => val !== designation
              ),
            }),
            { replace: true }
          )
        }
      >
        {designation}
      </Item>
    )
  );

  const activeGroups = sdgGroups
    .filter(([, sdgs]) =>
      sdgs.every((sdg) => (parsed.sdgs || []).includes(sdg))
    )
    .map(([g]) => g);

  const sdgFilters = activeGroups.map((groupNum) => (
    <Item
      key={groupNum}
      onRemove={() =>
        setParams(
          toRaw({
            ...parsed,
            sdgs: parsed.sdgs?.filter(
              (x) => !categories[groupNum].sdgs.includes(x as UNSDG_NUM)
            ),
          }),
          { replace: true }
        )
      }
    >
      {categories[groupNum].name}
    </Item>
  ));

  const countryFilters = (parsed.countries || []).map((country) => (
    <Item
      key={country}
      onRemove={() =>
        setParams(
          toRaw({
            ...parsed,
            countries: parsed.countries?.filter((c) => c !== country),
          }),
          { replace: true }
        )
      }
    >
      {country}
    </Item>
  ));

  const kycFilters = (parsed.kyc_only || []).map((kyc) => (
    <Item
      key={`${kyc}`}
      onRemove={() => {
        setParams(
          toRaw({
            ...parsed,
            kyc_only: parsed.kyc_only?.filter((v) => v !== kyc),
          }),
          { replace: true }
        );
      }}
    >
      {kyc ? "KYC" : "No KYC"}
    </Item>
  ));

  const verificationFilters = (parsed.claimed || []).map((isVerified) => (
    <Item
      key={`${isVerified}`}
      onRemove={() =>
        setParams(
          toRaw({
            ...parsed,
            claimed: parsed.claimed?.filter((v) => v !== isVerified),
          }),
          { replace: true }
        )
      }
    >
      {isVerified ? "Verified" : "Not verified"}
    </Item>
  ));

  const filters = endowDesignations
    .concat(sdgFilters)
    .concat(countryFilters)
    .concat(kycFilters)
    .concat(verificationFilters);

  return (
    <div className="flex flex-wrap gap-1">
      {filters}
      {filters.length >= 2 && (
        <button
          type="button"
          onClick={() => setParams(toRaw({}), { replace: true })}
          className="text-blue hover:text-blue-l1 text-sm ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

function Item({ children, onRemove }: PropsWithChildren<{ onRemove(): void }>) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="flex items-center gap-2 border select-none rounded-full cursor-pointer capitalize text-xs py-1 pl-3 pr-1.5 texg-gray-d1 dark:text-navy-l2 bg-blue-l5 hover:bg-blue-l4"
    >
      <span>{children}</span>
      <CircleX size={20} />
    </button>
  );
}
