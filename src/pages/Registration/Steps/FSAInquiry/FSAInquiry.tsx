import { useRegState, withStepGuard } from "../StepGuard";
import { NotTaxExempt } from "./NotTaxExempt";
import { PossiblyTaxExempt } from "./PossiblyTaxExempt";

const countryWhiteList = ["United States"]; //will add more in the future;
function FSAInquiry() {
  const { data } = useRegState<3>();
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

export default withStepGuard(FSAInquiry);
