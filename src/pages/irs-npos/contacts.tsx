import { Copier } from "components/copier";
import type { Contact } from "types/mongodb/nonprofits";

interface Props {
  contacts: Contact[];
}

export function Contacts(props: Props) {
  return (
    <div className="grid gap-2 max-h-40 overflow-y-auto">
      {props.contacts
        .filter((x) => x.email || x.phone)
        .map((x, index) => (
          <div key={index} className="grid gap-1">
            <span className="">{x.name || "--"}</span>
            <span className="text-xs ">{x.role}</span>

            {x.email && (
              <Copier
                size={12}
                text={x.email}
                classes={{
                  container: "text-xs text-blue-d2 text-left",
                  icon: "inline mr-1",
                }}
              >
                {x.email}
              </Copier>
            )}

            {x.phone && (
              <span className="text-2xs text-gray-d1">{x.phone}</span>
            )}
          </div>
        ))}
    </div>
  );
}
