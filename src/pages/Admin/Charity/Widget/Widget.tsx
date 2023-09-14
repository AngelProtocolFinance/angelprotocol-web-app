import { useAdminContext } from "pages/Admin/Context";
import Copier from "components/Copier";
import { PAYMENT_WORDS } from "constants/common";
import { adminRoutes } from "constants/routes";
import Seo from "../Seo";
import Configurer from "./Configurer";
import Preview from "./Preview";
import Snippet from "./Snippet";

const TITLE_STYLE = "text-lg sm:text-2xl";

export default function Widget() {
  //widget configurer is used in admin
  const { id } = useAdminContext();
  return (
    <div className="padded-container grid grid-rows-[auto_1fr] gap-10 w-full h-full py-5">
      <Seo
        title={`Widget Configuration for Endowment ${id}`}
        url={`${adminRoutes.other_settings}/${id}`}
      />
      <section className="flex flex-col gap-3 items-center text-center xl:items-start xl:text-left w-full">
        <h1 className={TITLE_STYLE}>
          Accept {PAYMENT_WORDS.noun.plural} from your website today!
        </h1>
        <div className="font-body text-sm sm:text-base">
          <p>
            Just configure your widget below, copy & paste the code on your
            website and you're ready to go!
          </p>
          <p>
            Your {PAYMENT_WORDS.payer}s will be able to connect their crypto
            wallets and use them to {PAYMENT_WORDS.verb} directly.
          </p>
        </div>
      </section>
      <div className="grid xl:grid-cols-2 max-xl:justify-center gap-10">
        <section className="xl:order-2 flex flex-col gap-3 items-center xl:items-start justify-self-stretch">
          <h2 className={TITLE_STYLE}>Configure your widget</h2>
          <Configurer />
          <Snippet />
        </section>

        <Preview />
      </div>
    </div>
  );
}
