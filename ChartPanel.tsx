import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default function ChartPanel() {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr"],
    datasets: [
      {
        label: "Vendas",
        data: [120, 190, 300, 250],
        borderColor: "#d94f70",
      },
    ],
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold mb-4">📈 Vendas Mensais</h2>
      <Line data={data} />
    </div>
  )
}
