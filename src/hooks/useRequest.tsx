import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess, onFailed }: any) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (props: any) => {
    if (props.isPagination)
      url += "?perPage=" + props.perPage + "&page=" + props.page;
    try {
      const response: any = await fetch(`${props.url || url}`, {
        method: props.method || method,
        body: JSON.stringify(props.body || body),
      });

      onSuccess(await response.json());
    } catch (error: any) {
      setErrors(error);
      onFailed(error);
    }
  };
  return { doRequest, errors };
};

export default useRequest;
