import Links from "./Links";
import Newsletter from "./Newsletter";

export default function Navigation() {
  return (
    <section className="flex justify-between items-start w-full px-40 pt-8 pb-16 border-b border-gray-l2 dark:border-gray-d3">
      <Links />
      <Newsletter />
    </section>
  );
}
