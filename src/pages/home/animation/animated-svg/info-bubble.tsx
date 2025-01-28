import type React from "react";

interface BubbleContent {
  title: string;
  text: string;
}

interface InfoBubbleProps {
  id: string;
  x: string | number;
  y: string | number;
  content: BubbleContent;
  imageUrl: string;
}

export const InfoBubble: React.FC<InfoBubbleProps> = ({
  id,
  x,
  y,
  content,
  imageUrl,
}) => {
  const height = 500;
  return (
    <svg
      id={id}
      className="grayscale"
      width="520"
      height={height}
      viewBox={`0 0 560 ${height}`}
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
        strokeWidth="25"
      />
      <image href={imageUrl} width="272" height="272" x="112" y="0" />
      <text
        className="fill-gray-d4 capitalize font-heading font-bold text-3xl"
        x="248"
        y="317"
        textAnchor="middle"
      >
        {content.title}
      </text>
      <text
        className="font-medium fill-gray text-xl"
        x="248"
        y="351"
        textAnchor="middle"
      >
        {wrapText(content.text, 50).map((line, index) => (
          <tspan key={index} x="248" dy={index === 0 ? 0 : 27}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
};

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
