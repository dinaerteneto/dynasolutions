export interface Service { slug: string; title: string; tagline: string; }
export const services: Service[] = [
  { slug: "mvp", title: "Desenvolvimento sob demanda (MVP)", tagline: "Do conceito ao produto em escopo fechado (4–8 semanas)." },
  { slug: "squad", title: "Desenvolvedor sênior sob demanda", tagline: "Engenharia sênior full-stack integrada ao seu time ou agência." },
  { slug: "automacao", title: "Integração de sistemas e IA", tagline: "APIs, webhooks, filas — conecto e automatizo seus processos." },
  { slug: "diagnostico", title: "Consultoria em arquitetura", tagline: "Auditoria de código, banco de dados e segurança. Comece por aqui." },
];
