import { FundDetails } from "contracts/types";
import toCurrency from "helpers/toCurrency";
import KeyValue from "./KeyValue";

export default function CreateFund(props: Omit<FundDetails, "id">) {
  return (
    <div className="bg-white/10 shadow-inner p-2 rounded-md mb-2 mt-1">
      <KeyValue _key="fund name">
        <span>{props.name}</span>
      </KeyValue>
      <KeyValue _key="description">
        <span>{props.description}</span>
      </KeyValue>
      <KeyValue _key="rotating fund?">
        <span
          className={`${
            true ? "text-angel-blue" : "text-red-400"
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
        <span className="font-mono text-sm">
          {getExpiry(props.expiry_time, props.expiry_height)}
        </span>
      </KeyValue>
    </div>
  );
}

const secToMillisFactor = 1000;
function getExpiry(
  time: FundDetails["expiry_time"],
  height: FundDetails["expiry_height"]
) {
  let expiry: string = "no expiry";

  if (time && height) {
    expiry = `at block ${toCurrency(height, 0)} or ${new Date(
      time * secToMillisFactor
    ).toLocaleString()}`;
  } else if (time) {
    expiry = new Date(time * secToMillisFactor).toLocaleString();
  } else if (height) {
    expiry = `at block ${toCurrency(height, 0)}`;
  }
  return expiry;
}
