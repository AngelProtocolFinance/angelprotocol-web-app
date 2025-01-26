export async function uploadFile(file: File) {
  const res = await fetch(
    `/api/file-upload?filename=${window.encodeURIComponent(file.name)}`,
    { body: file, method: "POST" }
  );
  if (!res.ok) throw res;
  return res.json().then((data) => data.url);
}
