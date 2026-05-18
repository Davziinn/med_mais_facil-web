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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";
import {
  type PrioridadeSintoma,
  type CategoriaSintoma,
  type Sintoma,
  SINTOMAS_MOCK,
} from "../../../mocks/adminMock";

const PRIORIDADE_COR: Record<
  PrioridadeSintoma,
  "success" | "warning" | "info" | "error"
> = {
  BAIXA: "success",
  MEDIA: "info",
  ALTA: "warning",
  CRITICA: "error",
};
const CATEGORIAS: CategoriaSintoma[] = [
  "Neurológico",
  "Respiratório",
  "Cardíaco",
  "Traumático",
  "Geral",
];
const PRIORIDADES: PrioridadeSintoma[] = ["BAIXA", "MEDIA", "ALTA", "CRITICA"];
const empty = (): Sintoma => ({
  id: "",
  nome: "",
  categoria: "Geral",
  prioridade: "MEDIA",
  ativo: true,
});

export const Sintomas = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState<Sintoma[]>(SINTOMAS_MOCK);
  const [search, setSearch] = useState("");
  const [filtroPrior, setFiltroPrior] = useState<PrioridadeSintoma | "TODAS">(
    "TODAS",
  );
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Sintoma>(empty());
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    item: Sintoma;
  }>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (s) =>
          s.nome.toLowerCase().includes(search.toLowerCase()) &&
          (filtroPrior === "TODAS" || s.prioridade === filtroPrior),
      ),
    [items, search, filtroPrior],
  );

  const openCreate = () => {
    setEditing(empty());
    setFormOpen(true);
  };
  const openEdit = (s: Sintoma) => {
    setEditing(s);
    setFormOpen(true);
  };
  const requestSave = () => setConfirm({ tipo: "salvar", item: editing });
  const requestDelete = (s: Sintoma) =>
    setConfirm({ tipo: "excluir", item: s });

  const doConfirm = () => {
    if (!confirm) return;
    if (confirm.tipo === "salvar") {
      if (editing.id) {
        setItems((prev) =>
          prev.map((s) => (s.id === editing.id ? editing : s)),
        );
        showToast("Sintoma atualizado");
      } else {
        setItems((prev) => [{ ...editing, id: `s-${Date.now()}` }, ...prev]);
        showToast("Sintoma criado");
      }
      setFormOpen(false);
    } else {
      setItems((prev) => prev.filter((s) => s.id !== confirm.item.id));
      showToast("Sintoma removido", "info");
    }
    setConfirm(null);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Sintomas"
        subtitle="Sintomas usados na pré-triagem dos pacientes"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Novo sintoma
          </Button>
        }
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {/* InputProps → slotProps.input */}
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
                  <MenuItem key={p} value={p}>
                    {p}
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
                <TableCell>Sintoma</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Prioridade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{s.nome}</TableCell>
                  <TableCell>
                    <Chip label={s.categoria} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={s.prioridade}
                      size="small"
                      color={PRIORIDADE_COR[s.prioridade]}
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
                      <IconButton
                        color="error"
                        onClick={() => requestDelete(s)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum sintoma encontrado
                    </Typography>
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
            {editing.id ? "Editar sintoma" : "Novo sintoma"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do sintoma"
            fullWidth
            value={editing.nome}
            onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                label="Categoria"
                value={editing.categoria}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    categoria: e.target.value as CategoriaSintoma,
                  })
                }
              >
                {CATEGORIAS.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Prioridade sugerida</InputLabel>
              <Select
                label="Prioridade sugerida"
                value={editing.prioridade}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    prioridade: e.target.value as PrioridadeSintoma,
                  })
                }
              >
                {PRIORIDADES.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {/* alignItems + justifyContent → sx */}
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography>Sintoma ativo</Typography>
            <Switch
              checked={editing.ativo}
              onChange={(e) =>
                setEditing({ ...editing, ativo: e.target.checked })
              }
            />
          </Stack>
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
          <Button onClick={requestSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={
          confirm?.tipo === "excluir" ? "Excluir sintoma" : "Salvar alterações"
        }
        message={
          confirm?.tipo === "excluir"
            ? `Deseja realmente excluir "${confirm.item.nome}"?`
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
}
