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

  return (
    <div className="flex w-9/12 items-center justify-between rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
      {registrationStatus.reviewStatus !== ReviewStatus.Complete ? (
        <>
          <p>Status of Your Endowment</p>
          {registrationStatus.reviewStatus === ReviewStatus.UnderReview && (
            <p className="uppercase text-yellow-500">Under Review</p>
          )}
          {registrationStatus.reviewStatus === ReviewStatus.Available && (
            <p className="uppercase text-green-500">Available</p>
          )}
          <Button
            className={`w-40 h-10 ${
              registrationStatus.reviewStatus === ReviewStatus.UnderReview
                ? "bg-green-500"
                : "bg-thin-blue"
            }`}
            onClick={onClick}
            disabled={
              registrationStatus.reviewStatus !== ReviewStatus.Available
            }
          >
            Create
          </Button>
        </>
      ) : (
        <>
          <p>Status of Your Endowment</p>
          <p className="flex items-center h-10 text-green-500 uppercase ml-14 mr-auto">
            Created: <span>{maskAddress(walletAddress)}</span>
          </p>
        </>
      )}
    </div>
  );
}
