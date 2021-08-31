import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess, onFailed }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (props) => {
    if (props.isPagination)
      url += "?perPage=" + props.perPage + "&page=" + props.page;
    try {
      setErrors(null);
      const response = await axios[props.method || method](props.url || url, {
        headers: { "Access-Control-Allow-Origin": "*" },
        ...(props.body || body),
        ...props,
      });
      if (onSuccess) onSuccess(response);
      else return response;
    } catch (err) {
      console.log(err);
      onFailed(err);
    }
  };
  return { doRequest, errors };
};

export default useRequest;
