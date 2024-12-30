import { useLoaderData } from "react-router";
import type { RegStep3 } from "../../types";
import { NotTaxExempt } from "./NotTaxExempt";
import { PossiblyTaxExempt } from "./PossiblyTaxExempt";

const countryWhiteList = ["United States"]; //will add more in the future;
export default function FSAInquiry() {
  const { data } = useLoaderData() as RegStep3;
  const possiblyTaxExempt = countryWhiteList.includes(data.org.hq_country);

  if (!possiblyTaxExempt) {
    return (
      <NotTaxExempt
        {...data.init}
        country={data.org.hq_country}
        isFsaPrev={data.irs501c3 != null ? data.irs501c3 === false : undefined}
      />
    );
  }

  return <PossiblyTaxExempt {...data.init} irs501c3Prev={data.irs501c3} />;
}
