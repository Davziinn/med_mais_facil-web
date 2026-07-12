import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Box,
} from "@mui/material";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import { useEspecialidade } from "../../hooks/useEspecialidade";


type PacienteModal = {
  id: number;
  nome: string;
  nomePaciente: string;
  senha: string;
  statusChamado: string;
};

type ModalEncaminharChamadoProps = {
  open: boolean;
  onClose: () => void;
  onConfirmar: (especialidadeId: number) => void;
  paciente: PacienteModal | null;
  loading: boolean;
};

export function ModalEncaminharChamado({
  open,
  onClose,
  onConfirmar,
  paciente,
  loading,
}: ModalEncaminharChamadoProps) {
  const { especialidades } = useEspecialidade();
  const [especialidadeId, setEspecialidadeId] = useState<number | "">("");
  const [erro, setErro] = useState<string | null>(null);

  const especialidadeSelecionada = especialidades?.find(
    (e) => e.id === especialidadeId,
  );

  const handleConfirmar = () => {
    if (especialidadeId === "") {
      setErro("Selecione a especialidade antes de confirmar.");
      return;
    }
    setErro(null);
    onConfirmar(especialidadeId);
  };

  const handleClose = () => {
    setEspecialidadeId("");
    setErro(null);
    onClose();
  };

  if (!paciente) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CallSplitIcon sx={{ color: "#2563eb" }} />
        Encaminhar chamado
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Paciente
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              {paciente.nomePaciente} · Senha {paciente.senha}
            </Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel id="select-especialidade-label">
              Especialidade de destino
            </InputLabel>
            <Select
              labelId="select-especialidade-label"
              label="Especialidade de destino"
              value={especialidadeId}
              onChange={(e) => {
                setErro(null);
                setEspecialidadeId(e.target.value as number);
              }}
            >
              {especialidades?.map((esp) => (
                <MenuItem key={esp.id} value={esp.id}>
                  {esp.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {especialidadeSelecionada && (
            <Alert severity="info" sx={{ fontSize: 13 }}>
              Este chamado ficará visível apenas para médicos de{" "}
              <strong>{especialidadeSelecionada.nome}</strong> assim que você
              confirmar.
            </Alert>
          )}

          {erro && (
            <Alert severity="warning" sx={{ fontSize: 13 }}>
              {erro}
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmar}
          disabled={loading || especialidadeId === ""}
          variant="contained"
          sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" } }}
        >
          {loading ? "Encaminhando..." : "Confirmar encaminhamento"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}