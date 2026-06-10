# Dyna Solutions — Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the dynasolutions.com.br marketing site — a polished dark/teal static site (Home one-page + Portfólio, Serviços, Sobre, Contato) deployed to Cloudflare Pages.

**Architecture:** Astro static site with Tailwind CSS. Design tokens centralized in Tailwind config. Shared layout + components (nav, footer, section wrappers). Home is composed of 8 section components. Subtle scroll reveals via a tiny IntersectionObserver script that respects `prefers-reduced-motion`. Contact via web3forms (no backend).

**Tech Stack:** Astro, Tailwind CSS, TypeScript, Playwright (visual verification), Cloudflare Pages (hosting), web3forms (contact form).

**Verification model:** This is a static marketing site, not application logic — unit tests add no value (YAGNI). Each task is verified by `npm run build` succeeding and, where visual, a Playwright screenshot reviewed against the design. Treat "build passes + screenshot matches intent" as the green bar.

**Reference spec:** `docs/superpowers/specs/2026-06-10-dynasolutions-site-design.md`

**Design tokens (from spec §5):**
- bg deep: `#0a131e` · bg base: `#0d1b2a` · bg raised: `#13283e` · bg hover: `#16304a`
- border: `#2a4258`
- accent (teal): `#2dd4bf` · accent-ink (text on teal): `#04211c`
- text primary: `#e8eef5` · text secondary: `#9fb0c4` · text muted: `#6b7f96`
- font sans: Inter · font mono: JetBrains Mono

---

## Task 1: Scaffold Astro + Tailwind

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`, `src/pages/index.astro`

- [ ] **Step 1: Initialize Astro project (non-interactive) in current dir**

Run:
```bash
cd /mnt/externo/code/dynasolutions
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --skip-houston
```
Expected: files created (`src/pages/index.astro`, `astro.config.mjs`, `package.json`). If it refuses because dir is non-empty, that's fine — keep existing `docs/`, `.gitignore`, `.git/`.

- [ ] **Step 2: Add Tailwind + integrations**

Run:
```bash
npm install && npx astro add tailwind --yes && npm install @fontsource/inter @fontsource/jetbrains-mono
```
Expected: `@tailwindcss/vite` wired into `astro.config.mjs`, Tailwind v4 installed.

- [ ] **Step 3: Configure design tokens**

Create `src/styles/global.css`:
```css
@import "tailwindcss";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/inter/800.css";
@import "@fontsource/jetbrains-mono/400.css";

@theme {
  --color-bg-deep: #0a131e;
  --color-bg-base: #0d1b2a;
  --color-bg-raised: #13283e;
  --color-bg-hover: #16304a;
  --color-border-subtle: #2a4258;
  --color-accent: #2dd4bf;
  --color-accent-ink: #04211c;
  --color-text-primary: #e8eef5;
  --color-text-secondary: #9fb0c4;
  --color-text-muted: #6b7f96;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS — "Complete!" with `dist/` generated, no errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro + Tailwind with design tokens"
```

---

## Task 2: Base layout, reveal script, wordmark

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Wordmark.astro`, `src/scripts/reveal.ts`

- [ ] **Step 1: Create the wordmark component**

Create `src/components/Wordmark.astro`:
```astro
---
const { class: cls = "" } = Astro.props;
---
<a href="/" class={`font-extrabold tracking-tight text-text-primary ${cls}`}>
  dyna<span class="text-accent">solutions</span>
</a>
```

- [ ] **Step 2: Create the reveal script (respects reduced motion)**

Create `src/scripts/reveal.ts`:
```ts
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (prefersReduced) {
  items.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((el) => io.observe(el));
}
```

- [ ] **Step 3: Add reveal styles to global.css**

Append to `src/styles/global.css`:
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
[data-reveal].is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 4: Create the base layout**

Create `src/layouts/Base.astro`:
```astro
---
import "../styles/global.css";
const { title = "Dyna Solutions", description = "Engenharia de software sênior + IA. Software que escala, construído com critério." } = Astro.props;
---
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="icon" href="/favicon.svg" />
  </head>
  <body class="bg-bg-base text-text-primary">
    <slot />
    <script src="../scripts/reveal.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Use layout in index, verify build**

Replace `src/pages/index.astro` with:
```astro
---
import Base from "../layouts/Base.astro";
---
<Base>
  <main class="min-h-screen grid place-items-center">
    <p class="font-mono text-accent">// em construção</p>
  </main>
</Base>
```
Run: `npm run build`
Expected: PASS, no errors.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: base layout, reveal script, wordmark"
```

---

## Task 3: Site header (nav) and footer

**Files:**
- Create: `src/components/Header.astro`, `src/components/Footer.astro`
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Create Header**

Create `src/components/Header.astro`:
```astro
---
import Wordmark from "./Wordmark.astro";
const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/sobre", label: "Sobre" },
];
---
<header class="sticky top-0 z-50 backdrop-blur bg-bg-base/80 border-b border-border-subtle">
  <nav class="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
    <Wordmark class="text-lg" />
    <div class="flex items-center gap-6 text-sm text-text-secondary">
      {links.map((l) => <a href={l.href} class="hover:text-text-primary transition">{l.label}</a>)}
      <a href="/contato" class="rounded-lg bg-bg-raised px-4 py-2 text-text-primary hover:bg-bg-hover transition">Contato</a>
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Create Footer**

Create `src/components/Footer.astro`:
```astro
---
import Wordmark from "./Wordmark.astro";
const year = new Date().getFullYear();
---
<footer class="border-t border-border-subtle mt-24">
  <div class="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
    <Wordmark />
    <p>© {year} Dyna Solutions · dynasolutions.com.br</p>
    <a href="/contato" class="text-accent hover:underline">Vamos conversar →</a>
  </div>
</footer>
```

- [ ] **Step 3: Wire Header/Footer into Base layout**

In `src/layouts/Base.astro`, add imports after the existing import line:
```astro
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
```
Replace `<slot />` with:
```astro
    <Header />
    <slot />
    <Footer />
```

- [ ] **Step 4: Verify build + screenshot**

Run: `npm run build && npm run preview &` then use Playwright `browser_navigate` to `http://localhost:4321` and `browser_take_screenshot`.
Expected: header with wordmark + nav, footer at bottom, dark teal theme. Kill preview after.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: site header and footer"
```

---

## Task 4: Home — Hero (section 1)

**Files:**
- Create: `src/components/home/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero**

Create `src/components/home/Hero.astro`:
```astro
<section class="relative overflow-hidden">
  <div class="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full"
       style="background: radial-gradient(circle, rgba(45,212,191,0.13), transparent 70%);"></div>
  <div class="mx-auto max-w-6xl px-6 pt-24 pb-20 relative">
    <p class="font-mono text-sm text-accent tracking-wide" data-reveal>// engenharia de software sênior + IA</p>
    <h1 class="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] max-w-3xl" data-reveal>
      Software que escala,<br />construído com <span class="text-accent">critério</span>.
    </h1>
    <p class="mt-6 text-lg text-text-secondary max-w-xl" data-reveal>
      Backend robusto, integrações e automações — com a velocidade e a qualidade que a IA adiciona a um processo de engenharia sênior.
    </p>
    <div class="mt-8 flex flex-wrap gap-3" data-reveal>
      <a href="/contato" class="rounded-xl bg-accent text-accent-ink font-bold px-6 py-3 hover:brightness-110 transition">Agendar diagnóstico técnico →</a>
      <a href="/portfolio" class="rounded-xl border border-border-subtle px-6 py-3 font-semibold hover:bg-bg-raised transition">Ver portfólio</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Render Hero on home**

Replace `src/pages/index.astro` body with:
```astro
---
import Base from "../layouts/Base.astro";
import Hero from "../components/home/Hero.astro";
---
<Base>
  <Hero />
</Base>
```

- [ ] **Step 3: Verify build + screenshot**

Run build + preview, Playwright screenshot of `http://localhost:4321`.
Expected: hero matches the approved mockup (dark bg, teal glow top-right, mono label, big heading, two CTAs).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: home hero section"
```

---

## Task 5: Home — Prova rápida + Dores→Soluções (sections 2-3)

**Files:**
- Create: `src/components/home/Proof.astro`, `src/components/home/Pains.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Proof (section 2)**

Create `src/components/home/Proof.astro`:
```astro
---
const stacks = ["Laravel", "Node.js", "Go", "Ruby on Rails", "Flutter", "Supabase"];
---
<section class="border-y border-border-subtle bg-bg-deep/40">
  <div class="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-6 justify-between" data-reveal>
    <p class="text-text-secondary"><span class="text-text-primary font-bold">+8 anos</span> construindo software para produção.</p>
    <ul class="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-text-secondary">
      {stacks.map((s) => <li>{s}</li>)}
    </ul>
  </div>
</section>
```
NOTE: "+8 anos" is a placeholder — confirm real number with the user before launch (tracked in spec §10).

- [ ] **Step 2: Create Pains (section 3)**

Create `src/components/home/Pains.astro`:
```astro
---
const pains = [
  { p: "Seu MVP trava antes de sair do papel?", s: "Desenvolvimento de produto sob escopo fechado." },
  { p: "Falta um sênior pra destravar a arquitetura do time?", s: "Squad de um + diagnóstico técnico." },
  { p: "Processos manuais consumindo horas da equipe?", s: "Automação & integração de sistemas." },
  { p: "Insegurança sobre a qualidade/segurança do código?", s: "Diagnóstico técnico independente." },
];
---
<section class="mx-auto max-w-6xl px-6 py-20">
  <h2 class="text-3xl font-extrabold tracking-tight" data-reveal>Você reconhece algum desses?</h2>
  <div class="mt-10 grid sm:grid-cols-2 gap-4">
    {pains.map((x) => (
      <div class="rounded-2xl border border-border-subtle bg-bg-raised p-6" data-reveal>
        <p class="font-semibold text-text-primary">{x.p}</p>
        <p class="mt-2 text-text-secondary flex items-start gap-2"><span class="text-accent">→</span>{x.s}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Render both on home (after Hero)**

In `src/pages/index.astro`, add imports for `Proof` and `Pains` and place `<Proof />` then `<Pains />` after `<Hero />`.

- [ ] **Step 4: Verify build + screenshot**

Run build + preview + Playwright screenshot. Expected: proof bar + 4 pain cards in teal-accented grid.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: home proof and pains sections"
```

---

## Task 6: Home — Serviços (section 4)

**Files:**
- Create: `src/data/services.ts`, `src/components/home/Services.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create services data (shared with /servicos later)**

Create `src/data/services.ts`:
```ts
export interface Service { slug: string; title: string; tagline: string; }
export const services: Service[] = [
  { slug: "mvp", title: "Desenvolvimento de MVP/produto", tagline: "Do conceito ao produto em escopo fechado (4–8 semanas)." },
  { slug: "squad", title: "Squad de um", tagline: "Sênior terceirizado integrado ao seu time ou agência." },
  { slug: "automacao", title: "Automação & integração", tagline: "APIs, webhooks, filas — conecto e automatizo seus sistemas." },
  { slug: "diagnostico", title: "Diagnóstico técnico", tagline: "Auditoria de arquitetura, código e segurança. Comece por aqui." },
];
```

- [ ] **Step 2: Create Services section**

Create `src/components/home/Services.astro`:
```astro
---
import { services } from "../../data/services";
---
<section id="servicos" class="mx-auto max-w-6xl px-6 py-20">
  <p class="font-mono text-sm text-accent" data-reveal>// o que eu entrego</p>
  <h2 class="mt-3 text-3xl font-extrabold tracking-tight" data-reveal>Serviços</h2>
  <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {services.map((s) => (
      <a href={`/servicos#${s.slug}`} class="group rounded-2xl border border-border-subtle bg-bg-raised p-6 hover:bg-bg-hover transition" data-reveal>
        <h3 class="font-bold text-text-primary">{s.title}</h3>
        <p class="mt-2 text-sm text-text-secondary">{s.tagline}</p>
        <span class="mt-4 inline-block text-accent text-sm opacity-0 group-hover:opacity-100 transition">Saiba mais →</span>
      </a>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Render on home + verify build + screenshot**

Add `<Services />` after `<Pains />` in `src/pages/index.astro`. Run build + preview + screenshot. Expected: 4 service cards, the diagnóstico one reads "Comece por aqui."

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: home services section + services data"
```

---

## Task 7: Home — Portfólio destaques (section 5)

**Files:**
- Create: `src/data/projects.ts`, `src/components/home/PortfolioHighlights.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create projects data (shared with /portfolio)**

Create `src/data/projects.ts`:
```ts
export interface Project {
  slug: string; name: string; anonymized: boolean;
  context: string; challenge: string; solution: string; result: string; stack: string[];
}
export const projects: Project[] = [
  {
    slug: "sisnanceiro", name: "Sisnanceiro", anonymized: false,
    context: "Sistema próprio de gestão financeira.",
    challenge: "Organizar lançamentos, relatórios e controle financeiro de forma escalável.",
    solution: "Backend estruturado com camadas bem definidas e regras de domínio claras.",
    result: "Produto próprio em evolução contínua, usado como vitrine técnica.",
    stack: ["Backend", "Banco relacional"],
  },
  {
    slug: "plataforma-saude-eventos", name: "Plataforma de saúde (cliente)", anonymized: true,
    context: "Uma plataforma de saúde precisava integrar agendamentos entre sistemas.",
    challenge: "Acoplamento alto entre integrações de clientes diferentes.",
    solution: "Arquitetura orientada a eventos (pub/sub) com filas e roteamento por tenant.",
    result: "Integrações desacopladas e adição de novos clientes sem reescrever o núcleo.",
    stack: ["Ruby on Rails", "Solid Queue", "Pub/Sub"],
  },
  {
    slug: "automacao-ia", name: "Automação com IA (vitrine)", anonymized: false,
    context: "Projeto-vitrine demonstrando automação de processo com apoio de LLM.",
    challenge: "Reduzir trabalho manual repetitivo mantendo controle e segurança.",
    solution: "Pipeline de automação com etapas de IA e gates de validação fail-closed.",
    result: "A construir/documentar — caso âncora para a oferta de IA aplicada.",
    stack: ["Node.js", "LLM", "Automação"],
  },
];
```
NOTE: the "automacao-ia" vitrine is a planned project (spec §4/§10) — content is provisional until built.

- [ ] **Step 2: Create PortfolioHighlights**

Create `src/components/home/PortfolioHighlights.astro`:
```astro
---
import { projects } from "../../data/projects";
const featured = projects.slice(0, 3);
---
<section class="bg-bg-deep/40 border-y border-border-subtle">
  <div class="mx-auto max-w-6xl px-6 py-20">
    <div class="flex items-end justify-between" data-reveal>
      <div>
        <p class="font-mono text-sm text-accent">// provas de trabalho</p>
        <h2 class="mt-3 text-3xl font-extrabold tracking-tight">Portfólio</h2>
      </div>
      <a href="/portfolio" class="text-accent text-sm hover:underline">Ver todos →</a>
    </div>
    <div class="mt-10 grid md:grid-cols-3 gap-4">
      {featured.map((p) => (
        <a href={`/portfolio#${p.slug}`} class="rounded-2xl border border-border-subtle bg-bg-raised p-6 hover:bg-bg-hover transition" data-reveal>
          <h3 class="font-bold">{p.name}</h3>
          <p class="mt-2 text-sm text-text-secondary">{p.context}</p>
          <p class="mt-3 text-sm text-text-primary"><span class="text-accent">Resultado:</span> {p.result}</p>
          <ul class="mt-4 flex flex-wrap gap-2">{p.stack.map((t) => <li class="font-mono text-xs text-text-muted border border-border-subtle rounded px-2 py-1">{t}</li>)}</ul>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Render on home + verify build + screenshot**

Add `<PortfolioHighlights />` after `<Services />`. Run build + preview + screenshot. Expected: 3 project cards + "Ver todos".

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: home portfolio highlights + projects data"
```

---

## Task 8: Home — Como trabalho + CTA final (sections 6 & 8)

**Files:**
- Create: `src/components/home/HowIWork.astro`, `src/components/home/FinalCta.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create HowIWork (section 6)**

Create `src/components/home/HowIWork.astro`:
```astro
---
const steps = [
  { n: "01", t: "Diagnóstico", d: "Entendo o problema e o contexto antes de propor solução." },
  { n: "02", t: "Tech spec", d: "Traduzo requisitos em um plano técnico claro e acordado." },
  { n: "03", t: "Execução em escopos", d: "Entrego em incrementos validados, não num big bang." },
  { n: "04", t: "Entrega validada", d: "Verificação e handoff com evidência do que funciona." },
];
---
<section class="mx-auto max-w-6xl px-6 py-20">
  <h2 class="text-3xl font-extrabold tracking-tight" data-reveal>Como eu trabalho</h2>
  <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {steps.map((s) => (
      <div class="rounded-2xl border border-border-subtle bg-bg-raised p-6" data-reveal>
        <p class="font-mono text-accent">{s.n}</p>
        <h3 class="mt-2 font-bold">{s.t}</h3>
        <p class="mt-2 text-sm text-text-secondary">{s.d}</p>
      </div>
    ))}
  </div>
  <div class="mt-8 rounded-2xl border border-border-subtle bg-bg-deep/40 p-6" data-reveal>
    <p class="font-mono text-sm text-accent">// o papel da IA</p>
    <p class="mt-2 text-text-secondary max-w-3xl">Uso IA para acelerar o que é repetível — sintaxe, configuração, boilerplate — e reservo o julgamento sênior para o que importa: arquitetura, segurança e decisões de produto.</p>
  </div>
</section>
```

- [ ] **Step 2: Create FinalCta (section 8)**

Create `src/components/home/FinalCta.astro`:
```astro
<section class="mx-auto max-w-6xl px-6 pb-24">
  <div class="relative overflow-hidden rounded-3xl border border-border-subtle bg-bg-raised p-12 text-center" data-reveal>
    <div class="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full" style="background: radial-gradient(circle, rgba(45,212,191,0.12), transparent 70%);"></div>
    <h2 class="relative text-3xl sm:text-4xl font-extrabold tracking-tight">Tem um desafio técnico? Vamos conversar.</h2>
    <p class="relative mt-4 text-text-secondary">Comece com um diagnóstico — baixo risco, alto valor.</p>
    <a href="/contato" class="relative mt-8 inline-block rounded-xl bg-accent text-accent-ink font-bold px-8 py-4 hover:brightness-110 transition">Agendar diagnóstico técnico →</a>
  </div>
</section>
```

- [ ] **Step 3: Render both + verify build + screenshot**

Add `<HowIWork />` then `<FinalCta />` after `<PortfolioHighlights />` in `src/pages/index.astro`. (Section 7 "Sobre resumo" is folded into the about page link in the footer/nav for v1 — keep home lean.) Run build + preview + full-page screenshot. Expected: complete Home top-to-bottom.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: home how-i-work and final CTA"
```

---

## Task 9: Página Serviços

**Files:**
- Create: `src/pages/servicos.astro`

- [ ] **Step 1: Build the page from services data**

Create `src/pages/servicos.astro`:
```astro
---
import Base from "../layouts/Base.astro";
import { services } from "../data/services";
const details: Record<string, string> = {
  mvp: "Construo seu produto do zero em escopo fechado, com tech spec acordada, entregas incrementais e foco em algo que vai para produção — não um protótipo descartável.",
  squad: "Entro como engenheiro sênior no seu time ou agência para destravar entregas, revisar arquitetura e elevar a barra técnica, sem o custo de uma contratação fixa.",
  automacao: "Conecto sistemas, crio integrações com APIs e webhooks, e automatizo processos manuais usando filas e — quando faz sentido — IA, com gates de validação.",
  diagnostico: "Uma análise independente da sua arquitetura, código e postura de segurança, com um relatório acionável de riscos e próximos passos. A melhor porta de entrada.",
};
---
<Base title="Serviços · Dyna Solutions">
  <section class="mx-auto max-w-4xl px-6 py-20">
    <h1 class="text-4xl font-extrabold tracking-tight" data-reveal>Serviços</h1>
    <div class="mt-12 space-y-6">
      {services.map((s) => (
        <article id={s.slug} class="rounded-2xl border border-border-subtle bg-bg-raised p-8 scroll-mt-24" data-reveal>
          <h2 class="text-2xl font-bold">{s.title}</h2>
          <p class="mt-2 text-accent">{s.tagline}</p>
          <p class="mt-4 text-text-secondary">{details[s.slug]}</p>
          <a href="/contato" class="mt-6 inline-block text-accent hover:underline">Quero conversar sobre isso →</a>
        </article>
      ))}
    </div>
  </section>
</Base>
```

- [ ] **Step 2: Verify build + screenshot**

Build + preview + screenshot `http://localhost:4321/servicos`. Expected: 4 service blocks with details, anchors working.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: services page"
```

---

## Task 10: Página Portfólio

**Files:**
- Create: `src/pages/portfolio.astro`

- [ ] **Step 1: Build from projects data**

Create `src/pages/portfolio.astro`:
```astro
---
import Base from "../layouts/Base.astro";
import { projects } from "../data/projects";
---
<Base title="Portfólio · Dyna Solutions">
  <section class="mx-auto max-w-4xl px-6 py-20">
    <h1 class="text-4xl font-extrabold tracking-tight" data-reveal>Portfólio</h1>
    <p class="mt-4 text-text-secondary" data-reveal>Alguns casos descritos de forma anonimizada quando sob sigilo.</p>
    <div class="mt-12 space-y-6">
      {projects.map((p) => (
        <article id={p.slug} class="rounded-2xl border border-border-subtle bg-bg-raised p-8 scroll-mt-24" data-reveal>
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold">{p.name}</h2>
            {p.anonymized && <span class="font-mono text-xs text-text-muted border border-border-subtle rounded px-2 py-1">anonimizado</span>}
          </div>
          <dl class="mt-4 space-y-3 text-sm">
            <div><dt class="text-accent font-mono">Contexto</dt><dd class="text-text-secondary">{p.context}</dd></div>
            <div><dt class="text-accent font-mono">Desafio</dt><dd class="text-text-secondary">{p.challenge}</dd></div>
            <div><dt class="text-accent font-mono">Solução</dt><dd class="text-text-secondary">{p.solution}</dd></div>
            <div><dt class="text-accent font-mono">Resultado</dt><dd class="text-text-primary">{p.result}</dd></div>
          </dl>
          <ul class="mt-4 flex flex-wrap gap-2">{p.stack.map((t) => <li class="font-mono text-xs text-text-muted border border-border-subtle rounded px-2 py-1">{t}</li>)}</ul>
        </article>
      ))}
    </div>
  </section>
</Base>
```

- [ ] **Step 2: Verify build + screenshot**

Build + preview + screenshot `/portfolio`. Expected: case studies with Contexto→Resultado + stack tags + "anonimizado" badge where applicable.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: portfolio page"
```

---

## Task 11: Página Sobre

**Files:**
- Create: `src/pages/sobre.astro`

- [ ] **Step 1: Build the about page**

Create `src/pages/sobre.astro`:
```astro
---
import Base from "../layouts/Base.astro";
---
<Base title="Sobre · Dyna Solutions">
  <section class="mx-auto max-w-3xl px-6 py-20">
    <p class="font-mono text-sm text-accent" data-reveal>// quem está por trás</p>
    <h1 class="mt-3 text-4xl font-extrabold tracking-tight" data-reveal>Sobre a Dyna Solutions</h1>
    <div class="mt-8 space-y-5 text-text-secondary text-lg" data-reveal>
      <p>Sou engenheiro de software sênior full-stack. Ao longo dos anos construí sistemas em produção com Laravel, Node.js, Go, Ruby on Rails e Flutter — de MVPs a arquiteturas orientadas a eventos e multi-tenant.</p>
      <p>A Dyna Solutions é como ofereço esse trabalho de forma independente: engenharia sênior com critério, integrando IA ao processo para entregar com mais velocidade e qualidade, sem abrir mão de decisões sólidas de arquitetura e segurança.</p>
      <p>Acredito em escopos claros, entregas incrementais e evidência do que funciona. Se isso faz sentido pra você, vamos conversar.</p>
    </div>
    <a href="/contato" class="mt-10 inline-block rounded-xl bg-accent text-accent-ink font-bold px-6 py-3" data-reveal>Falar comigo →</a>
  </section>
</Base>
```
NOTE: add real years/photo before launch (spec §10).

- [ ] **Step 2: Verify build + screenshot**

Build + preview + screenshot `/sobre`. Expected: readable about page in theme.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: about page"
```

---

## Task 12: Página Contato (web3forms + WhatsApp)

**Files:**
- Create: `src/pages/contato.astro`

- [ ] **Step 1: Build contact page with web3forms form**

Create `src/pages/contato.astro`:
```astro
---
import Base from "../layouts/Base.astro";
const WHATSAPP = "5500000000000"; // NOTE: replace with real number before launch
const EMAIL = "contato@dynasolutions.com.br"; // NOTE: confirm address
---
<Base title="Contato · Dyna Solutions">
  <section class="mx-auto max-w-2xl px-6 py-20">
    <h1 class="text-4xl font-extrabold tracking-tight" data-reveal>Vamos conversar</h1>
    <p class="mt-4 text-text-secondary" data-reveal>Conte seu desafio. Respondo pessoalmente.</p>
    <form action="https://api.web3forms.com/submit" method="POST" class="mt-10 space-y-4" data-reveal>
      <input type="hidden" name="access_key" value="REPLACE_WITH_WEB3FORMS_KEY" />
      <input type="hidden" name="subject" value="Novo contato pelo site Dyna Solutions" />
      <input required name="name" placeholder="Seu nome" class="w-full rounded-xl bg-bg-raised border border-border-subtle px-4 py-3 outline-none focus:border-accent" />
      <input required type="email" name="email" placeholder="Seu e-mail" class="w-full rounded-xl bg-bg-raised border border-border-subtle px-4 py-3 outline-none focus:border-accent" />
      <textarea required name="message" rows="5" placeholder="Seu desafio / projeto" class="w-full rounded-xl bg-bg-raised border border-border-subtle px-4 py-3 outline-none focus:border-accent"></textarea>
      <button type="submit" class="rounded-xl bg-accent text-accent-ink font-bold px-6 py-3 hover:brightness-110 transition">Enviar →</button>
    </form>
    <div class="mt-8 flex flex-wrap gap-4 text-sm" data-reveal>
      <a href={`https://wa.me/${WHATSAPP}`} class="text-accent hover:underline">WhatsApp</a>
      <a href={`mailto:${EMAIL}`} class="text-accent hover:underline">{EMAIL}</a>
    </div>
  </section>
</Base>
```
NOTE: user must create a free web3forms access key and replace `REPLACE_WITH_WEB3FORMS_KEY`, plus real WhatsApp/email (spec §10).

- [ ] **Step 2: Verify build + screenshot**

Build + preview + screenshot `/contato`. Expected: styled form + WhatsApp/email links.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: contact page with web3forms"
```

---

## Task 13: SEO, favicon, analytics, sitemap

**Files:**
- Create: `public/favicon.svg`
- Modify: `astro.config.mjs`, `src/layouts/Base.astro`

- [ ] **Step 1: Add favicon (teal mark)**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0d1b2a"/><text x="16" y="22" font-family="monospace" font-size="18" font-weight="800" fill="#2dd4bf" text-anchor="middle">d</text></svg>
```

- [ ] **Step 2: Add sitemap integration**

Run: `npx astro add sitemap --yes`
Then set `site` in `astro.config.mjs` to `'https://dynasolutions.com.br'`.

- [ ] **Step 3: Add JSON-LD + analytics to Base head**

In `src/layouts/Base.astro` `<head>`, before `</head>`, add:
```astro
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org", "@type": "Organization",
      name: "Dyna Solutions", url: "https://dynasolutions.com.br",
      description: "Engenharia de software sênior + IA.",
    })} />
    <script defer data-domain="dynasolutions.com.br" src="https://plausible.io/js/script.js"></script>
```
NOTE: Plausible requires an account; if not used, remove the analytics line before launch.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS, `dist/sitemap-index.xml` present, favicon copied.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: SEO, favicon, sitemap, analytics"
```

---

## Task 14: Deploy to Cloudflare Pages

**Files:** none (configuration/external)

- [ ] **Step 1: Push to a Git remote**

Create a private GitHub repo and push:
```bash
gh repo create dynasolutions-site --private --source=. --push
```
Expected: repo created, main branch pushed.

- [ ] **Step 2: Connect Cloudflare Pages (user action)**

In Cloudflare dashboard → Pages → Connect to Git → select repo. Build command: `npm run build`. Output dir: `dist`. Framework preset: Astro.
Expected: first deployment succeeds, `*.pages.dev` URL live.

- [ ] **Step 3: Point domain (user action)**

In Cloudflare Pages → Custom domains → add `dynasolutions.com.br` and `www`. Update DNS at the registrar to Cloudflare nameservers (or add CNAME per Cloudflare instructions).
Expected: HTTPS site live at dynasolutions.com.br.

- [ ] **Step 4: Final verification**

Use Playwright to navigate the live URL and screenshot Home, Serviços, Portfólio, Sobre, Contato. Confirm theme, navigation, and form render.

---

## Pre-launch content checklist (from spec §10)

These placeholders MUST be resolved with the user before announcing the site:
- [ ] Real years of experience (replace "+8 anos" in `Proof.astro`)
- [ ] Real WhatsApp number + contact email (`contato.astro`)
- [ ] web3forms access key (`contato.astro`)
- [ ] Profile photo + final About copy (`sobre.astro`)
- [ ] Decide/build the "automação com IA" vitrine project, then finalize its `projects.ts` entry
- [ ] Confirm analytics choice (Plausible account vs Cloudflare Web Analytics vs none)

---

## Self-review notes

- **Spec coverage:** positioning/offerings → home Hero/Pains/Services + services page; portfolio strategy → projects.ts + portfolio page; visual system → tokens in Task 1; structure (8 sections) → Tasks 4-8 (section 7 "Sobre resumo" intentionally folded to the About page to keep Home lean — minor, deliberate deviation); stack/deploy → Tasks 1, 14; SEO/analytics → Task 13. Blog/logo correctly deferred (spec §9).
- **Placeholders:** all remaining placeholders are real-world content the user must supply, each flagged with a NOTE and collected in the pre-launch checklist — not plan gaps.
- **Type consistency:** `services.ts` (`Service`) and `projects.ts` (`Project`) interfaces are consumed unchanged in home components and pages; slugs used in anchors match data.
