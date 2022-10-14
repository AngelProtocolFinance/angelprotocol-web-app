import Navigation from "./Navigation";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="hidden sm:flex flex-col items-center px-2.5 text-white bg-blue dark:bg-blue-d4">
      <Navigation />
      <section className="flex flex-col items-center gap-2 w-full py-4 px-40">
        <Socials />
        <p className="font-body font-normal text-white text-center text-2xs uppercase">
          Copyright {new Date().getFullYear()} Angel Protocol. All rights
          reserved
        </p>
      </section>
    </footer>
  );
}
