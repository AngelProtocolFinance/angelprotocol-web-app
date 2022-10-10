import Navigation from "./Navigation";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="padded-container flex flex-col items-center justify-self-stretch">
      <Navigation />
      <div className="flex flex-col items-center gap-2 justify-self-stretch">
        <Socials />
        <p className="font-body font-semibold text-white text-center text-xs uppercase">
          Copyright {new Date().getFullYear()} Angel Protocol. All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
