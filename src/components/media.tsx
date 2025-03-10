import { wp } from "api/api";
import useSWR from "swr/immutable";
import type { Wordpress } from "types/wordpress";
import Image from "./image";

type Props = { id: number; classes?: string; sizes: string };

export default function Media(props: Props) {
  const {
    data: media,
    isLoading,
    error,
  } = useSWR(`media/${props.id}`, (path) => {
    return wp.get<Wordpress.Media>(path).json();
  });

  if (!media || isLoading || error) {
    return <Image className={props.classes} alt="placeholder" />;
  }

  const { media_details, alt_text, guid } = media;
  const { width, height, sizes } = media_details;

  const srcSet = (Object.entries(sizes) as [string, Wordpress.Media.Size][])
    .filter(([_, size]) => size.source_url)
    .map(([_, size]) => `${size.source_url} ${size.width}w`)
    .join(", ");

  return (
    <img
      alt={alt_text}
      src={guid.rendered}
      srcSet={srcSet}
      sizes={props.sizes}
      width={width}
      height={height}
      className={props.classes}
      loading="lazy"
    />
  );
}
