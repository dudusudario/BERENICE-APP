import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  it('renderiza corretamente com texto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('aplica classe de variante corretamente', () => {
    render(<Button variant="primary">Botão Primário</Button>);
    const button = screen.getByText('Botão Primário');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('mostra estado de loading quando loading=true', () => {
    render(<Button loading>Carregando</Button>);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('chama onClick quando clicado', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clicável</Button>);
    
    await userEvent.click(screen.getByText('Clicável'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 