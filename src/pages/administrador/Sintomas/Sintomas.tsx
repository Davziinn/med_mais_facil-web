/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, IconButton, InputAdornment,
  InputLabel, MenuItem, Select, Stack, Switch, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField,
  Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";

import { useEffect } from "react";
import type { PrioridadeChamadoResponseAPI } from "../../../service/api/filaEsperaService";
import { type SintomaRequestDTO, type SintomaResponseDTO, getAllSintoma, putSintoma, postSintoma, deleteSintoma } from "../../../service/api/sintomaService";

const PRIORIDADE_COR: Record<PrioridadeChamadoResponseAPI, "success" | "warning" | "info" | "error"> = {
  BAIXA: "success",
  MEDIA: "info",
  ALTA: "warning",
  CRITICA: "error",
};

const PRIORIDADES: PrioridadeChamadoResponseAPI[] = ["BAIXA", "MEDIA", "ALTA", "CRITICA"];

const emptyForm = (): SintomaRequestDTO => ({
  descricao: "",
  prioridadeSintoma: "MEDIA",
  ativo: true,
});

export const Sintomas = () => {
  const { showToast } = useToast();

  const [items, setItems] = useState<SintomaResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtroPrior, setFiltroPrior] = useState<PrioridadeChamadoResponseAPI | "TODAS">("TODAS");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<SintomaRequestDTO>(emptyForm());

  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    item?: SintomaResponseDTO;
  }>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getAllSintoma();
      setItems(data);
    } catch {
      showToast("Erro ao carregar sintomas", "error");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(
    () =>
      items.filter(
        (s) =>
          s.descricao.toLowerCase().includes(search.toLowerCase()) &&
          (filtroPrior === "TODAS" || s.prioridadeSintoma === filtroPrior),
      ),
    [items, search, filtroPrior],
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormOpen(true);
  };

  const openEdit = (s: SintomaResponseDTO) => {
    setEditingId(s.id);
    setForm({ descricao: s.descricao, prioridadeSintoma: s.prioridadeSintoma, ativo: s.ativo });
    setFormOpen(true);
  };

  const requestSave = () => setConfirm({ tipo: "salvar" });
  const requestDelete = (s: SintomaResponseDTO) => setConfirm({ tipo: "excluir", item: s });

  const doConfirm = async () => {
    if (!confirm) return;
    setConfirm(null);

    if (confirm.tipo === "salvar") {
      try {
        if (editingId !== null) {
          const atualizado = await putSintoma(editingId, form);
          setItems((prev) => prev.map((s) => (s.id === editingId ? atualizado : s)));
          showToast("Sintoma atualizado");
        } else {
          const novo = await postSintoma(form);
          setItems((prev) => [novo, ...prev]);
          showToast("Sintoma criado");
        }
        setFormOpen(false);
      } catch {
        showToast("Erro ao salvar sintoma", "error");
      }
    } else if (confirm.tipo === "excluir" && confirm.item) {
      try {
        await deleteSintoma(confirm.item.id);
        setItems((prev) => prev.filter((s) => s.id !== confirm.item!.id));
        showToast("Sintoma removido", "info");
      } catch {
        showToast("Erro ao excluir sintoma", "error");
      }
    }
  };

  return (
    <Box>
      <AdminPageHeader
        title="Sintomas"
        subtitle="Sintomas usados na pré-triagem dos pacientes"
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Novo sintoma
          </Button>
        }
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar sintoma"
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
              <InputLabel>Prioridade</InputLabel>
              <Select
                label="Prioridade"
                value={filtroPrior}
                onChange={(e) => setFiltroPrior(e.target.value as any)}
              >
                <MenuItem value="TODAS">Todas</MenuItem>
                {PRIORIDADES.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
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
                <TableCell>Sintoma</TableCell>
                <TableCell>Prioridade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">Carregando...</Typography>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">Nenhum sintoma encontrado</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{s.descricao}</TableCell>
                    <TableCell>
                      <Chip
                        label={s.prioridadeSintoma}
                        size="small"
                        color={PRIORIDADE_COR[s.prioridadeSintoma]}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={s.ativo ? "Ativo" : "Inativo"}
                        size="small"
                        color={s.ativo ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton onClick={() => openEdit(s)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton color="error" onClick={() => requestDelete(s)}>
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
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid", borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {editingId !== null ? "Editar sintoma" : "Novo sintoma"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do sintoma"
            fullWidth
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Prioridade sugerida</InputLabel>
            <Select
              label="Prioridade sugerida"
              value={form.prioridadeSintoma}
              onChange={(e) =>
                setForm({ ...form, prioridadeSintoma: e.target.value as PrioridadeChamadoResponseAPI })
              }
            >
              {PRIORIDADES.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Sintoma ativo</Typography>
            <Switch
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Button onClick={() => setFormOpen(false)} variant="outlined" color="inherit">
            Cancelar
          </Button>
          <Button onClick={requestSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={confirm?.tipo === "excluir" ? "Excluir sintoma" : "Salvar alterações"}
        message={
          confirm?.tipo === "excluir"
            ? `Deseja realmente excluir "${confirm.item?.descricao}"?`
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