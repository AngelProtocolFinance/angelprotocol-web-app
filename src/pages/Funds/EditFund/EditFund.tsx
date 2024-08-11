import { skipToken } from "@reduxjs/toolkit/query";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { ErrorStatus, LoadingStatus } from "components/Status";
import withAuth from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";
import { useParams } from "react-router-dom";
import { useEditFundMutation, useFundQuery } from "services/aws/funds";
import type { Fund } from "types/aws";
import ContentForm, { type FV as FundInfo } from "./ContentForm";
import ImgForm from "./ImgForm";

const containerClass = "padded-container mt-8 grid content-start";

export default withAuth(function EditFund({ user }) {
  const { fundId = "" } = useParams();

  const { data, isLoading, isError } = useFundQuery(fundId || skipToken);

  if (isLoading) {
    return (
      <div className={containerClass}>
        <LoadingStatus>Getting fund... </LoadingStatus>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={containerClass}>
        <ErrorStatus>Failed to get fund</ErrorStatus>
      </div>
    );
  }

  if (!user.funds.includes(fundId)) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <Icon type="ExclamationCircleFill" size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  return <Loaded {...data} />;
});

export function Loaded(props: Fund) {
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();

  const [editFund] = useEditFundMutation();

  async function editInfo({ targetType, fixedTarget, ...update }: FundInfo) {
    try {
      await editFund({
        ...update,
        target:
          targetType === "none"
            ? undefined
            : targetType === "smart"
              ? "smart"
              : (fixedTarget as `${number}`),
        id: props.id,
      }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Successfully updated fund!",
      });
    } catch (err) {
      handleError(err, { context: "updating fund" });
    }
  }

  async function upload(file: File, name: "logo" | "banner") {
    try {
      const baseURL = await uploadFiles([file], "bg-funds");
      if (!baseURL) throw "@dev: file not found";
      const uri = getFullURL(baseURL!, file.name);
      await editFund({ [name]: uri, id: props.id }).unwrap();
    } catch (err) {
      handleError(err, { context: "uploading file" });
    }
  }

  return (
    <div className={containerClass}>
      <h2 className="text-3xl mb-4">Edit fund</h2>

      <ImgForm
        label="Logo"
        classes="justify-self-start mt-6"
        aspect={[1, 1]}
        imgClasses={{ container: "w-80 aspect-[1/1]" }}
        init={props.logo}
        onSubmit={async (f) => upload(f, "logo")}
      />
      <ImgForm
        label="Banner"
        aspect={[4, 1]}
        classes="mt-6"
        imgClasses={{ container: "w-full aspect-[4/1]" }}
        init={props.banner}
        onSubmit={async (f) => upload(f, "banner")}
      />
      <ContentForm onSubmit={editInfo} init={props} />
    </div>
  );
}
