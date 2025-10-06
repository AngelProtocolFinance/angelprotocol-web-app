import bg from "assets/images/logo-rectangle.svg";
import laira_laptop_full from "assets/laira/laira-laptop-full.webp";
import { APP_NAME, BASE_URL } from "constants/env";
import { A, Img, Pg, type Style, T, V } from "./components";
import { Footer } from "./footer";
import { fs, blue, fw, gray, w } from "./styles";

export function Page4() {
  const listItemStyle: Style = {
    color: gray.d1,
    marginBottom: w["4"],
    display: "flex",
    flexDirection: "row",
    fontSize: fs.md,
  };
  const bulletStyle = { marginRight: w["4"] };

  return (
    <Pg size="A4" style={{ display: "flex", flexDirection: "column" }}>
      <V
        style={{
          backgroundColor: blue.d,
          paddingHorizontal: w["30"],
          paddingVertical: w["20"],
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
              color: gray.l6,
              fontSize: fs.xl,
              fontWeight: fw.b,
            }}
          >
            Appendix
          </T>

          <A href={BASE_URL}>
            <Img
              src={bg}
              style={{
                width: 120,
                objectFit: "contain",
                alignSelf: "flex-start",
                position: "relative",
                top: w["4"],
              }}
            />
          </A>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          gap: w["4"],
          alignItems: "center",
          paddingHorizontal: w["30"],
          marginTop: w["14"],
        }}
      >
        <T
          style={{
            fontSize: fs.lg2,
            fontWeight: fw.sb,
            textTransform: "uppercase",
          }}
        >
          Calculation Details
        </T>
        <V
          style={{
            height: 1,
            backgroundColor: gray.d,
            flexGrow: 1,
          }}
        />
      </V>
      <V
        style={{
          marginTop: w["14"],
          paddingHorizontal: w["30"],
        }}
      >
        <V style={{ marginBottom: w["14"] }}>
          <T
            style={{
              fontWeight: fw.sb,
              marginBottom: w["4"],
              fontSize: fs.lg,
            }}
          >
            {APP_NAME} Platform
          </T>
          <V style={{ marginLeft: w["6"] }}>
            <V style={listItemStyle}>
              <T style={bulletStyle}>•</T>
              <T>
                {APP_NAME} doesn't charge processing fees, but third-party
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
                {APP_NAME} accepts all donation types (credit cards, ACH,
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
              fontSize: fs.lg,
            }}
          >
            Donation Type Calculation
          </T>
          <T
            style={{
              color: gray.d1,
              marginBottom: w["4"],
              fontSize: fs.md,
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
              fontSize: fs.lg,
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
          marginRight: w["20"],
          marginTop: "auto",
          marginBottom: 80,
        }}
      >
        <Img
          src={laira_laptop_full}
          style={{
            width: 150,
          }}
        />
      </V>
      <Footer />
    </Pg>
  );
}
