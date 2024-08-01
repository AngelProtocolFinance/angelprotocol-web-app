import ContentForm from "./ContentForm";
import ImgForm from "./ImgForm";

export default function EditFund() {
  return (
    <div className="padded-container mt-8 grid">
      <h2 className="text-3xl mb-4">Edit fund</h2>
      <ImgForm
        label="Logo"
        classes="justify-self-start"
        aspect={[1, 1]}
        imgClasses={{ container: "w-80 aspect-[1/1]" }}
        bannerUrl=""
        onSubmit={async (f) => console.log(f)}
      />
      <ImgForm
        label="Banner"
        aspect={[4, 1]}
        classes="mt-6"
        imgClasses={{ container: "w-full aspect-[4/1]" }}
        bannerUrl=""
        onSubmit={async (f) => console.log(f)}
      />
      <ContentForm onSubmit={async (f) => console.log(f)} />
    </div>
  );
}
