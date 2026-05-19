/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";
import { useEventoClinico } from "../../../hooks/useEventoClinico";
import type {
  EventoClinicoRequestDTO,
  SeveridadeResponseAPI,
} from "../../../service/api/eventoClinicoService";

const COR: Record<
  SeveridadeResponseAPI,
  "success" | "info" | "warning" | "error"
> = {
  LEVE: "success",
  MODERADO: "info",
  GRAVE: "warning",
  CRITICO: "error",
};

const LABEL: Record<SeveridadeResponseAPI, string> = {
  LEVE: "Leve",
  MODERADO: "Moderada",
  GRAVE: "Grave",
  CRITICO: "Crítica",
};

const SEVERIDADES: SeveridadeResponseAPI[] = [
  "LEVE",
  "MODERADO",
  "GRAVE",
  "CRITICO",
];

const emptyForm = (): EventoClinicoRequestDTO => ({
  nomeEvento: "",
  descricao: "",
  severidade: "LEVE",
});


export const Eventos = () => {
  const { showToast } = useToast();
  const { eventos, loading, error, criarEvento, editarEvento, deletarEvento } =
    useEventoClinico();

  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<SeveridadeResponseAPI | "TODAS">(
    "TODAS",
  );
  const [formOpen, setFormOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<EventoClinicoRequestDTO>(emptyForm());

  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    id?: number;
  }>(null);

  const filtered = useMemo(
    () =>
      eventos.filter(
        (e) =>
          e.nomeEvento.toLowerCase().includes(search.toLowerCase()) &&
          (filtro === "TODAS" || e.severidade === filtro),
      ),
    [eventos, search, filtro],
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormOpen(true);
  };

  const openEdit = (id: number, current: EventoClinicoRequestDTO) => {
    setEditingId(id);
    setForm(current);
    setFormOpen(true);
  };

  const doConfirm = async () => {
    if (!confirm) return;

    if (confirm.tipo === "salvar") {
      if (editingId !== null) {
        await editarEvento(editingId, form);
        showToast("Evento atualizado");
      } else {
        await criarEvento(form);
        showToast("Evento criado");
      }
      setFormOpen(false);
    } else if (confirm.tipo === "excluir" && confirm.id !== undefined) {
      await deletarEvento(confirm.id);
      showToast("Evento removido", "info");
    }

    setConfirm(null);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Eventos clínicos"
        subtitle="Eventos recentes que influenciam o atendimento"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Novo evento
          </Button>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar evento"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Severidade</InputLabel>
              <Select
                label="Severidade"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value as any)}
              >
                <MenuItem value="TODAS">Todas</MenuItem>
                {SEVERIDADES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {LABEL[s]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Evento</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Severidade</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum evento encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((e) => (
                  <TableRow key={e.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {e.nomeEvento}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 360 }}>{e.descricao}</TableCell>
                    <TableCell>
                      <Chip
                        label={LABEL[e.severidade]}
                        size="small"
                        color={COR[e.severidade]}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() =>
                            openEdit(e.id, {
                              nomeEvento: e.nomeEvento,
                              descricao: e.descricao,
                              severidade: e.severidade,
                            })
                          }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton
                          color="error"
                          onClick={() =>
                            setConfirm({ tipo: "excluir", id: e.id })
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {editingId !== null ? "Editar evento" : "Novo evento"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do evento"
            fullWidth
            value={form.nomeEvento}
            onChange={(e) => setForm({ ...form, nomeEvento: e.target.value })}
          />
          <TextField
            label="Descrição"
            multiline
            rows={3}
            fullWidth
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Severidade</InputLabel>
            <Select
              label="Severidade"
              value={form.severidade}
              onChange={(e) =>
                setForm({
                  ...form,
                  severidade: e.target.value as SeveridadeResponseAPI,
                })
              }
            >
              {SEVERIDADES.map((s) => (
                <MenuItem key={s} value={s}>
                  {LABEL[s]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions
          sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Button
            onClick={() => setFormOpen(false)}
            variant="outlined"
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => setConfirm({ tipo: "salvar" })}
            variant="contained"
            disabled={loading}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={
          confirm?.tipo === "excluir" ? "Excluir evento" : "Salvar alterações"
        }
        message={
          confirm?.tipo === "excluir"
            ? `Deseja realmente excluir este evento?`
            : "Deseja salvar as alterações?"
        }
        variant={confirm?.tipo === "excluir" ? "danger" : "info"}
        icon={confirm?.tipo === "excluir" ? "delete" : "save"}
        confirmLabel={confirm?.tipo === "excluir" ? "Excluir" : "Salvar"}
        onClose={() => setConfirm(null)}
        onConfirm={doConfirm}
      />
    </Box>
  );
};
