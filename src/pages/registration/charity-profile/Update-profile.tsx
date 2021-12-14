import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetCharityDataQuery } from "services/aws/charity";
import { updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import ProfileStepOne from "./Profile-step-one";
import ProfileStepTwo from "./Profile-step-two";
import {
  useUpdateCharityProfile,
  CharityMetaData,
} from "./useUpdateCharityProfile";

const UpdateProfile = () => {
  //url = app/register/charity-profile
  const location: any = useLocation();
  const dispatch = useSetter();
  const [step, setStep] = useState(1);
  const [firstData, setFirstData] = useState({});
  const [secondData, setSecondData] = useState({});
  let metaData: CharityMetaData = location.state.data;
  const { saveCharityMetaData, readFileToBase64 } = useUpdateCharityProfile();
  let user = useGetter((state) => state.user);
  const { data } = useGetCharityDataQuery(user.PK);

  if (!user.PK) {
    user = JSON.parse(localStorage.getItem("userData") || "{}");
    dispatch(updateUserData(user));
  }

  if (!metaData?.CompanyNumber && user.IsMetaDataCompleted) {
    metaData = data.Metadata;
  }

  const is_create = !metaData?.CompanyNumber;
  const readFiles = async (files: any) => {
    let content: any;
    if (files && files.length > 0) {
      content = await readFileToBase64(files[0]);
      return content;
    }
    return null;
  };

  const onSaveCharityMetaData = async (data: any) => {
    if (step === 1) setFirstData(data);
    if (step === 2) {
      metaData = {
        ...metaData,
        ...firstData,
        ...data,
      };
      const logoFileContent = await readFiles(data.logoFile);
      const bannerFileContent = await readFiles(data.bannerFile);
      const flag = await saveCharityMetaData(
        user.PK,
        metaData,
        logoFileContent,
        bannerFileContent,
        is_create
      );
      if (flag) {
        dispatch(
          updateUserData({
            ...user,
            IsMetaDataCompleted: true,
          })
        );
      }
    }
  };

  const onNext = () => {
    setStep(2);
  };

  const onPrev = (data: any) => {
    setSecondData(data);
    setStep(1);
  };

  return (
    <div className="">
      <div className="title mb-10">
        <p className="text-2xl md:text-3xl font-bold">
          Update the profile details for {user.CharityName}
        </p>
        <span className="text-center">General Information</span>
      </div>
      <div>
        {step === 1 ? (
          <ProfileStepOne
            formData={firstData}
            userInfo={user}
            metaData={metaData}
            onNext={onNext}
            onSubmit={onSaveCharityMetaData}
          />
        ) : (
          <ProfileStepTwo
            formData={secondData}
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
