// import { useCallback, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useLocation } from "react-router-dom";
// import { useDropzone } from "react-dropzone";
import { site, web } from "types/routes";
import { useSelector } from "react-redux";
import { TStore } from "Redux/store";
import {
  ProfileSchema,
  useKeyPersonProfile,
  KeyPersoData,
} from "./useKeyPersonProfile";
import FileUploader from "components/FileUploader/FileUploader";

const KeyPersonProfile = () => {
  //url = app/register/charity-profile
  const location: any = useLocation();
  const keyPersonData = location.state.data;
  const { userData } = useSelector((state: TStore) => state.user);
  const { saveKeyPersonData } = useKeyPersonProfile();
  // const { saveKeyPersonData, uploadAvatar } = useKeyPersonProfile();
  // const onDrop = useCallback((acceptedFiles) => {}, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <div className="">
      <div className="title mb-10">
        <p className="text-2xl md:text-3xl font-bold">
          Update the profile details for {userData.CharityName}'s KEY PERSON
        </p>
        <span className="text-center">
          The key person of your organization is a person that you want to
          highlight on {userData.CharityName}'s profile. The highlight would
          include a headshot picture, a title, contact details and an
          inspirational quote.
        </span>
      </div>
      <div>
        <Formik
          initialValues={
            {
              FullName: keyPersonData?.FullName || "",
              Title: keyPersonData?.Title || "",
              HeadshotPicture: keyPersonData?.HeadshotPicture || "",
              Email: keyPersonData?.Email || "",
              Twitter: keyPersonData?.Twitter || "",
              Linkedin: keyPersonData?.Linkedin || "",
              Quote: keyPersonData?.Quote || "",
              PK: userData.PK,
            } as KeyPersoData
          }
          validationSchema={ProfileSchema}
          onSubmit={saveKeyPersonData}
        >
          {({ isSubmitting, values }) => (
            <Form className="text-center">
              <div className="md:flex justify-between">
                <div className="w-full md:w-1/2 px-5 text-left">
                  <input type="hidden" value={values.PK} name="PK" />
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Full name{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Your Full Name"
                        name="FullName"
                        value={values.FullName}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="FullName"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Title{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Title"
                        name="Title"
                        value={values.Title}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="Title"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Contact email address{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Email Address"
                        name="Email"
                        value={values.Email}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="Email"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Twitter profile
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Twitter profile"
                        name="Twitter"
                        value={values.Twitter}
                      />
                    </div>
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      LinkedIn profile
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="LinkedIn profile"
                        name="LinkedIn"
                        value={values.Linkedin}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-5 text-left">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Inspirational quote{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="textarea"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Description"
                        name="Quote"
                        value={values.Quote}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="Quote"
                      component="div"
                    />
                  </div>
                  <div className="item">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Headshot picture
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        component={FileUploader}
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        name="HeadshotPicture"
                      />
                    </div>
                    {/* </div>
                  <div className="item mb-5">
                    <div className="form-control rounded-md bg-gray-200 flex justify-between items-center">
                      <input
                        type="hidden"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        name="HeadshotPicture"
                        value={values.HeadshotPicture}
                      />
                    </div> */}
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="HeadshotPicture"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center flex justify-center">
                <div>
                  <div className="flex items-center py-2">
                    <label>
                      <input
                        type="checkbox"
                        name="checkedPolicy"
                        className="mr-2"
                      />
                      <span className="text-base">
                        {" "}
                        By checking this box, you declare that you have read and
                        agreed our{" "}
                        <Link
                          to={`${site.home}${web.privacy}`}
                          className="underline"
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                        <span className="text-base text-failed-red">*</span>
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-thin-blue w-48 h-10 rounded-xl uppercase text-base font-bold text-white mt-3"
                    disabled={isSubmitting}
                  >
                    upload
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default KeyPersonProfile;
