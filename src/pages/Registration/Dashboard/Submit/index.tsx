import { Charity } from "types/server/aws";
import { Button } from "pages/Registration/common";
import { useRegistrationState } from "services/aws/registration";
import ChainGuard from "contexts/ChainGuard";
import { chainIds } from "constants/chainIds";
import getRegistrationState from "../getRegistrationState";

export default function Submit(props: {
  onSubmit(charity: Charity): Promise<void>;
  isSubmitting?: boolean;
}) {
  const { data } = useRegistrationState("");
  const charity = data!;
  const status = charity.Registration.RegistrationStatus;
  const state = getRegistrationState(charity);

  if (status !== "Inactive") {
    return (
      <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
        <p className="ml-3 mr-auto">Status of Your Endowment</p>

        <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-yellow-500">
          {status}
        </p>
      </div>
    );
  }

  return (
    <ChainGuard
      requiredChain={{ id: chainIds.juno, name: "Juno" }}
      prompt={(status) => (
        <>
          <Button
            className="w-full md:w-2/3 h-10 mt-5 bg-yellow-blue"
            onClick={() => props.onSubmit(charity)}
            disabled={
              !state.getIsReadyForSubmit() ||
              props.isSubmitting ||
              status.id !== "verified"
            }
          >
            Submit for review
          </Button>
          <span>{status.message}</span>
        </>
      )}
    />
  );
}
