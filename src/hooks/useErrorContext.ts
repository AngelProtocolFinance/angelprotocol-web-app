import { useContext } from "react";
import ErrorContext from "contexts/ErrorContext";

export default function useErrorContext() {
  return useContext(ErrorContext);
}
