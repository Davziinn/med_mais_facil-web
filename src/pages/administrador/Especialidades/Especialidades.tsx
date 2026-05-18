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
  IconButton,
  InputAdornment,
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
  type Especialidade,
  ESPECIALIDADES_MOCK,
} from "../../../mocks/adminMock";

const empty = (): Especialidade => ({
  id: "",
  nome: "",
  descricao: "",
  cor: "#0284c7",
  medicosVinculados: 0,
});

export const Especialidades = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState<Especialidade[]>(ESPECIALIDADES_MOCK);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Especialidade>(empty());
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    item: Especialidade;
  }>(null);

  const filtered = useMemo(
    () =>
      items.filter((e) => e.nome.toLowerCase().includes(search.toLowerCase())),
    [items, search],
  );

  const openCreate = () => {
    setEditing(empty());
    setFormOpen(true);
  };
  const openEdit = (e: Especialidade) => {
    setEditing(e);
    setFormOpen(true);
  };
  const requestSave = () => setConfirm({ tipo: "salvar", item: editing });
  const requestDelete = (e: Especialidade) =>
    setConfirm({ tipo: "excluir", item: e });

  const doConfirm = () => {
    if (!confirm) return;
    if (confirm.tipo === "salvar") {
      if (editing.id) {
        setItems((prev) =>
          prev.map((e) => (e.id === editing.id ? editing : e)),
        );
        showToast("Especialidade atualizada");
      } else {
        setItems((prev) => [{ ...editing, id: `esp-${Date.now()}` }, ...prev]);
        showToast("Especialidade criada");
      }
      setFormOpen(false);
    } else {
      setItems((prev) => prev.filter((e) => e.id !== confirm.item.id));
      showToast("Especialidade removida", "info");
    }
    setConfirm(null);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Especialidades"
        subtitle="Especialidades médicas disponíveis no sistema"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Nova especialidade
          </Button>
        }
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          {/* FIX: InputProps → slotProps.input */}
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar especialidade"
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
        </CardContent>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Especialidade</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align="center">Médicos vinculados</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} hover>
                  <TableCell>
                    <Chip
                      label={e.nome}
                      size="small"
                      sx={{
                        bgcolor: `${e.cor}22`,
                        color: e.cor,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                  <TableCell>{e.descricao}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={e.medicosVinculados}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => openEdit(e)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        color="error"
                        onClick={() => requestDelete(e)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhuma especialidade encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* FIX: PaperProps → slotProps.paper */}
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
            {editing.id ? "Editar especialidade" : "Nova especialidade"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome"
            fullWidth
            value={editing.nome}
            onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
          />
          <TextField
            label="Descrição"
            fullWidth
            multiline
            rows={2}
            value={editing.descricao}
            onChange={(e) =>
              setEditing({ ...editing, descricao: e.target.value })
            }
          />
          {/* FIX: alignItems → sx */}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <TextField
              label="Cor (hex)"
              value={editing.cor}
              onChange={(e) => setEditing({ ...editing, cor: e.target.value })}
            />
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: editing.cor,
                border: "1px solid",
                borderColor: "divider",
              }}
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
          confirm?.tipo === "excluir"
            ? "Excluir especialidade"
            : "Salvar alterações"
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
