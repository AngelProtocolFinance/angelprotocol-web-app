import Loader from "components/Loader/Loader";
import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useGetCharityDataQuery } from "services/aws/charity";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import Button from "../Button";
import routes from "../routes";
import EndowmentCreated from "./EndowmentCreated";
import EndowmentStatus from "./EndowmentStatus";
import getRegistrationStatus from "./getRegistrationStatus";
import Step from "./Step";
import { ReviewStatus } from "./types";

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const { data, error, isLoading } = useGetCharityDataQuery(user.PK);

  useEffect(() => {
    if (!user.PK) {
      // TODO: check where to move this logic, since it is similar to useRehydrateUserData
      const newUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      dispatch(updateUserData(newUserData));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user.IsMetaDataCompleted || user.IsKeyPersonCompleted) {
      history.go(0);
    }
  }, [user.IsMetaDataCompleted, user.IsKeyPersonCompleted, history]);

  useEffect(() => {
    if (error) {
      const messageData: any = error;
      console.error(messageData?.data?.message || "something went wrong");
    }
  }, [error]);

  const status = useMemo(() => getRegistrationStatus(user, data), [user, data]);

  const dataSubmitted = status.reviewStatus !== ReviewStatus.None;

  if (isLoading) {
    return <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />;
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
        <Step
          title="Step #1: Contact Details"
          onClick={() => history.push(routes.contactDetails)}
          disabled={dataSubmitted}
          completed
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={() => history.push(routes.wallet)}
          disabled={dataSubmitted}
          completed={status.stepTwo.completed}
        />
        <Step
          title="Step #3: Documentation"
          onClick={() => history.push(routes.documentation)}
          disabled={dataSubmitted}
          completed={status.stepThree.completed}
          // TODO: implement level logic
          statusComplete={
            status.stepThree.completed && `Level ${status.stepThree.level}`
          }
        />
        <Step
          title="Step #4: Additional Information"
          onClick={() => history.push(routes.additionalInformation)}
          disabled={dataSubmitted}
          completed={status.stepFour.completed}
        />
        {status.reviewStatus === ReviewStatus.None && (
          <Button
            className="w-full h-10 mt-5 bg-yellow-blue"
            onClick={() => console.log("submit")}
            disabled={!status.getReadyForSubmit()}
          >
            Submit for review
          </Button>
        )}
      </div>
      {status.reviewStatus !== ReviewStatus.None && (
        <EndowmentStatus
          registrationStatus={status}
          walletAddress={data?.Metadata?.TerraWallet || user.TerraWallet}
          onClick={() => console.log("Create endowment clicked")}
        />
      )}
      {status.reviewStatus === ReviewStatus.Complete && (
        <EndowmentCreated charityName={user?.CharityName} />
      )}
    </div>
  );
}
