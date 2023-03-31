import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("gift-card.balance", {
            addr: "0xce551C1125BfCdAb88048854522D0B220f41A6Ff",
          });
          console.log(result);
        }}
      >
        query
      </button>
    </div>
  );
}
