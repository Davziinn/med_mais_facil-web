import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AtendimentoModal from "../../../../components/AtendimentoModal";
import PrescricaoModal from "../../../../components/PrescricaoModal";
import PrioridadeBadge from "../../../../components/PrioridadeBadge";
import StatusBadge from "../../../../components/StatusBadge";
import ConfirmDialog from "../../../../components/ConfirmDialog";

import { useDetalheChamado } from "../../../../hooks/useDetalheChamado";
import { useEncerrarAtendimento } from "../../../../hooks/useEncerrarAtendimento";
import { useIniciarAtendimento } from "../../../../hooks/useIniciarAtendimento";

import { formatDateTime } from "../../../../utils/FormataTempo";
import type { DetalheChamadoUI } from "../../../../mappers/detalheMapper";

interface HeaderDetalheProps {
  id: number;
  chamado: DetalheChamadoUI | null;
}

export const HeaderDetalhe = ({ id, chamado }: HeaderDetalheProps) => {
  const [atendimentoOpen, setAtendimentoOpen] = useState(false);
  const [prescricaoOpen, setPrescricaoOpen] = useState(false);

  const [confirmarInicioOpen, setConfirmarInicioOpen] = useState(false);
  const [confirmarEncerramentoOpen, setConfirmarEncerramentoOpen] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  const [loadingInicio, setLoadingInicio] = useState(false);
  const [loadingEncerramento, setLoadingEncerramento] = useState(false);

  const [atendimentoId, setAtendimentoId] = useState<number | null>(null);

  const [atendimentoIniciado, setAtendimentoIniciado] = useState(false);
  const [atendimentoConfirmado, setAtendimentoConfirmado] = useState(false);
  const [prescricaoFeita, setPrescricaoFeita] = useState(false);
  const [atendimentoEncerrado, setAtendimentoEncerrado] = useState(false);

  const podeEncerrar = atendimentoConfirmado && prescricaoFeita && !atendimentoEncerrado;

  const { detalheChamado, setDetalheChamado } = useDetalheChamado(id);
  const { iniciarAtendimento } = useIniciarAtendimento();
  const { encerrarAtendimento } = useEncerrarAtendimento();

  useEffect(() => {
    if (!detalheChamado) return;

    if (detalheChamado.statusChamado === "EM_ATENDIMENTO") {
      setAtendimentoIniciado(true);
      setAtendimentoConfirmado(true);
      setPrescricaoFeita(true);
    }

    if (detalheChamado.statusChamado === "FINALIZADO") {
      setAtendimentoEncerrado(true);
    }

    if (detalheChamado.id) {
      setAtendimentoId(detalheChamado.id);
    }
  }, [detalheChamado]);

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

      const resultado = await iniciarAtendimento(id, 1);

      if (resultado) {
        setAtendimentoId(resultado.id);
        setAtendimentoIniciado(true);

        if (detalheChamado) {
          setDetalheChamado({
            ...detalheChamado,
            statusChamado: "EM_ATENDIMENTO",
          });
        }

        setConfirmarInicioOpen(false);
        setAtendimentoOpen(true);
        setFeedback("Atendimento iniciado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Erro ao iniciar atendimento.");
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
        setAtendimentoEncerrado(true);

        if (detalheChamado) {
          setDetalheChamado({
            ...detalheChamado,
            statusChamado: "FINALIZADO",
          });
        }

        setConfirmarEncerramentoOpen(false);
        setFeedback("Atendimento encerrado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Erro ao encerrar atendimento.");
    } finally {
      setLoadingEncerramento(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
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
            {" · "}
            Hospital Kra Lho
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
          setAtendimentoConfirmado(true);
          setFeedback("Atendimento registrado com sucesso!");
        }}
      />

      <PrescricaoModal
        open={prescricaoOpen}
        onClose={() => setPrescricaoOpen(false)}
        chamado={chamado}
        atendimentoId={atendimentoId}
        onConfirm={() => {
          setPrescricaoFeita(true);
          setFeedback("Prescrição salva com sucesso!");
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

      <Snackbar
        open={!!feedback}
        autoHideDuration={3500}
        onClose={() => setFeedback(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={feedback?.includes("Erro") ? "error" : "success"}
          variant="filled"
          onClose={() => setFeedback(null)}
        >
          {feedback}
        </Alert>
      </Snackbar>
    </>
  );
};