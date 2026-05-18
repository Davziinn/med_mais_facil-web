/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
  IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, Switch, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";
import { type GravidadeEvento, type EventoClinico, EVENTOS_MOCK } from "../../../mocks/adminMock";


const COR: Record<GravidadeEvento, "success" | "info" | "warning" | "error"> = {
  Leve: "success", Moderada: "info", Grave: "warning", Crítica: "error",
};
const GRAVIDADES: GravidadeEvento[] = ["Leve", "Moderada", "Grave", "Crítica"];
const empty = (): EventoClinico => ({ id: "", nome: "", descricao: "", gravidade: "Leve", ativo: true });

export const Eventos = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState<EventoClinico[]>(EVENTOS_MOCK);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<GravidadeEvento | "TODAS">("TODAS");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EventoClinico>(empty());
  const [confirm, setConfirm] = useState<null | { tipo: "salvar" | "excluir"; item: EventoClinico }>(null);

  const filtered = useMemo(() =>
    items.filter((e) => e.nome.toLowerCase().includes(search.toLowerCase()) && (filtro === "TODAS" || e.gravidade === filtro)),
    [items, search, filtro]
  );

  const openCreate = () => { setEditing(empty()); setFormOpen(true); };
  const openEdit = (e: EventoClinico) => { setEditing(e); setFormOpen(true); };
  const doConfirm = () => {
    if (!confirm) return;
    if (confirm.tipo === "salvar") {
      if (editing.id) {
        setItems((prev) => prev.map((e) => (e.id === editing.id ? editing : e)));
        showToast("Evento atualizado");
      } else {
        setItems((prev) => [{ ...editing, id: `e-${Date.now()}` }, ...prev]);
        showToast("Evento criado");
      }
      setFormOpen(false);
    } else {
      setItems((prev) => prev.filter((e) => e.id !== confirm.item.id));
      showToast("Evento removido", "info");
    }
    setConfirm(null);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Eventos clínicos"
        subtitle="Eventos recentes que influenciam o atendimento"
        actions={<Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>Novo evento</Button>}
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {/* InputProps → slotProps.input */}
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
              <InputLabel>Gravidade</InputLabel>
              <Select label="Gravidade" value={filtro} onChange={(e) => setFiltro(e.target.value as any)}>
                <MenuItem value="TODAS">Todas</MenuItem>
                {GRAVIDADES.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
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
                <TableCell>Gravidade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{e.nome}</TableCell>
                  <TableCell sx={{ maxWidth: 360 }}>{e.descricao}</TableCell>
                  <TableCell><Chip label={e.gravidade} size="small" color={COR[e.gravidade]} /></TableCell>
                  <TableCell><Chip label={e.ativo ? "Ativo" : "Inativo"} size="small" color={e.ativo ? "success" : "default"} variant="outlined" /></TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar"><IconButton onClick={() => openEdit(e)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Excluir"><IconButton color="error" onClick={() => setConfirm({ tipo: "excluir", item: e })}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">Nenhum evento encontrado</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* PaperProps → slotProps.paper */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{editing.id ? "Editar evento" : "Novo evento"}</Typography>
          <IconButton onClick={() => setFormOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do evento"
            fullWidth
            value={editing.nome}
            onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
          />
          <TextField
            label="Descrição"
            multiline
            rows={3}
            fullWidth
            value={editing.descricao}
            onChange={(e) => setEditing({ ...editing, descricao: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Gravidade</InputLabel>
            <Select label="Gravidade" value={editing.gravidade} onChange={(e) => setEditing({ ...editing, gravidade: e.target.value as GravidadeEvento })}>
              {GRAVIDADES.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
          {/* alignItems + justifyContent → sx */}
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Evento ativo</Typography>
            <Switch checked={editing.ativo} onChange={(e) => setEditing({ ...editing, ativo: e.target.checked })} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Button onClick={() => setFormOpen(false)} variant="outlined" color="inherit">Cancelar</Button>
          <Button onClick={() => setConfirm({ tipo: "salvar", item: editing })} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={confirm?.tipo === "excluir" ? "Excluir evento" : "Salvar alterações"}
        message={confirm?.tipo === "excluir" ? `Deseja realmente excluir "${confirm.item.nome}"?` : "Deseja salvar as alterações?"}
        variant={confirm?.tipo === "excluir" ? "danger" : "info"}
        icon={confirm?.tipo === "excluir" ? "delete" : "save"}
        confirmLabel={confirm?.tipo === "excluir" ? "Excluir" : "Salvar"}
        onClose={() => setConfirm(null)}
        onConfirm={doConfirm}
      />
    </Box>
  );
}