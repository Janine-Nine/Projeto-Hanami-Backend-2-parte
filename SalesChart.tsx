import { Bar } from 'react-chartjs-2';

export function SalesChart({ labels, values }: any) {
  return (
    <Bar
      data={{
        labels,
        datasets: [{ data: values }]
      }}
    />
  );
}
