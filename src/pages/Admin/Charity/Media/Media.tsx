import Icon from "components/Icon";

export default function Media() {
  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <h3 className="text-[2rem]">Media</h3>
      <div className="border border-gray-l4 rounded p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl">Videos</h4>
          <button className="btn-outline-filled text-sm px-8 py-2 gap-2">
            <Icon type="Plus" />
            <span>add video</span>
          </button>
        </div>
        <h5 className="text-lg mt-10">Featured videos</h5>
      </div>
    </div>
  );
}
