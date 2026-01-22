import { pool } from '../config/database.js';

export async function fetchSalesSummary() {
  const [rows] = await pool.query(`
    SELECT 
      COUNT(*) AS total_vendas,
      SUM(valor_final) AS faturamento_total,
      AVG(valor_final) AS ticket_medio
    FROM transactions
  `);
  return rows[0];
}

export async function fetchRegionalPerformance() {
  const [rows] = await pool.query(`
    SELECT regiao, SUM(valor_final) AS total
    FROM transactions
    GROUP BY regiao
  `);
  return rows;
}
