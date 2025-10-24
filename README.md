# MediPoint Central

Este repositório contém o esqueleto inicial do MediPoint Central, uma plataforma de gestão hospitalar com foco em prescrições médicas avançadas.

## Estrutura do projeto

```
frontend/   # Aplicação React + Vite + Tailwind com arquitetura modular
backend/    # API FastAPI com serviços mockados para prototipação
```

## Frontend
- React 18 com TypeScript, Vite e Tailwind CSS configurados com tokens semânticos.
- Componentes base utilizando padrões do Shadcn UI.
- Fluxo inicial do módulo de prescrição com abas, categorias e pré-visualização.
- Contextos para autenticação e tema (claro/escuro).
- Serviços de API preparados para integração com backend.

### Scripts
- `npm install` — instalar dependências (requer acesso ao registro npm).
- `npm run dev` — iniciar ambiente de desenvolvimento Vite.
- `npm run build` — gerar build de produção.

## Backend
- FastAPI com rotas básicas para autenticação, prescrições e modelos.
- Serviços in-memory para facilitar testes locais.
- Dependências configuradas via `pyproject.toml`.

### Execução
```
cd backend
uvicorn app.main:app --reload
```

## Próximos passos sugeridos
- Implementar persistência real (SQLite/SQLAlchemy).
- Expandir validações e integrações de autenticação JWT.
- Conectar frontend e backend, habilitando operações reais.
- Criar testes automatizados (Vitest e Pytest).
