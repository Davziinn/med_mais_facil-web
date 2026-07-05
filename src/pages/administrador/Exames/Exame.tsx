import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
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
import AdminPageHeader from "../../../components/adm/components/AdmPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";
import { useExame } from "../../../hooks/useExame";
import type { ExameResponseDTO } from "../../../service/api/exameService";

type StatusFiltro = "TODOS" | "ATIVOS" | "INATIVOS";

const empty = (): ExameResponseDTO =>
  ({ id: 0, nome: "", descricao: "", ativo: true }) as ExameResponseDTO;

export default function Exames() {
  const { showToast } = useToast();
  const {
    exames,
    loading,
    error,
    cadatrarExame,
    editarExame,
    removerExame,
  } = useExame();

  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusFiltro>("TODOS");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ExameResponseDTO>(empty());
  const [salvando, setSalvando] = useState(false);
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    item: ExameResponseDTO;
  }>(null);

  const filtered = useMemo(
    () =>
      exames.filter(
        (e) =>
          (e.nome.toLowerCase().includes(search.toLowerCase()) ||
            (e.descricao ?? "").toLowerCase().includes(search.toLowerCase())) &&
          (filtroStatus === "TODOS" ||
            (filtroStatus === "ATIVOS" ? e.ativo : !e.ativo)),
      ),
    [exames, search, filtroStatus],
  );

  const openCreate = () => {
    setEditing(empty());
    setFormOpen(true);
  };

  const openEdit = (e: ExameResponseDTO) => {
    setEditing(e);
    setFormOpen(true);
  };

  const requestSave = () => {
    if (!editing.nome.trim()) {
      showToast("Informe o nome do exame", "error");
      return;
    }
    setConfirm({ tipo: "salvar", item: editing });
  };

  const requestDelete = (e: ExameResponseDTO) =>
    setConfirm({ tipo: "excluir", item: e });

  const doConfirm = async () => {
    if (!confirm) return;
    setSalvando(true);

    try {
      if (confirm.tipo === "salvar") {
        if (editing.id) {
          await editarExame(editing.id, editing);
          showToast("Exame atualizado");
        } else {
          await cadatrarExame(editing);
          showToast("Exame criado");
        }
        setFormOpen(false);
      } else {
        await removerExame(confirm.item.id);
        showToast("Exame removido", "info");
      }
    } catch (err) {
      console.error("Erro ao salvar/excluir exame", err);
      showToast(
        confirm.tipo === "excluir"
          ? "Erro ao excluir exame"
          : "Erro ao salvar exame",
        "error",
      );
    } finally {
      setSalvando(false);
      setConfirm(null);
    }
  };

  return (
    <Box>
      <AdminPageHeader
        title="Exames"
        subtitle="Catálogo de exames disponíveis para solicitação nas guias médicas"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Novo exame
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
              placeholder="Buscar por nome ou descrição"
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
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={filtroStatus}
                onChange={(e) =>
                  setFiltroStatus(e.target.value as StatusFiltro)
                }
              >
                <MenuItem value="TODOS">Todos</MenuItem>
                <MenuItem value="ATIVOS">Ativos</MenuItem>
                <MenuItem value="INATIVOS">Inativos</MenuItem>
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
                <TableCell>Exame</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                filtered.map((e) => (
                  <TableRow key={e.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{e.nome}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {e.descricao || "—"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={e.ativo ? "Ativo" : "Inativo"}
                        size="small"
                        color={e.ativo ? "success" : "default"}
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

              {!loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum exame encontrado
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
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
            },
          },
        }}
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
            {editing.id ? "Editar exame" : "Novo exame"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do exame"
            fullWidth
            value={editing.nome}
            onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
          />
          <TextField
            label="Descrição"
            fullWidth
            multiline
            minRows={3}
            value={editing.descricao ?? ""}
            onChange={(e) =>
              setEditing({ ...editing, descricao: e.target.value })
            }
          />
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography>Exame ativo</Typography>
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
            disabled={salvando}
          >
            Cancelar
          </Button>
          <Button onClick={requestSave} variant="contained" disabled={salvando}>
            {salvando ? <CircularProgress size={20} /> : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={
          confirm?.tipo === "excluir" ? "Excluir exame" : "Salvar alterações"
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