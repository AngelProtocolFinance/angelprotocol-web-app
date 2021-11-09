import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { register } from "types/routes";
import {
  ProfileSchema,
  useKeyPersonProfile,
  KeyPersoData,
} from "./useKeyPersonProfile";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Action from "../Action";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";
import { useGetCharityDataQuery } from "services/aws/charity";

const KeyPersonProfile = () => {
  //url = app/register/charity-profile
  const [fileContent, setFileContent] = useState("");
  const location: any = useLocation();
  const dispatch = useSetter();
  const { saveKeyPersonData, readFileToBase64 } = useKeyPersonProfile();
  let user = useGetter((state) => state.user);
  let keyPersonData = location.state.data;
  const { data, error } = useGetCharityDataQuery(user.PK);

  if (!location.state.data && user.IsKeyPersonCompleted) {
    keyPersonData = data.KeyPerson;
  }

  const [openDropzone, setOpenDropzone] = useState(
    keyPersonData?.HeadshotPicture && true
  );
  const history = useHistory();

  if (!user.PK) {
    user = JSON.parse(localStorage.getItem("userData") || "{}");
    dispatch(updateUserData(user));
  }

  const readFiles = async (files: any) => {
    let content: any;
    if (files.length > 0) {
      content = await readFileToBase64(files[0]);
      setFileContent(content);
    }
  };

  const onSavePersonData = async (
    updatedkeyPersonData: KeyPersoData,
    actions: FormikHelpers<KeyPersoData>
  ) => {
    actions.setSubmitting(true);
    const flag = await saveKeyPersonData(
      updatedkeyPersonData,
      fileContent,
      !keyPersonData?.FullName
    );

    if (flag) {
      dispatch(
        updateUserData({
          ...user,
          IsKeyPersonCompleted: true,
        })
      );
    }
    actions.setSubmitting(false);
  };

  return (
    <div>
      <div className="title mb-10">
        <p className="text-2xl md:text-3xl font-bold mb-10">
          Update the profile details for {user.CharityName}'s KEY PERSON
        </p>
        <span className="text-center">
          The key person of your organization is a person that you want to
          highlight on {user.CharityName}'s profile. The highlight would include
          a headshot picture, a title, contact details and an inspirational
          quote.
        </span>
      </div>
      <div>
        <Formik
          initialValues={
            {
              FullName: keyPersonData?.FullName || "",
              Title: keyPersonData?.Title || "",
              Email: keyPersonData?.Email || "",
              Twitter: keyPersonData?.Twitter || "",
              Linkedin: keyPersonData?.Linkedin || "",
              Quote: keyPersonData?.Quote || "",
              uuid: user.PK,
              HeadshotPicture: keyPersonData?.HeadshotPicture || "",
            } as KeyPersoData
          }
          validationSchema={ProfileSchema}
          onSubmit={onSavePersonData}
        >
          {({ isSubmitting, values }) => (
            <Form className="text-center">
              <div className="md:flex justify-between">
                <div className="w-full md:w-1/2 px-5 text-left">
                  <input type="hidden" value={values.uuid} name="uuid" />
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
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-16"
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
                    </p>
                    {openDropzone ? (
                      <div className="flex items-end">
                        <img
                          src={values.HeadshotPicture}
                          width={160}
                          height={160}
                          id="headshotpic"
                          className="rounded-full mr-10 h-40"
                          alt="avatar"
                        />
                        <Action
                          classes="bg-yellow-blue w-36 h-8 text-xs"
                          onClick={() => setOpenDropzone(false)}
                          title="Change Image"
                          // disabled={!openDropzone}
                        />
                      </div>
                    ) : (
                      <div className="form-control rounded-md flex justify-between items-center w-full h-64">
                        <DropzoneArea
                          onChange={readFiles}
                          dropzoneClass="text-gray-400"
                          filesLimit={1}
                          acceptedFiles={["image/*"]}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center flex justify-center">
                <div>
                  <Action
                    onClick={() => history.push(register.status)}
                    title="Back"
                    classes="bg-thin-blue w-48 h-10 mr-10"
                    disabled={isSubmitting}
                  />
                  <Action
                    submit
                    title="Upload"
                    classes="bg-thin-blue w-48 h-10"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default KeyPersonProfile;
