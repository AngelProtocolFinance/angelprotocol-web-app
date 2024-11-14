import type { Endow } from "@better-giving/endowment";
import { unsdgs } from "constants/unsdgs";
import { Fingerprint } from "lucide-react";
import type { PropsWithChildren } from "react";
import EndowDesignationTag from "./EndowDesignationTag";

export default function Tags(props: Endow) {
  return (
    <div className="flex flex-col items-start gap-3">
      {<EndowDesignationTag {...props} />}
      {props.kyc_donors_only && (
        <Tag>
          <Fingerprint size={20} /> Donor Verification required
        </Tag>
      )}
      {props.sdgs.map((unsdg_num) => (
        <Tag key={unsdg_num}>
          SDG #{unsdg_num} : {unsdgs[unsdg_num].title}
        </Tag>
      ))}
    </div>
  );
}

const Tag = (props: PropsWithChildren<{}>) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-blue-l4 rounded-full font-semibold text-sm dark:bg-blue-d4">
    {props.children}
  </div>
);
