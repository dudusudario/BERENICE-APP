import { axe } from 'axe-core';

/**
 * Utilitário para testar acessibilidade com axe-core
 * Use apenas em ambiente de desenvolvimento
 */
export const testAccessibility = async (container) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  try {
    const results = await axe.run(container);
    
    if (results.violations.length > 0) {
      console.group('Problemas de acessibilidade detectados:');
      results.violations.forEach((violation) => {
        console.groupCollapsed(
          `%c${violation.impact} %c${violation.description}`,
          `color: ${getImpactColor(violation.impact)}; font-weight: bold`,
          'color: inherit'
        );
        console.log('Elementos afetados:', violation.nodes.length);
        violation.nodes.forEach((node) => {
          console.log('Elemento:', node);
        });
      });
      console.groupEnd();
    }
  } catch (error) {
    console.error('Erro ao testar acessibilidade:', error);
  }
}; 