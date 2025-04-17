import { methods } from "types/donation-calculator";
import { T, V } from "../components";
import { fs, blue, w } from "../styles";

export function DonationMethods({
  activeMethods,
}: { activeMethods: string[] }) {
  return (
    <V
      style={{
        flexDirection: "row",
        display: "flex",
        gap: w["10"],
        fontSize: fs.sm,
        alignItems: "center",
      }}
    >
      {Object.entries(methods).map(([id, name]) => (
        <V
          key={id}
          style={{
            flexDirection: "row",
            display: "flex",
            gap: w["2"],
            alignItems: "center",
          }}
        >
          <V
            style={{
              width: w["6"],
              height: w["6"],
              borderRadius: w["6"],
              backgroundColor: activeMethods.includes(id) ? blue.d : "white",
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
