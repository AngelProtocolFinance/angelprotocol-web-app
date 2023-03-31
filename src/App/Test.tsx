import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("accounts.endowment", { id: 1 });
          console.log(result);
        }}
      >
        query
      </button>
    </div>
  );
}
