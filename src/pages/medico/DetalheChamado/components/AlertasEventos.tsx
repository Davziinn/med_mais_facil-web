/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDetalheChamado } from "../../../../hooks/useDetalheChamado";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import type { GuiaMedicaCriada } from "../../../../components/modais/ModalGuiaAutorizacao";
import GuiaAutorizacaoModal from "../../../../components/modais/ModalGuiaAutorizacao";

interface AlertasEventosProps {
  id: number;
  atendimentoIniciado: boolean;
  atendimentoId: number | null;
  atendimentoEncerrado: boolean;
}

const severidadeConfig = {
  CRITICO: {
    cor: "error" as const,
    icone: <WarningAmberIcon fontSize="small" />,
    label: "Crítico",
  },
  MODERADO: {
    cor: "warning" as const,
    icone: <WarningAmberIcon fontSize="small" />,
    label: "Moderado",
  },
  LEVE: {
    cor: "info" as const,
    icone: <WarningAmberIcon fontSize="small" />,
    label: "Leve",
  },
};

const statusGuiaConfig = {
  PENDENTE: { cor: "warning" as const, label: "Pendente" },
  APROVADA: { cor: "success" as const, label: "Aprovada" },
  NEGADA: { cor: "error" as const, label: "Negada" },
};

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontSize: "10px",
          fontWeight: 500,
          color: "text.disabled",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "13px" }}>
        {value}
      </Typography>
    </Box>
  );
}

export const AlertasEventos = ({
  id,
  atendimentoIniciado,
  atendimentoId,
  atendimentoEncerrado,
}: AlertasEventosProps) => {
  const { detalheChamado } = useDetalheChamado(id);

  const [guiaOpen, setGuiaOpen] = useState(false);
  const [guiaParaEditar, setGuiaParaEditar] = useState<GuiaMedicaCriada | null>(
    null,
  );
  const [guiaParaCancelar, setGuiaParaCancelar] =
    useState<GuiaMedicaCriada | null>(null);
  const [guias, setGuias] = useState<GuiaMedicaCriada[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [expandidas, setExpandidas] = useState<Set<number>>(new Set());

  const botaoHabilitado = atendimentoIniciado && !atendimentoEncerrado;

  const toggleExpandida = (id: number) => {
    setExpandidas((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const abrirParaCriar = () => {
    setGuiaParaEditar(null);
    setGuiaOpen(true);
  };

  const abrirParaEditar = (guia: GuiaMedicaCriada) => {
    setGuiaParaEditar(guia);
    setGuiaOpen(true);
  };

  const confirmarCancelamento = () => {
    if (!guiaParaCancelar) return;
    setGuias((prev) => prev.filter((g) => g.id !== guiaParaCancelar.id));
    setFeedback(`Guia ${guiaParaCancelar.numeroGuia} cancelada.`);
    setGuiaParaCancelar(null);
  };

  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Stack spacing={3}>
        <Card
          sx={{
            border: "1px solid",
            borderColor: "error.light",
            bgcolor: "#fef3f3",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <WarningAmberIcon color="error" fontSize="small" />
              <Typography variant="subtitle2">Sinais de Alerta</Typography>
            </Stack>
            <Stack spacing={1}>
              {detalheChamado?.sinaisAlertas && detalheChamado?.sinaisAlertas.length > 0 ? ( detalheChamado?.sinaisAlertas.map((sinal, index) => {
                const config = severidadeConfig[sinal.severidade];
                return (
                  <Chip
                    key={index}
                    label={sinal.descricao}
                    color={config.cor}
                    icon={config.icone}
                    sx={{ justifyContent: "flex-start" }}
                  />
                );
              })) : (
                <Typography variant="body2" color="text.secondary">
                  Nenhum sinal de alerta registrado para este paciente.
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <DescriptionIcon color="primary" fontSize="small" />
              <Typography variant="subtitle2">Eventos Recentes</Typography>
            </Stack>
            <Stack spacing={1}>
              {detalheChamado?.eventosClinicos &&
              detalheChamado.eventosClinicos.length > 0 ? (
                detalheChamado.eventosClinicos.map((evento) => (
                  <Chip
                    key={evento.id}
                    label={evento.descricao}
                    variant="outlined"
                    sx={{ justifyContent: "flex-start" }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  O paciente não cadastrou eventos clínicos recentes.
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Guia de Autorização */}
        <Card>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <DescriptionIcon color="success" fontSize="small" />
              <Typography variant="subtitle2">Guia de Autorização</Typography>
            </Stack>

            <Tooltip
              title={
                botaoHabilitado
                  ? ""
                  : "Inicie o atendimento para gerar a pré-solicitação de guia."
              }
              arrow
            >
              <span>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  disabled={!botaoHabilitado}
                  onClick={abrirParaCriar}
                >
                  Gerar Pré-solicitação de Guia
                </Button>
              </span>
            </Tooltip>

            {guias.length > 0 && (
              <Stack spacing={1} sx={{ mt: 2 }}>
                {guias.map((guia) => {
                  const config = statusGuiaConfig[guia.statusGuiaMedica];
                  const editavel =
                    guia.statusGuiaMedica === "PENDENTE" &&
                    !atendimentoEncerrado;
                  const expandida = expandidas.has(guia.id);

                  return (
                    <Accordion
                      key={guia.id}
                      expanded={expandida}
                      onChange={() => toggleExpandida(guia.id)}
                      disableGutters
                      elevation={0}
                      sx={{
                        border: "0.5px solid",
                        borderColor: "divider",
                        borderRadius: "10px !important",
                        "&:before": { display: "none" },
                        overflow: "hidden",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon
                            sx={{ fontSize: 18, color: "text.disabled" }}
                          />
                        }
                        sx={{
                          minHeight: 40,
                          px: 1.5,
                          py: 0,
                          "& .MuiAccordionSummary-content": {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            my: "8px",
                            overflow: "hidden",
                          },
                        }}
                      >
                        <Chip
                          size="small"
                          color={config.cor}
                          label={config.label}
                          sx={{
                            fontSize: "11px",
                            height: 22,
                            fontWeight: 500,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "monospace",
                            color: "text.disabled",
                            ml: "auto",
                            mr: 0.5,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {guia.numeroGuia}
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails sx={{ px: 1.5, pt: 0, pb: 1.5 }}>
                        <Divider sx={{ mb: 1.5 }} />

                        {/* Metadados */}
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <MetaItem label="CID-10" value={guia.cid10} />
                          <MetaItem
                            label="Data"
                            value={new Date(
                              guia.dataSolicitacao,
                            ).toLocaleString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          />
                          <Box sx={{ gridColumn: "1 / -1" }}>
                            <MetaItem
                              label="Indicação Clínica"
                              value={guia.indicacaoClinica}
                            />
                          </Box>
                        </Box>

                        <Divider sx={{ mb: 1.5 }} />

                        {/* Exames */}
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            fontSize: "10px",
                            fontWeight: 500,
                            color: "text.disabled",
                            mb: 0.75,
                          }}
                        >
                          Exames solicitados
                        </Typography>
                        <Stack
                          spacing={0.5}
                          sx={{ mb: guia.observacoes ? 1.5 : 0 }}
                        >
                          {guia.exames.map((e) => (
                            <Typography
                              key={e.id}
                              variant="body2"
                              sx={{ fontSize: "12px", color: "text.secondary" }}
                            >
                              • {e.nome}
                            </Typography>
                          ))}
                        </Stack>

                        {/* Observações */}
                        {guia.observacoes && (
                          <>
                            <Divider sx={{ mb: 1.5 }} />
                            <MetaItem
                              label="Observações"
                              value={guia.observacoes}
                            />
                          </>
                        )}

                        {/* Ações */}
                        <Box sx={{ mt: 1.5 }}>
                          {editavel ? (
                            <Stack direction="row" spacing={1}>
                              <Button
                                size="small"
                                variant="outlined"
                                fullWidth
                                onClick={(e) => {
                                  e.stopPropagation();
                                  abrirParaEditar(guia);
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGuiaParaCancelar(guia);
                                }}
                              >
                                Cancelar
                              </Button>
                            </Stack>
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              fullWidth
                              startIcon={<VisibilityIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setFeedback(
                                  `Guia ${guia.numeroGuia} pronta para acompanhamento.`,
                                );
                              }}
                            >
                              Visualizar Guia
                            </Button>
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Stack>

      <GuiaAutorizacaoModal
        open={guiaOpen}
        onClose={() => {
          setGuiaOpen(false);
          setGuiaParaEditar(null);
        }}
        chamado={detalheChamado}
        atendimentoId={atendimentoId}
        guiaParaEditar={guiaParaEditar}
        onConfirm={(g) => {
          setGuias((prev) => {
            const existe = prev.some((item) => item.id === g.id);
            return existe
              ? prev.map((item) => (item.id === g.id ? g : item))
              : [...prev, g];
          });

          setExpandidas((prev) => new Set(prev).add(g.id));
          setGuiaOpen(false);
          setFeedback(
            guiaParaEditar
              ? `Guia ${g.numeroGuia} atualizada com sucesso.`
              : `Pré-solicitação ${g.numeroGuia} gerada com sucesso.`,
          );
          setGuiaParaEditar(null);
        }}
      />

      <ConfirmDialog
        open={!!guiaParaCancelar}
        title="Cancelar pré-solicitação de guia"
        content={`Tem certeza que deseja cancelar a guia ${guiaParaCancelar?.numeroGuia}? Essa ação não pode ser desfeita.`}
        confirmText="Cancelar Guia"
        cancelText="Voltar"
        danger
        onConfirm={confirmarCancelamento}
        onCancel={() => setGuiaParaCancelar(null)}
      />

      <Snackbar
        open={!!feedback}
        autoHideDuration={3500}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setFeedback(null)}
        >
          {feedback}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
