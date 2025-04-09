import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/ToastContainer';

/**
 * @typedef {Object} Toast
 * @property {string} id - ID único da notificação
 * @property {string} message - Mensagem a ser exibida
 * @property {'success' | 'error' | 'warning' | 'info'} type - Tipo da notificação
 * @property {number} [duration=3000] - Duração em milissegundos
 */

/**
 * @typedef {Object} ToastContextValue
 * @property {(message: string) => void} showSuccess - Exibe uma notificação de sucesso
 * @property {(message: string) => void} showError - Exibe uma notificação de erro
 * @property {(message: string) => void} showWarning - Exibe uma notificação de aviso
 * @property {(message: string) => void} showInfo - Exibe uma notificação informativa
 */

/** @type {React.Context<ToastContextValue>} */
const ToastContext = createContext(null);

/**
 * Hook personalizado para acessar o contexto de notificações
 * @returns {ToastContextValue} Funções para exibir notificações
 * @throws {Error} Se usado fora do ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
};

/**
 * Provedor de contexto para o sistema de notificações
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elementos filhos
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Adiciona uma nova notificação à lista
   * @param {Toast} toast - Dados da notificação
   */
  const addToast = useCallback(({ type, message, duration = 5000 }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((state) => [...state, { id, type, message, duration }]);
  }, []);

  /**
   * Remove uma notificação específica
   * @param {string} id - ID da notificação a ser removida
   */
  const removeToast = useCallback((id) => {
    setToasts((state) => state.filter(toast => toast.id !== id));
  }, []);

  /**
   * Exibe uma notificação de sucesso
   * @param {string} message - Mensagem a ser exibida
   */
  const showSuccess = useCallback((message, duration) => {
    addToast({ type: 'success', message, duration });
  }, [addToast]);

  /**
   * Exibe uma notificação de erro
   * @param {string} message - Mensagem a ser exibida
   */
  const showError = useCallback((message, duration) => {
    addToast({ type: 'error', message, duration });
  }, [addToast]);

  /**
   * Exibe uma notificação de aviso
   * @param {string} message - Mensagem a ser exibida
   */
  const showWarning = useCallback((message, duration) => {
    addToast({ type: 'warning', message, duration });
  }, [addToast]);

  /**
   * Exibe uma notificação informativa
   * @param {string} message - Mensagem a ser exibida
   */
  const showInfo = useCallback((message, duration) => {
    addToast({ type: 'info', message, duration });
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        showSuccess,
        showError,
        showWarning,
        showInfo
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastContext; 