import { APP_NAME } from "constants/env";
import { T, V } from "../components";
import { fs, blue, fw, gray, w } from "../styles";

export function Benefits() {
  const benefits = [
    {
      title: "80% Donor Fee Coverage",
      description: `${APP_NAME} enables all donors to cover processing fees, and our data shows 80% opt to do so.`,
    },
    {
      title: "All Donation Types",
      description:
        "Accept all donation types including crypto, stocks, and DAF, increasing your donation volume.",
    },
    {
      title: "Lower Processing Fees",
      description: `${APP_NAME} doesn't charge any processing fees, but the third-party services we utilize charge an average rate of 2% (reduced to less than 0.5% with donor coverage)`,
    },
    {
      title: "Automated Investments",
      description:
        "Automatically allocate a portion of donations to high-yield savings and investment accounts.",
    },
  ];

  return (
    <V style={{ paddingHorizontal: w["24"], paddingTop: w["20"] }}>
      <T
        style={{
          fontSize: fs.xl,
          fontWeight: fw.b,
          marginBottom: w["10"],
          color: blue.d,
        }}
      >
        {APP_NAME} Benefits
      </T>

      {benefits.map((benefit, index) => (
        <V
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: w["4"],
            marginBottom: w["20"],
          }}
        >
          <V>
            <T
              style={{
                fontSize: fs.lg,
                fontWeight: fw.sb,
                marginBottom: w["2"],
              }}
            >
              {benefit.title}
            </T>
            <T style={{ fontSize: fs.md, color: gray.d2, maxWidth: "90%" }}>
              {benefit.description}
            </T>
          </V>
        </V>
      ))}
    </V>
  );
}
