import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  title?: string;
  description?: string;
  name?: string;
  image?: string;
  url?: string;
};

export default function Seo({
  title = "Support an impact organization - Angel Protocol",
  description = "Angel Protocol provides impact stakeholders with the tools to fundraise, coordinate, and invest capital.",
  name = "Angel Protocol",
  image = "https://charity-profile-images.s3.amazonaws.com/logo/angelprotocol-wings-bl.png",
  url = "https://app.angelprotocol.io/",
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
