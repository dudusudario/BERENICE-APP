import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChat } from '../useChat';

// Mock do cliente Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            data: [
              { id: 1, content: 'Mensagem 1', created_at: '2024-03-20', user_id: '1' },
              { id: 2, content: 'Mensagem 2', created_at: '2024-03-20', user_id: '2' }
            ],
            error: null
          })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: { id: 3, content: 'Nova mensagem', created_at: '2024-03-20', user_id: '1' },
            error: null
          })
        })
      })
    }),
    channel: () => ({
      on: () => ({
        subscribe: () => ({})
      }),
      unsubscribe: vi.fn()
    })
  })
}));

describe('useChat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve inicializar com lista de mensagens vazia e loading true', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('deve carregar mensagens iniciais', async () => {
    const { result } = renderHook(() => useChat());
    
    // Aguarda o carregamento inicial
    await act(async () => {
      await result.current.loadInitialMessages();
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.loading).toBe(false);
  });

  it('deve enviar uma nova mensagem', async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Nova mensagem');
    });

    expect(result.current.messages[0].content).toBe('Nova mensagem');
    expect(result.current.messages).toHaveLength(1);
  });

  it('deve lidar com erro ao enviar mensagem', async () => {
    // Mock do erro
    vi.mock('@supabase/supabase-js', () => ({
      createClient: () => ({
        from: () => ({
          insert: () => ({
            select: () => ({
              single: () => ({
                data: null,
                error: new Error('Erro ao enviar mensagem')
              })
            })
          })
        })
      })
    }));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      try {
        await result.current.sendMessage('Mensagem com erro');
      } catch (error) {
        expect(error.message).toBe('Erro ao enviar mensagem');
      }
    });
  });

  it('deve se inscrever para atualizações em tempo real', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.handleNewMessage).toBeDefined();
  });

  it('deve atualizar mensagens ao receber nova mensagem', () => {
    const { result } = renderHook(() => useChat());
    const novaMensagem = {
      id: 4,
      content: 'Mensagem em tempo real',
      created_at: '2024-03-20',
      user_id: '1'
    };

    act(() => {
      result.current.handleNewMessage(novaMensagem);
    });

    expect(result.current.messages[0]).toEqual(novaMensagem);
  });
}); 