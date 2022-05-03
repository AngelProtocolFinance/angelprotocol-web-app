import { MouseEventHandler } from "react";
import { Charity } from "services/aws/types";
import maskAddress from "helpers/maskAddress";
import { Button } from "../common";

type Props = {
  charity: Charity;
  onActivate: MouseEventHandler<HTMLButtonElement>;
};

export default function EndowmentStatus(props: Props) {
  const { RegistrationStatus } = props.charity.Registration;
  const { TerraWallet } = props.charity.Metadata;

  return (
    <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
      <p className="ml-3 mr-auto">Status of Your Endowment</p>
      {RegistrationStatus === "Under Review" && (
        <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-yellow-500">
          Under Review
        </p>
      )}
      {RegistrationStatus === "Approved" && (
        <>
          <p className="uppercase text-green-500 w-40">Available</p>
          <Button className="w-40 h-10 bg-thin-blue" onClick={props.onActivate}>
            Create
          </Button>
        </>
      )}
      {RegistrationStatus !== "Active" && (
        <p className="flex items-center h-10 ml-14 mr-auto text-green-500 uppercase">
          Created: {maskAddress(TerraWallet)}
        </p>
      )}
    </div>
  );
}
