type LoaderProps = {
  x?: string;
  y?: string;
  height?: string;
  width?: string;
  size?: string;
};

export default function ContentLoader(props: LoaderProps) {
  return (
    <svg width={props.width || "100%"} height={props.height || "100%"}>
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(20)">
          <stop offset="5%" stopColor="#eee">
            <animate
              attributeName="stop-color"
              values="#EEEEEE; #CCCCCC; #EEEEEE"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="95%" stopColor="#aaa">
            <animate
              attributeName="stop-color"
              values="#DDDDDD; #AAAAAA; #EEEEEE"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `\n svg {\n background-color: transparent;\n      }\n\n rect {\n   width: 100%;\n height: 100%;\n x: 0;\n y: 0;\n      }\n      `,
        }}
      />

      <rect fill="url(#myGradient)" />
    </svg>
  );
}
