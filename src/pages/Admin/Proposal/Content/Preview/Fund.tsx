import { FundPreview } from "pages/Admin/types";
import { humanize } from "helpers";
import Header from "./common/Header";
import KeyValue from "./common/KeyValue";
import MemberItem from "./common/MemberItem";
import PreviewContainer from "./common/PreviewContainer";

export default function Fund(props: FundPreview) {
  return (
    <PreviewContainer>
      <KeyValue _key="fund name">
        <span>{props.name}</span>
      </KeyValue>
      <KeyValue _key="description">
        <span>{props.description}</span>
      </KeyValue>
      <KeyValue _key="rotating fund?">
        <span
          className={`${
            true ? "text-blue" : "text-red-l1"
          } font-bold uppercase`}
        >
          {props.rotating_fund ? "yes" : "no"}
        </span>
      </KeyValue>
      {props.split_to_liquid && (
        <KeyValue _key="max split to liquid">
          <span>{(+props.split_to_liquid * 100).toFixed(2)} %</span>
        </KeyValue>
      )}
      <KeyValue _key="expiry">
        <span className="text-sm">
          {getExpiry(props.expiry_time, props.expiry_height)}
        </span>
      </KeyValue>
      {props.members.length > 0 && (
        <>
          <Header>fund members</Header>
          {props.members.map((member) => (
            <MemberItem iconType="Safe" member={member} />
          ))}
        </>
      )}
    </PreviewContainer>
  );
}

const secToMillisFactor = 1000;
function getExpiry(
  time: FundPreview["expiry_time"],
  height: FundPreview["expiry_height"]
) {
  let expiry: string = "no expiry";

  if (time && height) {
    expiry = `at block ${humanize(height, 0)} or ${new Date(
      time * secToMillisFactor
    ).toLocaleString()}`;
  } else if (time) {
    expiry = new Date(time * secToMillisFactor).toLocaleString();
  } else if (height) {
    expiry = `at block ${humanize(height, 0)}`;
  }
  return expiry;
}
