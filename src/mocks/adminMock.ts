export type TipoUsuario = "ADMINISTRADOR" | "MEDICO" | "RECEPCAO";

export interface UsuarioAdm {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  hospitalId: string;
  especialidadeId?: string;
  tipo: TipoUsuario;
  ativo: boolean;
}

export type StatusHospital = "Ativo" | "Inativo" | "Lotado" | "Em manutenção";

export interface Hospital {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  status: StatusHospital;
  especialidadesIds: string[];
}

export interface Especialidade {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  medicosVinculados: number;
}

export type PrioridadeSintoma = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";
export type CategoriaSintoma = "Neurológico" | "Respiratório" | "Cardíaco" | "Traumático" | "Geral";

export interface Sintoma {
  id: string;
  nome: string;
  categoria: CategoriaSintoma;
  prioridade: PrioridadeSintoma;
  ativo: boolean;
}

export type GravidadeEvento = "Leve" | "Moderada" | "Grave" | "Crítica";

export interface EventoClinico {
  id: string;
  nome: string;
  descricao: string;
  gravidade: GravidadeEvento;
  ativo: boolean;
}

export interface LogAuditoria {
  id: string;
  usuario: string;
  acao: string;
  modulo: string;
  data: string; // ISO
}

export const ESPECIALIDADES_MOCK: Especialidade[] = [
  { id: "esp-1", nome: "Clínica Geral", descricao: "Atendimento geral", cor: "#0284c7", medicosVinculados: 12 },
  { id: "esp-2", nome: "Cardiologia", descricao: "Doenças do coração", cor: "#e11d48", medicosVinculados: 6 },
  { id: "esp-3", nome: "Ortopedia", descricao: "Ossos e articulações", cor: "#f59e0b", medicosVinculados: 4 },
  { id: "esp-4", nome: "Neurologia", descricao: "Sistema nervoso", cor: "#8b5cf6", medicosVinculados: 3 },
  { id: "esp-5", nome: "Pediatria", descricao: "Atendimento infantil", cor: "#16a34a", medicosVinculados: 5 },
];

export const HOSPITAIS_MOCK: Hospital[] = [
  {
    id: "h-1",
    nome: "Hospital Central Med+Fácil",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 4002-8922",
    endereco: "Av. Paulista, 1500",
    cidade: "São Paulo",
    estado: "SP",
    status: "Ativo",
    especialidadesIds: ["esp-1", "esp-2", "esp-3", "esp-5"],
  },
  {
    id: "h-2",
    nome: "Hospital Regional Zona Sul",
    cnpj: "98.765.432/0001-10",
    telefone: "(11) 3322-7788",
    endereco: "R. das Acácias, 300",
    cidade: "São Paulo",
    estado: "SP",
    status: "Lotado",
    especialidadesIds: ["esp-1", "esp-4"],
  },
  {
    id: "h-3",
    nome: "Pronto Atendimento Norte",
    cnpj: "11.222.333/0001-44",
    telefone: "(11) 2255-9090",
    endereco: "Av. Brasil, 999",
    cidade: "Guarulhos",
    estado: "SP",
    status: "Em manutenção",
    especialidadesIds: ["esp-1", "esp-3"],
  },
  {
    id: "h-4",
    nome: "Hospital Vida Plena",
    cnpj: "55.444.333/0001-22",
    telefone: "(21) 3030-4040",
    endereco: "R. Voluntários, 120",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    status: "Ativo",
    especialidadesIds: ["esp-2", "esp-5"],
  },
  {
    id: "h-5",
    nome: "Hospital São Camilo",
    cnpj: "77.888.999/0001-66",
    telefone: "(31) 4001-2233",
    endereco: "Av. Afonso Pena, 800",
    cidade: "Belo Horizonte",
    estado: "MG",
    status: "Inativo",
    especialidadesIds: ["esp-1"],
  },
];

export const USUARIOS_MOCK: UsuarioAdm[] = [
  { id: "u-1", nome: "Dra. Helena Vasconcelos", email: "helena@medfacil.com", cpf: "123.456.789-00", telefone: "(11) 99887-1122", hospitalId: "h-1", especialidadeId: "esp-2", tipo: "MEDICO", ativo: true },
  { id: "u-2", nome: "Dr. Rafael Lima", email: "rafael@medfacil.com", cpf: "222.333.444-55", telefone: "(11) 98877-4433", hospitalId: "h-1", especialidadeId: "esp-1", tipo: "MEDICO", ativo: true },
  { id: "u-3", nome: "Dra. Camila Souza", email: "camila@medfacil.com", cpf: "333.444.555-66", telefone: "(21) 99100-1010", hospitalId: "h-4", especialidadeId: "esp-5", tipo: "MEDICO", ativo: true },
  { id: "u-4", nome: "Patrícia Almeida", email: "patricia@medfacil.com", cpf: "444.555.666-77", telefone: "(11) 99876-5544", hospitalId: "h-1", tipo: "RECEPCAO", ativo: true },
  { id: "u-5", nome: "Mariana Castro", email: "mariana@medfacil.com", cpf: "555.666.777-88", telefone: "(11) 98765-4321", hospitalId: "h-2", tipo: "RECEPCAO", ativo: false },
  { id: "u-6", nome: "Roberto Mendes", email: "roberto@medfacil.com", cpf: "666.777.888-99", telefone: "(11) 91234-5678", hospitalId: "h-1", tipo: "ADMINISTRADOR", ativo: true },
  { id: "u-7", nome: "Sofia Oliveira", email: "sofia@medfacil.com", cpf: "777.888.999-00", telefone: "(31) 99000-1122", hospitalId: "h-5", tipo: "ADMINISTRADOR", ativo: true },
  { id: "u-8", nome: "Dr. Bruno Carvalho", email: "bruno@medfacil.com", cpf: "888.999.000-11", telefone: "(11) 98000-7766", hospitalId: "h-3", especialidadeId: "esp-3", tipo: "MEDICO", ativo: true },
  { id: "u-9", nome: "Juliana Pires", email: "juliana@medfacil.com", cpf: "999.000.111-22", telefone: "(21) 97000-3322", hospitalId: "h-4", tipo: "RECEPCAO", ativo: true },
  { id: "u-10", nome: "Dra. Ana Beatriz", email: "ana@medfacil.com", cpf: "101.202.303-40", telefone: "(11) 96000-8899", hospitalId: "h-2", especialidadeId: "esp-4", tipo: "MEDICO", ativo: true },
];

export const SINTOMAS_MOCK: Sintoma[] = [
  { id: "s-1", nome: "Dor de cabeça", categoria: "Neurológico", prioridade: "MEDIA", ativo: true },
  { id: "s-2", nome: "Febre alta", categoria: "Geral", prioridade: "MEDIA", ativo: true },
  { id: "s-3", nome: "Dor torácica", categoria: "Cardíaco", prioridade: "CRITICA", ativo: true },
  { id: "s-4", nome: "Falta de ar", categoria: "Respiratório", prioridade: "ALTA", ativo: true },
  { id: "s-5", nome: "Tontura", categoria: "Neurológico", prioridade: "BAIXA", ativo: true },
  { id: "s-6", nome: "Sangramento intenso", categoria: "Traumático", prioridade: "CRITICA", ativo: true },
  { id: "s-7", nome: "Tosse persistente", categoria: "Respiratório", prioridade: "BAIXA", ativo: true },
  { id: "s-8", nome: "Palpitação", categoria: "Cardíaco", prioridade: "ALTA", ativo: true },
];

export const EVENTOS_MOCK: EventoClinico[] = [
  { id: "e-1", nome: "Queda recente", descricao: "Queda da própria altura nos últimos 7 dias", gravidade: "Moderada", ativo: true },
  { id: "e-2", nome: "Convulsão", descricao: "Episódio convulsivo recente", gravidade: "Crítica", ativo: true },
  { id: "e-3", nome: "Acidente de trânsito", descricao: "Envolvido em colisão ou atropelamento", gravidade: "Grave", ativo: true },
  { id: "e-4", nome: "Internação recente", descricao: "Internado nos últimos 30 dias", gravidade: "Moderada", ativo: true },
  { id: "e-5", nome: "Cirurgia recente", descricao: "Procedimento cirúrgico nos últimos 15 dias", gravidade: "Leve", ativo: true },
];

export const LOGS_MOCK: LogAuditoria[] = [
  { id: "l-1", usuario: "Roberto Mendes", acao: "Criou hospital Hospital Central", modulo: "Hospitais", data: "2026-05-18T09:14:00" },
  { id: "l-2", usuario: "Sofia Oliveira", acao: "Alterou especialidade Cardiologia", modulo: "Especialidades", data: "2026-05-18T08:45:00" },
  { id: "l-3", usuario: "Roberto Mendes", acao: "Removeu sintoma Coriza", modulo: "Sintomas", data: "2026-05-17T17:32:00" },
  { id: "l-4", usuario: "Patrícia Almeida", acao: "Realizou check-in do paciente #2341", modulo: "Recepção", data: "2026-05-17T16:10:00" },
  { id: "l-5", usuario: "Dra. Helena Vasconcelos", acao: "Finalizou atendimento #884", modulo: "Atendimento", data: "2026-05-17T15:02:00" },
  { id: "l-6", usuario: "Sofia Oliveira", acao: "Alterou perfil de Juliana Pires", modulo: "Usuários", data: "2026-05-17T11:50:00" },
  { id: "l-7", usuario: "Roberto Mendes", acao: "Atualizou configurações de fila", modulo: "Configurações", data: "2026-05-16T18:22:00" },
  { id: "l-8", usuario: "Dr. Rafael Lima", acao: "Encaminhou paciente para Ortopedia", modulo: "Atendimento", data: "2026-05-16T14:05:00" },
];

// Estatísticas dashboard
export const DASHBOARD_STATS = {
  totalPacientes: 1284,
  totalMedicos: 38,
  totalRecepcionistas: 21,
  totalAdministradores: 6,
  totalHospitais: HOSPITAIS_MOCK.length,
  chamadosAtivos: 47,
  chamadosFinalizadosHoje: 162,
  chamadosCancelados: 9,
  pacientesAusentes: 4,
  pacientesEmAtendimento: 18,
  pacientesEmEspera: 25,
};

export const ATENDIMENTOS_SEMANA = [
  { dia: "Seg", atendimentos: 140 },
  { dia: "Ter", atendimentos: 162 },
  { dia: "Qua", atendimentos: 155 },
  { dia: "Qui", atendimentos: 178 },
  { dia: "Sex", atendimentos: 198 },
  { dia: "Sáb", atendimentos: 122 },
  { dia: "Dom", atendimentos: 95 },
];

export const CHAMADOS_PRIORIDADE = [
  { prioridade: "Crítica", total: 12, cor: "#e11d48" },
  { prioridade: "Alta", total: 28, cor: "#ea580c" },
  { prioridade: "Média", total: 44, cor: "#eab308" },
  { prioridade: "Baixa", total: 31, cor: "#16a34a" },
];
