import { useParams } from "react-router-dom";
import { usePageQuery } from "services/wordpress";

export default function WordPressPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = usePageQuery(slug, { skip: !slug });

  if (isLoading) return <p>Loading..</p>;
  if (!data || isError) return <p>error</p>;

  return (
    <div
      //biome-ignore lint: trusted html
      dangerouslySetInnerHTML={{ __html: data.content.rendered }}
      className="wp-post padded-container max-w-4xl mx-auto pb-4"
    />
  );
}
