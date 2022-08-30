import { AllianceEditMeta } from "pages/Admin/types";
import { AllianceMember } from "types/contracts";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";
import Header from "./common/Header";
import PreviewContainer from "./common/PreviewContainer";

export default function AllianceUpdate(props: AllianceEditMeta["data"]) {
  return (
    <PreviewContainer>
      {props.toAddMembers.length > 0 && (
        <>
          <Header>members to add</Header>
          {props.toAddMembers.map((member) => (
            <Member key={member.wallet} {...member} />
          ))}
        </>
      )}

      {props.toRemoveMembers.length > 0 && (
        <>
          <Header>members to remove</Header>
          {props.toRemoveMembers.map((member) => (
            <Member key={member.wallet} {...member} />
          ))}
        </>
      )}
      {props.editedMembers.length > 0 && (
        <>
          <Header>edited members</Header>
          {props.editedMembers.map((member) => (
            <Member key={member.wallet} {...member} />
          ))}
        </>
      )}
    </PreviewContainer>
  );
}

function Member(props: AllianceMember) {
  return (
    <div className="flex items-center gap-2 p-0.5">
      <img
        src={props.logo || defaultIcon}
        className="w-6 h-6 object-contain"
        alt=""
      />
      <p className="font-bold text-xs mr-1">{props.name}</p>
      <span className="font-mono text-xs">{props.wallet}</span>
    </div>
  );
}
