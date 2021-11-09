import { useState, useMemo } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import countryList from "react-select-country-list";
import Modal from "components/Modal/Modal";
import UNSDGInfoModal from "../modals/UNSDGInfoModal";
import RevenueInfoModal from "../modals/RevenueInfoModal";
import { register } from "types/routes";
import { StepOneSchema } from "./useUpdateCharityProfile";
import Action from "../Action";
import { UN_SDGS } from "types/unsdgs";

const ProfileStepOne = (props: any) => {
  //url = app/register/charity-profile
  const countries = useMemo(() => countryList().getData(), []);

  const history = useHistory();
  const userData = props.userInfo;
  const metaData = props.formData.CompanyNumber
    ? props.formData
    : props.metaData;
  const handleUpdateProfile = (
    profileData: any,
    actions: FormikHelpers<any>
  ) => {
    actions.setSubmitting(true);
    props.onSubmit(profileData);
    props.onNext();
    actions.setSubmitting(false);
  };

  const [isOpenModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const showInfoModal = (type: any) => {
    setModalType(type);
    setOpenModal(true);
  };

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            CompanyNumber: metaData?.CompanyNumber || "",
            CountryIncorporation:
              metaData?.CountryIncorporation || "Afghanistan",
            isYourCountry: false,
            SelectCountries: metaData?.SelectCountries || "Afghanistan",
            VisionStatement: metaData?.VisionStatement || "",
            MissionStatement: metaData?.MissionStatement || "",
            UN_SDG: metaData?.UN_SDG || "No poverty",
            AnnualRevenue: metaData?.AnnualRevenue || "500",
            OperatingExpense: metaData?.OperatingExpense || "",
            Currency: metaData?.Currency || "EUR",
          }}
          validationSchema={StepOneSchema}
          onSubmit={handleUpdateProfile}
        >
          {({ isSubmitting, values }) => (
            <Form className="text-center">
              <div className="md:flex justify-between">
                <div className="w-full md:w-1/3">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Company Number{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="number"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Company Number"
                        name="CompanyNumber"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="CompanyNumber"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Country of Incorporation{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Country of Incorporation"
                        name="CountryIncorporation"
                      >
                        {countries.map((country: any, index: number) => {
                          return (
                            <option value={country.label} key={index}>
                              {country.label}
                            </option>
                          );
                        })}
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
                      name="CountryIncorporation"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Countries where {userData.CharityName} runs programs{" "}
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        placeholder="Countries"
                        name="SelectCountries"
                      >
                        {countries.map((country: any, index: number) => {
                          return (
                            <option value={country.label} key={index}>
                              {country.label}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="SelectCountries"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 md:px-10">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Vision Statement
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="textarea"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-32"
                        name="VisionStatement"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="VisionStatement"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Mission Statement
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="textarea"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-32"
                        name="MissionStatement"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="MissionStatement"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      With Which UNSDG dones {userData.CharityName} identify
                      with the most?
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="form-control rounded-md bg-gray-200 p-2 flex items-center w-full mr-1">
                        <Field
                          as="select"
                          className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                          placeholder="List of UNSDGs"
                          name="UN_SDG"
                        >
                          {UN_SDGS.map((item: string, index: number) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })}
                        </Field>
                      </div>
                      <BsExclamationCircle
                        className="text-xl text-thin-blue cursor-pointer"
                        onClick={() => showInfoModal("unsdg")}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="UN_SDG"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Average annual revenue (in your local currency)
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="form-control rounded-md bg-gray-200 p-2 flex items-center w-full mr-1">
                        <Field
                          as="select"
                          className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                          name="AnnualRevenue"
                        >
                          <option value="500">0 - 500k</option>
                          <option value="1000">500k - 1m</option>
                          <option value="5000">1m - 5m</option>
                          <option value="10000">5m - 10m</option>
                          <option value="20000">10m - 20m</option>
                          <option value="full">20m+</option>
                        </Field>
                      </div>
                      <BsExclamationCircle
                        className="text-xl text-thin-blue cursor-pointer"
                        onClick={() => showInfoModal("average")}
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="AnnualRevenue"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      Average operating expenses (in your local currency)
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        type="text"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        name="OperatingExpense"
                      />
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="OperatingExpense"
                      component="div"
                    />
                  </div>
                  <div className="item mb-5">
                    <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                      What's your local currency?
                      <span className="ml-1 text-xs text-failed-red">*</span>
                    </p>
                    <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                      <Field
                        as="select"
                        className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                        name="Currency"
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="RMB">RMB</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                      name="Currency"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center flex justify-center">
                <div>
                  <Action
                    onClick={() => history.push(register.status)}
                    title="Back"
                    classes="bg-thin-blue w-48 h-10 mt-3 mr-10"
                    disabled={isSubmitting}
                  />
                  <Action
                    submit
                    title="Next"
                    classes="bg-thin-blue w-48 h-10 mt-3"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isOpenModal && modalType === "unsdg" && (
        <Modal>
          <UNSDGInfoModal />
        </Modal>
      )}
      {isOpenModal && modalType === "average" && (
        <Modal>
          <RevenueInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default ProfileStepOne;
