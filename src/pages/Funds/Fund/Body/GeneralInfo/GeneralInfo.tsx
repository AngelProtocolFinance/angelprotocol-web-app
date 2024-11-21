import Image from "components/Image";
import { RichText } from "components/RichText";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useFundContext } from "../../FundContext";
import Container from "../common/Container";
import Balances from "./DetailsColumn/Balances";

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
      <div className="flex flex-col gap-6 w-full lg:w-96">
        <Balances />
        <div className={`self-start lg:sticky lg:top-[5.5rem] w-full lg:w-96`}>
          <div className="flex flex-col gap-8 w-full p-8 border border-gray-l4 rounded" />
        </div>
        {fund.members.map((m) => (
          <Link
            to={`${appRoutes.marketplace}/${m.id}`}
            className="border border-gray-l4 rounded-lg hover:border-blue-d1"
          >
            <Image src={m.banner} className="aspect-[4/1] rounded-t-lg" />
            <div className="p-4 border-t border-gray-l4">
              <p className="font-bold font-heading text-navy-l1">{m.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
