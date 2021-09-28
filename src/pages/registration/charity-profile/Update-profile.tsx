import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { BsExclamationCircle } from "react-icons/bs";
import Modal from "components/Modal/Modal";
import UNSDGInfoModal from "../modals/UNSDGInfoModal";
import RevenueInfoModal from "../modals/RevenueInfoModal";
import { site, web } from "types/routes";

const UpdateProfile = () => {
  //url = app/register/charity-profile
  const userData: any = JSON.parse(localStorage.getItem("userData") || "{}");
  const handleUpdateProfile = () => {};
  const ProfileSchema = Yup.object().shape({
    companyNumber: Yup.number().required("Please enter your company number"),
    countryIncorporation: Yup.string().required(
      "please select the country of incorporation."
    ),
    selectCountry: Yup.string().required(
      `Please select the countries where ${userData.charityName} runs programs.`
    ),
    visionStatement: Yup.string().required(
      "Please select the vision statement."
    ),
    missionStatement: Yup.string().required(
      "Please select the vision statement."
    ),
    unsdg: Yup.string().required("please select the mission statement."),
    revenue: Yup.string().required("please select the Average annual revenue."),
    expense: Yup.string().required(
      "Please select the Average operating expenses."
    ),
    currency: Yup.string().required("Please select the currency"),
  });

  const [isOpenModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const showInfoModal = (type: any) => {
    console.log("sadfasdfasdfasdfasdf");
    setModalType(type);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setModalType("");
  };
  return (
    <div className="">
      <div className="title mb-10">
        <p className="text-2xl md:text-3xl font-bold">
          Update the profile details for {userData.charityName}
        </p>
        <span className="text-center">General Information</span>
      </div>
      <div>
        <Formik
          initialValues={{
            companyNumber: "",
            countryIncorporation: "",
            isYourCountry: false,
            countries: [],
            selectCountry: "",
            visionStatement: "",
            missionStatement: "",
            unsdg: "",
            revenue: "",
            expense: "",
            currency: "",
          }}
          validateSchedule={ProfileSchema}
          onSubmit={handleUpdateProfile}
        >
          {({ isSubmitting, status }) => (
            <Form className="text-center">
              <div className="md:flex justify-between">
                <div className="w-full md:w-1/3">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Company Number{" "}
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Company Number"
                        name="companyNumber"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="companyNumber"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Country of Incorporation{" "}
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Country of Incorporation"
                        name="countryIncorporation"
                      >
                        <option value="1">Incorporation 1</option>
                        <option value="2">Incorporation 2</option>
                        <option value="3">Incorporation 3</option>
                        <option value="4">Incorporation 4</option>
                      </Field>
                    </div>
                    <label>
                      <input
                        type="checkbox"
                        name="isYourCountry"
                        className="mr-2"
                      />
                      <span className="text-sm">
                        Check the box if you are officially registered as a
                        charity in your country of incorporation.
                      </span>
                    </label>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="countryIncorporation"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Countries where {userData.charityName} runs programs{" "}
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Countries"
                        name="selectCountry"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="selectCountry"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 md:px-10">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Vision Statement
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="textarea"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-32"
                        name="visionStatement"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="visionStatement"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Mission Statement
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="textarea"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-32"
                        name="missionStatement"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="missionStatement"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      With Which UNSDG dones {userData.charityName} identify
                      with the most?
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="form-control rounded-md bg-gray-200 p-2 flex items-center w-full mr-1">
                        <Field
                          as="select"
                          className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                          placeholder="List of UNSDGs"
                          name="unsdg"
                        >
                          <option value="unsdg1">UNSDG 1</option>
                          <option value="unsdg2">UNSDG 2</option>
                          <option value="unsdg3">UNSDG 3</option>
                        </Field>
                      </div>
                      <BsExclamationCircle
                        className="text-xl text-thin-blue cursor-pointer"
                        onClick={() => showInfoModal("unsdg")}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="unsdg"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Average annual revenue (in your local currency)
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="form-control rounded-md bg-gray-200 p-2 flex items-center w-full mr-1">
                        <Field
                          as="select"
                          className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                          name="revenue"
                        >
                          <option>10</option>
                          <option>50</option>
                          <option>100</option>
                        </Field>
                      </div>
                      <BsExclamationCircle
                        className="text-xl text-thin-blue cursor-pointer"
                        onClick={() => showInfoModal("average")}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="revenue"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Average operating expenses (in your local currency)
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        name="expense"
                      >
                        <option>10</option>
                        <option>50</option>
                        <option>100</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="expense"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      What's your local currency?
                      <span className="ml-1 text-xs text-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        name="currency"
                      >
                        <option>EUR</option>
                        <option>USD</option>
                        <option>RMB</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="currency"
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
                  <button className="bg-thin-blue w-48 h-10 rounded-xl uppercase text-base font-bold text-white mt-3">
                    upload
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isOpenModal && modalType == "unsdg" && (
        <Modal>
          <UNSDGInfoModal />
        </Modal>
      )}
      {isOpenModal && modalType == "average" && (
        <Modal>
          <RevenueInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default UpdateProfile;
