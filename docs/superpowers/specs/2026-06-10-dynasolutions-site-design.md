# Design — Dyna Solutions: posicionamento + site institucional

**Data:** 2026-06-10
**Domínio:** dynasolutions.com.br (registrado, DNS acessível)
**Status:** aprovado para implementação

---

## 1. Objetivo e contexto

Lançar a presença digital da **Dyna Solutions**, marca pessoal/empresa do usuário (engenheiro de software sênior) para iniciar a oferta de serviços de desenvolvimento e consultoria de forma autônoma.

Modelo de negócio: **transição gradual** — começar em paralelo ao emprego CLT, com escopos fechados que cabem em horas limitadas, evoluindo para autônomo full-time.

O projeto tem duas frentes que este documento cobre:
1. **O que vender** (posicionamento e ofertas) — define o conteúdo.
2. **O site** (estrutura, visual, stack) — entrega o conteúdo.

---

## 2. Posicionamento

**Quem é:** engenheiro de software sênior full-stack, poliglota (PHP/Laravel, Node.js, Go, Ruby on Rails, Flutter), com prática avançada de **IA aplicada ao processo de desenvolvimento**.

**Frase-núcleo:** *Software que escala, construído com critério.*

**Diferencial honesto (sem overpromise):**
- ✅ "Engenheiro sênior que entrega mais rápido e com mais qualidade usando IA no fluxo de trabalho."
- ❌ NÃO se posiciona ainda como "consultor de IA" (estratégia/RAG corporativo/treino de modelos) — isso é direção futura.

A IA aparece como **o COMO** (multiplicador de velocidade/qualidade), não como **o PRODUTO**. O site é construído para suportar a evolução futura para IA-como-produto sem refazer a base.

**Público-alvo (ordem de prioridade na largada):**
1. **Software houses / agências** — entrada como sênior subcontratado ("squad de um"). Menos esforço de venda, fluxo mais estável.
2. **Startups / pequenas empresas tech** — MVP, arquitetura, destravar produto.
3. **(Futuro) IA aplicada** — empresas que querem agentes/automação com LLM. Requer estudo + casos antes de virar oferta principal.

---

## 3. Ofertas (o "cardápio")

Regra da fase atual: **escopo fechado, começo-meio-fim claro**. Evitar "disponível X horas/mês".

| # | Oferta | Para quem | Papel no funil |
|---|--------|-----------|----------------|
| 1 | **Desenvolvimento de MVP / produto** (escopo fechado, ex: 4–8 semanas) | Startups | Maior ticket |
| 2 | **Squad de um** — sênior terceirizado em projetos de software houses | Software houses | Fluxo rápido / estável |
| 3 | **Automação & integração** — APIs, webhooks, filas, conectar sistemas | Ambos | Ticket médio · ponte para IA |
| 4 | **Diagnóstico técnico** — auditoria de arquitetura, revisão de código/segurança, mentoria | Ambos | **CTA de entrada** (baixo risco, gera confiança, vira projeto) |

O **diagnóstico (#4)** é a porta de entrada destacada nos CTAs. **#1 e #3** são os de maior valor. **#2** garante fluxo inicial.

---

## 4. Portfólio

Estratégia de conteúdo (mix):
- **Projeto próprio (A):** Sisnanceiro (sistema financeiro/gestão) — mostrável livremente, com detalhes técnicos.
- **Casos de cliente (C):** descritos de forma **anonimizada** ("uma plataforma de saúde precisava de…") — problema → solução → resultado, sem nome/código sob sigilo. Ex.: arquitetura orientada a eventos em Rails 8 (pub/sub, filas), ambiente de dev local Flutter/Supabase/Edge Functions.
- **Projetos-vitrine a construir (D):** 1–2 projetos pensados de propósito para demonstrar exatamente o que se quer vender — prioridade para um **caso de automação com IA bem documentado** (constrói a ponte para a oferta futura).

Cada caso segue o formato: **Contexto → Desafio → Solução (com decisões de arquitetura/segurança) → Resultado → Stack**.

---

## 5. Sistema visual

Direção escolhida: **Dark Tech + elegância Clean** (híbrido).

- **Base:** fundo escuro sofisticado — azul-petróleo profundo (`#0d1b2a` / radial sutil para `#16304a`), NÃO preto cru.
- **Acento:** **teal** (`#2dd4bf`). (Índigo/violeta descartado por lembrar Nubank.)
- **Tipografia:** sans-serif limpa e arejada para títulos/corpo (ex.: Inter / Geist), com **detalhe em monospace** como assinatura (labels tipo `// engenharia sênior + IA`).
- **Texto:** `#e8eef5` (primário), `#9fb0c4` (secundário).
- **Hierarquia:** títulos grandes com tracking levemente negativo, muito respiro.
- **Componentes:** cards com fundo `#13283e`, bordas sutis `#2a4258`, CTA primário teal sólido + CTA secundário outline.

**Movimento (moderno, sutil — NÃO parallax pesado):**
- Scroll-triggered reveals via IntersectionObserver.
- Glow/camadas do hero com micro-transform.
- Possível sticky section em "Como trabalho".
- **Respeitar `prefers-reduced-motion`** (acessibilidade).

**Logo:** wordmark tipográfico na largada — `dyna**solutions**` com acento em teal. Logo real fica para a **fase 2** (não bloqueia o lançamento).

---

## 6. Estrutura do site

**Páginas:**
- **Home** — one-page longa (seções abaixo).
- **Portfólio** — lista de casos detalhados.
- **Serviços** — detalhe de cada uma das 4 ofertas.
- **Sobre** — história + por que confiar + foto.
- **Contato** — formulário + WhatsApp + e-mail.
- **Blog** — *opcional, fase 2* (autoridade/SEO).

**Fluxo da Home (8 seções, de cima pra baixo):**
1. **Hero** — frase de impacto + CTA "Agendar diagnóstico técnico" + CTA secundário "Ver portfólio".
2. **Prova rápida** — stacks/competências, tempo de experiência, números.
3. **Dores → soluções** — "você tem esse problema?" mapeando para as ofertas.
4. **Serviços** — os 4 pacotes em cards.
5. **Portfólio (destaques)** — 3 casos + "ver todos".
6. **Como trabalho** — processo + papel da IA no fluxo.
7. **Sobre (resumo)** — quem é, foto, credibilidade.
8. **CTA final** — "Vamos conversar?" + contato.

---

## 7. Rascunho de copy por seção (Home)

> Tom: direto, confiante, técnico mas acessível. Primeira pessoa.

**1. Hero**
- Label: `// engenharia de software sênior + IA`
- Título: **Software que escala, construído com critério.**
- Subtítulo: Backend robusto, integrações e automações — com a velocidade e a qualidade que a IA adiciona a um processo de engenharia sênior.
- CTA: `Agendar diagnóstico técnico →` · `Ver portfólio`

**2. Prova rápida**
- "+X anos construindo software para produção." (preencher anos)
- Stacks: Laravel · Node.js · Go · Ruby on Rails · Flutter · Supabase
- Foco: arquitetura, integrações, automação, IA aplicada.

**3. Dores → soluções**
- "Seu MVP trava antes de sair do papel?" → Desenvolvimento de produto
- "Falta um sênior pra destravar a arquitetura do seu time?" → Squad de um / Diagnóstico
- "Processos manuais consumindo horas da equipe?" → Automação & integração
- "Insegurança sobre a qualidade/segurança do código atual?" → Diagnóstico técnico

**4. Serviços** — 4 cards (título + 1 linha + "saiba mais"):
- Desenvolvimento de MVP/produto · Squad de um · Automação & integração · Diagnóstico técnico

**5. Portfólio (destaques)** — 3 cards (Contexto→Resultado resumido). Inclui Sisnanceiro + 1 caso anonimizado + 1 vitrine.

**6. Como trabalho**
- Processo: Diagnóstico → Tech spec → Execução em escopos → Entrega validada.
- Papel da IA: "Uso IA para acelerar o que é repetível (sintaxe, configuração, boilerplate) e reservo o julgamento sênior para o que importa: arquitetura, segurança e decisões de produto."

**7. Sobre (resumo)** — parágrafo curto + foto + link para página Sobre.

**8. CTA final**
- "Tem um desafio técnico? Vamos conversar."
- Botão: `Agendar diagnóstico técnico →`

---

## 8. Stack e entrega

- **Stack:** site **estático custom**. Recomendação primária: **Astro** (ótimo para sites de conteúdo, componentização, performance, fácil adicionar blog na fase 2). Alternativa mais simples: HTML + Tailwind.
- **Estilo:** Tailwind CSS (tokens do sistema visual configurados no tema).
- **Formulário de contato:** serviço sem backend (ex.: Formspree / web3forms) ou função serverless — evita manter servidor. WhatsApp via link `wa.me`.
- **Hospedagem:** preferencialmente **Cloudflare Pages ou Netlify** (grátis, CDN, HTTPS, deploy via git) apontando `dynasolutions.com.br`; alternativa: subir os arquivos estáticos no servidor compartilhado existente. WordPress fica de reserva para um possível blog na fase 2.
- **SEO básico:** meta tags, Open Graph, sitemap, dados estruturados (Person/Organization), Lighthouse alto.
- **Analytics:** Plausible ou Cloudflare Web Analytics (leve, privacy-friendly).

---

## 9. Fora de escopo agora (fase 2+)

- Logo profissional (wordmark tipográfico cobre a largada).
- Blog / conteúdo de autoridade e SEO de cauda longa.
- Reposicionamento para "consultor de IA" (após estudo + casos).
- Página de cada serviço com landing dedicada e formulários segmentados.
- Painel de edição sem código (só se virar necessidade real — usuário é dev).

---

## 10. Próximos passos

1. Plano de implementação (skill writing-plans) com fases: scaffold Astro+Tailwind → sistema visual/tokens → componentes → Home (8 seções) → páginas internas → formulário/contato → SEO/analytics → deploy.
2. Coletar conteúdo real: anos de experiência, números, foto, detalhes dos casos de portfólio, e-mail/WhatsApp.
3. Decidir o(s) projeto(s)-vitrine a construir/documentar (idealmente um caso de automação com IA).
