import Links from "./Links";
import Newsletter from "./Newsletter";

export default function Navigation() {
  return (
    <section className="flex items-center justify-center w-full pt-8 pb-16 border-b border-gray-l2 dark:border-gray-l3">
      <div className="padded-container flex flex-col items-center justify-between w-full lg:flex-row lg:items-start">
        <Links />
        <Newsletter />
      </div>
    </section>
  );
}
