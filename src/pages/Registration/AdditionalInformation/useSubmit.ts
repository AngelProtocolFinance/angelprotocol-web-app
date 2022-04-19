import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useCallback } from "react";
import { useUpdateCharityMetadataMutation } from "services/aws/registration";
import { UpdateCharityMetadataResult } from "services/aws/types";
import { useGetter, useSetter } from "store/accessors";
import { updateCharity } from "../store";
import uploadToIpfs from "helpers/uploadToIpfs";
import { FormValues } from "./types";

export default function useSubmit() {
  const [updateMetadata, { isSuccess }] = useUpdateCharityMetadataMutation();
  const charity = useGetter((state) => state.charity);
  const dispatch = useSetter();

  const handleError = useCallback((err) => console.log(err), []);

  const handleSuccess = useCallback(
    (data: UpdateCharityMetadataResult) =>
      dispatch(
        updateCharity({
          ...charity,
          Metadata: {
            ...charity.Metadata,
            Banner: data.Banner,
            CharityLogo: data.CharityLogo,
            CharityOverview: data.CharityOverview,
          },
        })
      ),
    [dispatch, charity]
  );

  const submit = useCallback(
    async (values: FormValues) => {
      const body = await getUploadBody(values);

      const result = await updateMetadata({
        PK: charity.ContactPerson.PK,
        body,
      });

      const dataResult = result as {
        data: UpdateCharityMetadataResult;
        error: FetchBaseQueryError | SerializedError;
      };

      if (dataResult.error) {
        handleError(JSON.stringify(dataResult.error));
      } else {
        handleSuccess(dataResult.data);
      }
    },
    [charity.ContactPerson.PK, handleSuccess, handleError, updateMetadata]
  );

  return { submit, isSuccess };
}

async function getUploadBody(values: FormValues) {
  const CharityLogo = await uploadToIpfs(values.charityLogo);
  const Banner = await uploadToIpfs(values.banner);

  return {
    Banner,
    CharityLogo,
    CharityOverview: values.charityOverview,
  };
}
