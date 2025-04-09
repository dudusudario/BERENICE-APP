import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import Toast from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza corretamente com mensagem e tipo', () => {
    render(<Toast message="Teste de mensagem" type="success" />);
    expect(screen.getByText('Teste de mensagem')).toBeInTheDocument();
  });

  it('chama onRemove após o tempo de duração', () => {
    const onRemove = vi.fn();
    render(<Toast message="Teste" type="success" duration={1000} onRemove={onRemove} />);

    act(() => {
      vi.advanceTimersByTime(1300); // 1000ms + 300ms da animação
    });

    expect(onRemove).toHaveBeenCalled();
  });

  it('aplica a classe correta baseada no tipo', () => {
    const { container } = render(<Toast message="Teste" type="error" />);
    expect(container.firstChild).toHaveClass('toast error');
  });

  it('mostra a barra de progresso', () => {
    const { container } = render(<Toast message="Teste" type="info" />);
    expect(container.querySelector('.toast-progress')).toBeInTheDocument();
  });
}); 