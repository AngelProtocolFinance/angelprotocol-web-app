// import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { QueryLoader } from "components/admin";
import { Steps } from "components/donation";
import { useSetter } from "store/accessors";
import { setRecipient } from "slices/donation";

export default function DonateWidget() {
  // const { apiKey } = useParams<{ apiKey: string }>();
  // const queryState = useEndowInfoByAPIKeyQuery(apiKey, { skip: !apiKey });

  return (
    <QueryLoader
      queryState={{
        isError: false,
        isLoading: false,
        data: { name: "TestEndow", id: 11, kyc_donors_only: false },
      }}
      messages={{
        loading: "Getting endowment info..",
        error: "Failed to get endowment info",
      }}
      classes={{ container: "text-center mt-8" }}
    >
      {(endowment) => (
        <Content
          id={endowment.id}
          isKYCRequired={endowment.kyc_donors_only}
          name={endowment.name}
        />
      )}
    </QueryLoader>
  );
}

function Content(props: { id: number; name: string; isKYCRequired: boolean }) {
  const dispatch = useSetter();

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return <Steps />;
}
