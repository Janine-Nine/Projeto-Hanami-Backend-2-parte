export interface SalesSummary {
  total_vendas: number;
  faturamento_total: number;
  ticket_medio: number;
}

export interface ProductAnalysis {
  nome_produto: string;
  _sum: {
    valor_final: number;
    quantidade: number;
  };
}