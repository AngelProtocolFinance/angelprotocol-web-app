import { afterEach, describe, expect, test, vi } from "vitest";
import { type Bucket, bucketURL, uploadFiles } from "./uploadFiles";

const TIME_STAMP = 123456789;
const AUTH_TOKEN = "test";
const bucket: Bucket = "endow-profiles";
const baseURL = `https://${bucket}.${bucketURL}/${TIME_STAMP}`;

vi.mock("./jwt-token", () => ({ jwtToken: () => AUTH_TOKEN }));

afterEach(() => {
  vi.clearAllMocks();
});

describe("uploadFiles tests", () => {
  test("upload multiple files", async () => {
    Date.now = vi.fn(() => TIME_STAMP);

    const files = [new File([], "file1"), new File([], "file2")];

    const result = await uploadFiles(files, bucket);
    expect(result).toStrictEqual(baseURL);
  });

  test("returns null if files input is empty", async () => {
    const result = await uploadFiles([], bucket);
    expect(result).toBeNull();
  });
});
