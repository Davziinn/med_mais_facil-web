import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import CallSplitIcon from "@mui/icons-material/CallSplit";

type PacienteModal = {
  nome: string;
  senha: string;
};

type EspecialidadeModal = {
  id: number;
  nome: string;
};

type ModalConfirmarEncaminhamentoProps = {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  paciente: PacienteModal | null;
  especialidade: EspecialidadeModal | null;
  loading: boolean;
  jaEncaminhado?: boolean;
};

export function ModalConfirmarEncaminhamento({
  open,
  onClose,
  onConfirmar,
  paciente,
  especialidade,
  loading,
  jaEncaminhado = false,
}: ModalConfirmarEncaminhamentoProps) {
  if (!paciente || !especialidade) return null;

  return (
    <Dialog
      open={open}
      onClose={() => !loading && onClose()}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CallSplitIcon sx={{ color: "#2563eb" }} />
        {jaEncaminhado
          ? "Confirmar reencaminhamento"
          : "Confirmar encaminhamento"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Paciente
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {paciente.nome} · Senha {paciente.senha}
            </Typography>
          </Box>

          {jaEncaminhado && (
            <Alert severity="warning" sx={{ fontSize: 13 }}>
              Este paciente já foi encaminhado anteriormente. Confirmar aqui vai
              reencaminhá-lo, substituindo o encaminhamento atual.
            </Alert>
          )}

          <Alert severity="info" sx={{ fontSize: 13 }}>
            Este chamado ficará visível apenas para médicos de{" "}
            <strong>{especialidade.nome}</strong> assim que você confirmar.
          </Alert>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={onConfirmar}
          disabled={loading}
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress size={16} sx={{ color: "inherit" }} />
            ) : undefined
          }
          sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}
        >
          {loading
            ? "Encaminhando..."
            : jaEncaminhado
              ? "Confirmar reencaminhamento"
              : "Confirmar encaminhamento"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
