import { Line } from 'react-chartjs-2';

export function AdvancedChart({ labels, values }: any) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Faturamento',
            data: values,
            borderWidth: 2,
            tension: 0.4
          }
        ]
      }}
    />
  );
}
