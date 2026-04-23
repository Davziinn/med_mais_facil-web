// src/data/mockData.ts

export interface Sintoma {
  nome: string;
  intensidade: number;
}

export interface Paciente {
  nome: string;
  idade: number;
  condicoesPreexistentes: string[];
}

export interface Chamado {
  senha: string;
  queixaPrincipal: string;
  paciente: Paciente;
  sintomas: Sintoma[];
}

export const chamadoMock: Chamado = {
  senha: "A023",
  queixaPrincipal: "Dor de cabeça intensa",
  paciente: {
    nome: "João da Silva",
    idade: 42,
    condicoesPreexistentes: ["Hipertensão", "Diabetes tipo 2"],
  },
  sintomas: [
    { nome: "Cefaleia", intensidade: 8 },
    { nome: "Náusea", intensidade: 5 },
    { nome: "Fotofobia", intensidade: 6 },
  ],
};