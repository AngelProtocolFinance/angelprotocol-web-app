import { useGSAP } from "@gsap/react";
import { benefits } from "content/benefits";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { EasePack } from "gsap/EasePack";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(EasePack, CustomEase, ScrollTrigger, MotionPathPlugin);

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const AnimatedSVG = ({ classes = "" }) => {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width:769px)", () => {
      gsap.defaults({ ease: "none" });

      const poppins = gsap
        .timeline({
          defaults: {
            autoAlpha: 1,
            transformOrigin: "center",
            ease: "elastic(2.5, 1)",
          },
        })
        .to("#bubble1", { filter: "grayscale(0%)" }, 0)
        .to("#bubble2", { filter: "grayscale(0%)" }, 8)
        .to("#bubble3", { filter: "grayscale(0%)" }, 14.5)
        .to("#bubble4", { filter: "grayscale(0%)" }, 19.3);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#svg",
            scrub: 0.2,
            pin: true,
            start: "top 10%",
            end: "bottom -40%",
          },
          duration: 1,
          ease: "power4.out",
        })
        .from(".line", { duration: 10 }, 0)
        .to(
          "#ball",
          {
            motionPath: {
              path: ".line",
              align: ".line",
              alignOrigin: [0.5, 0.5],
            },
            backgroundColor: "red",
            duration: 25,
            scrollTrigger: {
              trigger: "#svg",
              start: "top 70%",
              end: "bottom -40%",
              scrub: 0.6,
            },
          },
          0
        )

        .to(
          "#svg",
          {
            attr: { viewBox: "1250 80 2000 950" },
            duration: 20,
          },
          0.5
        )
        .add(poppins, 0);
    });
  });

  return (
    <div className={`${classes} bg-peach/20`}>
      <svg
        width={2715}
        height={609}
        fill="none"
        viewBox="-100 70 1900 709"
        className="w-full h-screen"
        id="svg"
      >
        <path
          stroke="url(#a)"
          strokeLinecap="round"
          strokeWidth={46}
          d="M547.499 92.252c-407-199.999-633 82.501-472.5 254.501C235.5 518.753 735.5 128.252 824 424.743c88.5 296.49 380.3 108.757 543.5 15.757C1593 312 1753 238.5 2012 339.5S2499 678 2892 448"
          className="line"
        />
        <defs>
          <linearGradient
            id="a"
            x1={400}
            x2={3399.89}
            y1={30}
            y2={337.883}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F1ECFD" />
            <stop offset={0.12} stopColor="#FEFBFC" />
            <stop offset={0.196} stopColor="#ECF2FD" />
            <stop offset={0.245} stopColor="#ECF2FD" />
            <stop offset={0.3} stopColor="#ECFBFD" />
            <stop offset={0.362} stopColor="#FDF2FB" />
            <stop offset={0.541} stopColor="#FEF2F1" />
            <stop offset={0.65} stopColor="#F9F1FE" />
            <stop offset={0.893} stopColor="#E1F7FE" />
          </linearGradient>
        </defs>
        <circle cx={50} cy={100} r={22} className="fill-[#76ceeb]" id="ball" />
        <svg
          width={1184}
          height={200}
          x={255}
          viewBox="0 0 1184 144"
          id="content"
        >
          <text className="fill-blue uppercase text-lg font-bold" x={450} y={0}>
            Simple path to financial stability
          </text>
          <text
            className="fill-navy-d4 capitalize font-heading font-bold text-4.5xl"
            x={300}
            y={60}
            style={{ fontSize: 42 }}
          >
            Nonprofit sustainability fund:
          </text>
          <text
            className="fill-navy-d4 capitalize font-heading font-bold text-4.5xl"
            x={250}
            y={110}
          >
            Donations today, funding forever
          </text>
        </svg>

        <svg
          id="bubble1"
          className="grayscale"
          width="550"
          height="500"
          viewBox="0 0 582 500"
          fill="#fff"
          x="200"
          y="180"
        >
          <circle
            cx="275"
            cy="150"
            r="151"
            fill="none"
            stroke="#5b8fbf"
            strokeWidth="28"
          />
          <g clipPath="url(#clip0_741_18646)">
            <rect
              width="299"
              height="299"
              x="125.5"
              y="0.252"
              fill="#fff"
              rx="149.5"
            ></rect>
            <path
              fill="url(#pattern0_741_18646)"
              d="M120 -19.748H460V320.252H120z"
            ></path>
          </g>
          <text
            className="fill-navy-d4 capitalize font-heading font-bold text-3xl"
            x={50}
            y={360}
          >
            The gift that keeps on giving
          </text>
          <g className="font-medium fill-navy-l1 text-xl">
            <text x={10} y={400}>
              Donors can choose the portion of their donation to go into
            </text>
            <text x={20} y={430}>
              the Sustainability Fund, allowing it to grow and provide
            </text>
            <text x={40} y={460}>
              ongoing support to the nonprofit of their choice -
            </text>
            <text x={250} y={490}>
              forever.
            </text>
          </g>

          <defs>
            <clipPath id="clip0_740_1962">
              <rect
                width="299"
                height="299"
                x="125.5"
                y="0.252"
                fill="#fff"
                rx="149.5"
              />
            </clipPath>
          </defs>
          <image
            href={benefits.sf[0].img}
            width="302"
            height="302"
            x="124"
            y="0"
          />
        </svg>

        <svg
          width={550}
          height={500}
          x={990}
          y={340}
          id="bubble2"
          className="grayscale"
          viewBox="0 0 582 500"
        >
          <circle
            cx="275"
            cy="150"
            r="151"
            fill="none"
            stroke="#5b8fbf"
            strokeWidth="28"
          />
          <g clipPath="url(#clip0_741_18659)">
            <rect
              width="299"
              height="299"
              x="125.5"
              y="0.252"
              fill="#fff"
              rx="149.5"
            ></rect>
            <path fill="url(#pattern0_741_18659)" d="M9 0H541V300H9z"></path>
          </g>
          <text
            className="fill-navy-d4 capitalize font-heading font-bold text-3xl"
            x={80}
            y={360}
          >
            Simple, sustainable growth
          </text>
          <g className="font-medium fill-navy-l1 text-xl">
            <text x={20} y={400}>
              The Sustainability Fund is owned & managed by Better
            </text>
            <text x={20} y={430}>
              Giving and invested into a balanced portfolio to protect
            </text>
            <text x={40} y={460}>
              and grow over time - no admin work or liability for
            </text>
            <text x={220} y={490}>
              nonprofits.
            </text>
          </g>
          <defs>
            <clipPath id="clip0_740_1962">
              <rect
                width="299"
                height="299"
                x="125.5"
                y="0.252"
                fill="#fff"
                rx="149.5"
              />
            </clipPath>
          </defs>

          <image
            href={benefits.sf[1].img}
            width="302"
            height="302"
            x="124"
            y="0"
          />
        </svg>

        <svg
          width={550}
          height={560}
          x={1700}
          y={170}
          id="bubble3"
          className="grayscale"
          viewBox="0 0 582 560"
        >
          <circle
            cx="275"
            cy="150"
            r="151"
            fill="none"
            stroke="#5b8fbf"
            strokeWidth="28"
          />
          <g clipPath="url(#clip0_741_18653)">
            <rect
              width="299"
              height="299"
              x="125.5"
              y="0.252"
              fill="#fff"
              rx="149.5"
            ></rect>
            <path fill="url(#pattern0_741_18653)" d="M9 0H541V300H9z"></path>
          </g>
          <text
            className="fill-navy-d4 capitalize font-heading font-bold text-3xl"
            x={100}
            y={360}
          >
            Reliable funding stream
          </text>
          <g className="font-medium fill-navy-l1 text-xl">
            <text x={60} y={400}>
              Sustainability fund growth is paid out quarterly,
            </text>
            <text x={45} y={430}>
              providing nonprofits with a new source of recurring
            </text>
            <text x={52} y={460}>
              revenue - consistent funding that doesn't rely on
            </text>
            <text x={210} y={490}>
              donation cycles.
            </text>
          </g>
          <defs>
            <clipPath id="clip0_740_1962">
              <rect
                width={299}
                height={299}
                x={125.5}
                y={0.252}
                fill="#fff"
                rx={149.5}
              />
            </clipPath>
          </defs>

          <image
            href={benefits.sf[2].img}
            width={302}
            height={302}
            x={124}
            y={0}
          />
        </svg>

        <svg
          width={550}
          height={500}
          x={2600}
          y={300}
          id="bubble4"
          className="grayscale"
          viewBox="0 0 582 500"
        >
          <circle
            cx="275"
            cy="150"
            r="151"
            fill="none"
            stroke="#5b8fbf"
            strokeWidth="28"
          />
          <rect
            width="299"
            height="299"
            x="125.5"
            y="0.252"
            fill="#fff"
            rx="149.5"
          ></rect>
          <g clipPath="url(#clip0_741_18665)">
            <rect
              width="23.685"
              height="96.931"
              x="203.855"
              y="59.006"
              fill="url(#paint0_linear_741_18665)"
              rx="11.842"
            ></rect>
            <path
              fill="url(#paint1_linear_741_18665)"
              fillRule="evenodd"
              d="M322.715 144.753c0-6.419 5.204-11.623 11.623-11.623 6.42 0 11.623 5.204 11.623 11.623v56.026c0 .139-.002.277-.007.415-.393 21.34-17.814 38.518-39.248 38.518-21.68 0-39.255-17.575-39.255-39.255h.05c-.033-.362-.05-.728-.05-1.098 0-6.54 5.302-11.842 11.842-11.842 6.541 0 11.843 5.302 11.843 11.842 0 .37-.017.736-.05 1.098h.05c0 8.599 6.971 15.57 15.57 15.57H306.925c8.721 0 15.79-7.069 15.79-15.79v-55.484z"
              clipRule="evenodd"
            ></path>
            <path
              fill="#316B9C"
              d="M276.964 168.894l-1.975-1.975 17.778-29.075s-.807 1.875-.998 3.394c-.19 1.52-.157 3.101-.157 3.101l-14.652 24.555h.004zM272.932 121.432l1.974 1.975-16.626 28.571.145-5.862 14.507-24.684z"
            ></path>
            <mask
              id="mask0_741_18665"
              style={{ maskType: "luminance" }}
              width="142"
              height="81"
              x="204"
              y="105"
              maskUnits="userSpaceOnUse"
            >
              <path
                fill="#fff"
                d="M344.593 134.08c-2.584-9.622-8.827-18.258-18.13-23.632-9.315-5.374-19.906-6.463-29.527-3.887-10.619 2.84-18.436 9.133-23.632 18.129l-16.937 29.349a15.387 15.387 0 01-21.019 5.643 15.301 15.301 0 01-7.167-9.34 15.333 15.333 0 011.536-11.679 15.304 15.304 0 019.34-7.167 15.308 15.308 0 0111.667 1.536 15.367 15.367 0 017.179 9.34c.397 1.512.575 3.072.513 4.646l14.66-25.408a38.874 38.874 0 00-10.582-8.955c-9.302-5.362-19.905-6.459-29.527-3.875-9.621 2.571-18.258 8.814-23.632 18.129a38.747 38.747 0 00-4.86 14.151 39.162 39.162 0 00.985 15.36c2.571 9.621 8.815 18.258 18.13 23.632 9.303 5.373 19.893 6.458 29.515 3.887 10.619-2.84 18.435-9.133 23.631-18.129l16.95-29.35a15.367 15.367 0 019.34-7.179c3.801-1.01 7.995-.587 11.667 1.549a15.335 15.335 0 017.179 9.34 15.37 15.37 0 01-1.549 11.667 15.3 15.3 0 01-9.34 7.166 15.3 15.3 0 01-11.667-1.536 15.3 15.3 0 01-7.166-9.34 15.393 15.393 0 01-.526-4.645l-14.66 25.408a38.892 38.892 0 0010.582 8.955c9.315 5.374 19.906 6.463 29.527 3.875 9.622-2.571 18.258-8.814 23.632-18.129a38.755 38.755 0 004.861-14.151 39.181 39.181 0 00-.973-15.364v.004z"
              ></path>
            </mask>
            <g mask="url(#mask0_741_18665)">
              <mask
                id="mask1_741_18665"
                style={{ maskType: "luminance" }}
                width="144"
                height="82"
                x="203"
                y="104"
                maskUnits="userSpaceOnUse"
              >
                <path
                  fill="#fff"
                  d="M346.436 104.714H203.61v81.072h142.826v-81.072z"
                ></path>
              </mask>
              <g mask="url(#mask1_741_18665)">
                <mask
                  id="mask2_741_18665"
                  style={{ maskType: "luminance" }}
                  width="144"
                  height="82"
                  x="203"
                  y="104"
                  maskUnits="userSpaceOnUse"
                >
                  <path
                    fill="#fff"
                    d="M346.436 104.714H203.61v81.072h142.826v-81.072z"
                  ></path>
                </mask>
                <g mask="url(#mask2_741_18665)">
                  <path
                    fill="url(#pattern0_741_18665)"
                    d="M203.576 104.71H346.459V185.79H203.576z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
          <text
            className="fill-navy-d4 capitalize font-heading font-bold text-3xl"
            x={240}
            y={360}
          >
            Result:
          </text>
          <g className="font-medium fill-navy-l1 text-xl">
            <text x={35} y={400}>
              Better Giving provides nonprofits with a simple path to
            </text>
            <text x={41} y={430}>
              financial stability while giving donors a way to amplify
            </text>
            <text x={43} y={460}>
              their impact, ensuring their gift continues to provide
            </text>
            <text x={120} y={490}>
              support - not just today, but every day.
            </text>
          </g>
          <defs>
            <clipPath id="clip0_740_1974">
              <rect
                width={299}
                height={299}
                x={125.5}
                y={0.252}
                fill="#fff"
                rx={149.5}
              />
            </clipPath>
          </defs>

          <image
            href={benefits.sf[3].img}
            width={302}
            height={302}
            x={124}
            y={0}
          />
        </svg>
      </svg>
    </div>
  );
};

export default AnimatedSVG;
