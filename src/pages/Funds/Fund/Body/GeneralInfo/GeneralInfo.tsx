import { RichText } from "components/RichText";
import { useFundContext } from "../../FundContext";
import Container from "../common/Container";
import DetailsColumn from "./DetailsColumn";

export default function GeneralInfo({ className = "" }) {
  const fund = useFundContext();

  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
    >
      <div className="flex flex-col gap-8 w-full h-full">
        <Container title="Overview">
          <RichText
            content={{ value: fund.description ?? "" }}
            classes={{ field: "w-full h-full px-8 py-10" }}
            readOnly
          />
        </Container>
      </div>
      <DetailsColumn className="self-start lg:sticky lg:top-[5.5rem]" />
    </div>
  );
}
