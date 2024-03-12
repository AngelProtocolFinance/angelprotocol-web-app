import { useParams } from "react-router-dom";
import { usePageQuery } from "services/wordpress";

export default function Page() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { data: _page, isError, isLoading } = usePageQuery(slug);

  if (isLoading) return <p>Loading... TODO: create skeleton for this</p>;
  if (!_page || isError) return <p>error</p>;

  return (
    <div className="padded-container">
      <div className="grid justify-center items-center text-center py-5">
        <h1 className="font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
          {_page.title.rendered}
        </h1>
      </div>
      <span
        className="grid justify-center items-center text-center"
        // biome-ignore lint: trusted html
        dangerouslySetInnerHTML={{ __html: _page.content.rendered }}
      ></span>
    </div>
  );
}
