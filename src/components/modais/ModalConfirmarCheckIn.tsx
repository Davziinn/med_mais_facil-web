import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { PrioridadeTag } from "../../pages/recepcao/_shared";
import type { PrioridadeChamadoResponseAPI } from "../../service/api/filaEsperaService";

interface PacienteCheckIn {
  id: number;
  nome: string;
  senha: string;
  prioridadeChamado: PrioridadeChamadoResponseAPI;
}

interface ModalConfirmarCheckInProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => Promise<void>;
  paciente: PacienteCheckIn | null;
  loading?: boolean;
}

export function ModalConfirmarCheckIn({
  open,
  onClose,
  onConfirmar,
  paciente,
  loading = false,
}: ModalConfirmarCheckInProps) {
  if (!paciente) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "#f0fdf4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <HowToRegIcon sx={{ color: "#16a34a", fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
            Confirmar check-in
          </Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            Confirme a presença física do paciente
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Paciente
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
              {paciente.nome}
            </Typography>
          </Box>

          <Box sx={{ borderTop: "1px solid", borderColor: "divider" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Senha
            </Typography>
            <Typography
              sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13 }}
            >
              {paciente.senha}
            </Typography>
          </Box>

          <Box sx={{ borderTop: "1px solid", borderColor: "divider" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Prioridade
            </Typography>
            <PrioridadeTag p={paciente.prioridadeChamado} />
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6 }}
        >
          Ao confirmar, o paciente será movido para a{" "}
          <strong style={{ fontWeight: 600 }}>fila de espera</strong> e ficará
          disponível para atendimento médico.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<HowToRegIcon />}
          onClick={onConfirmar}
          disabled={loading}
        >
          {loading ? "Aguarde..." : "Confirmar check-in"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
