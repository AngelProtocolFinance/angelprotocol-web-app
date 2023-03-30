import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("index-fund.funds", {});
          console.log(result);
        }}
      >
        query
      </button>
    </div>
  );
}
