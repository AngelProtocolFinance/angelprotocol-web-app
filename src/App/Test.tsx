import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("accounts.state", { id: 1 });
          console.log(result);
        }}
      >
        query
      </button>
    </div>
  );
}

query("registrar.config", {});
