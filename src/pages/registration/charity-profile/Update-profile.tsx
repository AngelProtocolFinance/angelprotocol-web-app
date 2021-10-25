import { useGetCharityDataQuery } from "api/charityAPIs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { TStore } from "Redux/store";
import ProfileStepOne from "./Profile-step-one";
import ProfileStepTwo from "./Profile-step-two";
import {
  useUpdateCharityProfile,
  CharityMetaData,
} from "./useUpdateCharityProfile";

const UpdateProfile = () => {
  //url = app/register/charity-profile
  const location: any = useLocation();
  const { userData } = useSelector((state: TStore) => state.user);
  const [step, setStep] = useState(1);
  const [firstData, setFirstData] = useState({});
  let metaData: CharityMetaData = location.state.data;
  const is_create = !metaData;
  const { saveCharityMetaData, readFileToBase64 } = useUpdateCharityProfile();

  const readFiles = async (files: any) => {
    let content: any;
    if (files.length > 0) {
      content = await readFileToBase64(files[0]);
      return content;
    }
  };

  const onSaveCharityMetaData = async (data: any) => {
    if (step === 1) setFirstData(data);
    if (step === 2) {
      metaData = {
        ...firstData,
        ...data,
      };
      const logoFileContent = await readFiles(data.logoFile);
      const bannerFileContent = await readFiles(data.bannerFile);
      await saveCharityMetaData(
        userData.PK,
        metaData,
        logoFileContent,
        bannerFileContent,
        is_create
      );
    }
  };

  const onNext = () => {
    setStep(2);
  };

  const onPrev = () => {
    setStep(1);
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
          <ProfileStepOne
            userInfo={userData}
            onNext={onNext}
            onSubmit={onSaveCharityMetaData}
          />
        ) : (
          <ProfileStepTwo
            metaData={metaData}
            onPrev={onPrev}
            onSubmit={onSaveCharityMetaData}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
