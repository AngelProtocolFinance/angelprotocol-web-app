import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DropzoneArea } from "material-ui-dropzone";
import { StepTwoSchema } from "./useUpdateCharityProfile";
import Action from "../../../components/ActionButton/Action";
import { registration } from "types/routes";
import { useHistory } from "react-router-dom";

const ProfileStepTwo = (props: any) => {
  //url = app/register/charity-profile
  const metaData = props.formData.Website ? props.formData : props.metaData;
  const [openLogoDropzone, setOpenLogoDropzone] = useState(
    metaData?.Logo && true
  );
  const [openBannerDropzone, setOpenBannerDropzone] = useState(
    metaData?.Banner && true
  );
  const [logoFile, setLogoFile] = useState();
  const [bannerFile, setBannerFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(StepTwoSchema),
    defaultValues: {
      Website: metaData?.Website || "",
      ContactEmail: metaData?.ContactEmail || "",
      Twitter: metaData?.Twitter || "",
      YouTube: metaData?.YouTube || "",
      Linkedin: metaData?.Linkedin || "",
      Facebook: metaData?.Facebook || "",
      Instagram: metaData?.Instagram || "",
      TikTok: metaData?.TikTok || "",
      Logo: metaData?.Logo || "",
      Banner: metaData?.Banner || "",
      VideoEmbed: metaData?.VideoEmbed || "",
    },
  });

  const onSubmitProfile = async (profileData: any) => {
    setIsLoading(true);
    await props.onSubmit({
      ...profileData,
      logoFile,
      bannerFile,
    });
    setIsLoading(false);
  };

  const readFiles = (files: any, type: string) => {
    type === "logo" && setLogoFile(files);
    type === "banner" && setBannerFile(files);
  };
  return (
    <div>
      <div>
        <form className="text-center" onSubmit={handleSubmit(onSubmitProfile)}>
          <div className="md:flex justify-between">
            <div className="w-full md:w-1/2">
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Website{" "}
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("Website")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Website URL"
                    name="Website"
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.Website?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  ContactEmail{" "}
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("ContactEmail")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Email address"
                    name="ContactEmail"
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.ContactEmail?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Twitter
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("Twitter")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Twitter URL"
                    name="Twitter"
                  />
                </div>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  YouTube
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("YouTube")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="YouTube URL"
                    name="YouTube"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-10">
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Linkedin
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("Linkedin")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Linkedin URL"
                    name="Linkedin"
                  />
                </div>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Facebook
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("Facebook")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Facebook URL"
                    name="Facebook"
                  />
                </div>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Instagram
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("Instagram")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Instagram URL"
                    name="Instagram"
                  />
                </div>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  TikTok
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("TikTok")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="TikTok URL"
                    name="TikTok"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="md:flex justify-between">
              <div className="w-full md:w-1/2">
                <div className="item mb-5">
                  <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                    Logo <span className="ml-1 text-xs text-failed-red">*</span>
                  </p>
                  {openLogoDropzone ? (
                    <div className="flex items-end">
                      <img
                        src={metaData?.Logo}
                        width={160}
                        height={160}
                        className="rounded-full mr-10 h-40"
                        alt="logo"
                      />
                      <Action
                        classes="bg-yellow-blue w-36 h-8 text-xs"
                        onClick={() => setOpenLogoDropzone(false)}
                        title="Change Image"
                        // disabled={!openDropzone}
                      />
                    </div>
                  ) : (
                    <div className="form-control rounded-md flex justify-between items-center w-full h-64">
                      <DropzoneArea
                        onChange={(files: any) => readFiles(files, "logo")}
                        dropzoneClass="text-gray-400"
                        filesLimit={1}
                        acceptedFiles={["image/*"]}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 pl-10">
                <div className="item mb-5">
                  <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                    Banner{" "}
                    <span className="ml-1 text-xs text-failed-red">*</span>
                  </p>
                  {openBannerDropzone ? (
                    <div className="flex items-end">
                      <img
                        src={metaData?.Banner}
                        width={160}
                        height={160}
                        className="rounded-full mr-10 h-40"
                        alt="banner"
                      />
                      <Action
                        classes="bg-yellow-blue w-36 h-8 text-xs"
                        onClick={() => setOpenBannerDropzone(false)}
                        title="Change Image"
                        // disabled={!openDropzone}
                      />
                    </div>
                  ) : (
                    <div className="form-control rounded-md flex justify-between items-center w-full h-64">
                      <DropzoneArea
                        onChange={(files: any) => readFiles(files, "banner")}
                        dropzoneClass="text-gray-400"
                        filesLimit={1}
                        acceptedFiles={["image/*"]}
                      />
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                    {errors.Banner?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full item mb-5">
              <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                Video Embed
              </p>
              <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                <input
                  type="text"
                  className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                  name="VideoEmbed"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 text-center flex justify-center">
            <div>
              <Action
                onClick={() => history.push(registration.status)}
                title="Back"
                classes="bg-dark-grey w-48 h-10 mt-3 mr-10"
                disabled={isLoading}
              />
              <Action
                onClick={() => props.onPrev(getValues())}
                title="Prev"
                classes="bg-thin-blue w-48 h-10 mt-3 mr-10"
                disabled={isLoading}
              />
              <Action
                submit
                title="upload"
                classes="bg-thin-blue w-48 h-10 mt-3"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileStepTwo;
