import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';

// Mock do supabase client
const supabaseMock = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      order: vi.fn(() => ({
        limit: vi.fn(() => ({
          data: [
            {
              id: 1,
              content: 'Mensagem de teste',
              created_at: new Date().toISOString(),
              user_id: 'user-1',
            },
          ],
          error: null,
        })),
      })),
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => ({
          data: {
            id: 2,
            content: 'Nova mensagem',
            created_at: new Date().toISOString(),
            user_id: 'user-1',
          },
          error: null,
        })),
      })),
    })),
  })),
  channel: vi.fn(() => ({
    on: vi.fn(() => ({
      subscribe: vi.fn(),
    })),
  })),
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => supabaseMock,
}));

describe('useChat hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve iniciar com lista de mensagens vazia', () => {
    const { result } = renderHook(() => useChat());
    
    expect(result.current.messages).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('deve carregar mensagens iniciais', async () => {
    const { result } = renderHook(() => useChat());

    // Esperar carregamento inicial
    await act(async () => {
      await result.current.loadInitialMessages();
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.loading).toBe(false);
  });

  it('deve enviar nova mensagem', async () => {
    const { result } = renderHook(() => useChat());
    const newMessage = 'Nova mensagem de teste';

    await act(async () => {
      await result.current.sendMessage(newMessage);
    });

    expect(supabaseMock.from).toHaveBeenCalledWith('messages');
    expect(result.current.messages).toHaveLength(1);
  });

  it('deve lidar com erro ao enviar mensagem', async () => {
    // Mock de erro
    supabaseMock.from.mockImplementationOnce(() => ({
      insert: () => ({
        select: () => ({
          single: () => ({
            data: null,
            error: new Error('Erro ao enviar mensagem'),
          }),
        }),
      }),
    }));

    const { result } = renderHook(() => useChat());
    const newMessage = 'Mensagem com erro';

    await act(async () => {
      try {
        await result.current.sendMessage(newMessage);
      } catch (error) {
        expect(error.message).toBe('Erro ao enviar mensagem');
      }
    });
  });

  it('deve se inscrever em atualizações em tempo real', () => {
    renderHook(() => useChat());

    expect(supabaseMock.channel).toHaveBeenCalled();
  });

  it('deve atualizar mensagens ao receber nova mensagem em tempo real', async () => {
    const { result } = renderHook(() => useChat());
    const newRealtimeMessage = {
      id: 3,
      content: 'Mensagem em tempo real',
      created_at: new Date().toISOString(),
      user_id: 'user-2',
    };

    await act(async () => {
      // Simular recebimento de mensagem em tempo real
      result.current.handleNewMessage(newRealtimeMessage);
    });

    expect(result.current.messages).toContainEqual(newRealtimeMessage);
  });
}); 