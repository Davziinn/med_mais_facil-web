/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DescriptionIcon from "@mui/icons-material/Description";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { FeedbackSnackbar } from "../../../../components/FeedbackSnackbar";
import { GuiaAutorizacaoItem } from "../../../../components/GuiaAutorizacaoItem";
import { useFeedback } from "../../../../hooks/useFeedback";
import { useGuiaMedica } from "../../../../hooks/useGuiaMedica";
import ModalGuiaAutorizacao from "../../../../components/modais/ModalGuiaAutorizacao";
import ModalGuiaVisualizacao from "../../../../components/modais/ModalGuiaVisualizacao";
import type { GuiaMedicaResponseDTO } from "../../../../service/api/guiaMedicaService";
import type { DetalheChamadoUI } from "../../../../mappers/detalheMapper";

interface AlertasEventosProps {
  chamado: DetalheChamadoUI | null;
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

export const AlertasEventos = ({
  chamado,
  atendimentoIniciado,
  atendimentoId,
  atendimentoEncerrado,
}: AlertasEventosProps) => {
  const {
    guiasMedicas,
    loading: carregandoGuias,
    carregarGuiasMedicas,
  } = useGuiaMedica();

  const [guiaOpen, setGuiaOpen] = useState(false);
  const [guiaParaEditar, setGuiaParaEditar] =
    useState<GuiaMedicaResponseDTO | null>(null);
  const [guiaParaCancelar, setGuiaParaCancelar] =
    useState<GuiaMedicaResponseDTO | null>(null);
  const [guiaParaVisualizar, setGuiaParaVisualizar] =
    useState<GuiaMedicaResponseDTO | null>(null);

  const { feedback, showSuccess, clearFeedback } = useFeedback();

  const botaoHabilitado = atendimentoIniciado && !atendimentoEncerrado;

  useEffect(() => {
    if (atendimentoId) {
      carregarGuiasMedicas(atendimentoId);
    }
  }, [atendimentoId]);

  const abrirParaCriar = () => {
    setGuiaParaEditar(null);
    setGuiaOpen(true);
  };

  const abrirParaEditar = (guia: GuiaMedicaResponseDTO) => {
    setGuiaParaEditar(guia);
    setGuiaOpen(true);
  };

  const confirmarCancelamento = () => {
    if (!guiaParaCancelar) return;
    showSuccess(`Guia ${guiaParaCancelar.numeroGuia} cancelada.`);
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
              {chamado?.sinaisAlertas && chamado.sinaisAlertas.length > 0 ? (
                chamado.sinaisAlertas.map((sinal, index) => {
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
                })
              ) : (
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
              {chamado?.eventosClinicos &&
              chamado.eventosClinicos.length > 0 ? (
                chamado.eventosClinicos.map((evento) => (
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

            {carregandoGuias ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              guiasMedicas.length > 0 && (
                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  {guiasMedicas.map((guia) => (
                    <GuiaAutorizacaoItem
                      key={guia.id}
                      guia={guia}
                      onEditar={() => abrirParaEditar(guia)}
                      onCancelar={() => setGuiaParaCancelar(guia)}
                      onVisualizar={() => setGuiaParaVisualizar(guia)}
                    />
                  ))}
                </Stack>
              )
            )}
          </CardContent>
        </Card>
      </Stack>

      <ModalGuiaAutorizacao
        open={guiaOpen}
        onClose={() => {
          setGuiaOpen(false);
          setGuiaParaEditar(null);
        }}
        chamado={chamado}
        atendimentoId={atendimentoId}
        guiaParaEditar={guiaParaEditar}
        onConfirm={(g) => {
          setGuiaOpen(false);
          showSuccess(
            guiaParaEditar
              ? `Guia ${g.numeroGuia} atualizada com sucesso.`
              : `Pré-solicitação ${g.numeroGuia} gerada com sucesso.`,
          );
          setGuiaParaEditar(null);

          if (atendimentoId) {
            carregarGuiasMedicas(atendimentoId);
          }
        }}
      />

      {guiaParaVisualizar && chamado && (
        <ModalGuiaVisualizacao
          open={!!guiaParaVisualizar}
          onClose={() => setGuiaParaVisualizar(null)}
          guia={guiaParaVisualizar}
          chamado={chamado}
          onCopy={(msg: string) => showSuccess(msg)}
        />
      )}

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

      <FeedbackSnackbar feedback={feedback} onClose={clearFeedback} />
    </Grid>
  );
};
