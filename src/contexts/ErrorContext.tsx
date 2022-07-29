import { createContext } from "react";

type State = {
  handleError: (error: Error) => void;
};

const ErrorContext = createContext<State>({ handleError: (_: Error) => {} });

export default ErrorContext;
