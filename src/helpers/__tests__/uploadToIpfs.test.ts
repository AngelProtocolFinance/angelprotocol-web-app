import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, genPublicUrl, uploadToIpfs } from "../uploadToIpfs";

describe("uploadToIpfs tests", () => {
  test("upload multiple files", async () => {
    const files = [new File([], "file1"), new File([], "file2")];
    const result = await uploadToIpfs(files);
    expect(mockedUpload).toHaveBeenCalledWith(files);
    expect(result).toStrictEqual(cid);
  });

  test("upload single file", async () => {
    const fileName = "test";
    const file = new File([], fileName);
    const result = await uploadToIpfs([file]);
    expect(mockedUpload).toHaveBeenCalledWith([file]);
    expect(result).toStrictEqual(cid);
  });

  test("returns empty array if files input is empty", async () => {
    const result = await uploadToIpfs([]);
    expect(result).toBeNull();
  });

  test("correct public url from cid and file name", async () => {
    const file = new File([], "test with space");
    const url = genPublicUrl(cid, file.name);
    expect(url).toStrictEqual(`${IPFS_GATEWAY}/${cid}/test%20with%20space`);
  });
});
