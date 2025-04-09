# Arquitetura do Sistema

## Visão Geral

O sistema utiliza uma arquitetura moderna baseada em React com foco em componentização, reusabilidade e manutenibilidade. A estrutura do projeto segue padrões estabelecidos da comunidade React e práticas recomendadas de desenvolvimento.

## Estrutura de Diretórios

```
src/
├── components/      # Componentes reutilizáveis
│   ├── common/     # Componentes básicos (Button, Input, etc)
│   ├── features/   # Componentes específicos de features
│   └── layouts/    # Layouts e templates
├── contexts/       # Contextos React para estado global
├── hooks/         # Hooks personalizados
├── styles/        # Estilos globais e utilitários
└── utils/         # Funções utilitárias
```

## Padrões de Código

### Componentes

- Componentes funcionais com hooks
- Props tipadas com TypeScript
- Memoização quando necessário (React.memo)
- Componentização por responsabilidade única

### Estado Global

- Context API para estados compartilhados
- Hooks personalizados para lógica de negócio
- Zustand para gerenciamento de estado complexo

### Estilização

- Tailwind CSS para estilos utilitários
- CSS Modules para estilos específicos de componentes
- Variáveis CSS para temas e customização

## Sistema de Notificações

### Componentes

#### Toast
- Componente base para exibir notificações
- Suporta diferentes tipos (success, error, warning, info)
- Animações suaves de entrada/saída
- Barra de progresso para tempo restante

#### ToastContainer
- Gerencia múltiplas notificações
- Posicionamento fixo na tela
- Stack vertical de notificações

### Context

#### ToastContext
- Gerencia estado global das notificações
- Fornece métodos para exibir/remover notificações
- Hook useToast para fácil acesso

### Uso

```javascript
import { useToast } from '../contexts/ToastContext';

const { showSuccess, showError } = useToast();

// Exibir notificação
showSuccess('Operação realizada com sucesso!');
```

## Testes

### Estratégia de Testes

- Testes unitários com Vitest
- Testes de integração com Testing Library
- Cobertura mínima de 80%

### Padrões de Teste

- Arrange-Act-Assert
- Mocks para dependências externas
- Testes de comportamento do usuário

## Performance

### Otimizações

- Code splitting com React.lazy
- Memoização de componentes pesados
- Lazy loading de imagens
- Otimização de bundle

## Segurança

### Práticas

- Sanitização de inputs
- Validação de dados
- Proteção contra XSS
- CSRF tokens

## Acessibilidade

### Diretrizes

- WCAG 2.1 AA compliance
- Suporte a navegação por teclado
- ARIA labels e roles
- Contraste de cores adequado 