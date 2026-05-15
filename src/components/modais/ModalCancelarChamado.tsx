import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { PrioridadeChamadoResponseAPI } from "../../service/api/filaEsperaService";
import { PrioridadeTag } from "../../pages/recepcao/_shared";

interface PacienteCancelar {
  id: number;
  nome: string;
  senha: string;
  prioridadeChamado: PrioridadeChamadoResponseAPI;
}

interface ModalCancelarChamadoProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => Promise<void>;
  paciente: PacienteCancelar | null;
  loading?: boolean;
}

export function ModalCancelarChamado({
  open,
  onClose,
  onConfirmar,
  paciente,
  loading = false,
}: ModalCancelarChamadoProps) {
  if (!paciente) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "#f9fafb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1px solid #e5e7eb",
          }}
        >
          <CloseIcon sx={{ color: "#6b7280", fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Cancelar chamado</Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            Esta ação não pode ser desfeita
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            bgcolor: "grey.50",
            borderRadius: 2,
            p: 1.5,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Paciente
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{paciente.nome}</Typography>
          </Box>

          <Box sx={{ borderTop: "1px solid", borderColor: "divider" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Senha
            </Typography>
            <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13 }}>
              {paciente.senha}
            </Typography>
          </Box>

          <Box sx={{ borderTop: "1px solid", borderColor: "divider" }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Prioridade
            </Typography>
            <PrioridadeTag p={paciente.prioridadeChamado} />
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          O chamado será <strong style={{ fontWeight: 600 }}>cancelado</strong> e o paciente
          será removido do sistema. Essa operação encerrará o atendimento sem registro de conclusão.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Voltar
        </Button>
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={onConfirmar}
          disabled={loading}
          sx={{
            bgcolor: "#6b7280",
            "&:hover": { bgcolor: "#4b5563" },
          }}
        >
          {loading ? "Aguarde..." : "Cancelar chamado"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}