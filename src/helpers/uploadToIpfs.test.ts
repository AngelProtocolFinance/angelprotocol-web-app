import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, uploadToIpfs } from "./uploadToIpfs";

describe("uploadToIpfs tests", () => {
  it("returns correctly extracted data after successful upload", async () => {
    const file = new File([], "test");

    const result = await uploadToIpfs(file);
    expect(mockedUpload).toHaveBeenCalledWith([file], {
      wrapWithDirectory: false,
    });
    expect(result).toEqual(`${IPFS_GATEWAY}/${cid}`);
  });
});
