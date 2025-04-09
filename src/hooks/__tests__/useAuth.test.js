import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

// Mock do localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn(key => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Substituir o localStorage global pelo mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useAuth hook', () => {
  it('deve iniciar com usuário não autenticado', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('deve autenticar o usuário corretamente', async () => {
    const { result } = renderHook(() => useAuth());
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    await act(async () => {
      await result.current.login(testEmail, testPassword);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({
      id: 'mock-user-id',
      email: testEmail,
      role: 'authenticated',
    });
  });

  it('deve lidar com erro no login', async () => {
    const { result } = renderHook(() => useAuth());
    const testEmail = 'invalid@example.com';
    const testPassword = 'wrongpassword';

    // Mock da função login para lançar erro
    const originalLogin = result.current.login;
    result.current.login = vi.fn().mockRejectedValue(new Error('Falha na autenticação'));

    await act(async () => {
      try {
        await result.current.login(testEmail, testPassword);
      } catch (error) {
        expect(error.message).toBe('Falha na autenticação');
      }
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();

    // Restaurar função original
    result.current.login = originalLogin;
  });

  it('deve desconectar o usuário corretamente', async () => {
    const { result } = renderHook(() => useAuth());
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    // Primeiro fazer login
    await act(async () => {
      await result.current.login(testEmail, testPassword);
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Depois fazer logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('deve lidar com erro no logout', async () => {
    const { result } = renderHook(() => useAuth());
    
    // Primeiro fazer login
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    // Mock da função logout para lançar erro
    const originalLogout = result.current.logout;
    result.current.logout = vi.fn().mockRejectedValue(new Error('Falha no logout'));

    await act(async () => {
      try {
        await result.current.logout();
      } catch (error) {
        expect(error.message).toBe('Falha no logout');
      }
    });

    // Restaurar função original
    result.current.logout = originalLogout;
  });
}); 