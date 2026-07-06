/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import type { DetalheChamadoUI } from "../../mappers/detalheMapper";
import { useGuiaMedica } from "../../hooks/useGuiaMedica";
import { useExame } from "../../hooks/useExame";
import type { GuiaMedicaResponseDTO, GuiaMedicaRequestDTO } from "../../service/api/guiaMedicaService";

interface Props {
  open: boolean;
  onClose: () => void;
  chamado: DetalheChamadoUI | null;
  atendimentoId: number | null;
  guiaParaEditar?: GuiaMedicaResponseDTO | null;
  onConfirm: (guia: GuiaMedicaResponseDTO) => void;
}

const OBS_MAX = 300;

export default function ModalGuiaAutorizacao({
  open,
  onClose,
  chamado,
  atendimentoId,
  guiaParaEditar,
  onConfirm,
}: Props) {
  const { cadastrarGuiaMedica, editarGuiaMedica } = useGuiaMedica();
  const { exames, loading: carregandoExames, error: erroExames, carregarExamesAtivos } = useExame();

  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [cidExame, setCidExame] = useState("");
  const [indicacaoClinica, setIndicacaoClinica] = useState("");
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const modoEdicao = !!guiaParaEditar;
  const convenio = chamado?.paciente?.convenio ?? "Particular";

  // Preenche o form em modo edição, ou reseta em modo criação — e recarrega exames ativos — toda vez que o modal abre
  useEffect(() => {
    if (!open) return;

    carregarExamesAtivos();

    if (guiaParaEditar) {
      setSelecionados(guiaParaEditar.exames.map((e) => e.id));
      setCidExame(guiaParaEditar.cidExame);
      setIndicacaoClinica(guiaParaEditar.indicacaoClinica);
      setObs(guiaParaEditar.observacoes ?? "");
    } else {
      setSelecionados([]);
      setCidExame("");
      setIndicacaoClinica("");
      setObs("");
    }
    setBusca("");
    setErro(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, guiaParaEditar]);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return exames;
    return exames.filter((e) => e.nome.toLowerCase().includes(q));
  }, [busca, exames]);

  const toggle = (id: number) =>
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleClose = () => {
    if (salvando) return;
    onClose();
  };

  const formValido =
    selecionados.length > 0 &&
    cidExame.trim().length > 0 &&
    indicacaoClinica.trim().length > 0;

  const handleConfirm = async () => {
    if (!atendimentoId) return;

    if (!formValido) {
      setErro("Preencha o CID, a indicação clínica e selecione ao menos um exame.");
      return;
    }
    setErro(null);
    setSalvando(true);

    const request: GuiaMedicaRequestDTO = {
      cidExame: cidExame.trim(),
      indicacaoClinica: indicacaoClinica.trim(),
      convenio,
      observacoes: obs.trim(),
      atendimentoId,
      examesIds: selecionados,
    };

    try {
      const guia =
        modoEdicao && guiaParaEditar
          ? await editarGuiaMedica(guiaParaEditar.id, request)
          : await cadastrarGuiaMedica(request);

      onConfirm(guia);
    } catch {
      setErro("Não foi possível salvar a guia. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <DescriptionIcon color="primary" />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {modoEdicao ? "Editar Pré-Solicitação de Guia" : "Gerar Pré-Solicitação de Guia"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Selecione os exames que deverão ser enviados ao convênio.
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }} aria-label="Fechar">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label={`Convênio: ${convenio}`}
            sx={{ mb: 1.5, fontWeight: 600 }}
          />

          <Stack spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="CID"
              placeholder="Ex: J18.9"
              value={cidExame}
              onChange={(e) => setCidExame(e.target.value)}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Indicação Clínica"
              placeholder="Justificativa clínica para a solicitação dos exames"
              value={indicacaoClinica}
              onChange={(e) => setIndicacaoClinica(e.target.value)}
              fullWidth
              required
              multiline
              minRows={2}
              size="small"
            />
          </Stack>

          <TextField
            fullWidth
            size="small"
            placeholder="Pesquisar exame..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Divider />

        <Box sx={{ maxHeight: 280, overflowY: "auto" }}>
          {carregandoExames ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <CircularProgress size={24} />
            </Box>
          ) : erroExames ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" color="error">
                {erroExames}
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {filtrados.map((ex) => {
                const checked = selecionados.includes(ex.id);
                return (
                  <ListItem key={ex.id} disablePadding divider>
                    <ListItemButton onClick={() => toggle(ex.id)} dense>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {ex.nome}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {ex.descricao}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
              {filtrados.length === 0 && (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Nenhum exame encontrado.
                  </Typography>
                </Box>
              )}
            </List>
          )}
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 2 }}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Orientação para o paciente"
            placeholder="Justificativa clínica, urgência, dados adicionais..."
            value={obs}
            onChange={(e) => setObs(e.target.value.slice(0, OBS_MAX))}
            helperText={`${obs.length}/${OBS_MAX} caracteres`}
          />
          {erro && (
            <Alert severity="warning" sx={{ mt: 1.5 }}>
              {erro}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 1.5, justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Exames selecionados: <strong>{selecionados.length}</strong>
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={handleClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={salvando || !atendimentoId}
            startIcon={salvando ? <CircularProgress size={16} color="inherit" /> : <DescriptionIcon />}
          >
            {salvando ? "Salvando..." : modoEdicao ? "Salvar Alterações" : "Gerar Pré-Solicitação"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}