import Copier from "components/copier";
import type { Contact } from "types/mongodb/nonprofits";

interface Props {
  contacts: Contact[];
}

export function Contacts(props: Props) {
  return (
    <div className="flex max-w-40 max-h-40 overflow-y-auto scroller flex-wrap gap-2">
      {props.contacts
        .filter((x) => x.email)
        .map((x, index) => (
          <div key={index} className="grid">
            <span className="whitespace-normal">
              {x.name || x.email || x.phone}
            </span>

            <span className="text-2xs whitespace-normal">{x.role}</span>

            {x.email && (
              <Copier
                size={12}
                text={x.email}
                classes={{
                  container:
                    "text-xs text-blue-d2 text-wrap break-all text-left",
                  icon: "inline mr-1",
                }}
              >
                {x.email}
              </Copier>
            )}

            {x.phone && (
              <span className="text-2xs text-gray-d1 whitespace-normal">
                {x.phone}
              </span>
            )}
          </div>
        ))}
    </div>
  );
}
