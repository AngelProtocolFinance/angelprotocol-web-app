import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, uploadToIpfs } from "./uploadToIpfs";

describe("uploadToIpfs tests", () => {
  it("returns correctly extracted data after successful upload", async () => {
    const fileName = "test";
    const file = new File([], fileName);

    const result = await uploadToIpfs(file);
    expect(mockedUpload).toHaveBeenCalledWith([file], { name: fileName });
    expect(result).toEqual(`${IPFS_GATEWAY}/${cid}/${fileName}`);
  });
});
