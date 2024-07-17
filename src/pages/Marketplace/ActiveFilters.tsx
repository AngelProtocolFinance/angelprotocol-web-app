import Icon from "components/Icon";
import { categories } from "constants/unsdgs";
import type { PropsWithChildren } from "react";
import { useMarketplaceContext } from "./Context";

export default function ActiveFilters() {
  const { state, update } = useMarketplaceContext();
  const { endow_designation, sdgGroups, countries, kyc_only, verified } = state;

  const endowDesignations = endow_designation.map((designation) => (
    <Item
      key={designation}
      onRemove={() =>
        update({
          endow_designation: endow_designation.filter(
            (val) => val !== designation
          ),
        })
      }
    >
      {designation}
    </Item>
  ));

  const sdgFilters = sdgGroups.map((groupNum) => (
    <Item
      key={groupNum}
      onRemove={() =>
        update({ sdgGroups: sdgGroups.filter((s) => s !== groupNum) })
      }
    >
      {categories[groupNum].name}
    </Item>
  ));

  const countryFilters = countries.map((country) => (
    <Item
      key={country}
      onRemove={() =>
        update({ countries: countries.filter((c) => c !== country) })
      }
    >
      {country}
    </Item>
  ));

  const kycFilters = kyc_only.map((kyc) => (
    <Item
      key={`${kyc}`}
      onRemove={() => update({ kyc_only: kyc_only.filter((v) => v !== kyc) })}
    >
      {kyc ? "KYC" : "No KYC"}
    </Item>
  ));

  const verificationFilters = verified.map((isVerified) => (
    <Item
      key={`${isVerified}`}
      onRemove={() =>
        update({ verified: verified.filter((v) => v !== isVerified) })
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
          onClick={() => update("reset")}
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
      <Icon type="CloseCircle" size={20} />
    </button>
  );
}
