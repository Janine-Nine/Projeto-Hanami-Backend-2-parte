import { z } from 'zod';

export const transactionSchema = z.object({
  id_transacao: z.string(),
  data_venda: z.string(),
  valor_final: z.coerce.number().nonnegative(),
  subtotal: z.coerce.number().optional(),
  desconto_percent: z.coerce.number().optional(),
  canal_venda: z.string().optional(),
  forma_pagamento: z.string().optional(),

  cliente_id: z.string().optional(),
  nome_cliente: z.string().optional(),
  idade_cliente: z.coerce.number().int().optional(),
  genero_cliente: z.string().optional(),
  cidade_cliente: z.string().optional(),
  estado_cliente: z.string().optional(),
  renda_estimada: z.coerce.number().optional(),

  produto_id: z.string(),
  nome_produto: z.string(),
  categoria: z.string().optional(),
  marca: z.string().optional(),
  preco_unitario: z.coerce.number().optional(),
  quantidade: z.coerce.number().int().optional(),
  margem_lucro: z.coerce.number().optional(),

  regiao: z.string().optional(),
  status_entrega: z.string().optional(),
  tempo_entrega_dias: z.coerce.number().int().optional(),
  vendedor_id: z.string().optional()
});
