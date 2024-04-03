import Icon from "components/Icon";
import { categories } from "constants/unsdgs";
import { PropsWithChildren } from "react";
import {
  reset,
  setCountries,
  setDesignations,
  setKYCOnly,
  setSDGgroups,
  setVerified,
} from "slices/components/marketFilter";
import { useGetter, useSetter } from "store/accessors";

export default function ActiveFilters() {
  const { endow_designation, sdgGroups, countries, kyc_only, verified } =
    useGetter((state) => state.component.marketFilter);

  const dispatch = useSetter();

  const endowDesignations = endow_designation.map((designation) => (
    <Item
      key={designation}
      onRemove={() =>
        dispatch(
          setDesignations(
            endow_designation.filter((val) => val !== designation)
          )
        )
      }
    >
      {designation}
    </Item>
  ));

  const sdgFilters = sdgGroups.map((groupNum) => (
    <Item
      key={groupNum}
      onRemove={() =>
        dispatch(setSDGgroups(sdgGroups.filter((s) => s !== groupNum)))
      }
    >
      {categories[groupNum].name}
    </Item>
  ));

  const countryFilters = countries.map((country) => (
    <Item
      key={country}
      onRemove={() =>
        dispatch(setCountries(countries.filter((c) => c !== country)))
      }
    >
      {country}
    </Item>
  ));

  const kycFilters = kyc_only.map((kyc) => (
    <Item
      key={`${kyc}`}
      onRemove={() => dispatch(setKYCOnly(kyc_only.filter((v) => v !== kyc)))}
    >
      {kyc ? "KYC" : "No KYC"}
    </Item>
  ));

  const verificationFilters = verified.map((isVerified) => (
    <Item
      key={`${isVerified}`}
      onRemove={() =>
        dispatch(setVerified(verified.filter((v) => v !== isVerified)))
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
          onClick={() => dispatch(reset())}
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
