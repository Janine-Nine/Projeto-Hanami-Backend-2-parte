import { SalesSummary } from '../types/Reports';

export function SalesSummaryCard({ data }: { data: SalesSummary }) {
  return (
    <div>
      <h3>Vendas</h3>
      <p>Total: {data.total_vendas}</p>
      <p>Faturamento: R$ {data.faturamento_total}</p>
      <p>Ticket Médio: R$ {data.ticket_medio}</p>
    </div>
  );
}
