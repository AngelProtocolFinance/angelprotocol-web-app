import { useState, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import countryList from "react-select-country-list";
import Modal from "components/Modal/Modal";
import UNSDGInfoModal from "../modals/UNSDGInfoModal";
import RevenueInfoModal from "../modals/RevenueInfoModal";
import { registration } from "types/routes";
import { StepOneSchema } from "./useUpdateCharityProfile";
import Action from "../../../components/ActionButton/Action";
import { UN_SDGS } from "types/unsdgs";
import CurrencyList from "currency-list";
import { Selector, MultiSelector } from "components/Selector";
import { RevenueRanges } from "constants/revenueRanges";

const ProfileStepOne = (props: any) => {
  //url = app/register/charity-profile
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);
  const currencies = Object.keys(CurrencyList.getAll("en_US"));
  const history = useHistory();
  const userData = props.userInfo;
  const metaData = props.formData.CompanyNumber
    ? props.formData
    : props.metaData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(StepOneSchema),
    defaultValues: {
      CompanyNumber: metaData?.CompanyNumber || "",
      CountryIncorporation: metaData?.CountryIncorporation || "Afghanistan",
      isYourCountry: false,
      SelectCountries: metaData?.SelectCountries || ["Afghanistan"],
      VisionStatement: metaData?.VisionStatement || "",
      MissionStatement: metaData?.MissionStatement || "",
      UN_SDG: metaData?.UN_SDG || "No poverty",
      AnnualRevenue: metaData?.AnnualRevenue || "500",
      OperatingExpense: metaData?.OperatingExpense || "",
      Currency: metaData?.Currency || "EUR",
    },
  });

  const onSubmitProfile = (profileData: any) => {
    setIsLoading(true);
    props.onSubmit(profileData);
    props.onNext();
    setIsLoading(false);
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
        <form className="text-center" onSubmit={handleSubmit(onSubmitProfile)}>
          <div className="md:flex justify-between">
            <div className="w-full md:w-1/3">
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Company Number{" "}
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("CompanyNumber")}
                    type="number"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    placeholder="Company Number"
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.CompanyNumber?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Country of Incorporation{" "}
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 flex justify-between items-center text-black">
                  <Selector
                    name="CountryIncorporation"
                    placeholder="Country of Incorporation"
                    options={countries.map((item) => ({
                      value: item.label,
                      label: item.label,
                    }))}
                    control={control}
                    register={register}
                  />
                </div>
                <label>
                  <input
                    type="checkbox"
                    name="isYourCountry"
                    className="mr-2"
                  />
                  <span className="text-sm">
                    Check the box if you are officially registered as a charity
                    in your country of incorporation.
                  </span>
                </label>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.CountryIncorporation?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Countries where {userData.CharityName} runs programs{" "}
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 flex justify-between items-center text-black">
                  <MultiSelector
                    name="SelectCountries"
                    placeholder="Countries"
                    options={countries.map((item) => ({
                      value: item.label,
                      label: item.label,
                    }))}
                    control={control}
                    register={register}
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.SelectCountries?.message}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 md:px-10">
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Vision Statement
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <textarea
                    {...register("VisionStatement")}
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-32"
                    name="VisionStatement"
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.VisionStatement?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Mission Statement
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <textarea
                    {...register("MissionStatement")}
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black h-32"
                    name="MissionStatement"
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.MissionStatement?.message}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  With Which UNSDG dones {userData.CharityName} identify with
                  the most?
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="flex items-center justify-between">
                  <div className="form-control rounded-md bg-gray-200 flex items-center w-full mr-1 text-black">
                    <Selector
                      name="UN_SDG"
                      placeholder="List of UNSDGs"
                      options={UN_SDGS.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      control={control}
                      register={register}
                    />
                  </div>
                  <BsExclamationCircle
                    className="text-xl text-thin-blue cursor-pointer"
                    onClick={() => showInfoModal("unsdg")}
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.UN_SDG?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Average annual revenue (in your local currency)
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="flex items-center justify-between">
                  <div className="form-control rounded-md bg-gray-200 flex items-center w-full mr-1 text-black">
                    <Selector
                      name="AnnualRevenue"
                      placeholder="Revenue Range"
                      options={RevenueRanges}
                      control={control}
                      register={register}
                    />
                  </div>
                  <BsExclamationCircle
                    className="text-xl text-thin-blue cursor-pointer"
                    onClick={() => showInfoModal("average")}
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.AnnualRevenue?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  Average operating expenses (in your local currency)
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <input
                    {...register("OperatingExpense")}
                    type="text"
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200 text-black"
                    name="OperatingExpense"
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.OperatingExpense?.message}
                </p>
              </div>
              <div className="item mb-5">
                <p className="text-sm text-gray-400 font-bold mb-1 text-left">
                  What's your local currency?
                  <span className="ml-1 text-xs text-failed-red">*</span>
                </p>
                <div className="form-control rounded-md bg-gray-200 flex justify-between items-center text-black">
                  <Selector
                    name="Currency"
                    placeholder="Currency"
                    options={currencies.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    control={control}
                    register={register}
                  />
                </div>
                <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
                  {errors.Currency?.message}
                </p>
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
                submit
                title="Next"
                classes="bg-thin-blue w-48 h-10 mt-3"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
      {isOpenModal && modalType === "unsdg" && (
        <Modal setShown={() => setOpenModal(false)}>
          <UNSDGInfoModal />
        </Modal>
      )}
      {isOpenModal && modalType === "average" && (
        <Modal setShown={() => setOpenModal(false)}>
          <RevenueInfoModal />
        </Modal>
      )}
    </div>
  );
};

export default ProfileStepOne;
