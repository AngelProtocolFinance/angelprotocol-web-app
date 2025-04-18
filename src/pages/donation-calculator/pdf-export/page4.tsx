import bg from "assets/images/bettergiving-logo-white.png"; // Ensure this path works with react-pdf build
import { laira } from "assets/laira/laira"; // Ensure this path works with react-pdf build
import { BASE_URL } from "constants/env";
import { A, Img, Pg, type Style, T, V } from "./components"; // Import react-pdf components
import { Footer } from "./footer";
import { fs, blue, fw, gray, w } from "./styles"; // Import styles

export function Page4() {
  const listItemStyle: Style = {
    color: gray.d1, // text-gray
    marginBottom: w["4"], // space-y-4 approximation
    display: "flex",
    flexDirection: "row",
    fontSize: fs.lg * 0.9, // Increased font size for list items
  };
  const bulletStyle = { marginRight: w["4"] }; // Adjust spacing as needed

  return (
    <Pg size="A4" style={{ display: "flex", flexDirection: "column" }}>
      <V
        style={{
          backgroundColor: blue.d, // bg-blue
          paddingHorizontal: w["10"], // px-6
          paddingVertical: w["20"], // py-12 (adjust value)
        }}
      >
        <V
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <T
            style={{
              textTransform: "uppercase",
              color: gray.l6, // text-white
              fontSize: fs.xl, // text-4xl (adjust value)
              fontWeight: fw.b, // font-bold
            }}
          >
            Appendix
          </T>

          <A href={BASE_URL}>
            <Img
              src={bg}
              style={{
                width: 120, // Changed width from 140 to 120
                objectFit: "contain",
                alignSelf: "flex-start",
                position: "relative",
                top: w["4"], // top-4
              }}
            />
          </A>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          gap: w["4"], // gap-x-4
          alignItems: "center",
          paddingHorizontal: w["10"], // px-6
          marginTop: w["14"], // mt-8 (adjust value)
        }}
      >
        <T
          style={{
            fontSize: fs.lg + 2, // text-2xl (adjust value)
            fontWeight: fw.sb, // font-semibold
            textTransform: "uppercase",
          }}
        >
          Calculation Details
        </T>
        <V
          style={{
            height: 1, // h-0.5 (adjust value)
            backgroundColor: gray.d, // bg-gray
            flexGrow: 1,
          }}
        />
      </V>
      <V
        style={{
          marginTop: w["14"], // mt-8 (adjust value)
          paddingHorizontal: w["20"], // px-12 (adjust value)
        }}
      >
        <V style={{ marginBottom: w["14"] }}>
          <T
            style={{
              fontWeight: fw.sb,
              marginBottom: w["4"],
              fontSize: fs.lg, // Increased section heading size
            }}
          >
            Better Giving Platform
          </T>
          <V style={{ marginLeft: w["6"] }}>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>
                Better Giving doesn't charge processing fees, but third-party
                services charge an average of 2% (no platform fees)
              </T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>
                80% of donors opt to cover processing fees (based on platform
                data)
              </T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>
                Better Giving accepts all donation types (credit cards, ACH,
                digital wallets, crypto, stocks, DAF)
              </T>
            </V>
          </V>
        </V>

        <V style={{ marginBottom: w["14"] }}>
          <T
            style={{
              fontWeight: fw.sb,
              marginBottom: w["4"],
              fontSize: fs.lg, // Increased section heading size
            }}
          >
            Donation Type Calculation
          </T>
          <T
            style={{
              color: gray.d1,
              marginBottom: w["4"],
              fontSize: fs.lg * 0.9, // Increased paragraph font size
            }}
          >
            These are approximate percentages for U.S.-based nonprofits,
            annualized and projected for 2025 based on trends. Our calculations
            assume 50% of donors will not proceed to make a donation if their
            preferred donation method is unavailable.
          </T>
          <V style={{ marginLeft: w["6"] }}>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Credit card donations: 63% of total volume</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>ACH/Bank Transfer donations: 10% of total volume</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Digital Wallet donations: 7% of total volume</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Cryptocurrency donations: 2% of total volume</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Stock donations: 6% of total volume</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>DAF donations: 12% of total volume</T>
            </V>
          </V>
        </V>

        <V style={{ marginBottom: w["14"] }}>
          <T
            style={{
              fontWeight: fw.sb,
              marginBottom: w["4"],
              fontSize: fs.lg, // Increased section heading size
            }}
          >
            Investment Returns
          </T>
          <V style={{ marginLeft: w["6"] }}>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Savings Account: 4% annual yield</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Sustainability Fund: 20% average annual return</T>
            </V>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>Returns compound daily</T>
            </V>
          </V>
        </V>
      </V>
      <V
        style={{
          position: "relative",
          alignSelf: "flex-end",
          marginRight: w["20"], // mr-10 (adjust value)
          marginTop: "auto", // Push image towards bottom before footer
          marginBottom: 80, // Space above footer
        }}
      >
        <Img
          src={laira.laptopFull}
          style={{
            width: 150, // width={300} (adjust value)
          }}
        />
      </V>
      <Footer />
    </Pg>
  );
}
