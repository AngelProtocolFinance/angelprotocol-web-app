import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

type Props = {
  title: string;
  description?: string;
  image?: string;
  website?: string;
};

export default function Head({ title, description, website, image }: Props) {
  const location = useLocation();

  return (
    /** re-render this component on every path changes.
     *  since a `<HelmetB/>` inside some nested path `a/b` overrides `<HelmetA/>` in `/a`
     *  going back up to `a` should re-evaluate `<HelmetA/>` and this time, `<HelmetB/>`
     *  woudn't override since it's no longer rendered
     *
     *  This is also the reason why tags on `index.html` should be moved to a component
     *  at the root `/` so can be programmatically re-evaluated, thus removing nested overrides
     */
    <Helmet key={location.pathname}>
      <title>{title}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}

      {/** facebook */}
      <meta property="og:type" content="website" />
      {website && <meta property="og:url" content={website} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      {/** twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      {website && <meta property="twitter:url" content={website} />}
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
}
