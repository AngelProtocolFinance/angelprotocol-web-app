import type React from "react";

interface BubbleContent {
  title: string;
  text: string;
}

interface InfoBubbleProps {
  id: string;
  x: string | number;
  y: string | number;
  height?: number;
  content: BubbleContent;
  imageUrl: string;
}

export const InfoBubble: React.FC<InfoBubbleProps> = ({
  id,
  x,
  y,
  height = 500,
  content,
  imageUrl,
}) => (
  <svg
    id={id}
    className="grayscale"
    width="550"
    height={height}
    viewBox={`0 0 582 ${height}`}
    fill="#fff"
    x={x}
    y={y}
  >
    <circle
      cx="275"
      cy="150"
      r="151"
      fill="none"
      stroke="#5b8fbf"
      strokeWidth="28"
    />
    <image href={imageUrl} width="302" height="302" x="124" y="0" />
    <text
      className="fill-navy-d4 capitalize font-heading font-bold text-3xl"
      x="275"
      y="350"
      textAnchor="middle"
    >
      {content.title}
    </text>
    <text
      className="font-medium fill-navy-l1 text-xl"
      x="275"
      y="390"
      textAnchor="middle"
    >
      {wrapText(content.text, 60).map((line, index) => (
        <tspan key={index} x="275" dy={index === 0 ? 0 : 30}>
          {line}
        </tspan>
      ))}
    </text>
  </svg>
);

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxChars) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
