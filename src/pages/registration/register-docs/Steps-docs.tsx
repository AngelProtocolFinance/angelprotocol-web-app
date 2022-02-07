import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { registration } from "types/routes";
import { DropzoneDialog } from "material-ui-dropzone";
import { useUploadFiles } from "./useUploadFiles";
import Action from "../../../components/ActionButton/Action";
import { ToastContainer } from "react-toastify";
import { useGetter, useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";

const StepsDocs = () => {
  //url = app/register/upload-docs
  const dispatch = useSetter();
  const history = useHistory();
  const location: any = useLocation();
  const { uploadDocs } = useUploadFiles();
  const [isOpenModal, setOpenModal] = useState(false);
  const [docType, setDocType] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [uploadedStatus, setUploadedStatus] = useState(false);
  const docData = location.state.data;

  let user = useGetter((state) => state.user);
  if (!user.PK) {
    user = JSON.parse(localStorage.getItem("userData") || "{}");
    dispatch(updateUserData(user));
  }

  const [userData, setUserData] = useState({
    ...user,
    ProofOfIdentityVerified: docData.ProofOfIdentityVerified,
    ProofOfIdentity: docData.ProofOfIdentity,
    ProofOfEmploymentVerified: docData.ProofOfEmploymentVerified,
    ProofOfEmployment: docData.ProofOfEmployment,
    EndowmentAgreementVerified: docData.EndowmentAgreementVerified,
    EndowmentAgreement: docData.EndowmentAgreement,
  });
  const showInfoModal = (index: number) => {
    setUploadedStatus(false);
    setOpenModal(true);
    setDocType(index);
  };

  const uploadFile = async (files: any) => {
    setOpenModal(false);
    const paramDocNames = [
      ["ProofOfIdentity", "ProofOfIdentityVerified"],
      ["ProofOfEmployment", "ProofOfEmploymentVerified"],
      ["EndowmentAgreement", "EndowmentAgreementVerified"],
    ];
    setLoading(true);
    const success = await uploadDocs(files[0], user.PK, docType);
    if (success) {
      const loadedDocData = {
        ...userData,
        [paramDocNames[docType][0]]: "uploaded",
        [paramDocNames[docType][1]]: false,
      };
      setUserData(loadedDocData);
      dispatch(updateUserData(loadedDocData));
    }
    setUploadedStatus(success);
    setLoading(false);
  };
  return (
    <div>
      <div className="title text-center mb-5">
        <p className="text-3xl font-bold">
          Please upload the following documentation:
        </p>
        <p className="text-base">
          you can upload a file or simple drag and drop to the correct area.
        </p>
      </div>
      <div className="steps my-10">
        <div className="step-1 md:flex justify-between items-center mb-5">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Your Proof of Identity
            </p>
          </div>
          <div className=" md:w-2/3 xl:w-1/2 flex items-center justify-end">
            <Action
              onClick={() => showInfoModal(0)}
              title="select or drag and drop"
              classes="bg-yellow-blue w-64 h-10 mr-5"
              disabled={loading}
              isLoading={loading && docType === 0}
            />
            {userData?.ProofOfIdentityVerified && (
              <p className="text-green-500 uppercase text-sm xl:text-base w-1/3">
                complete
              </p>
            )}
            {((userData?.ProofOfIdentityVerified === false &&
              userData?.ProofOfIdentity !== "") ||
              (uploadedStatus && docType === 0)) && (
              <p className="text-yellow-blue uppercase text-sm xl:text-base w-1/3">
                In Review
              </p>
            )}
            {!uploadedStatus && !userData?.ProofOfIdentity && (
              <p className="text-red-500 uppercase text-sm xl:text-base w-1/3">
                Not submitted
              </p>
            )}
          </div>
        </div>
        <div className="step-1 md:flex justify-between mb-5">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Documentation attesting of your {userData.Role} position in{" "}
              {userData.CharityName}{" "}
            </p>
          </div>
          <div className="flex items-center justify-end md:w-2/3 xl:w-1/2">
            <Action
              onClick={() => showInfoModal(1)}
              title="select or drag and drop"
              classes="bg-yellow-blue w-64 h-10 mr-5"
              disabled={loading}
              isLoading={loading && docType === 1}
            />
            {userData?.ProofOfEmploymentVerified && (
              <p className="text-green-500 uppercase text-sm xl:text-base w-1/3">
                complete
              </p>
            )}
            {((userData?.ProofOfEmploymentVerified === false &&
              userData?.ProofOfEmployment !== "") ||
              (uploadedStatus && docType === 1)) && (
              <p className="text-yellow-blue uppercase text-sm xl:text-base w-1/3">
                In Review
              </p>
            )}
            {!userData?.ProofOfEmployment && (
              <p className="text-red-500 uppercase text-sm xl:text-base w-1/3">
                Not submitted
              </p>
            )}
          </div>
        </div>
        <div className="step-1 md:flex justify-between">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Resolution approving the creation of an Endowment on Angel
              Protocol with the Terra address {userData?.TerraWallet}
              <p className="text-orange text-xs underline text-left cursor-pointer">
                See Template
              </p>
            </p>
          </div>
          <div className="flex items-center justify-end md:w-2/3 xl:w-1/2">
            <Action
              onClick={() => showInfoModal(2)}
              title="select or drag and drop"
              classes="bg-yellow-blue w-64 h-10 mr-5"
              disabled={loading}
              isLoading={loading && docType === 2}
            />
            {userData?.EndowmentAgreementVerified && (
              <p className="text-green-500 uppercase text-sm xl:text-base w-1/3">
                complete
              </p>
            )}
            {((userData?.EndowmentAgreementVerified === false &&
              userData?.EndowmentAgreement !== "") ||
              (uploadedStatus && docType === 2)) && (
              <p className="text-yellow-blue uppercase text-sm xl:text-base w-1/3">
                In Review
              </p>
            )}
            {!userData?.EndowmentAgreement && (
              <p className="text-red-500 uppercase text-sm xl:text-base w-1/3">
                Not submitted
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 text-center flex justify-center">
        <div>
          <Action
            onClick={() => history.push(registration.endowment_data)}
            title="back"
            classes="bg-dark-grey w-48 h-10 mt-3"
            disabled={loading}
          />
        </div>
      </div>
      <DropzoneDialog
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={isOpenModal}
        onClose={() => setOpenModal(false)}
        onSave={uploadFile}
        showPreviews={true}
        showFileNamesInPreview={true}
        filesLimit={1}
      />
      <ToastContainer />
    </div>
  );
};

export default StepsDocs;
