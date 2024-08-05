import LoaderRing from "components/LoaderRing";

export default function OAuthRedirector() {
  /**
   * 1. oauth provider redirects back here, effectively reloading the the whole app.
   * 2. Amplify is reconfigured
   * 3. Hub oauth state is reinitialized
   * 4. custom state event fires with router.navigate()
   *
   */
  return (
    <LoaderRing
      thickness={10}
      classes={{ container: "w-32 place-self-center" }}
    />
  );
}
