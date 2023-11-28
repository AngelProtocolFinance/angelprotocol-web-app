import { PropsWithChildren } from "react";
import { useGetter, useSetter } from "store/accessors";
import {
  setCountries,
  setDesignations,
  setKYCOnly,
  setSdgs,
} from "slices/components/marketFilter";
import { unsdgs } from "constants/unsdgs";

export default function ActiveFilters() {
  const { endow_designation, sdgs, countries, kyc_only } = useGetter(
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

  const sdgFilters = sdgs.map((sdgNum) => (
    <Item
      key={sdgNum}
      onRemove={() => dispatch(setSdgs(sdgs.filter((s) => s !== sdgNum)))}
    >
      {unsdgs[sdgNum].title}
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
    <Item key={`${kyc}`} onRemove={() => dispatch(setKYCOnly([kyc]))}>
      {kyc ? "KYC" : "No KYC"}
    </Item>
  ));

  return (
    <div className="flex flex-wrap gap-2">
      {endowDesignations
        .concat(sdgFilters)
        .concat(countryFilters)
        .concat(kycFilters)}
    </div>
  );
}

function Item({ children, onRemove }: PropsWithChildren<{ onRemove(): void }>) {
  return (
    <button type="button" onClick={onRemove}>
      {children}
    </button>
  );
}
