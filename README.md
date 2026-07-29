# Endless Scroll React + TypeScript

Diretório contínuo com React, TypeScript, Vite e SASS Modules.

## Funcionalidades

- scroll infinito real com `IntersectionObserver` na página;
- carregamento antecipado com `rootMargin`;
- cancelamento e deduplicação de requisições;
- busca instantânea sobre perfis carregados;
- fallback local automático quando a API externa estiver indisponível;
- botão de carregamento manual acessível;
- cartões com `content-visibility` e imagens lazy-loaded.

## Execução

```bash
npm install
```

```bash
npm run dev
```

## Build

```bash
npm run build
```

A aplicação usa `randomuser.me` quando disponível. Em falha de rede, gera perfis locais e mantém o scroll funcionando.

## Ajustes da versão 3

- cabeçalho institucional removido para manter o foco exclusivo no scroll infinito;
- atalhos F12, Ctrl/Cmd+Shift+I/J/C/K, Ctrl/Cmd+U e menu de contexto interceptados no navegador.
