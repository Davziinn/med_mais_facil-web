import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PrioridadeBadge from "../../../components/PrioridadeBadge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { ProntuarioModal } from "../../../components/ProntuarioModal";
import { useState } from "react";

type Prioridade = "vermelho" | "laranja" | "amarelo" | "verde";
type ChamadoStatus = "finalizado" | "cancelado";

export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  sexo: "M" | "F";
  convenio?: string;
  carteirinha?: string;
  condicoesPreexistentes: string[];
}

type HistoricoItem = {
  id: number;
  senha: string;
  paciente: Paciente;
  prioridade: Prioridade;
  diagnostico: string;
  medico: string;
  status: ChamadoStatus;
  finalizadoEm: string;
  duracaoMin: number;
};

const filtrados: HistoricoItem[] = [
  {
    id: 1,
    senha: "A001",
    paciente: {
      id: "1",
      nome: "João Silva",
      cpf: "000.000.000-00",
      idade: 45,
      sexo: "M",
      condicoesPreexistentes: [],
    },
    prioridade: "vermelho",
    diagnostico: "Infarto agudo do miocárdio",
    medico: "Dr. Paulo Roberto",
    status: "finalizado",
    finalizadoEm: "2026-03-14T10:30:00",
    duracaoMin: 35,
  },
  {
    id: 2,
    senha: "A002",
    paciente: {
      id: "2",
      nome: "Maria Souza",
      cpf: "111.111.111-11",
      idade: 29,
      sexo: "F",
      condicoesPreexistentes: [],
    },
    prioridade: "laranja",
    diagnostico: "Infecção respiratória",
    medico: "Dra. Fernanda Lima",
    status: "finalizado",
    finalizadoEm: "2026-03-14T11:10:00",
    duracaoMin: 20,
  },
  {
    id: 3,
    senha: "A003",
    paciente: {
      id: "3",
      nome: "Carlos Lima",
      cpf: "222.222.222-22",
      idade: 52,
      sexo: "M",
      condicoesPreexistentes: [],
    },
    prioridade: "amarelo",
    diagnostico: "Cefaleia tensional",
    medico: "Dr. Ricardo Souza",
    status: "cancelado",
    finalizadoEm: "2026-03-14T09:20:00",
    duracaoMin: 10,
  },
  {
    id: 4,
    senha: "A004",
    paciente: {
      id: "4",
      nome: "Ana Costa",
      cpf: "333.333.333-33",
      idade: 34,
      sexo: "F",
      condicoesPreexistentes: [],
    },
    prioridade: "verde",
    diagnostico: "Vertigem",
    medico: "Dra. Juliana Alves",
    status: "finalizado",
    finalizadoEm: "2026-03-14T08:50:00",
    duracaoMin: 15,
  },
];

const prioridadeColor: Record<Prioridade, string> = {
  vermelho: "#ef4444",
  laranja: "#f59e0b",
  amarelo: "#3b82f6",
  verde: "#22c55e",
};

export const ListaHistorico = () => {
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<Paciente | null>(null);

  return (
    <>
      {filtrados.length === 0 ? (
        <Card variant="outlined">
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <EventNoteIcon
              sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
            />
            <Typography color="text.secondary">
              Nenhum atendimento encontrado neste período.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={1.5}>
          {filtrados.map((h) => (
            <Card
              key={`${h.id}-${h.finalizadoEm}`}
              variant="outlined"
              sx={{
                borderLeft: `4px solid ${prioridadeColor[h.prioridade]}`,
                transition: "all 0.2s",
                "&:hover": { boxShadow: 2 },
              }}
            >
              <CardContent>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  sx={{ alignItems: { md: "center" } }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      alignItems: "center",
                      minWidth: { md: 240 },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: prioridadeColor[h.prioridade],
                        width: 44,
                        height: 44,
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {h.senha}
                    </Avatar>

                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {h.paciente.nome}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {h.paciente.idade} anos ·{" "}
                        {h.paciente.sexo === "M" ? "Masculino" : "Feminino"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: "none", md: "block" } }}
                  />

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      Diagnóstico
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {h.diagnostico}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Atendido por {h.medico}
                    </Typography>
                  </Box>

                  <Stack
                    spacing={0.5}
                    sx={{
                      alignItems: {
                        xs: "flex-start",
                        md: "flex-end",
                      },
                      minWidth: { md: 180 },
                    }}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <PrioridadeBadge prioridade={h.prioridade} />

                      <Chip
                        size="small"
                        icon={
                          h.status === "finalizado" ? (
                            <CheckCircleIcon />
                          ) : (
                            <CancelIcon />
                          )
                        }
                        label={
                          h.status === "finalizado" ? "Finalizado" : "Cancelado"
                        }
                        color={h.status === "finalizado" ? "success" : "error"}
                        variant="outlined"
                      />
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <AccessTimeIcon
                        sx={{
                          fontSize: 14,
                          color: "text.secondary",
                        }}
                      />

                      <Typography variant="caption" color="text.secondary">
                        {new Date(h.finalizadoEm).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · {h.duracaoMin} min
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    onClick={() => setPacienteSelecionado(h.paciente)}
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Prontuário
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
          <ProntuarioModal
            isOpen={!!pacienteSelecionado}
            onClose={() => setPacienteSelecionado(null)}
            paciente={pacienteSelecionado}
          />
        </Stack>
      )}
    </>
  );
};
