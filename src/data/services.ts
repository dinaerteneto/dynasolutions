export interface Service { slug: string; title: string; tagline: string; }
export const services: Service[] = [
  { slug: "mvp", title: "Desenvolvimento de MVP/produto", tagline: "Do conceito ao produto em escopo fechado (4–8 semanas)." },
  { slug: "squad", title: "Squad de um", tagline: "Sênior terceirizado integrado ao seu time ou agência." },
  { slug: "automacao", title: "Automação & integração", tagline: "APIs, webhooks, filas — conecto e automatizo seus sistemas." },
  { slug: "diagnostico", title: "Diagnóstico técnico", tagline: "Auditoria de arquitetura, código e segurança. Comece por aqui." },
];
