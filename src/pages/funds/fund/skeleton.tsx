import ContentLoader from "components/content-loader";

export default function Skeleton() {
  return (
    <section className="pb-8 grid grid-cols-[3fr_2fr] gap-4 xl:container xl:mx-auto px-5 pt-24">
      <ContentLoader className="h-52 sm:h-72 rounded-lg shadow-2xl shadow-black/10" />
      <ContentLoader className="h-52 sm:h-72 rounded-lg shadow-2xl shadow-black/10" />
      <ContentLoader className="h-52 sm:h-72 rounded-lg shadow-2xl shadow-black/10" />
      <ContentLoader className="h-52 sm:h-72 rounded-lg shadow-2xl shadow-black/10" />
    </section>
  );
}
