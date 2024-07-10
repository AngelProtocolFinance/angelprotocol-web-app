import { CHARIOT_CONNECT_ID } from "constants/env";
import ErrorBoundary from "errors/ErrorBoundary";
import ChariotConnect from "react-chariot-connect";
import { useLazyChariotGrantQuery } from "services/apes";
import { useDonationState } from "../../Context";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import { toDonor } from "../../common/constants";
import type { DafCheckoutStep } from "../../types";

export function ChariotCheckout(props: DafCheckoutStep) {
  const {
    init,
    details,
    liquidSplitPct,
    tip,
    donor: fvDonor,
    honorary,
    feeAllowance,
  } = props;
  const { setState } = useDonationState();
  const [createGrant, { isLoading }] = useLazyChariotGrantQuery();

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      onBack={() => setState({ ...props, step: "summary" })}
      Amount={currency(details.currency)}
      amount={+details.amount}
      feeAllowance={feeAllowance}
      splitLiq={liquidSplitPct}
      frequency="one-time"
      tip={
        props.tip
          ? {
              value: props.tip.value,
              charityName: init.recipient.name,
            }
          : undefined
      }
    >
      <ErrorBoundary>
        <ChariotConnect
          disabled={isLoading}
          cid={CHARIOT_CONNECT_ID}
          onDonationRequest={async () => ({
            amount: +details.amount * 100, //in cents
            firstName: fvDonor.firstName,
            lastName: fvDonor.lastName,
            email: fvDonor.email,
          })}
          // This hook should be used to update our internal donation DB
          // see https://givechariot.readme.io/reference/integrating-connect#capture-your-grant-intent
          onSuccess={async (r: { detail: { workflowSessionId: string } }) => {
            await createGrant({
              transactionId: r.detail.workflowSessionId,
              amount: +details.amount,
              tipAmount: tip?.value ?? 0,
              feeAllowance,
              currency: details.currency.code,
              endowmentId: init.recipient.id,
              splitLiq: liquidSplitPct,
              donor: toDonor(fvDonor),
              source: init.source,
              ...(honorary.honoraryFullName && {
                inHonorOf: honorary.honoraryFullName,
                tributeNotif: honorary.withTributeNotif
                  ? honorary.tributeNotif
                  : undefined,
              }),
              ...(details.program.value && {
                programId: details.program.value,
              }),
            }).unwrap();
          }}
        />
      </ErrorBoundary>
    </Summary>
  );
}
