import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ProductAnalysis } from '../types/Reports';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Products() {
  const [products, setProducts] = useState<ProductAnalysis[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/reports/product-analysis')
      .then(res => setProducts(res.data))
      .catch(err => setError('Erro ao carregar produtos: ' + err.message));
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-hanami mb-8">📦 Produtos</h1>
          
          {error && <p style={{ color: 'var(--danger)' }} className="mb-4">{error}</p>}
          
          {products.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.nome_produto} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                  <h2 className="text-xl font-bold text-hanami mb-2">{p.nome_produto}</h2>
                  <p className="text-gray-600 mb-4">Análise de vendas</p>
                  <div className="text-2xl font-bold text-hanami">R$ {parseFloat(String(p._sum?.valor_final || 0)).toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
