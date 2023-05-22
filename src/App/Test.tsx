import { useContractQuery } from "services/juno";

const multisig = "0xeaa1eb54d9ea9f1241d4918a261cad75d4e61267";
export default function Test() {
  const result = useContractQuery("index-fund.fund", { id: 1 });
  console.log({ result });
  return <></>;
}
