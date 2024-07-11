import ContentLoader from "components/ContentLoader";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import ErrorBoundary from "errors/ErrorBoundary";
import ChariotConnect from "react-chariot-connect";
import { useNavigate } from "react-router-dom";
import { useLazyChariotGrantQuery } from "services/apes";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { DonateThanksState } from "types/pages";
import { useDonationState } from "../../Context";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import { toDonor } from "../../common/constants";
import type { DafCheckoutStep } from "../../types";

export default function ChariotCheckout(props: DafCheckoutStep) {
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
  const { handleError } = useErrorContext();
  const [createGrant, { isLoading }] = useLazyChariotGrantQuery();
  const navigate = useNavigate();
  const user = useGetter((state) => state.auth.user);

  return (
    <Summary
      classes="group grid content-start p-4 @md/steps:p-8 [&_#connectContainer]:mt-8"
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
          theme="LightBlueTheme"
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
            try {
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

              navigate(`${appRoutes.donate_thanks}`, {
                state: {
                  guestDonor: userIsSignedIn(user)
                    ? undefined
                    : {
                        email: fvDonor.email,
                        fullName: `${fvDonor.firstName} ${fvDonor.lastName}`,
                      },
                  recipientId: init.recipient.id,
                  recipientName: init.recipient.name,
                } satisfies DonateThanksState,
              });
            } catch (err) {
              handleError(err, { context: "processing donation" });
            }
          }}
        />
      </ErrorBoundary>
      <ContentLoader className="h-12 mt-4 block group-has-[chariot-connect]:hidden" />
    </Summary>
  );
}
