import { AxiosResponse } from "axios";
import { FormError } from "@types-slice/transaction";

export default function processEstimateError(err: unknown): FormError {
  const _err = err as any;
  if ("response" in _err) {
    let response: AxiosResponse<EstimateErrorData> = _err.response;
    return {
      title: "transaction simulation failed",
      details: response.data.message,
    };
  } else {
    return "transaction simulation failed";
  }
}
type EstimateErrorData = {
  message: string;
  code: number;
};
