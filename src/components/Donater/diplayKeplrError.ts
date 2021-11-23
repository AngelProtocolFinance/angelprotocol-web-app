import { TimeoutError } from "@cosmjs/stargate";
import { Opener } from "components/Nodal/types";
import ErrPop, { Props as ErrProps } from "./ErrPop";

export default function displayKeplrError(error: any, prompter: Opener) {
  console.error(error);
  if (error instanceof TimeoutError) {
    prompter<ErrProps>(ErrPop, {
      desc: error.message,
    });
  } else {
    prompter<ErrProps>(ErrPop, {
      desc: "Something went wrong",
    });
  }
}
