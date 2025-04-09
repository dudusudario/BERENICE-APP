# Berenice App

Sistema de gerenciamento desenvolvido em React com foco em usabilidade e performance.

## 🚀 Funcionalidades

- Sistema de notificações em tempo real
- Monitoramento e analytics integrados
- Dashboard administrativo
- Integração com Supabase

## 🛠️ Tecnologias

- React
- Vite
- Tailwind CSS
- Sentry para monitoramento de erros
- Google Analytics para métricas
- Grafana & Prometheus para dashboards
- Testes com Vitest

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/dudusudario/BERENICE-APP.git
cd berenice-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔍 Monitoramento

### Sentry
O projeto utiliza Sentry para tracking de erros. Configure a variável `VITE_SENTRY_DSN` no arquivo `.env`.

### Google Analytics
Analytics está configurado para tracking de eventos e páginas. Configure `VITE_GA_MEASUREMENT_ID` no `.env`.

### Grafana & Prometheus
Para iniciar o monitoramento:

```bash
docker-compose up -d
```

Acesse:
- Grafana: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090

## 🧪 Testes

```bash
# Executar testes
npm test

# Cobertura de testes
npm run test:coverage
```

## 📚 Documentação

A documentação dos componentes está disponível via Storybook:

```bash
npm run storybook
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
