import { useState } from "react";
import { useSelector } from "react-redux";
import { TStore } from "Redux/store";
import ProfileStepOne from "./Profile-step-one";
import ProfileStepTwo from "./Profile-step-two";
import { useUpdateCharityProfile } from "./useUpdateCharityProfile";

const UpdateProfile = () => {
  //url = app/register/charity-profile
  const { userData } = useSelector((state: TStore) => state.user);
  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep(2);
    console.log("next");
  };

  const onPrev = () => {
    setStep(1);
    console.log("next");
  };

  return (
    <div className="">
      <div className="title mb-10">
        <p className="text-2xl md:text-3xl font-bold">
          Update the profile details for {userData.CharityName}
        </p>
        <span className="text-center">General Information</span>
      </div>
      <div>
        {step === 1 ? (
          <ProfileStepOne userInfo={userData} onNext={onNext} />
        ) : (
          <ProfileStepTwo userInfo={userData} onPrev={onPrev} />
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
