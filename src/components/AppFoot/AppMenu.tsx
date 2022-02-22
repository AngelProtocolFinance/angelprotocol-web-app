import { app, site } from "constants/routes";
import { Link } from "react-router-dom";

export default function AppMenu() {
  return (
    <ul className="flex lg:items-center">
      <SupportLinkItem />
      <FeedbackLinkItem />
      <RegisterLinkItem />
    </ul>
  );
}

const LINK_STYLE =
  "text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2";

function SupportLinkItem() {
  return (
    <li>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37"
        className={LINK_STYLE}
      >
        SUPPORT
      </a>
    </li>
  );
}

function FeedbackLinkItem() {
  return (
    <li>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37"
        className={LINK_STYLE}
      >
        FEEDBACK
      </a>
    </li>
  );
}

function RegisterLinkItem() {
  return (
    <li>
      <Link to={`${site.app}/${app.register}`} className={LINK_STYLE}>
        REGISTER
      </Link>
    </li>
  );
}
