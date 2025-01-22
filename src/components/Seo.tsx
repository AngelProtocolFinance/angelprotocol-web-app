import { APP_NAME, BASE_URL, IS_TEST, SEO_IMAGE } from "constants/env";
import { Helmet } from "react-helmet";

interface Script {
  id?: string;
  src: string;
  /** no need to set if javascript @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attribute_is_not_set_default_an_empty_string_or_a_javascript_mime_type */
  type?: string;
  "data-category"?: string;
}

type Props = {
  title?: string;
  description?: string;
  name?: string;
  image?: string;
  url?: string;
  scripts?: Script[];
};

const defaultScripts: Script[] = [
  { src: "/scripts/cookie-consent-2.js" },
  //functional cookies
  { src: "/scripts/intercom.js", "data-category": "functionality" },
  //analytics
  { src: "/scripts/gtm-init.js", "data-category": "analytics" },

  //tracking
  {
    src: "/scripts/twitter-conversion-tracking.js",
    "data-category": "tracking",
  },
  {
    src: "/scripts/meta-pixel.js",
    "data-category": "tracking",
  },
  { src: "/scripts/linkedin-tracking.js", "data-category": "tracking" },
  { src: "/scripts/hotjar-tracking.js", "data-category": "tracking" },
  {
    id: "hs-script-loader",
    src: "//js-eu1.hs-scripts.com/24900163.js",
    "data-category": "tracking",
  },
];

export default function Seo({
  title = `Support an impact organization - ${APP_NAME}`,
  description = `${APP_NAME} provides impact stakeholders with the tools to fundraise, coordinate, and invest capital.`,
  name = APP_NAME,
  image = SEO_IMAGE,
  url = BASE_URL,
  scripts = defaultScripts,
}: Props) {
  return (
    <Helmet script={IS_TEST ? [] : scripts}>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta property="title" content={title} />
      <meta property="description" content={description} />

      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={name} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
