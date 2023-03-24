import { isValidUrl } from "../string";

//NOTE: intended for shallow form objects only atm
describe("string schemas tests", () => {
  describe("isValidUrl", () => {
    const cases = [
      { input: null, expected: false },
      { input: undefined, expected: false },
      { input: "", expected: false },
      { input: ".", expected: false },
      { input: "ftp://www.example.com", expected: false },
      { input: "mailto://www.example.com", expected: false },
      // special case, domain name can contain only top-level domain
      // see https://stackoverflow.com/questions/69614892/can-a-domain-consist-of-only-tld-top-level-domain#:~:text=D%20in%20TLD%20means%20domain,so%20yes%20it%20is%20valid.
      { input: "fdasfasda", expected: true },
      { input: "1", expected: true },
      { input: "example.com", expected: true },
      { input: "example.org", expected: true },
      { input: "www.example.com", expected: true },
      { input: "http://www.example.com", expected: true },
      { input: "https://www.example.com", expected: true },
      { input: "tiktok.com/@betterme.org", expected: true },
      { input: "www.tiktok.com/@betterme.org", expected: true },
      { input: "https://www.tiktok.com/@betterme.org", expected: true },
    ];
    test.each(cases)(
      'isValidUrl("$input") === $expected',
      ({ input, expected }) => expect(isValidUrl(input)).toBe(expected)
    );
  });
});
