import { render, screen } from '@testing-library/react';
import ToastContainer from '../ToastContainer';

describe('ToastContainer', () => {
  const mockToasts = [
    { id: '1', message: 'Sucesso', type: 'success' },
    { id: '2', message: 'Erro', type: 'error' }
  ];

  it('renderiza múltiplos toasts', () => {
    render(<ToastContainer toasts={mockToasts} removeToast={() => {}} />);
    
    expect(screen.getByText('Sucesso')).toBeInTheDocument();
    expect(screen.getByText('Erro')).toBeInTheDocument();
  });

  it('passa a função removeToast corretamente', () => {
    const removeToast = vi.fn();
    const { container } = render(
      <ToastContainer toasts={mockToasts} removeToast={removeToast} />
    );

    expect(container.querySelectorAll('.toast')).toHaveLength(2);
  });

  it('renderiza container vazio quando não há toasts', () => {
    const { container } = render(
      <ToastContainer toasts={[]} removeToast={() => {}} />
    );

    expect(container.querySelector('.toast-container')).toBeEmptyDOMElement();
  });
}); 