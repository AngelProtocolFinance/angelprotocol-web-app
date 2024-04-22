import { APP_NAME, BASE_URL, SEO_IMAGE } from "constants/env";
import { Helmet } from "react-helmet";

type Props = {
  title?: string;
  description?: string;
  name?: string;
  image?: string;
  url?: string;
};

export default function Seo({
  title = `Support an impact organization - ${APP_NAME}`,
  description = `${APP_NAME} provides impact stakeholders with the tools to fundraise, coordinate, and invest capital.`,
  name = APP_NAME,
  image = SEO_IMAGE,
  url = BASE_URL,
}: Props) {
  return (
    <Helmet>
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
