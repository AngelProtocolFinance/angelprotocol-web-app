import { NativeCheckField as CheckField } from "components/form";
import { useFieldArray, useForm } from "react-hook-form";
import type { AuthenticatedUser } from "types/auth";
import type { DetailedUserEndow } from "types/aws";

interface Props {
  user: AuthenticatedUser;
  classes?: string;
}

type FV = { items: DetailedUserEndow[] };

const userEndow1: DetailedUserEndow = {
  endowID: 1,
  email: "mail@mail.com",
  name: "Better Giving",
  alertPref: {
    banking: true,
    donation: false,
  },
};
const userEndow2: DetailedUserEndow = {
  endowID: 5,
  email: "mail@mail2.com",
  name: "Best Giving",
};

const userEndow3: DetailedUserEndow = {
  endowID: 10,
  email: "mail@mail3.com",
  name: "Good Giving",
  alertPref: {
    banking: true,
    donation: false,
  },
};

const userEndows = [userEndow1, userEndow2, userEndow3];

export default function EndowAlertForm({ classes = "" }: Props) {
  const { register, control } = useForm<FV>({
    defaultValues: {
      items: userEndows,
    },
  });

  const { fields } = useFieldArray({ control, name: "items" });
  return (
    <form
      className={`${classes} grid grid-cols-[3fr_2fr_2fr] divide-y divide-gray-l4 border border-gray-l4`}
    >
      <div className="grid grid-cols-subgrid col-span-3 py-2 font-bold text-sm">
        <h5 className="pl-3">Alerts from</h5>
        <h5>New donations</h5>
        <h5>Banking changes</h5>
      </div>
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-subgrid col-span-3 divide-x divide-gray-l4"
        >
          <div className="p-3">{field.name}</div>
          {
            <CheckField
              classes="px-4"
              {...register(`items.${idx}.alertPref.donation`)}
            />
          }
          {
            <CheckField
              classes="px-4"
              {...register(`items.${idx}.alertPref.banking`)}
            />
          }
        </div>
      ))}
    </form>
  );
}
