import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register, site, web } from "types/routes";
import { DropzoneDialog } from "material-ui-dropzone";
import { useUploadFiles } from "./useUploadFiles";
import Action from "../Action";
import { useSelector } from "react-redux";
import { TStore } from "Redux/store";

const StepsDocs = () => {
  //url = app/register/upload-docs
  const history = useHistory();
  const { uploadDocs } = useUploadFiles();
  const { userData } = useSelector((state: TStore) => state.user);
  const [isOpenModal, setOpenModal] = useState(false);
  const [docType, setDocType] = useState(-1);
  const [loading, setLoading] = useState(false);

  const showInfoModal = (index: number) => {
    setOpenModal(true);
    setDocType(index);
  };

  const uploadFile = async (files: any) => {
    setLoading(true);
    console.log(userData);
    await uploadDocs(files[0], userData.PK, docType);
    setLoading(false);
    setOpenModal(false);
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
              title="upload new file"
              classes="bg-yellow-blue w-64 h-10 mr-5"
              disabled={loading}
            />
            <p className="text-green-500 uppercase text-sm xl:text-base w-1/3">
              complete
            </p>
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
            />
            <p className="text-red-500 uppercase text-sm xl:text-base w-1/3">
              Not submitted
            </p>
          </div>
        </div>
        <div className="step-1 md:flex justify-between">
          <div className="md:w-1/3 xl:w-1/2 mb-2 md:mb-0">
            <p className="font-bold text-base max-w-xs text-left xl:ml-32">
              Resolution approving the creation of an Endowment on Angel
              Protocol with the Terra address {userData.WalletAddress}
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
            />
            <p className="text-red-500 uppercase text-sm xl:text-base w-1/3">
              Not submitted
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 text-center flex justify-center">
        <div>
          <div className="flex items-center py-2">
            <label>
              <input type="checkbox" name="checkedPolicy" className="mr-2" />
              <span className="text-base">
                {" "}
                By checking this box, you declare that you have read and agreed
                our{" "}
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
          <Action
            onClick={() => history.push(register.status)}
            title="back"
            classes="bg-thin-blue w-48 h-10 mt-3"
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
    </div>
  );
};

export default StepsDocs;
