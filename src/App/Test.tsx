import { query } from "services/contract/queryContract/query";

export default function Test() {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          const result = await query("cw3.votes", {
            cw3: "0x1edC050B5d84cbB0cA0b56356f3F7307efcd50Fb",
            proposal_id: 2,
          });
          console.log(result);
        }}
      >
        query
      </button>
    </div>
  );
}
