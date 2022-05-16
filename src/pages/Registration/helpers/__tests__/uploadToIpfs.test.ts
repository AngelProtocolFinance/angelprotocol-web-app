import { Folders } from "pages/Registration/constants";
import uploadToIpfs from "../uploadToIpfs";

const API_KEY = process.env.REACT_APP_FLEEK_API_KEY;
const API_SECRET = process.env.REACT_APP_FLEEK_API_SECRET;

const mockFleekUpload = jest.fn();

jest.mock("@fleekhq/fleek-storage-js", () => ({
  __esModule: true,
  default: {
    upload: (props: any) => mockFleekUpload(props),
  },
}));

describe("uploadToIpfs tests", () => {
  it("returns correctly extracted data after successful upload", async () => {
    const filename = "test-file.txt";
    const folder = Folders.ProofOfIdentity;
    const path = `${folder}/${filename}`;
    const publicUrl = `https://mockfleek.com/${path}`;
    mockFleekUpload.mockResolvedValue({ publicUrl });
    const mockFile = new File([], filename);

    const result = await uploadToIpfs(path, mockFile);

    expect(mockFleekUpload).toHaveBeenCalledWith(
      expect.objectContaining({
        key: path,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        data: mockFile,
      })
    );
    expect(result).toStrictEqual(publicUrl);
  });

  it("returns correctly extracted data after successful upload (no folder)", async () => {
    const filename = "test-file.txt";
    const publicUrl = `https://mockfleek.com/${filename}`;
    mockFleekUpload.mockResolvedValue({ publicUrl });
    const mockFile = new File([], filename);

    const result = await uploadToIpfs(filename, mockFile);

    expect(mockFleekUpload).toHaveBeenCalledWith(
      expect.objectContaining({
        key: filename,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        data: mockFile,
      })
    );
    expect(result).toStrictEqual(publicUrl);
  });

  it("returns empty strings for values when error is thrown", async () => {
    const filename = "test-file.txt";
    mockFleekUpload.mockImplementation((_: any) => {
      throw new Error();
    });

    const result = await uploadToIpfs(filename, new File([], filename));

    expect(result).toBe("");
  });
});
