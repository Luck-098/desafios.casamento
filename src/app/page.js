'use client';
import { useState } from 'react';

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMensagem('Enviando foto...');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setMensagem('Foto enviada com sucesso! 📸 Mande a próxima!');
    } else {
      setMensagem('Opa, deu um erro. Tenta de novo?');
    }
    
    setIsUploading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-50 text-stone-800">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-3xl font-bold text-stone-900">
          Casamento Lucas & Lorrany
        </h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <h2 className="text-xl font-semibold mb-4">Caça ao Tesouro!</h2>
          <p className="mb-6 text-sm">
            Tire uma foto cumprindo o desafio da sua mesa e envie aqui para o nosso álbum.
          </p>

          <label className="relative flex flex-col items-center justify-center w-full py-4 border-2 border-stone-300 border-dashed rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100 transition-colors">
            <span className="text-base font-medium">
              {isUploading ? 'Carregando...' : '📷 Toque para enviar'}
            </span>
            {/* O "capture" sugere abrir a câmera direto no mobile */}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              capture="environment"
              onChange={handleUpload} 
              disabled={isUploading}
            />
          </label>

          {mensagem && (
            <p className="mt-4 text-sm font-medium text-emerald-600">
              {mensagem}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}