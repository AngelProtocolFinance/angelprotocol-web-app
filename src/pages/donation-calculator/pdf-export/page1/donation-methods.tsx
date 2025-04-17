import { methods } from "types/donation-calculator";
import { T, V } from "../components";
import { blue } from "../styles";

export function DonationMethods({
  activeMethods,
}: { activeMethods: string[] }) {
  return (
    <V
      style={{
        flexDirection: "row",
        display: "flex",
        gap: 10,
        fontSize: 9,
        alignItems: "center",
      }}
    >
      {Object.entries(methods).map(([id, name]) => (
        <V
          key={id}
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <V
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: activeMethods.includes(id) ? blue : "white",
              border: activeMethods.includes(id)
                ? undefined
                : "1px solid #94a3b8",
            }}
          />
          <T>{name}</T>
        </V>
      ))}
    </V>
  );
}
