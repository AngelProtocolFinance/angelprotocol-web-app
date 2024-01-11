import { PropsWithChildren } from "react";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import {
  reset,
  setCountries,
  setDesignations,
  setKYCOnly,
  setSDGgroups,
} from "slices/components/marketFilter";
import { categories, unsdgs } from "constants/unsdgs";

export default function ActiveFilters() {
  const { endow_designation, sdgGroups, countries, kyc_only } = useGetter(
    (state) => state.component.marketFilter
  );

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

  const filters = endowDesignations
    .concat(sdgFilters)
    .concat(countryFilters)
    .concat(kycFilters);

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
      className="flex items-center gap-2 border select-none rounded-full cursor-pointer capitalize text-xs pt-1 pb-[.3rem] pl-3 pr-1.5 texg-gray-d1 dark:text-gray bg-orange-l6 hover:bg-orange-l5"
    >
      <span>{children}</span>
      <Icon type="CloseCircle" size={20} />
    </button>
  );
}
