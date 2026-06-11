# Dyna Solutions

Site institucional da **Dyna Solutions** — Engenharia de software sênior + IA.
Desenvolvido com Astro e Tailwind CSS v4, com foco em performance extrema, SEO, e uma interface moderna orientada a conversão.

## 🚀 Tecnologias

- [Astro](https://astro.build) (Framework web super rápido e focado em conteúdo)
- [Tailwind CSS v4](https://tailwindcss.com) (Estilização utilitária moderna)
- [Web3Forms](https://web3forms.com/) (Integração para envio de e-mails de contato)
- Tipografia: [Inter](https://fonts.google.com/specimen/Inter) e [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## 📦 Estrutura do Projeto

Dentro deste repositório, você verá a seguinte estrutura:

```text
/
├── public/           # Arquivos estáticos servidos diretamente na raiz do site (favicon, imagens, verificação Google)
├── src/
│   ├── components/   # Componentes Astro reutilizáveis (Header, seções, Footer)
│   ├── data/         # Arquivos de dados e configurações
│   ├── layouts/      # Layout base das páginas
│   ├── pages/        # Rotas do site (index, contato, sobre, portfolio, servicos)
│   ├── scripts/      # Lógicas de front-end (navbar, animações scroll-reveal)
│   └── styles/       # CSS global e configuração de tokens do Tailwind v4
├── astro.config.mjs  # Configurações gerais do Astro
└── package.json      # Dependências e scripts
```

## 🧞 Comandos Iniciais

Após clonar o repositório, execute estes comandos no terminal, na pasta raiz:

| Comando | Ação |
| :--- | :--- |
| `npm install` | Instala todas as dependências |
| `npm run dev` | Inicia o servidor local em `localhost:4321` |
| `npm run build` | Gera os arquivos otimizados e prontos para produção em `dist/` |
| `npm run preview` | Permite visualizar o site com o build de produção localmente |

## 🎨 Design System e Estilização

Este projeto utiliza **Tailwind CSS v4**. O arquivo `src/styles/global.css` centraliza os tokens e as variáveis de design no bloco `@theme`.
As variáveis de cor (como `--color-bg-base`, `--color-accent`) refletem diretamente nas classes utilitárias do Tailwind (ex: `bg-bg-base`, `text-accent`) por todo o projeto.

## 🚀 Deploy

O projeto é estático (SSG) por padrão e está pronto para ser hospedado gratuitamente e com excelente performance em serviços como:
- **Cloudflare Pages** (Recomendado)
- **Vercel**
- **Netlify**

Basta conectar o repositório Git ao provedor, usando `npm run build` como comando de compilação e apontando a pasta de publicação para `dist`.
