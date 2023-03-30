import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("cw20.balance", {
            cw20: "0xaBCe32FBA4C591E8Ea5A5f711F7112dC08BCee74",
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
