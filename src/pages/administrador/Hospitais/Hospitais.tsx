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
  Grid,
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
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { StatCardAdmin } from "../../../components/StatCardAdmin";
import { useToast } from "../../../contexts/ToastContext";
import {
  type StatusHospital,
  type Hospital,
  HOSPITAIS_MOCK,
  ESPECIALIDADES_MOCK,
} from "../../../mocks/adminMock";

const STATUS_COR: Record<
  StatusHospital,
  "success" | "default" | "warning" | "info"
> = {
  Ativo: "success",
  Inativo: "default",
  Lotado: "warning",
  "Em manutenção": "info",
};
const empty = (): Hospital => ({
  id: "",
  nome: "",
  cnpj: "",
  telefone: "",
  endereco: "",
  cidade: "",
  estado: "",
  status: "Ativo",
  especialidadesIds: [],
});

export const Hospitais = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState<Hospital[]>(HOSPITAIS_MOCK);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Hospital>(empty());
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    item: Hospital;
  }>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (h) =>
          h.nome.toLowerCase().includes(search.toLowerCase()) ||
          h.cidade.toLowerCase().includes(search.toLowerCase()),
      ),
    [items, search],
  );

  const ativos = items.filter((h) => h.status === "Ativo").length;
  const lotados = items.filter((h) => h.status === "Lotado").length;
  const manut = items.filter((h) => h.status === "Em manutenção").length;

  const openCreate = () => {
    setEditing(empty());
    setFormOpen(true);
  };
  const openEdit = (h: Hospital) => {
    setEditing(h);
    setFormOpen(true);
  };
  const requestSave = () => setConfirm({ tipo: "salvar", item: editing });
  const requestDelete = (h: Hospital) =>
    setConfirm({ tipo: "excluir", item: h });

  const doConfirm = () => {
    if (!confirm) return;
    if (confirm.tipo === "salvar") {
      if (editing.id) {
        setItems((prev) =>
          prev.map((h) => (h.id === editing.id ? editing : h)),
        );
        showToast("Hospital atualizado");
      } else {
        setItems((prev) => [{ ...editing, id: `h-${Date.now()}` }, ...prev]);
        showToast("Hospital cadastrado");
      }
      setFormOpen(false);
    } else {
      setItems((prev) => prev.filter((h) => h.id !== confirm.item.id));
      showToast("Hospital removido", "info");
    }
    setConfirm(null);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Hospitais"
        subtitle="Cadastre e gerencie as unidades hospitalares"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Novo hospital
          </Button>
        }
      />

      {/* FIX 2: Grid v6 — removido `container` + `item` + `xs/sm/md` diretos.
          Agora usa `<Grid container>` no pai e `<Grid size={{ xs, sm, md }}>` nos filhos. */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Total"
            value={items.length}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Ativos"
            value={ativos}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Lotados"
            value={lotados}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Em manutenção"
            value={manut}
            color="info"
          />
        </Grid>
      </Grid>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          {/* FIX 3: `InputProps` → `slotProps={{ input: ... }}` (API renomeada no MUI v6) */}
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar por nome ou cidade"
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
                <TableCell>Hospital</TableCell>
                <TableCell>CNPJ</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Especialidades</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((h) => (
                <TableRow key={h.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {h.nome}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {h.endereco}
                    </Typography>
                  </TableCell>
                  <TableCell>{h.cnpj}</TableCell>
                  <TableCell>
                    {h.cidade}/{h.estado}
                  </TableCell>
                  <TableCell>
                    {/* FIX 1: `gap` e `flexWrap` → dentro de `sx` */}
                    <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap" }}>
                      {h.especialidadesIds.map((id) => {
                        const esp = ESPECIALIDADES_MOCK.find(
                          (e) => e.id === id,
                        );
                        if (!esp) return null;
                        return (
                          <Chip
                            key={id}
                            label={esp.nome}
                            size="small"
                            sx={{
                              bgcolor: `${esp.cor}22`,
                              color: esp.cor,
                              fontWeight: 600,
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={h.status}
                      color={STATUS_COR[h.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editar">
                      <IconButton onClick={() => openEdit(h)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        color="error"
                        onClick={() => requestDelete(h)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum hospital encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="md"
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
            {editing.id ? "Editar hospital" : "Novo hospital"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do hospital"
            fullWidth
            value={editing.nome}
            onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="CNPJ"
              fullWidth
              value={editing.cnpj}
              onChange={(e) => setEditing({ ...editing, cnpj: e.target.value })}
            />
            <TextField
              label="Telefone"
              fullWidth
              value={editing.telefone}
              onChange={(e) =>
                setEditing({ ...editing, telefone: e.target.value })
              }
            />
          </Stack>
          <TextField
            label="Endereço"
            fullWidth
            value={editing.endereco}
            onChange={(e) =>
              setEditing({ ...editing, endereco: e.target.value })
            }
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Cidade"
              fullWidth
              value={editing.cidade}
              onChange={(e) =>
                setEditing({ ...editing, cidade: e.target.value })
              }
            />
            <TextField
              label="Estado"
              fullWidth
              value={editing.estado}
              onChange={(e) =>
                setEditing({ ...editing, estado: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={editing.status}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    status: e.target.value as StatusHospital,
                  })
                }
              >
                {(
                  [
                    "Ativo",
                    "Inativo",
                    "Lotado",
                    "Em manutenção",
                  ] as StatusHospital[]
                ).map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <FormControl fullWidth>
            <InputLabel>Especialidades</InputLabel>
            <Select
              multiple
              value={editing.especialidadesIds}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  especialidadesIds: e.target.value as string[],
                })
              }
              input={<OutlinedInput label="Especialidades" />}
              renderValue={(selected) => (
                <Stack direction="row" sx={{ gap: 0.5, flexWrap: "wrap" }}>
                  {(selected as string[]).map((id) => {
                    const esp = ESPECIALIDADES_MOCK.find((e) => e.id === id);
                    return esp ? (
                      <Chip
                        key={id}
                        label={esp.nome}
                        size="small"
                        sx={{ bgcolor: `${esp.cor}22`, color: esp.cor }}
                      />
                    ) : null;
                  })}
                </Stack>
              )}
            >
              {ESPECIALIDADES_MOCK.map((esp) => (
                <MenuItem key={esp.id} value={esp.id}>
                  <Checkbox
                    checked={editing.especialidadesIds.includes(esp.id)}
                  />
                  <ListItemText primary={esp.nome} />
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
          <Button onClick={requestSave} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={
          confirm?.tipo === "excluir" ? "Excluir hospital" : "Salvar alterações"
        }
        message={
          confirm?.tipo === "excluir"
            ? `Deseja realmente excluir o hospital "${confirm.item.nome}"?`
            : "Deseja salvar as alterações deste hospital?"
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
