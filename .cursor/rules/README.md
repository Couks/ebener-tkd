# Cursor Rules - Ebener TKD Project

Este diretório contém todas as regras e diretrizes para desenvolvimento do projeto Ebener TKD, uma aplicação de gerenciamento para academia de Taekwondo.

## 📋 Índice de Regras

### 1. [Frontend Expert Rules](./frontend-expert.md)

Regras gerais para desenvolvimento frontend com expertise em:

- ReactJS, NextJS, JavaScript, TypeScript
- HTML, CSS, TailwindCSS, Shadcn, Radix
- Princípios de código limpo e DRY
- Diretrizes de acessibilidade
- Padrões de nomenclatura e organização

### 2. [Next.js & TypeScript Rules](./nextjs-typescript.md)

Regras específicas para tecnologias do stack:

- Next.js App Router
- TypeScript avançado
- React Server Components
- Shadcn UI e Radix UI
- Tailwind CSS
- Performance e otimização
- Gerenciamento de estado

### 3. [Prisma ORM Guidelines](./prisma-guidelines.md)

Diretrizes completas para desenvolvimento com Prisma:

- Design de schema
- Uso do Prisma Client
- Migrações de banco de dados
- Tratamento de erros específicos do Prisma
- Padrões de performance
- Segurança e boas práticas
- Testes com Prisma

## 🎯 Objetivo das Regras

Estas regras foram criadas para garantir:

1. **Consistência de Código**: Todos os desenvolvedores seguem os mesmos padrões
2. **Qualidade**: Código limpo, testável e maintível
3. **Performance**: Otimizações específicas para Next.js e React
4. **Segurança**: Práticas seguras para autenticação e validação
5. **Acessibilidade**: Interfaces inclusivas e acessíveis
6. **Escalabilidade**: Arquitetura que cresce com o projeto

## 🚀 Como Usar

O Cursor lê automaticamente estas regras quando você:

- Escreve novo código
- Solicita refatoração
- Pede sugestões de melhoria
- Implementa novas funcionalidades

## 📚 Tecnologias Cobertas

- **Frontend**: React 18, Next.js 15 (App Router), TypeScript
- **UI/UX**: Tailwind CSS, shadcn/ui, Radix UI, Framer Motion
- **Estado**: Zustand, TanStack Query
- **Formulários**: React Hook Form, Zod
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: NextAuth.js
- **Validação**: Zod schemas

## 🔄 Atualização das Regras

As regras são atualizadas conforme:

- Evolução das tecnologias utilizadas
- Novos padrões identificados no projeto
- Feedback da equipe de desenvolvimento
- Mudanças nos requisitos do projeto

## 📝 Convenções Específicas do Projeto

### Domínio de Negócio

- Academia de Taekwondo
- Gestão de alunos e professores
- Graduações e certificados
- Pagamentos e eventos
- Sistema de evolução de alunos

### Estrutura de Pastas

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Rotas de autenticação
│   ├── (dashboard)/    # Rotas do painel
│   ├── (pages)/        # Páginas públicas
│   └── api/            # API Routes
├── components/         # Componentes React
├── lib/               # Utilitários e configurações
└── generated/         # Arquivos gerados (Prisma)
```

### Padrões de Nomenclatura

- **Arquivos**: kebab-case (`user-profile.tsx`)
- **Componentes**: PascalCase (`UserProfile`)
- **Funções**: camelCase (`getUserData`)
- **Constantes**: UPPER_CASE (`API_ENDPOINTS`)
- **Event Handlers**: handle + ação (`handleClick`, `handleSubmit`)

---

**Nota**: Estas regras são específicas para o projeto Ebener TKD e devem ser seguidas rigorosamente para manter a qualidade e consistência do código.
