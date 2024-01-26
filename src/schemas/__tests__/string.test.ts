import { describe, expect, test } from "vitest";
import { url } from "../string";

//NOTE: intended for shallow form objects only atm
describe("string schemas tests", () => {
  describe("url", () => {
    const cases = [
      { input: null, expected: true }, // not initially set and not required
      { input: undefined, expected: true }, // not initially set and not required
      { input: "", expected: true }, // empty and not required

      { input: ".", expected: false },
      { input: ".@%#%&(!", expected: false },
      { input: "a.", expected: false },
      { input: ".a", expected: false },
      { input: ".a.", expected: false },
      { input: "http:/", expected: false },
      { input: "http://", expected: false },
      { input: "https:/", expected: false },
      { input: "https://", expected: false },
      { input: "ftp://www.example.com", expected: false }, //we enforce https on input links
      { input: "mailto://www.example.com", expected: false }, //we enforce https on input links

      /** though top level domains are valid, saving them on this format
       * and later used on link tags `<a/>` could prove problematic:
       * e.g. `<a href="google.com"/>`. would not magically go to desired `https://google.com`
       * that is on the assumption that google.com is intended to be of `https`
       */
      { input: "fdasfasda", expected: false },
      { input: "1", expected: false },
      { input: "example.com", expected: false },
      { input: "example.org", expected: false },
      { input: "tiktok.com/@betterme.org", expected: false },
      { input: "www.example.com", expected: false },

      //sample valid urls
      { input: "https://www.example.com", expected: true },
      { input: "https://www.tiktok.com/@betterme.org", expected: true },
    ];

    test.each(cases)(
      'url("$input") === $expected',
      async ({ input, expected }) =>
        expect(await url.isValid(input)).toBe(expected),
    );
  });
});
