import { RegistrationData } from "./types";

/**
 * any page
 * /contact
 * /docs
 * /profile
 * /wallet
 *
 * can access registration state and need to decide if state is
 * complete for that specific page
 */

type RegKeys = keyof RegistrationData;
const ID_KEY: RegKeys = "id";
export default function Guard(props: RegistrationData) {
  if (ID_KEY in props) {
    props.id;
  }
}

function getContextValue() {}
