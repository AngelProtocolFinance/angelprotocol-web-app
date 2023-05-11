import { NewFund } from "types/contracts";
import { humanize } from "helpers";
import { fromBlockTime } from "helpers/admin";
import Header from "./common/Header";
import KeyValue from "./common/KeyValue";
import MemberItem from "./common/MemberItem";
import PreviewContainer from "./common/PreviewContainer";

export default function Fund(props: NewFund) {
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
          {props.rotatingFund ? "yes" : "no"}
        </span>
      </KeyValue>

      <KeyValue _key="max split to liquid">
        <span>{props.splitToLiquid} %</span>
      </KeyValue>

      <KeyValue _key="expiry">
        <span className="text-sm">
          {getExpiry(props.expiryTime, props.expiryHeight)}
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

function getExpiry(
  time: NewFund["expiryTime"],
  height: NewFund["expiryHeight"]
) {
  let expiry: string = "no expiry";

  if (time !== "0" && height !== "0") {
    expiry = `at block ${humanize(height, 0)} or ${fromBlockTime(
      time
    ).toLocaleString()}`;
  } else if (time !== "0") {
    expiry = fromBlockTime(time).toLocaleString();
  } else if (height !== "0") {
    expiry = `at block ${humanize(height, 0)}`;
  }
  return expiry;
}
