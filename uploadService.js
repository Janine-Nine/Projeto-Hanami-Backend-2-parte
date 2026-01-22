import { prisma } from '../config/prisma.js';
import { transactionSchema } from '../validators/uploadSchema.js';
import { logger } from '../utils/logger.js';

export async function processFile(rows) {
  const validRows = [];
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const parsed = transactionSchema.safeParse(row);
    if (!parsed.success) {
      errors.push({ row: i + 1, issues: parsed.error.errors });
      continue;
    }

    const v = parsed.data;
    validRows.push({
      id_transacao: v.id_transacao,
      data_venda: new Date(v.data_venda),
      valor_final: v.valor_final,
      subtotal: v.subtotal ?? null,
      desconto_percent: v.desconto_percent ?? null,
      canal_venda: v.canal_venda,
      forma_pagamento: v.forma_pagamento ?? null,
      cliente_id: v.cliente_id ?? null,
      nome_cliente: v.nome_cliente ?? null,
      idade_cliente: v.idade_cliente ?? null,
      genero_cliente: v.genero_cliente ?? null,
      cidade_cliente: v.cidade_cliente ?? null,
      estado_cliente: v.estado_cliente ?? null,
      renda_estimada: v.renda_estimada ?? null,
      produto_id: v.produto_id,
      nome_produto: v.nome_produto,
      categoria: v.categoria,
      marca: v.marca,
      preco_unitario: v.preco_unitario ?? null,
      quantidade: v.quantidade,
      margem_lucro: v.margem_lucro ?? null,
      regiao: v.regiao ?? null,
      status_entrega: v.status_entrega ?? null,
      tempo_entrega_dias: v.tempo_entrega_dias ?? null,
      vendedor_id: v.vendedor_id ?? null
    });
  }

  // Insert in chunks for large files
  let inserted = 0;
  const chunkSize = 1000;
  try {
    for (let i = 0; i < validRows.length; i += chunkSize) {
      const chunk = validRows.slice(i, i + chunkSize);
      const res = await prisma.transaction.createMany({ data: chunk });
      if (res && typeof res.count === 'number') inserted += res.count;
      else inserted += chunk.length;
    }
  } catch (err) {
    logger.error('Falha ao inserir transações em lote', { error: err?.message ?? err });
    // If DB not available or insertion fails, return parsed preview and error
    return {
      inserted: 0,
      errorsCount: errors.length,
      errorsSample: errors.slice(0, 10),
      warning: 'Inserção no banco falhou — verifique conexão com o banco',
      parsedPreview: validRows.slice(0, 10)
    };
  }

  return { inserted, errorsCount: errors.length, errorsSample: errors.slice(0, 10) };
}
