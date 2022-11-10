import { RegistrationData, RegistrationState } from "./types";

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
export default function Guard(props: RegistrationState) {
  if (ID_KEY in props) {
    props.id;
  }
}

const state = {} as RegistrationState;
function getContextValue<T extends RegistrationState["step"]>(
  step: T
): {
  step: RegistrationState extends { step: infer S; data: any } ? S : never;
  data: RegistrationState extends { step: T; data: infer D } ? D : never;
} {
  return { step: 1, data: {} as any };
}

const x = getContextValue(2);
