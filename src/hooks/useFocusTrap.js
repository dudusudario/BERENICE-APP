import { useEffect, useRef } from 'react';

/**
 * Hook para criar uma armadilha de foco - útil para modais, menus etc.
 * @param {boolean} active - Se a armadilha de foco está ativa
 * @param {Function} onEscape - Callback para quando Esc é pressionado
 * @returns {Object} Ref para o elemento a ser focado
 */
export function useFocusTrap(active = true, onEscape = () => {}) {
  const rootRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Salvar o elemento que estava focado anteriormente
  useEffect(() => {
    if (active) {
      previouslyFocusedElement.current = document.activeElement;
    }
  }, [active]);

  // Definir o foco inicial quando o trap é ativado
  useEffect(() => {
    if (!active || !rootRef.current) return;

    // Encontrar todos os elementos focáveis dentro do container
    const focusableElements = rootRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    // Focar o primeiro elemento
    setTimeout(() => {
      focusableElements[0]?.focus();
    }, 50);
  }, [active]);

  // Restaurar o foco quando o trap é desativado
  useEffect(() => {
    if (!active && previouslyFocusedElement.current) {
      setTimeout(() => {
        previouslyFocusedElement.current?.focus();
      }, 50);
    }
  }, [active]);

  // Manipular eventos de teclado
  useEffect(() => {
    if (!active || !rootRef.current) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      if (!rootRef.current) return;

      // Obter todos os elementos focáveis
      const focusableElements = Array.from(
        rootRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.disabled && el.getAttribute('tabindex') !== '-1');

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab no primeiro elemento vai para o último
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // Tab no último elemento vai para o primeiro
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    // Adicionar listener
    document.addEventListener('keydown', handleKeyDown);

    // Limpar listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onEscape]);

  return rootRef;
} 