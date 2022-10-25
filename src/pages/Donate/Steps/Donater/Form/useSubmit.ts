import { FormValues } from "components/KYC/types";

export default function useSubmit() {
  function submit(data: FormValues) {
    console.log(data);
  }
  return submit;
}
