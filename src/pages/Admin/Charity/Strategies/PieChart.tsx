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
import { StrategyFormValues } from "./schema";

export default function PieChart() {
  const { watch, getFieldState } = useFormContext<StrategyFormValues>();
  const allocations = watch("allocations");
  const total = allocations.reduce(
    (total, curr) => (isNaN(curr.percentage) ? 0 : curr.percentage + total),
    0
  );
  // const numAllocationsRef = useRef<number>(allocations.length);
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
      for (const { vault, percentage } of allocations) {
        chartData.labels?.push(vault);
        chartData.datasets[0].data.push(percentage);
      }

      chartData.datasets[0].backgroundColor = allocations.map(
        (_) => `hsla(198, 100%, ${Math.floor(Math.random() * 100)}%, 1)`
      );

      chartRef.current.data = chartData;
      chartRef.current.update("none");
    }

    //eslint-disable-next-line
  }, [allocations.map((a) => a.percentage)]);

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
                    size: 16,
                    family: "Montserrat",
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
    <div className="max-w-sm">
      <canvas ref={canvasRef} className="bg-transparent" />
    </div>
  );
}
