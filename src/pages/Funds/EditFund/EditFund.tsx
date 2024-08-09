import { skipToken } from "@reduxjs/toolkit/query";
import Prompt from "components/Prompt";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useParams } from "react-router-dom";
import { useEditFundMutation, useFundQuery } from "services/aws/funds";
import ContentForm, { type FV as FundInfo } from "./ContentForm";
import ImgForm from "./ImgForm";

export function EditFund() {
  const { fundId = "" } = useParams();
  const { data, isLoading, isError } = useFundQuery(fundId || skipToken);
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
        id: fundId,
      }).unwrap();
      showModal(Prompt, {
        type: "success",
        children: "Successfully updated fund!",
      });
    } catch (err) {
      handleError(err, { context: "updating fund" });
    }
  }

  return (
    <div className="padded-container mt-8 grid content-start">
      <h2 className="text-3xl mb-4">Edit fund</h2>
      {isLoading ? (
        <LoadingStatus>Getting fund... </LoadingStatus>
      ) : !data || isError ? (
        <ErrorStatus>Failed to get fund</ErrorStatus>
      ) : (
        <>
          <ContentForm onSubmit={editInfo} init={data} />
          <ImgForm
            label="Banner"
            aspect={[4, 1]}
            classes="mt-6"
            imgClasses={{ container: "w-full aspect-[4/1]" }}
            bannerUrl=""
            onSubmit={async (f) => console.log(f)}
          />
          <ImgForm
            label="Logo"
            classes="justify-self-start mt-6"
            aspect={[1, 1]}
            imgClasses={{ container: "w-80 aspect-[1/1]" }}
            bannerUrl=""
            onSubmit={async (f) => console.log(f)}
          />
        </>
      )}
    </div>
  );
}
