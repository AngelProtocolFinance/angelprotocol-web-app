import { cid } from "setupTests";
import { FileObject } from "types/aws";
import { IPFS_GATEWAY } from "helpers";
import { getFilePreviews } from "./getFilePreviews";

const file1 = new File([], "file1");
const file2 = new File([], "file2");
const file3 = new File([], "file3");

const preview1: FileObject = { name: "preview1", publicUrl: "preview1Url" };
const preview2: FileObject = { name: "preview2", publicUrl: "preview2Url" };
const preview3: FileObject = { name: "preview3", publicUrl: "preview3Url" };

const result1: FileObject = {
  name: file1.name,
  publicUrl: `${IPFS_GATEWAY}/${cid}/${file1.name}`,
};
const result2: FileObject = {
  name: file2.name,
  publicUrl: `${IPFS_GATEWAY}/${cid}/${file2.name}`,
};
const result3: FileObject = {
  name: file3.name,
  publicUrl: `${IPFS_GATEWAY}/${cid}/${file3.name}`,
};

describe("get documentation file previews", () => {
  test("correct preview mapping for new uploads", async () => {
    const documentationVals: Parameters<typeof getFilePreviews>[0] = {
      a: { files: [file1], previews: [] },
      b: { files: [file1, file3], previews: [] },
      c: { files: [file2, file1, file3], previews: [] },
    };
    const previews = await getFilePreviews(documentationVals);
    expect(previews).toStrictEqual({
      a: [result1],
      b: [result1, result3],
      c: [result2, result1, result3],
    });
  });
  test("previous upload is used when no new files", async () => {
    const documentationVals: Parameters<typeof getFilePreviews>[0] = {
      a: { files: [file1], previews: [preview1, preview2] },
      b: { files: [], previews: [preview3, preview2] },
      c: { files: [], previews: [preview1] },
    };
    const previews = await getFilePreviews(documentationVals);
    expect(previews).toStrictEqual({
      a: [result1],
      b: [preview3, preview2],
      c: [preview1],
    });
  });
  // no need to test for empty files and empty preview - should be prevented by schema
});
