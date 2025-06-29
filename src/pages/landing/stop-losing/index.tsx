import Hero from "./hero";

export default function Page() {
  return (
    <main className="w-full grid content-start pb-16 @container">
      <div className="bg-linear-to-br from-50% from-transparent to-peach/50">
        <Hero className="xl:container xl:mx-auto px-10 bg-transparent" />
      </div>
    </main>
  );
}
