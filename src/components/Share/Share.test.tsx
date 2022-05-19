import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Share from "./Share";

describe("Share component test:", () => {
	test("icon links are rendered", () => {
		render(<Share />);
		expect(screen.getAllByRole("link")).toHaveLength(3); // for FB, LinkedIn, and Twitter
	});

	test("Facebook link is working", () => {
		render(<Share />);
		const facebookLink = screen.getByTestId("Facebook");

		expect(facebookLink.getAttribute("href")).toBe(
			"https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fwww.angelprotocol.io&quote=I%20just%20donated%20on%20%40AngelProtocol%21%20Every%20gift%20is%20invested%20to%20provide%20sustainable%20funding%20for%20non-profits%3A%20Give%20once%2C%20give%20forever.%20Please%20join%20me%20in%20providing%20charities%20with%20financial%20freedom%3A%0Ahttps%3A%2F%2Fwww.angelprotocol.io&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer"
		);

		expect(facebookLink.getAttribute("target")).toBe("_blank");
	});

	test("LinkedIn link is working", () => {
		render(<Share />);
		const linkedinLink = screen.getByTestId("LinkedinIn");

		expect(linkedinLink.getAttribute("href")).toBe(
			"https://www.linkedin.com/feed/?shareActive=true&text=I%20just%20donated%20on%20%40AngelProtocol%21%20Every%20gift%20is%20invested%20to%20provide%20sustainable%20funding%20for%20non-profits%3A%20Give%20once%2C%20give%20forever.%20Please%20join%20me%20in%20providing%20charities%20with%20financial%20freedom%3A%0Ahttps%3A%2F%2Fwww.angelprotocol.io"
		);

		expect(linkedinLink.getAttribute("target")).toBe("_blank");
	});

	test("Twitter link is working", () => {
		render(<Share />);
		const twitterLink = screen.getByTestId("Twitter");

		expect(twitterLink.getAttribute("href")).toBe(
			"https://twitter.com/intent/tweet?text=I%20just%20donated%20on%20%40AngelProtocol%21%20Every%20gift%20is%20invested%20to%20provide%20sustainable%20funding%20for%20non-profits%3A%20Give%20once%2C%20give%20forever.%20Please%20join%20me%20in%20providing%20charities%20with%20financial%20freedom%3A%0Ahttps%3A%2F%2Fwww.angelprotocol.io"
		);

		expect(twitterLink.getAttribute("target")).toBe("_blank");
	});
});
