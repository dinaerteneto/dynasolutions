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
