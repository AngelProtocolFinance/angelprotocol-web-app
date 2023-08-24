import MaturityDate from "./MaturityDate";

const ALLOWLIST_CONTAINER_ID = "maturity-allowlist-container";
export default function Maturity() {
  return (
    <div className="@container grid content-start gap-8">
      <h2 className="text-[2rem]">Maturity</h2>
      <MaturityDate allowlistContainerID={ALLOWLIST_CONTAINER_ID} />
      <div id={ALLOWLIST_CONTAINER_ID} className="contents" />
    </div>
  );
}
