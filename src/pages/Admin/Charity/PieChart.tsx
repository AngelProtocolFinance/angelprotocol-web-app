import {
  ArcElement,
  Chart,
  ChartData,
  Legend,
  PieController,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useRef } from "react";
import { roundDownToNum } from "helpers";

const bgColors = [
  "#f0f9ff",
  "#bae6fd",
  "#38bdf8",
  "#0284c7",
  "#075985",
  "#064e3b",
  "#0f766e",
  "#14b8a6",
  "#5eead4",
];

type Slice = { name: string; value: number };
type Props = {
  slices: Slice[];
  max: number;
  classes?: { container?: string };
};

export default function PieChart({ slices, max, classes }: Props) {
  const total = slices.reduce((total, slice) => total + slice.value, 0);
  const chartRef = useRef<Chart>();

  useEffect(() => {
    const chartData: ChartData<"pie"> = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };

    if (chartRef.current && total <= max) {
      const unallocated = roundDownToNum(max - total, 2);

      for (const { name, value } of slices) {
        chartData.labels?.push(name);
        chartData.datasets[0].data.push(value);
      }

      if (unallocated > 0) {
        chartData.labels?.push(`UNALLOCATED`);
        chartData.datasets[0].data.push(unallocated);
      }

      chartData.datasets[0].backgroundColor = bgColors;

      chartRef.current.data = chartData;
      chartRef.current.update("none");
    }
  }, [total, slices]);

  const canvasRef = useCallback((node: HTMLCanvasElement | null) => {
    Chart.register(PieController, ArcElement, Legend, Tooltip);

    if (node && !chartRef.current) {
      chartRef.current = new Chart(
        { canvas: node },
        {
          type: "pie",
          data: { labels: [], datasets: [] },
          // plugins: [plugin],
          options: {
            aspectRatio: 1,
            plugins: {
              legend: {
                //do nothing when clicking
                onClick: () => {},
                labels: {
                  font: {
                    size: 12,
                    family: "monospace",
                  },
                  color: "white",
                  boxWidth: 10,
                  boxHeight: 10,
                },
                position: "right",
              },
            },
            elements: {
              arc: {
                borderWidth: 0,
              },
            },
          },
        }
      );
    }
  }, []);

  return (
    <div
      className={`${classes?.container ?? ""} ${
        slices.length <= 0 ? "hidden" : "block"
      }`}
    >
      <canvas ref={canvasRef} className="bg-transparent" />
    </div>
  );
}
