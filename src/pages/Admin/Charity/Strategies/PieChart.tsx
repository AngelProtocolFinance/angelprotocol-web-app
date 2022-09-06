import {
  ArcElement,
  Chart,
  ChartData,
  Legend,
  PieController,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { maskAddress, roundDownToNum } from "helpers";
import { StrategyFormValues } from "./schema";

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

export default function PieChart() {
  const { watch } = useFormContext<StrategyFormValues>();
  const allocations = watch("allocations");
  const total = allocations.reduce(
    (total, curr) => (isNaN(curr.percentage) ? 0 : curr.percentage + total),
    0
  );
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

    if (chartRef.current && total <= 100) {
      const unallocated = roundDownToNum(100 - total, 2);

      for (const { vault, percentage } of allocations) {
        chartData.labels?.push(`${maskAddress(vault)} (${percentage}%)`);
        chartData.datasets[0].data.push(percentage);
      }

      if (unallocated > 0) {
        chartData.labels?.push(`UNALLOCATED (${unallocated}%)`);
        chartData.datasets[0].data.push(unallocated);
      }

      chartData.datasets[0].backgroundColor = bgColors;

      chartRef.current.data = chartData;
      chartRef.current.update("none");
    }
  }, [total, allocations]);

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
    <div className={`max-w-sm ${allocations.length <= 0 ? "hidden" : "block"}`}>
      <canvas ref={canvasRef} className="bg-transparent" />
    </div>
  );
}
