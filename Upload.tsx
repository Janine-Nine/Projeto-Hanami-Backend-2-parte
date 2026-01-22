import React, { useState } from 'react';
import { api } from '../services/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');
    setSuccess(false);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        }
      });
      setSuccess(true);
      setProgress(100);
    } catch (err: any) {
      setError('Erro ao fazer upload: ' + (err?.response?.data?.message || err.message));
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-hanami mb-8">📄 Upload de CSV</h1>

            <div className="border-2 border-dashed border-hanami rounded-lg p-8 text-center">
              <input 
                type="file" 
                accept=".csv"
                onChange={handleUpload}
                disabled={progress > 0 && progress < 100}
                className="w-full"
              />
            </div>

            {error && <p style={{ color: 'var(--danger)' }} className="mt-4 p-4 bg-red-50 rounded text-center">{error}</p>}
            {success && <p style={{ color: 'var(--success)' }} className="mt-4 p-4 bg-green-50 rounded text-center">✓ Upload concluído com sucesso!</p>}

            {progress > 0 && (
              <div className="mt-6">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-hanami h-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-center font-bold text-hanami">{progress}%</p>
              </div>
            )}

            {fileName && <p className="text-gray-600 mt-4 text-center">Arquivo: {fileName}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

