import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("cw3.proposals", {
            cw3: "0xC0c1d1659f88c0D0737069354b93874cBebfdfD7",
          });
          console.log(result);
        }}
      >
        query
      </button>
    </div>
  );
}
