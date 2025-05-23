import { type ImgHTMLAttributes, useEffect, useRef, useState } from "react";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onload"> {
  shadow_opacity?: number;
  shadow_blur?: number;
  shadow_offset?: number;
  shadow_width_multiplier?: number;
  shadow_height_multiplier?: number;
  classes?: string;
}

export const Character = (props: Props) => {
  const {
    src,
    shadow_opacity = 0.35,
    shadow_blur = 5,
    shadow_offset = 0,
    shadow_width_multiplier = 1.2,
    shadow_height_multiplier = 1.0,
    classes = "",
    ...rest
  } = props;
  const [dimensions, set_dimentions] = useState({
    width: 0,
    height: 0,
  });
  const [is_loaded, set_is_loaded] = useState(false);
  const img_ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = img_ref.current;
    if (img && img.complete) {
      handle_image_load();
    }
  }, []);

  const handle_image_load = () => {
    const img = img_ref.current;
    if (img) {
      set_dimentions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      set_is_loaded(true);
    }
  };

  // Calculate shadow dimensions based on image size
  const shadow_width = Math.max(
    dimensions.width,
    dimensions.width * shadow_width_multiplier
  ); // Shadow width is at least equal to image width
  const shadow_height = dimensions.height * 0.12 * shadow_height_multiplier; // Shadow height with multiplier

  // Light source positioning - coming from top-left
  const light_angle = -25; // degrees
  const shadow_offset_x = shadow_offset * 0.3; // Much smaller horizontal offset - shadow stays mostly under the mascot
  const shadow_offset_y = shadow_offset * 0.1; // Minimal vertical offset - shadow stays at the bottom

  return (
    <div className={`relative inline-block ${classes}`}>
      {/* Main mascot image */}
      <img ref={img_ref} src={src} onLoad={handle_image_load} {...rest} />

      {/* Ground shadow - positioned as if light is from above-left */}
      {is_loaded && (
        <div
          className="absolute rounded-full"
          style={{
            width: `${shadow_width / 2.5}px`,
            height: `${shadow_height / 2.5}px`,
            background: `radial-gradient(ellipse, rgba(0,0,0,${shadow_opacity}) 0%, rgba(0,0,0,${shadow_opacity * 0.3}) 70%, transparent 100%)`,
            filter: `blur(${shadow_blur * 0.8}px)`,
            bottom: `${-shadow_offset_y}px`,
            left: `calc(50% + ${shadow_offset_x}px)`,
            transform: `translateX(-50%) skew(${light_angle}deg, 0deg)`,
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};
