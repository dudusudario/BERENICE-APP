import React from 'react';
import { useToast } from '../contexts/ToastContext';

const ExemploToast = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Exemplo de Notificações</h2>
      
      <div className="space-x-4">
        <button
          onClick={() => showSuccess('Operação realizada com sucesso!')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sucesso
        </button>

        <button
          onClick={() => showError('Ocorreu um erro ao processar a solicitação.')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Erro
        </button>

        <button
          onClick={() => showWarning('Atenção! Esta ação não pode ser desfeita.')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Aviso
        </button>

        <button
          onClick={() => showInfo('Esta é uma mensagem informativa.')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Info
        </button>

        <button
          onClick={() => {
            showSuccess('Primeiro toast');
            setTimeout(() => showInfo('Segundo toast'), 1000);
            setTimeout(() => showWarning('Terceiro toast'), 2000);
          }}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Múltiplos
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Como usar:</h3>
        <pre className="bg-white p-4 rounded text-sm">
{`import { useToast } from '../contexts/ToastContext';

const { showSuccess, showError, showWarning, showInfo } = useToast();

// Exibir uma notificação
showSuccess('Mensagem de sucesso');
showError('Mensagem de erro');
showWarning('Mensagem de aviso');
showInfo('Mensagem informativa');`}
        </pre>
      </div>
    </div>
  );
};

export default ExemploToast; 