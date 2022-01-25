import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "services/aws/endowments/endowments";
import { Profile } from "services/aws/endowments/types";

export default function useUpdateEndowmentProfile() {
  const [updateProfile] = useUpdateProfileMutation();

  const readFileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);

      reader.onload = () => {
        return resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });

  const saveEndowmentProfile = async (
    metaData: Partial<Profile>,
    endowment_address: string
  ) => {
    const body = {
      ...metaData,
    } as Partial<Profile>;

    delete body.endowment_address;
    if (!body.charity_image) delete body.charity_image;
    let result: any;

    try {
      const response: any = await updateProfile({ body, endowment_address });
      result = response.data ? response : response.error;
    } catch (e) {
      toast.error("Saving data was failed. Please try again.");
    }

    if (result.status === 500) {
      toast.error("Saving data was failed. Please try again.");
    } else if (result.error) {
      toast.error(result.error.data.message);
    } else {
      if (
        result.status === 400 ||
        result.status === 401 ||
        result.status === 403 ||
        result.status === 415
      ) {
        toast.error(result.data.message);
      } else {
        toast.success("Endowment profile updated ✅");
        return true;
      }
    }
    return false;
  };
  return { saveEndowmentProfile, readFileToBase64 };
}
