# Fluxo de Deploy

Este documento descreve o fluxo de deploy da aplicação para os diferentes ambientes.

## Ambientes

O sistema conta com três ambientes:

1. **Desenvolvimento (dev)**
   - URL: https://dev.exemplo.com
   - Branch: `develop`
   - Propósito: Teste de novas funcionalidades em desenvolvimento

2. **Homologação (staging)**
   - URL: https://staging.exemplo.com
   - Branch: `main`
   - Propósito: Validação final antes de produção

3. **Produção (prod)**
   - URL: https://exemplo.com
   - Tag: releases com tags (ex: `v1.2.3`)
   - Propósito: Ambiente para usuários finais

## Fluxo de Deploy

### Deploy para Desenvolvimento

O deploy para o ambiente de desenvolvimento é **automático** e ocorre sempre que há um push para a branch `develop`.

```mermaid
flowchart TD
    A[ 