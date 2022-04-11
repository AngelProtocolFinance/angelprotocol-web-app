import Loader from "components/Loader/Loader";
import { app, site } from "constants/routes";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { Button } from "../common";
import routes from "../routes";
import EndowmentCreated from "./EndowmentCreated";
import EndowmentStatus from "./EndowmentStatus";
import getRegistrationStatus from "./getRegistrationStatus";
import Step from "./Step";
import { ReviewStatus } from "./types";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.PK) {
      // TODO: check where to move this logic, since it is similar to useRehydrateUserData
      const newUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      dispatch(updateUserData(newUserData));
    }
    setLoading(false);
  }, [user, dispatch]);

  const status = useMemo(() => getRegistrationStatus(user), [user]);

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
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.contactDetails}`)
          }
          disabled={dataSubmitted}
          completed
        />
        <Step
          title="Step #2: Wallet Address"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.wallet}`)
          }
          disabled={dataSubmitted}
          completed={status.stepTwo.completed}
        />
        <Step
          title="Step #3: Documentation"
          onClick={() =>
            navigate(`${site.app}/${app.register}/${routes.documentation}`)
          }
          disabled={dataSubmitted}
          completed={status.stepThree.completed}
          // TODO: implement level logic
          statusComplete={
            status.stepThree.completed && `Level ${status.stepThree.level}`
          }
        />
        <Step
          title="Step #4: Additional Information"
          onClick={() =>
            navigate(
              `${site.app}/${app.register}/${routes.additionalInformation}`
            )
          }
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
          walletAddress={user.Metadata.TerraWallet}
          onClick={() => console.log("Create endowment clicked")}
        />
      )}
      {status.reviewStatus === ReviewStatus.Complete && (
        <EndowmentCreated charityName={user?.CharityName} />
      )}
    </div>
  );
}
