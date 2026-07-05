import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import { useState } from "react";

import AtendimentoModal from "../../../../components/AtendimentoModal";
import PrescricaoModal from "../../../../components/PrescricaoModal";
import PrioridadeBadge from "../../../../components/PrioridadeBadge";
import StatusBadge from "../../../../components/StatusBadge";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { FeedbackSnackbar } from "../../../../components/FeedbackSnackbar";

import { useDetalheChamado } from "../../../../hooks/useDetalheChamado";
import { useEncerrarAtendimento } from "../../../../hooks/useEncerrarAtendimento";
import { useIniciarAtendimento } from "../../../../hooks/useIniciarAtendimento";
import { useAtendimentoFlow } from "../../../../hooks/useAtendimentoFlow";
import { useFeedback } from "../../../../hooks/useFeedback";

import { formatDateTime } from "../../../../utils/FormataTempo";
import type { DetalheChamadoUI } from "../../../../mappers/detalheMapper";
import { useAuth } from "../../../../contexts/AuthContext";

interface HeaderDetalheProps {
  id: number;
  chamado: DetalheChamadoUI | null;
  atendimentoIniciado: boolean;
  atendimentoId: number | null;
  atendimentoEncerrado: boolean;
  onAtendimentoIniciado: (atendimentoId: number) => void;
  onAtendimentoEncerrado: () => void;
}

export const HeaderDetalhe = ({
  id,
  chamado,
  atendimentoIniciado,
  atendimentoId,
  atendimentoEncerrado,
  onAtendimentoIniciado,
  onAtendimentoEncerrado,
}: HeaderDetalheProps) => {
  const [atendimentoOpen, setAtendimentoOpen] = useState(false);
  const [prescricaoOpen, setPrescricaoOpen] = useState(false);

  const [confirmarInicioOpen, setConfirmarInicioOpen] = useState(false);
  const [confirmarEncerramentoOpen, setConfirmarEncerramentoOpen] = useState(false);

  const [loadingInicio, setLoadingInicio] = useState(false);
  const [loadingEncerramento, setLoadingEncerramento] = useState(false);

  const { detalheChamado, setDetalheChamado } = useDetalheChamado(id);
  const { iniciarAtendimento } = useIniciarAtendimento();
  const { encerrarAtendimento } = useEncerrarAtendimento();
  const { usuario } = useAuth();

  const { feedback, showSuccess, showError, clearFeedback } = useFeedback();

  const { podeEncerrar, marcarAtendimentoConfirmado, marcarPrescricaoFeita } =
    useAtendimentoFlow(detalheChamado, atendimentoEncerrado);

  const handleBotaoAtendimento = () => {
    if (atendimentoIniciado) {
      setAtendimentoOpen(true);
      return;
    }

    setConfirmarInicioOpen(true);
  };

  const confirmarInicioAtendimento = async () => {
    try {
      setLoadingInicio(true);
      const medicoId = usuario?.medicoId;
      if (!medicoId) return;

      const resultado = await iniciarAtendimento(id, medicoId);

      if (resultado) {
        onAtendimentoIniciado(resultado.id);

        if (detalheChamado) {
          setDetalheChamado({
            ...detalheChamado,
            statusChamado: "EM_ATENDIMENTO",
            atendimentoId: resultado.id,
          });
        }

        setConfirmarInicioOpen(false);
        setAtendimentoOpen(true);
        showSuccess("Atendimento iniciado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      showError("Erro ao iniciar atendimento.");
    } finally {
      setLoadingInicio(false);
    }
  };

  const confirmarEncerramento = async () => {
    if (!atendimentoId) return;

    try {
      setLoadingEncerramento(true);

      const resultado = await encerrarAtendimento(atendimentoId);

      if (resultado) {
        onAtendimentoEncerrado();

        if (detalheChamado) {
          setDetalheChamado({
            ...detalheChamado,
            statusChamado: "FINALIZADO",
          });
        }

        setConfirmarEncerramentoOpen(false);
        showSuccess("Atendimento encerrado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      showError("Erro ao encerrar atendimento.");
    } finally {
      setLoadingEncerramento(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton component={Link} to="/fila">
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Senha {detalheChamado?.senha}
            </Typography>

            {detalheChamado && (
              <PrioridadeBadge prioridade={detalheChamado.prioridadeChamado} />
            )}

            <StatusBadge status={detalheChamado?.statusChamado} />
          </Stack>

          <Typography>
            Aberto em{" "}
            {detalheChamado?.dataAbertura
              ? formatDateTime(detalheChamado.dataAbertura)
              : ""}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={handleBotaoAtendimento}
            disabled={atendimentoEncerrado}
          >
            {atendimentoIniciado ? "Abrir Atendimento" : "Iniciar Atendimento"}
          </Button>

          <Button
            variant="outlined"
            onClick={() => setPrescricaoOpen(true)}
            disabled={atendimentoEncerrado || !atendimentoIniciado}
          >
            Prescrever
          </Button>

          {podeEncerrar && (
            <Button
              variant="contained"
              color="error"
              startIcon={<StopCircleIcon />}
              onClick={() => setConfirmarEncerramentoOpen(true)}
            >
              Encerrar Atendimento
            </Button>
          )}
        </Stack>
      </Box>

      <AtendimentoModal
        open={atendimentoOpen}
        onClose={() => setAtendimentoOpen(false)}
        chamado={chamado}
        atendimentoId={atendimentoId}
        onConfirm={() => {
          marcarAtendimentoConfirmado();
          showSuccess("Atendimento registrado com sucesso!");
        }}
      />

      <PrescricaoModal
        open={prescricaoOpen}
        onClose={() => setPrescricaoOpen(false)}
        chamado={chamado}
        atendimentoId={atendimentoId}
        onConfirm={() => {
          marcarPrescricaoFeita();
          showSuccess("Prescrição salva com sucesso!");
        }}
      />

      <ConfirmDialog
        open={confirmarInicioOpen}
        title="Iniciar atendimento"
        content="Deseja realmente iniciar este atendimento?"
        confirmText="Iniciar"
        cancelText="Cancelar"
        loading={loadingInicio}
        onConfirm={confirmarInicioAtendimento}
        onCancel={() => setConfirmarInicioOpen(false)}
      />

      <ConfirmDialog
        open={confirmarEncerramentoOpen}
        title="Encerrar atendimento"
        content="Após encerrar o atendimento, não será mais possível realizar alterações."
        confirmText="Encerrar"
        cancelText="Voltar"
        danger
        loading={loadingEncerramento}
        onConfirm={confirmarEncerramento}
        onCancel={() => setConfirmarEncerramentoOpen(false)}
      />

      <FeedbackSnackbar feedback={feedback} onClose={clearFeedback} />
    </>
  );
};