import maskAddress from "helpers/maskAddress";
import { MouseEventHandler } from "react";
import Button from "../Button";
import { RegistrationStatus, ReviewStatus } from "./types";

type Props = {
  walletAddress: string;
  registrationStatus: RegistrationStatus;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function EndowmentStatus(props: Props) {
  const { registrationStatus, walletAddress, onClick } = props;

  const buttonClassName = `w-40 h-10 ${
    registrationStatus.reviewStatus === ReviewStatus.UnderReview
      ? "bg-green-500"
      : "bg-thin-blue"
  }`;

  return (
    <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
      <p className="mr-auto">Status of Your Endowment</p>
      {registrationStatus.reviewStatus !== ReviewStatus.Complete ? (
        <>
          {registrationStatus.reviewStatus === ReviewStatus.UnderReview ? (
            <p className="uppercase text-yellow-500 w-40">Under Review</p>
          ) : (
            <p className="uppercase text-green-500 w-40">Available</p>
          )}
          <Button
            className={buttonClassName}
            onClick={onClick}
            disabled={
              registrationStatus.reviewStatus !== ReviewStatus.Available
            }
          >
            Create
          </Button>
        </>
      ) : (
        <p className="flex items-center h-10 text-green-500 uppercase ml-14 mr-auto">
          Created: <span>{maskAddress(walletAddress)}</span>
        </p>
      )}
    </div>
  );
}
