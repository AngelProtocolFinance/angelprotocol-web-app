import { ErrorStatus } from "components/Status";
import { isEmpty } from "helpers";
import { useAdminContext } from "../../../Context";
import Member from "./Member";

export default function Members() {
  const { members } = useAdminContext();
  return (
    <div className="grid content-start border border-prim rounded p-4 @lg:p-8">
      <h4 className="text-2xl font-body mb-8">Members</h4>
      <div className="p-3 rounded border border-prim bg-orange-l6 dark:bg-blue-d7 @container">
        {isEmpty(members) ? (
          <ErrorStatus classes="text-sm">No members found</ErrorStatus>
        ) : (
          <div className="flex flex-col gap-2">
            {members.map((m) => (
              <Member key={m} address={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
