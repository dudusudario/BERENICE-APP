import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserStatus } from '../useUserStatus';

describe('useUserStatus hook', () => {
  it('deve iniciar com status offline', () => {
    const { result } = renderHook(() => useUserStatus());
    
    expect(result.current.status).toBe('offline');
    expect(result.current.lastActivity).toBeDefined();
  });

  it('deve atualizar status para online', async () => {
    const { result } = renderHook(() => useUserStatus());

    await act(async () => {
      await result.current.setStatus('online');
    });

    expect(result.current.status).toBe('online');
    expect(result.current.lastActivity).toBeDefined();
  });

  it('deve atualizar status para away após inatividade', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useUserStatus());

    // Definir status como online
    await act(async () => {
      await result.current.setStatus('online');
    });

    // Avançar 5 minutos
    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(result.current.status).toBe('away');
    vi.useRealTimers();
  });

  it('deve atualizar lastActivity ao interagir', async () => {
    const { result } = renderHook(() => useUserStatus());
    const initialLastActivity = result.current.lastActivity;

    // Simular interação do usuário
    await act(async () => {
      await result.current.updateActivity();
    });

    expect(result.current.lastActivity).not.toBe(initialLastActivity);
  });

  it('deve persistir status no localStorage', async () => {
    const { result } = renderHook(() => useUserStatus());

    await act(async () => {
      await result.current.setStatus('online');
    });

    expect(localStorage.getItem('userStatus')).toBe('online');
  });

  it('deve restaurar status do localStorage ao iniciar', () => {
    // Configurar status no localStorage
    localStorage.setItem('userStatus', 'online');
    localStorage.setItem('lastActivity', new Date().toISOString());

    const { result } = renderHook(() => useUserStatus());

    expect(result.current.status).toBe('online');
  });
}); 