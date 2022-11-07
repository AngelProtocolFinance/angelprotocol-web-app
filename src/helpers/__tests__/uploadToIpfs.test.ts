import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, uploadToIpfs } from "../uploadToIpfs";

describe("uploadToIpfs tests", () => {
  test("successful upload of multiple files", async () => {
    const files = [new File([], "file1"), new File([], "file2")];
    const result = await uploadToIpfs(files);
    expect(mockedUpload).toHaveBeenCalledWith(files);
    expect(result).toHaveLength(2);
    expect(result).toStrictEqual(
      files.map(({ name }) => `${IPFS_GATEWAY}/${cid}/${name}`)
    );
  });

  test("successful upload of single file", async () => {
    const fileName = "test";
    const file = new File([], fileName);

    const result = await uploadToIpfs([file]);
    expect(mockedUpload).toHaveBeenCalledWith([file]);
    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([`${IPFS_GATEWAY}/${cid}/${fileName}`]);
  });

  test("returns file with file name encoded", async () => {
    const file = new File([], "test with space");

    const result = await uploadToIpfs([file]);
    expect(mockedUpload).toHaveBeenCalledWith([file]);
    expect(result).toStrictEqual([
      `${IPFS_GATEWAY}/${cid}/test%20with%20space`,
    ]);
  });

  test("returns empty array if files input is empty", async () => {
    const result = await uploadToIpfs([]);
    expect(result).toStrictEqual([]);
  });
});
