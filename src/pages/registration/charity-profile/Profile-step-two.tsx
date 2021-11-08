import { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Modal from "components/Modal/Modal";
import UNSDGInfoModal from "../modals/UNSDGInfoModal";
import RevenueInfoModal from "../modals/RevenueInfoModal";
import { DropzoneArea } from "material-ui-dropzone";
import { StepTwoSchema } from "./useUpdateCharityProfile";
import Action from "../Action";

const ProfileStepTwo = (props: any) => {
  //url = app/register/charity-profile
  const metaData = props.formData || props.metaData;
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [openLogoDropzone, setOpenLogoDropzone] = useState(
    metaData?.Logo && true
  );
  const [openBannerDropzone, setOpenBannerDropzone] = useState(
    metaData?.Banner && true
  );
  const [logoFile, setLogoFile] = useState();
  const [bannerFile, setBannerFile] = useState();

  const handleUpdateProfile = async (
    profileData: any,
    actions: FormikHelpers<any>
  ) => {
    actions.setSubmitting(true);
    await props.onSubmit({
      ...profileData,
      logoFile,
      bannerFile,
    });
    actions.setSubmitting(false);
  };

  //eslint-disable-next-line
  const showInfoModal = (type: any) => {
    setModalType(type);
    setOpenModal(true);
  };

  const readFiles = (files: any, type: string) => {
    type === "logo" && setLogoFile(files);
    type === "banner" && setBannerFile(files);
  };
  return (
    <div>
      <div>
        <Formik
          initialValues={{
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
          }}
          validationSchema={StepTwoSchema}
          onSubmit={handleUpdateProfile}
        >
          {({ isSubmitting, values }) => (
            <Form className="text-center">
              <div className="md:flex justify-between">
                <div className="w-full md:w-1/2">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Website{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Website URL"
                        name="Website"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="Website"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      ContactEmail{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Email address"
                        name="ContactEmail"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="ContactEmail"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Twitter
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
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
                      <Field
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
                      <Field
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
                      <Field
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
                      <Field
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
                      <Field
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
                        Logo{" "}
                        <span className="ml-1 text-xs text-failed-red">*</span>
                      </p>
                      {openLogoDropzone ? (
                        <div className="flex items-end">
                          <img
                            src={values.Logo}
                            width={150}
                            height={150}
                            className="rounded-full mr-10"
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
                            src={values.Banner}
                            width={150}
                            height={150}
                            className="rounded-full mr-10"
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
                            onChange={(files: any) =>
                              readFiles(files, "banner")
                            }
                            dropzoneClass="text-gray-400"
                            filesLimit={1}
                            acceptedFiles={["image/*"]}
                          />
                        </div>
                      )}
                      <ErrorMessage
                        className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                        name="revenue"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full item mb-5">
                  <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                    Video Embed
                  </p>
                  <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                    <Field
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
                    onClick={() => props.onPrev(values)}
                    title="Prev"
                    classes="bg-thin-blue w-48 h-10 mt-3 mr-10"
                    disabled={isSubmitting}
                  />
                  <Action
                    submit
                    title="upload"
                    classes="bg-thin-blue w-48 h-10 mt-3"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isOpenModal && modalType === "logo" && (
        <Modal>
          <UNSDGInfoModal />
        </Modal>
      )}
      {isOpenModal && modalType === "banner" && (
        <Modal>
          <RevenueInfoModal />
        </Modal>
      )}
      {isOpenModal && modalType === "video" && (
        <Modal>
          <RevenueInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default ProfileStepTwo;
