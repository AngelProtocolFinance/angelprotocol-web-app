import { useState } from "react";
import { Props } from "./types";
import ChariotForm from "./ChariotForm";
import ChariotLogo from "./ChariotLogo";
import BackBtn from "../../BackBtn";

type Method = "chariot" | "manual" | undefined;

export default function ChariotConnect(props: Props) {
  const [action, setAction] = useState<Method>();

  switch (action) {
    case "chariot":
      return (
        <div className="grid gap-4">
          <BackBtn type="button" onClick={() => setAction(undefined)} />
          <ChariotForm {...props} />
        </div>
      );
    case "manual":
      return (
        <div className="grid gap-4">
          <BackBtn type="button" onClick={() => setAction(undefined)} />
          <>Manual</>
        </div>
      );
    default:
      return (
        <div className="grid gap-6">
          <h3 className="text-xl mt-6">Instant DAF donation</h3>
          <p>
            We use Chariot to verify your account info and automatically
            initiate a grant from your DAF, or you can get instructions for
            making the donation manually.
          </p>
          <button
            className="btn-blue btn-donate gap-2"
            type="button"
            onClick={() => setAction("chariot")}
          >
            Donate with <ChariotLogo />
          </button>
          <button
            className="font-semibold text-blue hover:text-blue-l1 active:text-blue-d1"
            onClick={() => setAction("manual")}
          >
            Get instructions for a manual DAF donation
          </button>
        </div>
      );
  }
}
