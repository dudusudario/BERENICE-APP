import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Estende os matchers do Vitest com os do testing-library
expect.extend(matchers);

// Limpa após cada teste
afterEach(() => {
  cleanup();
}); 