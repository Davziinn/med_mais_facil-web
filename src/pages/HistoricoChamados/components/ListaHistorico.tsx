import {
  Avatar, Box, Button, Card, CardContent, Chip,
  Divider, Stack, Typography,
} from "@mui/material";

import PrioridadeBadge from "../../../components/PrioridadeBadge";
import type { ChipPrioridadeCor } from "../../../components/PrioridadeBadge";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { ProntuarioModal } from "../../../components/ProntuarioModal";
import { useState } from "react";
import { useListarHistoricoAtendimento } from "../../../hooks/useListarHistoricoAtendimento";

const prioridadeColor: Record<ChipPrioridadeCor, string> = {
  vermelho: "#ef4444",
  laranja: "#f59e0b",
  amarelo: "#eab308",
  verde: "#22c55e",
};

export const ListaHistorico = () => {
  const [pacienteSelecionado, setPacienteSelecionado] = useState<{ id: number, nome: string } | null>(null);
  const { historicoAtendimento } = useListarHistoricoAtendimento();

  return (
    <>
      {historicoAtendimento.length === 0 ? (
        <Card variant="outlined">
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <EventNoteIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Typography color="text.secondary">
              Nenhum atendimento encontrado neste período.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={1.5}>
          {historicoAtendimento.map((historico) => (
            <Card
              key={historico.atendimentoId}
              variant="outlined"
              sx={{
                borderLeft: `4px solid ${prioridadeColor[historico.prioridade]}`,
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
                      width: { md: 280 },
                      flexShrink: 0,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: prioridadeColor[historico.prioridade],
                        width: 44,
                        height: 44,
                        fontWeight: 700,
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {"A" + String(historico.atendimentoId).padStart(3, "0")}
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {historico.nomePaciente}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {historico.idadePaciente} anos · {historico.sexoPaciente}
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
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {historico.diagnostico}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Atendido por {historico.nomeMedico}
                    </Typography>
                  </Box>

                  <Stack
                    spacing={0.5}
                    sx={{
                      alignItems: { xs: "flex-start", md: "flex-end" },
                      minWidth: { md: 180 },
                      flexShrink: 0,
                    }}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <PrioridadeBadge prioridade={historico.prioridade} />

                      <Chip
                        size="small"
                        icon={historico.status === "FINALIZADO" ? <CheckCircleIcon /> : <CancelIcon />}
                        label={historico.status === "FINALIZADO" ? "Finalizado" : "Cancelado"}
                        color={historico.status === "FINALIZADO" ? "success" : "error"}
                        variant="outlined"
                      />
                    </Stack>

                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(historico.dataFim).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    onClick={() => setPacienteSelecionado({ id: historico.pacienteId, nome: historico.nomePaciente })}
                    variant="outlined"
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ flexShrink: 0 }}
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
            paciente={pacienteSelecionado?.id ?? null}
            nomePaciente={pacienteSelecionado?.nome ?? ""}
          />
        </Stack>
      )}
    </>
  );
};