import Image from "components/Image";
import { RichText } from "components/RichText";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useFundContext } from "../../FundContext";
import Container from "../common/Container";
import { Target } from "../common/target";
import Balances from "./Balances";

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
        <div className={`self-start lg:sticky lg:top-[5.5rem] w-full lg:w-96`}>
          <div className="grid w-full p-8 border border-gray-l4 rounded">
            {fund.target ? (
              <Target progress={fund.donation_total_usd} target={fund.target} />
            ) : (
              <Balances amount={fund.donation_total_usd} />
            )}
            <p className="mb-2 text-sm font-bold font-heading mt-4 text-navy-l1">
              Proceeds goes to
            </p>
            <div className="grid gap-y-4">
              {fund.members.map((m) => (
                <div className="flex items-center gap-x-2">
                  <Image
                    src={m.logo}
                    className="aspect-square rounded-full border-2 border-blue-d1"
                    width={40}
                  />
                  <Link
                    to={`${appRoutes.marketplace}/${m.id}`}
                    className="font-bold font-heading text-navy-l1 hover:text-blue-d1"
                  >
                    {m.name}
                  </Link>
                </div>
              ))}
            </div>
            <Link
              to={appRoutes.donate_fund + `/${fund.id}`}
              className="w-full btn-blue px-6 py-3 mt-4 text-sm"
            >
              Donate now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
