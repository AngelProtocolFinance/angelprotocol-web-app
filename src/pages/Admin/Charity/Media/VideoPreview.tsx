import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { useAdminContext } from "pages/Admin/Context";
import type { ButtonHTMLAttributes } from "react";
import ReactPlayer from "react-player";
import { useDeleteMediumMutation } from "services/aws/media";
import type { Media } from "types/aws";

export default function VideoPreview(props: Media) {
  const { id } = useAdminContext();
  const [deleteMedium, { isLoading: isDeleting }] = useDeleteMediumMutation();
  const allControlsDisabled = isDeleting;
  return (
    <div className="text-navy-d4" key={props.id}>
      <div className="flex justify-end mb-1">
        <CRUDBtn
          disabled={allControlsDisabled}
          mutation={() =>
            deleteMedium({ endowId: id, mediaId: props.id }).unwrap()
          }
        >
          <Icon type="Star" className="text-[#FFA500] " />
        </CRUDBtn>
        <button
          type="button"
          className="p-1.5 text-lg rounded-full hover:bg-blue-l4"
        >
          <Icon type="Pencil" />
        </button>
        <CRUDBtn
          disabled={allControlsDisabled}
          isLoading={isDeleting}
          mutation={() =>
            deleteMedium({ endowId: id, mediaId: props.id }).unwrap()
          }
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
  mutation,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
  isLoading?: boolean;
  mutation: () => Promise<unknown>;
}) {
  const { showModal } = useModalContext();
  const { handleError } = useErrorContext();
  return (
    <button
      {...props}
      onClick={async () => {
        try {
          await mutation();
          showModal(Prompt, { type: "success" });
        } catch (err) {
          handleError(err, { context: "updating videos" });
        }
      }}
      type="button"
      className={`p-1.5 text-lg rounded-full hover:bg-blue-l4 disabled:text-gray ${className}`}
    >
      {isLoading ? <Icon type="Loading" className="animate-spin" /> : children}
    </button>
  );
}
