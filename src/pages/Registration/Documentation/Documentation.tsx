import Button from "../Button";

export default function Documentation() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full justify-between">
        <div>upload</div>
        <div>levels</div>
      </div>
      <div>checkboxes</div>
      <Button>Upload</Button>
    </div>
  );
}
