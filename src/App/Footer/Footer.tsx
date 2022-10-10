import Navigation from "./Navigation";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="grid grid-rows-2 items-center px-2.5 text-white">
      <Navigation />
      <section className="flex flex-col items-center gap-2 justify-self-stretch">
        <Socials />
        <p className="font-body font-normal text-white text-center text-2xs uppercase">
          Copyright {new Date().getFullYear()} Angel Protocol. All rights
          reserved
        </p>
      </section>
    </footer>
  );
}
