import logo from "assets/images/angelprotocol-beta-horiz-wht.svg";
import { GENERIC_ERROR } from "hooks/useErrorHandler/constants";

export default function Fallback() {
  return (
    <div className="place-self-center grid place-items-center font-work">
      <img
        src={logo}
        alt="website logo"
        className="w-48 mb-8 invert dark:invert-0"
      />
      <h3 className="text-lg font-bold mb-2">Ooops :(</h3>
      <p className="mb-8 max-w-md text-center">{GENERIC_ERROR}</p>
      <button
        className="btn-outline text-sm"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
}
