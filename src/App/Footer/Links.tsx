import { PRIVACY_POLICY } from "constants/urls";

export default function Links(props: { classes?: string }) {
  return (
    <div
      className={`${
        props.classes || ""
      } flex items-center divide-x divide-zinc-50/20`}
    >
      <a
        className={linkStyle}
        rel="noreferrer"
        target="_blank"
        href="https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37"
      >
        support
      </a>
      <a
        className={linkStyle}
        rel="noreferrer"
        target="_blank"
        href="https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37"
      >
        feedback
      </a>
      <a
        className={linkStyle}
        rel="noreferrer"
        target="_blank"
        href={PRIVACY_POLICY}
      >
        privacy policy
      </a>
    </div>
  );
}

const linkStyle =
  "text-white hover:text-sky-300 text-sm px-3 lg:text-base font-heading uppercase font-semibold lg:px-2";
