import { render, screen, act } from '@testing-library/react';
import { useToast, ToastProvider } from '../ToastContext';
import { vi } from 'vitest';

const TestComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  
  return (
    <div>
      <button onClick={() => showSuccess('Sucesso!')}>Sucesso</button>
      <button onClick={() => showError('Erro!')}>Erro</button>
      <button onClick={() => showWarning('Aviso!')}>Aviso</button>
      <button onClick={() => showInfo('Info!')}>Info</button>
    </div>
  );
};

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fornece funções de toast através do hook', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Sucesso')).toBeInTheDocument();
    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.getByText('Aviso')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('exibe e remove toasts corretamente', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const successButton = screen.getByText('Sucesso');
    successButton.click();

    expect(screen.getByText('Sucesso!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3300); // 3000ms + 300ms da animação
    });

    expect(screen.queryByText('Sucesso!')).not.toBeInTheDocument();
  });

  it('suporta múltiplos toasts simultaneamente', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const successButton = screen.getByText('Sucesso');
    const errorButton = screen.getByText('Erro');

    successButton.click();
    errorButton.click();

    expect(screen.getByText('Sucesso!')).toBeInTheDocument();
    expect(screen.getByText('Erro!')).toBeInTheDocument();
  });
}); 