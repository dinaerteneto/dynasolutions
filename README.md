# Dyna Solutions

Site institucional da **Dyna Solutions** — Engenharia de software sênior + IA.
Desenvolvido com Astro e Tailwind CSS v4, com foco em performance extrema, SEO, e uma interface moderna orientada a conversão.

## 🚀 Tecnologias

- [Astro](https://astro.build) (Framework web super rápido e focado em conteúdo)
- [Tailwind CSS v4](https://tailwindcss.com) (Estilização utilitária moderna)
- [PHPMailer](https://github.com/PHPMailer/PHPMailer) (Envio de e-mails via SMTP)
- [Composer](https://getcomposer.org/) (Gerenciamento de dependências PHP)
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
| `npm install` | Instala as dependências Node.js |
| `composer install` | Instala as dependências PHP (PHPMailer) |
| `npm run dev` | Inicia o servidor local em `localhost:4321` |
| `npm run build` | Gera os arquivos otimizados e prontos para produção em `dist/` |
| `npm run preview` | Permite visualizar o site com o build de produção localmente |

## 📧 Configuração de E-mail

O formulário de contato envia e-mails via SMTP com PHPMailer.

1. Copie `config/email.example.php` para `config/email.php`
2. Preencha a senha SMTP da conta `contato@dynasolutions.com.br`
3. O arquivo `config/email.php` está no `.gitignore` — não commite a senha

## 🎨 Design System e Estilização

Este projeto utiliza **Tailwind CSS v4**. O arquivo `src/styles/global.css` centraliza os tokens e as variáveis de design no bloco `@theme`.
As variáveis de cor (como `--color-bg-base`, `--color-accent`) refletem diretamente nas classes utilitárias do Tailwind (ex: `bg-bg-base`, `text-accent`) por todo o projeto.

## 🚀 Deploy

O front-end é gerado como SSG em `dist/`. O formulário de contato usa `/contact.php`, que requer PHP no servidor.

### Shared hosting (LocaWeb)

1. Faça o build: `npm run build`
2. Envie todo o conteúdo do repositório (exceto `node_modules/` e `dist/` já vai na pasta certa) para o servidor via FTP
3. Aponte o document root para a pasta `dist/`
4. Configure a senha SMTP em `config/email.php` (copie de `config/email.example.php`)
5. Certifique-se de que o `vendor/` gerado pelo Composer está presente no servidor

### Static hosting (Cloudflare Pages / Vercel / Netlify)

O site funciona em hosts estáticos, mas o formulário de contato **não funcionará** — o `/contact.php` precisa de um servidor com PHP. Para usar um host estático, troque o action do formulário para um serviço como Web3Forms ou um serverless function.
