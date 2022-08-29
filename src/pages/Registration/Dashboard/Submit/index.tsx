import { Submitter } from "../types";
import { useRegistrationState } from "services/aws/registration";
import TxSubmitter from "components/TxSubmitter";
import { chainIds, chainNames } from "constants/chainIds";
import getRegistrationState from "../getRegistrationState";

export default function Submit(props: {
  onSubmit: Submitter;
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
    <TxSubmitter
      allowedWallets={["keplr"]}
      requiredNetwork={{ id: chainIds.juno, name: chainNames.juno }}
      submitFn={props.onSubmit}
      submitArgs={[charity]}
      className="disabled:bg-gray-300 disabled:cursor-auto rounded-xl uppercase font-bold text-white h-10 bg-yellow-blue w-full md:w-2/3 mt-5"
      disabled={!state.getIsReadyForSubmit() || props.isSubmitting}
    >
      Submit for review
    </TxSubmitter>
  );
}
