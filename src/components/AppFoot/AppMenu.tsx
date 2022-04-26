import { PRIVACY_POLICY } from "constants/urls";

export default function AppMenu() {
  const linkStyles = {
    className:
      "text-white-grey hover:text-white-grey/75 text-sm px-1 lg:text-base font-heading uppercase font-semibold lg:px-2",
  };

  return (
    <ul className="flex lg:items-center">
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37"
          className={linkStyles.className}
        >
          SUPPORT
        </a>
      </li>
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37"
          className={linkStyles.className}
        >
          FEEDBACK
        </a>
      </li>
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/contact"
          className={linkStyles.className}
        >
          REGISTER
        </a>
      </li>
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href={PRIVACY_POLICY}
          className={linkStyles.className}
        >
          PRIVACY POLICY
        </a>
      </li>
    </ul>
  );
}
