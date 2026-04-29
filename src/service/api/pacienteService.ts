export interface PacienteResponseDTO {
    id: number;
    nome: string;
    cpf: string;
    idade: number;
    sexo: string;
    criadoEm: Date;
    atualizadoEm: Date;
}