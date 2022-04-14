import { Link } from "react-router-dom";
import { app, site } from "constants/routes";

const LINK_STYLE =
  "text-white-grey hover:text-white-grey/75 text-sm px-1 lg:text-base font-heading uppercase font-semibold lg:px-2";

export default function AppMenu() {
  return (
    <ul className="flex lg:items-center">
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37"
          className={LINK_STYLE}
        >
          SUPPORT
        </a>
      </li>
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37"
          className={LINK_STYLE}
        >
          FEEDBACK
        </a>
      </li>
      <li>
        <Link to={`${site.app}/${app.register}`} className={LINK_STYLE}>
          REGISTER
        </Link>
      </li>
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://drive.google.com/file/d/1OMF45tdJW_IdiNxjL2juHwPhtUWbCtzE/view?usp=drive_web"
          className={LINK_STYLE}
        >
          PRIVACY POLICY
        </a>
      </li>
    </ul>
  );
}
