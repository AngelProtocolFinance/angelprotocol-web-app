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
  height = 450, // Reduced from 500
  content,
  imageUrl,
}) => (
  <svg
    id={id}
    className="grayscale"
    width="495" // Reduced from 550
    height={height}
    viewBox={`0 0 524 ${height}`}
    fill="#fff"
    x={x}
    y={y}
  >
    <circle
      cx="248"
      cy="135"
      r="136"
      fill="none"
      stroke="#5b8fbf"
      strokeWidth="25" // Reduced from 28
    />
    <image href={imageUrl} width="272" height="272" x="112" y="0" />
    <text
      className="fill-navy-d4 capitalize font-heading font-bold text-3xl"
      x="248"
      y="315"
      textAnchor="middle"
    >
      {content.title}
    </text>
    <text
      className="font-medium fill-navy-l1 text-xl"
      x="248"
      y="351"
      textAnchor="middle"
    >
      {wrapText(content.text, 54).map((line, index) => (
        <tspan key={index} x="248" dy={index === 0 ? 0 : 27}>
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
