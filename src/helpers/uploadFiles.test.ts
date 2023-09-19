import { vi } from "vitest";
import { APIs } from "constant/urls";
import { Bucket, bucketURL, uploadFiles } from "./uploadFiles";

const TIME_STAMP = 123456789;
const AUTH_TOKEN = "test";
const bucket: Bucket = "endow-profiles";
const baseURL = `https://${bucket}.${bucketURL}/${TIME_STAMP}`;

beforeEach(() => {
  global.fetch = vi.fn();
});

afterAll(() => {
  vi.clearAllMocks();
});

vi.mock("./createAuthToken", () => ({ createAuthToken: () => AUTH_TOKEN }));

describe("uploadFiles tests", () => {
  test("upload multiple files", async () => {
    Date.now = vi.fn(() => TIME_STAMP);

    const files = [new File([], "file1"), new File([], "file2")];

    const result = await uploadFiles(files, bucket);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result).toStrictEqual(baseURL);
  });

  test("check generated call parameters", async () => {
    Date.now = vi.fn(() => TIME_STAMP);

    const file = new File([], " test file name");

    await uploadFiles([file], bucket);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith(APIs.aws + "/v1/file-upload", {
      method: "POST",
      body: JSON.stringify({
        bucket: bucket,
        dataUri: "data:application/octet-stream;base64,",
        fileName: `${TIME_STAMP}-_test_file_name`,
      }),
      headers: {
        authorization: AUTH_TOKEN,
      },
    });
  });

  test("returns null if files input is empty", async () => {
    const result = await uploadFiles([], bucket);
    expect(result).toBeNull();
  });
});
