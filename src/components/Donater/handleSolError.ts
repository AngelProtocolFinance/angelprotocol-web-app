import { ErrorHandler } from "./types";

export default function handleSolError(error: any, handler: ErrorHandler) {
  console.error(error);

  switch (error?.code) {
    case 4001:
      handler("Transaction cancelled");
      break;
    case -32603:
      handler("Error connecting to server. Please try again later.");
      break;
    default:
      handler("Unknown error occured");
  }
  return;
}
