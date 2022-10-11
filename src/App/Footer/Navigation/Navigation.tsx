import Links from "./Links";
import Newsletter from "./Newsletter";

export default function Navigation() {
  return (
    <section className="flex justify-between justify-self-stretch items-start px-40 pt-8 pb-16 border-b border-gray-l2">
      <Links />
      <Newsletter />
    </section>
  );
}
