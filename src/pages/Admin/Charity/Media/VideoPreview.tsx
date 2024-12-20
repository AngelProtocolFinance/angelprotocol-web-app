import type { IMedia } from "@better-giving/endowment";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import { LoaderCircle, Minus, Pencil, Star } from "lucide-react";
import { useAdminContext } from "pages/Admin/Context";
import type { ButtonHTMLAttributes } from "react";
import ReactPlayer from "react-player";
import {
  useDeleteMediumMutation,
  useEditMediumMutation,
} from "services/aws/media";
import VideoEditor from "./VideoEditor";

export default function VideoPreview(props: IMedia) {
  const { id } = useAdminContext();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();
  const [deleteMedium, { isLoading: isDeleting }] = useDeleteMediumMutation();
  const [editMedium, { isLoading: isEditing }] = useEditMediumMutation();
  const allControlsDisabled = isDeleting || isEditing;
  return (
    <div className="text-navy-d4" key={props.id}>
      <div className="flex justify-end mb-1">
        <CRUDBtn
          isLoading={isEditing}
          disabled={allControlsDisabled}
          onClick={async () => {
            try {
              await editMedium({
                endowId: id,
                mediaId: props.id,
                featured: !props.featured,
              }).unwrap();
            } catch (err) {
              handleError(err, { context: "editing video" });
            }
          }}
        >
          <Star
            size={19}
            className={`${
              props.featured ? "text-[#FFA500]" : ""
            } group-disabled:text-gray-l1`}
          />
        </CRUDBtn>
        <CRUDBtn
          disabled={allControlsDisabled}
          onClick={() =>
            showModal(VideoEditor, {
              edit: { mediaId: props.id, prevUrl: props.url },
            })
          }
        >
          <Pencil size={16} />
        </CRUDBtn>
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
          <Minus />
        </CRUDBtn>
      </div>
      {/** render only thumbnails on lists */}
      {/** @see https://github.com/CookPete/react-player/issues/145 */}
      <div className="relative pt-[56.25%] aspect-[16/9] rounded-lg overflow-clip">
        <ReactPlayer
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          url={props.url}
          width="100%"
          height="100%"
          light
          playIcon={<></>}
        />
      </div>
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
      {isLoading ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  );
}
