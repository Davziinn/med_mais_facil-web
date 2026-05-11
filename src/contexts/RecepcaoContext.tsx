/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";


export type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";

export type ChamadoStatus = "aguardando" | "em_triagem" | "em_atendimento" | "finalizado" | "cancelado";

export type PresencaStatus = "aguardando_checkin" | "presente" | "ausente" | "encaminhado";

export type Setor = "clinico_geral" | "ortopedia" | "pediatria" | "triagem" | "observacao";

export interface Chamado {
  id: string;
  senha: string;
  prioridade: Prioridade;
  status: ChamadoStatus;
  paciente: {
    nome: string;
    cpf: string;
  };
  criadoEm: string;
  atualizadoEm: string;
}

export interface RecepcaoChamado extends Chamado {
  presenca: PresencaStatus;
  setor?: Setor;
  chegouEm?: string;
}


const MOCK_INITIAL_CHAMADOS: Chamado[] = [
  {
    id: "1",
    senha: "A-101",
    prioridade: "CRITICA",
    status: "em_triagem",
    paciente: { nome: "João Silva", cpf: "123.456.789-00" },
    criadoEm: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "2",
    senha: "B-202",
    prioridade: "MEDIA",
    status: "aguardando",
    paciente: { nome: "Maria Oliveira", cpf: "987.654.321-11" },
    criadoEm: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
  {
    id: "3",
    senha: "C-303",
    prioridade: "BAIXA",
    status: "aguardando",
    paciente: { nome: "Carlos Souza", cpf: "444.555.666-77" },
    criadoEm: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    atualizadoEm: new Date().toISOString(),
  },
];


export const SETOR_LABEL: Record<Setor, string> = {
  clinico_geral: "Clínico Geral",
  ortopedia: "Ortopedia",
  pediatria: "Pediatria",
  triagem: "Triagem",
  observacao: "Observação",
};

const PRIORIDADE_ORDEM: Record<Prioridade, number> = {
  CRITICA: 0,
  ALTA: 1,
  MEDIA: 2,
  BAIXA: 3,
};

interface Ctx {
  itens: RecepcaoChamado[];
  fila: RecepcaoChamado[];
  fazerCheckin: (id: string) => void;
  marcarAusente: (id: string) => void;
  chamarPaciente: (id: string) => void;
  alterarPrioridade: (id: string, p: Prioridade) => void;
  encaminhar: (id: string, setor: Setor) => void;
  cancelar: (id: string) => void;
  buscarPorTexto: (q: string) => RecepcaoChamado[];
  porId: (id: string) => RecepcaoChamado | undefined;
  posicaoNaFila: (id: string) => number;
}

const RecepcaoContext = createContext<Ctx | undefined>(undefined);

// --- PROVIDER ---

export function RecepcaoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<RecepcaoChamado[]>(() => 
    MOCK_INITIAL_CHAMADOS.map((c, i) => ({
      ...c,
      presenca:
        c.status === "em_atendimento" || c.status === "em_triagem"
          ? "presente"
          : i % 2 === 0 
            ? "presente"
            : "aguardando_checkin",
      chegouEm: c.status !== "aguardando" ? c.atualizadoEm : undefined,
    }))
  );

  const update = (id: string, patch: Partial<RecepcaoChamado>) =>
    setItens((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...patch, atualizadoEm: new Date().toISOString() } : c
      )
    );

  const fila = useMemo(
    () =>
      itens
        .filter((c) => c.presenca === "presente" && c.status !== "finalizado" && c.status !== "cancelado")
        .sort((a, b) => {
          const p = PRIORIDADE_ORDEM[a.prioridade] - PRIORIDADE_ORDEM[b.prioridade];
          if (p !== 0) return p;
          return new Date(a.chegouEm ?? a.criadoEm).getTime() - new Date(b.chegouEm ?? b.criadoEm).getTime();
        }),
    [itens]
  );

  const ctx: Ctx = {
    itens,
    fila,
    fazerCheckin: (id) =>
      update(id, { presenca: "presente", chegouEm: new Date().toISOString(), status: "em_triagem" }),
    marcarAusente: (id) => update(id, { presenca: "ausente" }),
    chamarPaciente: (id) => update(id, { status: "em_atendimento" }),
    alterarPrioridade: (id, prioridade) => update(id, { prioridade }),
    encaminhar: (id, setor) => update(id, { setor, presenca: "encaminhado" }),
    cancelar: (id) => update(id, { status: "cancelado" }),
    buscarPorTexto: (q) => {
      const t = q.trim().toLowerCase();
      if (!t) return [];
      return itens.filter(
        (c) =>
          c.paciente.nome.toLowerCase().includes(t) ||
          c.paciente.cpf.replace(/\D/g, "").includes(t.replace(/\D/g, "")) ||
          c.senha.toLowerCase().includes(t)
      );
    },
    porId: (id) => itens.find((c) => c.id === id),
    posicaoNaFila: (id) => fila.findIndex((c) => c.id === id) + 1,
  };

  return <RecepcaoContext.Provider value={ctx}>{children}</RecepcaoContext.Provider>;
}

// --- HOOKS E HELPERS ---

export function useRecepcao() {
  const c = useContext(RecepcaoContext);
  if (!c) throw new Error("useRecepcao deve estar dentro de RecepcaoProvider");
  return c;
}

export function calcMinutos(iso: string) {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
}

export function formatTempo(mins: number) {
  if (mins < 1) return "agora";
  return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
}