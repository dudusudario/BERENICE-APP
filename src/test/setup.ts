import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const SUPABASE_URL = 'http://localhost:54321';

// Handlers do MSW atualizados para a v2
export const handlers = [
  http.post(`${SUPABASE_URL}/auth/v1/token`, () => {
    return HttpResponse.json({
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: 'mock-user-id',
        email: 'test@example.com',
        role: 'authenticated',
      },
    });
  }),

  http.get(`${SUPABASE_URL}/rest/v1/profiles`, () => {
    return HttpResponse.json([
      {
        id: 'mock-user-id',
        name: 'Usuário Teste',
        avatar_url: 'https://example.com/avatar.jpg',
        bio: 'Bio de teste',
        created_at: new Date().toISOString(),
      },
    ]);
  }),
];

// Setup MSW
export const server = setupServer(...handlers);

// Estabelecer API mocking antes de todos os testes
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Resetar qualquer handler depois de cada teste para isolamento
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Limpar depois de todos os testes
afterAll(() => server.close()); 