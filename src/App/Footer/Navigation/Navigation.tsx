import Links from "./Links";
import Newsletter from "./Newsletter";

export default function Navigation() {
  return (
    <section className="flex items-center justify-center w-full pt-8 pb-16 border-b border-gray-l2 dark:border-gray-l3">
      <div className="padded-container flex justify-between items-start w-full">
        <Links />
        <Newsletter />
      </div>
    </section>
  );
}
