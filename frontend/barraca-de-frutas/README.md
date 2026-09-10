# Barraca de Frutas

Aplicação de cadastro e gerenciamento de frutas construída com Next.js,
TypeScript, Tailwind CSS, shadcn/ui e persistência no `localStorage`.

## Rodando o projeto

O projeto usa a versão do Node definida em `.nvmrc`:

```bash
nvm use
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run lint       # análise estática
npm run typecheck  # verificação do TypeScript
npm test           # Vitest em modo watch
npm run test:run   # executa a suíte uma vez
```

Para adicionar outro componente do shadcn/ui:

```bash
npx shadcn@latest add nome-do-componente
```

## Organização visual

- `src/components/ui`: componentes base instalados pelo shadcn/ui.
- `src/components`: componentes próprios e reutilizáveis da aplicação.
- `src/screens`: composição e comportamento de cada tela.
- `src/App.css`: tokens do tema neo-brutalista e estilos globais do Tailwind.

## Arquitetura da persistência

O contrato está em `src/features/fruits/fruit-repository.ts`. A implementação
atual, `LocalStorageFruitRepository`, mantém o mesmo formato de armazenamento
do projeto original. No futuro, ela poderá ser substituída por uma implementação
HTTP sem mudar os componentes que usam o contrato.

## Testes

`src/features/fruits/fruit-flows.test.tsx` cobre os quatro fluxos principais:
cadastro, pesquisa/listagem, edição e exclusão. O formulário também possui um
teste próprio para impedir caracteres inválidos. Use `npm test` durante o
desenvolvimento ou `npm run test:run` para uma execução única.
