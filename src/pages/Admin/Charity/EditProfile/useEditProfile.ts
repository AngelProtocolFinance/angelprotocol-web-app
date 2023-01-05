import { useFormContext } from "react-hook-form";
import {
  EndowmentProfileUpdateMeta,
  FlatProfileWithSettings,
} from "pages/Admin/types";
import { ProfileFormValues } from "pages/Admin/types";
import { ObjectEntries } from "types/utils";
import { useAdminResources } from "pages/Admin/Guard";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetWallet } from "contexts/WalletContext";
import { ImgLink } from "components/ImgEditor";
import Account from "contracts/Account";
import CW3 from "contracts/CW3";
import useCosmosTxSender from "hooks/useCosmosTxSender/useCosmosTxSender";
import {
  cleanObject,
  genDiffMeta,
  getPayloadDiff,
  getTagPayloads,
} from "helpers/admin";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";
import { appRoutes } from "constants/routes";

// import optimizeImage from "./optimizeImage";

const PLACEHOLDER_OVERVIEW = "[text]";

export default function useEditProfile() {
  const { endowmentId, cw3, propMeta } = useAdminResources();
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<ProfileFormValues>();

  const { wallet } = useGetWallet();
  const { handleError } = useErrorContext();
  const sendTx = useCosmosTxSender();

  const editProfile = async ({
    title,
    description,
    initial,
    ...data
  }: ProfileFormValues) => {
    try {
      const [bannerUrl, logoUrl] = await getImgUrls([data.image, data.logo]);
      //flatten profile values for diffing
      //TODO: refactor to diff nested objects
      const flatData: FlatProfileWithSettings = {
        ...data,
        country: data.country.name,
        image: bannerUrl,
        logo: logoUrl,
      };

      const diff = getPayloadDiff(initial, flatData);

      //if overview has changed, and is set to something
      if ("overview" in diff && data.overview) {
        //truncate to reduce proposalMsg size
        diff.overview = PLACEHOLDER_OVERVIEW;
      }

      const diffEntries = Object.entries(
        diff
      ) as ObjectEntries<FlatProfileWithSettings>;
      if (diffEntries.length <= 0) {
        throw new Error("no changes detected");
      }

      //TODO: add logo upload

      const accountContract = new Account(wallet);
      const { sdg, name, image, logo, country, ...profilePayload } = data;
      const profileUpdateMsg = accountContract.createEmbeddedUpdateProfileMsg(
        //don't pass just diff here, old value should be included for null will be set if it's not present in payload
        cleanObject({
          ...profilePayload,
          country_of_origin: country.name,
        })
      );

      const settingsUpdateMsg = accountContract.createEmbeddedUpdateSettingsMsg(
        cleanObject({
          id: profilePayload.id,
          name,
          image: bannerUrl,
          logo: logoUrl,
          categories: { sdgs: [sdg], general: [] },
        })
      );

      const profileUpdateMeta: EndowmentProfileUpdateMeta = {
        type: "acc_profile",
        data: genDiffMeta(diffEntries, initial),
      };

      const adminContract = new CW3(wallet, cw3);
      const proposalMsg = adminContract.createProposalMsg(
        title,
        description,
        [profileUpdateMsg, settingsUpdateMsg],
        JSON.stringify(profileUpdateMeta)
      );

      await sendTx({
        msgs: [proposalMsg],
        ...propMeta,
        successMeta: propMeta.willExecute
          ? {
              message: "Profile has been updated!",
              link: {
                url: `${appRoutes.profile}/${endowmentId}`,
                description: "checkout new changes",
              },
            }
          : propMeta.successMeta,
        tagPayloads: getTagPayloads(propMeta.willExecute && "acc_profile"),
      });
    } catch (err) {
      handleError(err);
    }
  };

  return {
    editProfile: handleSubmit(editProfile),
    isSubmitDisabled: isSubmitting || !isDirty,
    id: endowmentId,
  };
}

async function getImgUrls(imgs: ImgLink[]): Promise<string[]> {
  const files = imgs.flatMap((img) => (img.file ? [img.file] : []));
  const cid = await uploadToIpfs(files);
  return imgs.map((img) =>
    img.file && cid ? genPublicUrl(cid, img.file.name) : img.publicUrl
  );
}
