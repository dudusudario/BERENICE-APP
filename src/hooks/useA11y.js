import { useEffect, useRef } from 'react';
import { testAccessibility } from '../utils/a11yTester';

/**
 * Hook para testar acessibilidade em componentes
 * @param {boolean} enabled - Ativa ou desativa o teste (true por padrão em desenvolvimento)
 * @returns {Object} Ref para o elemento a ser testado
 */
export const useA11y = (enabled = process.env.NODE_ENV === 'development') => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!enabled || !ref.current) return;
    
    // Pequeno delay para garantir que o componente foi renderizado completamente
    const timer = setTimeout(() => {
      testAccessibility(ref.current);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [enabled]);
  
  return ref;
}; 