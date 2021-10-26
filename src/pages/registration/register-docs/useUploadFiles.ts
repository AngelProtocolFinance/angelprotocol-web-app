import { useUpdateCharityDocsMutation } from "api/registerAPIs";
import { toast } from "react-toastify";

export const useUploadFiles = () => {
  const [uploadCharityDoc] = useUpdateCharityDocsMutation();

  const uploadDocs = async (file: File, uuid: any, docType: number) => {
    const docTypes = [
      "ProofOfIdentity",
      "ProotOfEmployment",
      "EndowmentAgreement",
    ];
    const postData = {
      PK: uuid,
      body: {
        [docTypes[docType]]: await readFileToBase64(file),
      },
    };
    console.log("post data => ", postData);
    const response: any = await uploadCharityDoc(postData);
    const result = response.data ? response : response.error;
    if (result.error) {
      toast.error(result.error.data.message);
    } else {
      if (result.status === 500) {
        toast.error("Uploading file was failed. Please try again.");
      } else if (result.status === 400 || result.status === 401) {
        toast.error(result.data.message);
      } else {
        toast.success("Your doc was uploaded successfully.");
        return true;
      }
    }
    return false;
  };

  const readFileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);

      reader.onload = () => {
        return resolve(reader.result);
      };

      reader.onerror = (error) => reject(error);
    });

  return { uploadDocs, readFileToBase64 };
};
