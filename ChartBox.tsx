import { Line } from 'react-chartjs-2'

type Props = {
  data: any
}

export function ChartBox({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <Line data={data} />
    </div>
  )
}
