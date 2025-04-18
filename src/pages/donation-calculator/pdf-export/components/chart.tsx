import { G, Line, Path, Svg, Text as SvgText, View } from "@react-pdf/renderer";
import { amber, blue, gray, green } from "../styles";

interface Point {
  year: string;
  amount: number;
  liq: number;
  savings: number;
  lock: number;
  total: number;
}

interface PDFChartProps {
  points: Point[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  showLegend?: boolean;
}

export const Chart: React.FC<PDFChartProps> = ({
  points,
  width = 500,
  height = 300,
  margin = { top: 10, right: 40, bottom: 40, left: 40 },
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate the maximum value for the y-axis
  const maxValue = Math.max(...points.map((p) => p.savings + p.liq + p.lock));
  const axisMax = Math.ceil(maxValue / 100000) * 100000;

  // Scales for x and y axes
  const xScale = (index: number) =>
    margin.left + (index / (points.length - 1)) * chartWidth;
  const yScale = (value: number) =>
    margin.top + chartHeight - (value / axisMax) * chartHeight;

  // Generate area path for stacked layers
  const generateAreaPath = (dataKeys: (keyof Point)[]) => {
    let d = "";
    const firstCumulativeValue = dataKeys.reduce(
      (sum, key) => sum + Number(points[0][key]),
      0
    );
    d += `M ${xScale(0)} ${yScale(firstCumulativeValue)} `;

    // Forward path (top of the stack)
    let pointIndex = 0;
    for (const point of points) {
      const value = dataKeys.reduce((sum, key) => sum + Number(point[key]), 0);
      d += `L ${xScale(pointIndex)} ${yScale(value)} `;
      pointIndex++;
    }

    // Reverse path (base of the stack, excluding the current layer)
    const baseKeys = dataKeys.slice(0, -1); // Exclude the topmost layer
    for (let i = points.length - 1; i >= 0; i--) {
      const baseValue = baseKeys.reduce(
        (sum, key) => sum + Number(points[i][key]),
        0
      );
      d += `L ${xScale(i)} ${yScale(baseValue)} `;
    }

    d += "Z";
    return d;
  };

  // Generate line path for the total
  const generateLinePath = (dataKey: keyof Point) => {
    let d = "";
    d += `M ${xScale(0)} ${yScale(Number(points[0][dataKey]))} `;
    let pointIndex = 0;
    for (const point of points) {
      d += `L ${xScale(pointIndex)} ${yScale(Number(point[dataKey]))} `;
      pointIndex++;
    }
    return d;
  };

  // Y-axis ticks
  const yAxisTicks = [];
  const numTicks = 5;
  for (let i = 0; i <= numTicks; i++) {
    const value = (axisMax / numTicks) * i;
    const y = yScale(value);

    let label = "";
    if (value >= 1000000) {
      label = `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      label = `$${(value / 1000).toFixed(0)}K`;
    } else {
      label = `$${value}`;
    }

    yAxisTicks.push(
      <G key={`y-tick-${i}`}>
        <Line
          x1={margin.left - 5}
          y1={y}
          x2={margin.left}
          y2={y}
          stroke={gray.d1}
          strokeWidth={1}
        />
        <SvgText
          x={margin.left - 8}
          y={y + 4}
          style={{ fontSize: 8, textAnchor: "end", fontFamily: "Quicksand" }}
        >
          {label}
        </SvgText>
        <Line
          x1={margin.left}
          y1={y}
          x2={width - margin.right}
          y2={y}
          stroke={gray.l2}
          strokeWidth={0.5}
          strokeDasharray="3,3"
        />
      </G>
    );
  }

  // X-axis ticks
  const xAxisTicks = [];
  let tickIndex = 0;
  for (const point of points) {
    const showLabel =
      tickIndex % Math.ceil(points.length / 10) === 0 ||
      tickIndex === points.length - 1;

    if (showLabel) {
      const x = xScale(tickIndex);
      xAxisTicks.push(
        <G key={`x-tick-${tickIndex}`}>
          <Line
            x1={x}
            y1={height - margin.bottom}
            x2={x}
            y2={height - margin.bottom + 5}
            stroke="#666"
            strokeWidth={1}
          />
          <SvgText
            x={x}
            y={height - margin.bottom + 15}
            style={{
              fontSize: 8,
              textAnchor: "middle",
              fontFamily: "Quicksand",
            }}
          >
            {point.year}
          </SvgText>
        </G>
      );
    }
    tickIndex++;
  }

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {/* Savings area */}
        <Path
          d={generateAreaPath(["savings"])}
          fill={green.l3}
          stroke={green.d1}
          strokeWidth={1}
        />
        {/* Liquid area (stacked on savings) */}
        <Path
          d={generateAreaPath(["savings", "liq"])}
          fill={amber.l1}
          stroke={amber.d}
          strokeWidth={1}
        />
        {/* Locked area (stacked on savings + liquid) */}
        <Path
          d={generateAreaPath(["savings", "liq", "lock"])}
          fill={blue.l1}
          stroke={blue.d}
          strokeWidth={1}
        />
        {/* Total line */}
        <Path
          d={generateLinePath("total")}
          fill="none"
          stroke={blue.d1}
          strokeWidth={2}
        />
        {/* Axes */}
        <Line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom}
          stroke={gray.d1}
          strokeWidth={1}
        />
        <Line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          stroke={gray.d1}
          strokeWidth={1}
        />
        {yAxisTicks}
        {xAxisTicks}
      </Svg>
    </View>
  );
};
