import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Teste simples para verificar se a configuração está funcionando
describe('Configuração de testes', () => {
  it('deve funcionar corretamente', () => {
    // Arrange
    const { container } = render(<div data-testid="teste">Teste</div>);
    
    // Act
    const elemento = screen.getByTestId('teste');
    
    // Assert
    expect(elemento).toBeInTheDocument();
    expect(elemento.textContent).toBe('Teste');
  });
}); 