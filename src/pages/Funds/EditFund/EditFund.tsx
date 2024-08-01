import ImgForm from "./ImgForm";

export default function EditFund() {
  return (
    <div>
      <h2>Edit fund</h2>

      <h4>Banner</h4>
      <ImgForm bannerUrl="" onSubmit={async (f) => console.log(f)} />

      <h4>Logo</h4>
      <ImgForm bannerUrl="" onSubmit={async (f) => console.log(f)} />
    </div>
  );
}
