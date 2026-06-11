export interface Project {
  slug: string; name: string; anonymized: boolean;
  context: string; challenge: string; solution: string; result: string; stack: string[];
  screenshot?: string; url?: string;
}
export const projects: Project[] = [
  {
    slug: "sisnanceiro", name: "Sisnanceiro", anonymized: false,
    context: "SaaS de educação financeira — o Método das Jarras com IA.",
    challenge: "Criar um sistema completo de gestão financeira pessoal com multi-tenancy, inteligência artificial e suporte ao calendário financeiro brasileiro.",
    solution: "Arquitetura modular DDD com Laravel 12 + React + PostgreSQL. IA integrada via Claude para categorização, importação de extratos e assistente Telegram. RLS no banco para isolamento entre contas.",
    result: "Produto próprio em produção com dashboard, extrato bancário, cartão de crédito, metas financeiras e bot Telegram para lançamentos por conversa.",
    stack: ["Laravel", "React", "PostgreSQL", "Redis", "LLM", "Telegram Bot"],
    screenshot: "/portfolio-sisnanceiro.png", url: "https://sisnanceiro.com",
  },
  {
    slug: "acheistudios", name: "Achei Studios", anonymized: false,
    context: "Plataforma do audiovisual — aluguel de estúdios, equipamentos e serviços criativos.",
    challenge: "Construir um marketplace completo com geolocalização, chat, agendamento e pagamentos, do zero.",
    solution: "Arquitetura full-stack com Flutter (web + mobile), Supabase, BLoC pattern e Google Maps. Atuei na arquitetura geral, backend, frontend e definição técnica do produto.",
    result: "Plataforma multi-plataforma em produção com cadastro de anúncios, busca por localização e sistema de reservas.",
    stack: ["Flutter", "Supabase", "Google Maps", "Bloc", "Go Router"],
    screenshot: "/portfolio-acheistudios.png", url: "https://acheistudios.com",
  },
  {
    slug: "rth-core", name: "RTH Core", anonymized: true,
    context: "API REST de gestão de benefícios de saúde — planos, parceiros, vouchers e integrações.",
    challenge: "Projetar um backend que integrasse múltiplos sistemas legados (Omie ERP, TopMed, Clube Certo, WakeCommerce) com resiliência, consistência e escalabilidade.",
    solution: "Clean Architecture em Rails 8 com camadas Controllers → Services → Adapters → Providers. Pub/sub com ActiveSupport::Notifications para sincronização assíncrona de planos via Solid Queue. JWT multi-tipo (cliente, parceiro, corretor). Adaptadores com throttle e ordenação de produtos para lidar com limitações de APIs externas.",
    result: "Sistema em produção integrando 4+ sistemas externos, com sincronização bidirecional de dados, processamento em background e consistência garantida entre plataformas.",
    stack: ["Ruby on Rails", "Solid Queue", "Pub/Sub", "JWT", "PostgreSQL", "Clean Architecture"],
    screenshot: "/portfolio-placeholder-ai.svg",
  },
  {
    slug: "decolecompremios", name: "Decole com Prêmios", anonymized: false,
    context: "Plataforma de fidelidade para postos de combustível — acúmulo e resgate de pontos.",
    challenge: "Sistema legado em Yii 1.1 com PHP 5.6 que precisava de manutenção, novas funcionalidades e integração com bombas de combustível via API.",
    solution: "Manutenção e evolução do sistema: API REST para integração com bombas, controle de créditos por abastecimento, catálogo de produtos com resgate por pontos, painel administrativo completo.",
    result: "Plataforma estável em produção conectando abastecimento a recompensas, com app mobile integrado via API.",
    stack: ["PHP", "Yii 1.1", "MySQL", "REST API"],
    screenshot: "/portfolio-decolecompremios.png",
  },
  {
    slug: "vestezap", name: "VesteZap", anonymized: false,
    context: "Micro-SaaS multi-tenant de e-commerce para moda feminina com finalização via WhatsApp.",
    challenge: "Criar uma plataforma multi-loja onde cada lojista tem catálogo, carrinho e checkout próprios, com pedidos fechados via WhatsApp — sem gateway de pagamento tradicional.",
    solution: "Arquitetura SOLID com Laravel 12 + React + PWA. Use Cases e Repositories separando responsabilidades. Multi-tenancy por tenant_id, notificações push Web Push, reCAPTCHA e integração WhatsApp.",
    result: "Plataforma SaaS em produção rodando em Docker, com frontend PWA (funciona como app nativo no celular), multi-loja isolada e checkout simplificado via WhatsApp.",
    stack: ["Laravel", "React", "TypeScript", "MySQL", "PWA", "WhatsApp API"],
    screenshot: "/portfolio-vestezap.png",
  },

];
