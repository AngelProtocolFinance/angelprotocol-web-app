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
    const publicUrl = `https://mockfleek.com/${folder}/${filename}`;
    mockFleekUpload.mockResolvedValue({ publicUrl });
    const mockFile = new File([], filename);

    const result = await uploadToIpfs(mockFile, folder);

    expect(mockFleekUpload).toHaveBeenCalledWith(
      expect.objectContaining({
        key: `${folder}/${filename}`,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        data: mockFile,
      })
    );
    expect(result).toStrictEqual({ name: filename, publicUrl });
  });

  it("returns correctly extracted data after successful upload (no folder)", async () => {
    const filename = "test-file.txt";
    const publicUrl = `https://mockfleek.com/${filename}`;
    mockFleekUpload.mockResolvedValue({ publicUrl });
    const mockFile = new File([], filename);

    const result = await uploadToIpfs(mockFile);

    expect(mockFleekUpload).toHaveBeenCalledWith(
      expect.objectContaining({
        key: filename,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        data: mockFile,
      })
    );
    expect(result).toStrictEqual({ name: filename, publicUrl });
  });

  it("returns empty strings for values when error is thrown", async () => {
    mockFleekUpload.mockImplementation((_: any) => {
      throw new Error("Error");
    });

    const result = await uploadToIpfs(new File([], "test-file.txt"));

    expect(result).toStrictEqual({ name: "", publicUrl: "" });
  });
});
