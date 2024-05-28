import Icon from "components/Icon";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useAdminContext } from "pages/Admin/Context";
import type { ButtonHTMLAttributes } from "react";
import ReactPlayer from "react-player";
import { useDeleteMediumMutation } from "services/aws/media";
import type { Media } from "types/aws";
import VideoEditor from "./VideoEditor";

export default function VideoPreview(props: Media) {
  const { id } = useAdminContext();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const [deleteMedium, { isLoading: isDeleting }] = useDeleteMediumMutation();
  const allControlsDisabled = isDeleting;
  return (
    <div className="text-navy-d4" key={props.id}>
      <div className="flex justify-end mb-1">
        <CRUDBtn disabled={allControlsDisabled}>
          <Icon
            type="Star"
            className="text-[#FFA500] group-disabled:text-gray-l1"
          />
        </CRUDBtn>
        <button
          onClick={() =>
            showModal(VideoEditor, {
              edit: { mediaId: props.id, prevUrl: props.url },
            })
          }
          type="button"
          className="p-1.5 text-lg rounded-full hover:bg-blue-l4"
        >
          <Icon type="Pencil" />
        </button>
        <CRUDBtn
          disabled={allControlsDisabled}
          isLoading={isDeleting}
          onClick={async () => {
            try {
              await deleteMedium({ endowId: id, mediaId: props.id }).unwrap();
            } catch (err) {
              handleError(err, { context: "deleting videos" });
            }
          }}
        >
          <Icon type="Delete" />
        </CRUDBtn>
      </div>
      {/** render only thumbnails on lists */}
      <ReactPlayer
        style={{ pointerEvents: "none" }}
        url={props.url}
        width={320}
        height={180}
        light
        playIcon={<></>}
      />
    </div>
  );
}

function CRUDBtn({
  className,
  isLoading,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  isLoading?: boolean;
}) {
  return (
    <button
      {...props}
      type="button"
      className={`p-1.5 text-lg rounded-full hover:bg-blue-l4 group disabled:text-gray-l1 ${className}`}
    >
      {isLoading ? <Icon type="Loading" className="animate-spin" /> : children}
    </button>
  );
}
