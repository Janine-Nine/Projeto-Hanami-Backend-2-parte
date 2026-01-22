import { prisma } from '../config/prisma.js';

export async function getSalesSummary() {
  const total = await prisma.transaction.aggregate({
    _sum: { valor_final: true },
    _avg: { valor_final: true },
    _count: true
  });

  return {
    total_vendas: total._count,
    faturamento_total: total._sum.valor_final,
    ticket_medio: total._avg.valor_final
  };
}
export async function getProductAnalysis() {
  return prisma.transaction.groupBy({
    by: ['nome_produto'],
    _sum: { valor_final: true, quantidade: true },
    orderBy: {
      _sum: { valor_final: 'desc' }
    }
  });
}
