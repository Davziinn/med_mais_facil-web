import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { PrioridadeTag } from "../../pages/recepcao/_shared";
import type { PrioridadeChamadoResponseAPI } from "../../service/api/filaEsperaService";

interface PacienteAusente {
  id: number;
  nomePaciente: string;
  senha: string;
  prioridadeChamado: PrioridadeChamadoResponseAPI;
}


interface ModalConfirmarAusenteProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => Promise<void>;
  paciente: PacienteAusente | null;
  loading?: boolean;
}

export function ModalConfirmarAusente({
  open,
  onClose,
  onConfirmar,
  paciente,
  loading = false,
}: ModalConfirmarAusenteProps) {
  if (!paciente) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "#fef2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PersonOffIcon sx={{ color: "#e24b4a", fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Confirmar ausência</Typography>
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
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{paciente.nomePaciente}</Typography>
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
          O paciente será marcado como <strong style={{ fontWeight: 600 }}>ausente</strong> e
          removido da fila de espera. O chamado será encerrado automaticamente.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<PersonOffIcon />}
          onClick={onConfirmar}
          disabled={loading}
        >
          {loading ? "Aguarde..." : "Marcar como ausente"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}