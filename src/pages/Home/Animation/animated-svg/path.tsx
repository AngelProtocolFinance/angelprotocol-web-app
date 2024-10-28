import type React from "react";

export const Path: React.FC = () => (
  <path
    stroke="url(#a)"
    strokeLinecap="round"
    strokeWidth={46}
    d="M547.499 92.252c-407-199.999-633 82.501-472.5 254.501C235.5 518.753 735.5 128.252 824 424.743c88.5 296.49 380.3 108.757 543.5 15.757C1593 312 1753 238.5 2012 339.5S2499 678 2892 448"
    className="line"
  />
);
export const PathGradient: React.FC = () => (
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
);

export const Ball: React.FC = () => (
  <circle cx={50} cy={100} r={22} className="fill-[#76ceeb]" id="ball" />
);
