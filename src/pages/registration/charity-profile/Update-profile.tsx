import { useState } from "react";
import { useSelector } from "react-redux";
import { TStore } from "Redux/store";
import UpdateProfileStepTwo from "./Update-profile-step-two";
import UpdateProfileStepOne from "./Update-profile-step-one";

const UpdateProfile = () => {
  //url = app/register/charity-profile
  const { userData } = useSelector((state: TStore) => state.user);
  const [step, setStep] = useState(0);
  return (
    <div className="">
      <div className="title mb-10">
        <p className="text-2xl md:text-3xl font-bold">
          Update the profile details for {userData.CharityName}
        </p>
        <span className="text-center">General Information</span>
      </div>
      {step === 1 ? (
        <UpdateProfileStepOne setStep={setStep} userInfo={userData} />
      ) : (
        <UpdateProfileStepTwo setStep={setStep} userInfo={userData} />
      )}
    </div>
  );
};

export default UpdateProfile;
