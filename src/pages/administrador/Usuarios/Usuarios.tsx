/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Avatar,
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
  Pagination,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { useToast } from "../../../contexts/ToastContext";
import {
  type TipoUsuario,
  type UsuarioAdm,
  HOSPITAIS_MOCK,
  USUARIOS_MOCK,
  ESPECIALIDADES_MOCK,
} from "../../../mocks/adminMock";

const TIPO_COR: Record<TipoUsuario, "primary" | "info" | "warning"> = {
  ADMINISTRADOR: "warning",
  MEDICO: "info",
  RECEPCAO: "primary",
};

const PAGE_SIZE = 6;
const empty = (): UsuarioAdm => ({
  id: "",
  nome: "",
  email: "",
  cpf: "",
  telefone: "",
  hospitalId: HOSPITAIS_MOCK[0].id,
  tipo: "MEDICO",
  ativo: true,
});

export const Usuarios = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<UsuarioAdm[]>(USUARIOS_MOCK);
  const [search, setSearch] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<TipoUsuario | "TODOS">("TODOS");
  const [page, setPage] = useState(1);

  // FIX 1: estava `const [, setFormOpen]` — o getter estava sendo descartado,
  // fazendo o Dialog nunca abrir e o botão "Novo usuário" não funcionar.
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    user: UsuarioAdm;
  }>(null);
  const [editing, setEditing] = useState<UsuarioAdm>(empty());
  const [viewing, setViewing] = useState<UsuarioAdm | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.nome.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchTipo = filtroTipo === "TODOS" || u.tipo === filtroTipo;
      return matchSearch && matchTipo;
    });
  }, [users, search, filtroTipo]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => {
    setEditing(empty());
    setFormOpen(true);
  };
  const openEdit = (u: UsuarioAdm) => {
    setEditing(u);
    setFormOpen(true);
  };
  const openView = (u: UsuarioAdm) => {
    setViewing(u);
    setViewOpen(true);
  };

  const requestSave = () => setConfirm({ tipo: "salvar", user: editing });
  const requestDelete = (u: UsuarioAdm) =>
    setConfirm({ tipo: "excluir", user: u });

  const doConfirm = () => {
    if (!confirm) return;
    if (confirm.tipo === "salvar") {
      if (editing.id) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editing.id ? editing : u)),
        );
        showToast("Usuário atualizado com sucesso");
      } else {
        const novo = { ...editing, id: `u-${Date.now()}` };
        setUsers((prev) => [novo, ...prev]);
        showToast("Usuário criado com sucesso");
      }
      setFormOpen(false);
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== confirm.user.id));
      showToast("Usuário removido", "info");
    }
    setConfirm(null);
  };

  const hospitalNome = (id: string) =>
    HOSPITAIS_MOCK.find((h) => h.id === id)?.nome ?? "—";
  const especNome = (id?: string) =>
    ESPECIALIDADES_MOCK.find((e) => e.id === id)?.nome ?? "—";

  return (
    <Box>
      <AdminPageHeader
        title="Usuários"
        subtitle="Gerencie médicos, recepcionistas e administradores"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Novo usuário
          </Button>
        }
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar por nome ou e-mail"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                value={filtroTipo}
                onChange={(e) => {
                  setFiltroTipo(e.target.value as any);
                  setPage(1);
                }}
              >
                <MenuItem value="TODOS">Todos</MenuItem>
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="MEDICO">Médico</MenuItem>
                <MenuItem value="RECEPCAO">Recepção</MenuItem>
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
                <TableCell>Usuário</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum usuário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {pageRows.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 36,
                          height: 36,
                          fontSize: 14,
                        }}
                      >
                        {u.nome
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {u.nome}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {u.cpf}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{u.email}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {u.telefone}
                    </Typography>
                  </TableCell>
                  <TableCell>{hospitalNome(u.hospitalId)}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.tipo}
                      color={TIPO_COR[u.tipo]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={u.ativo ? "Ativo" : "Inativo"}
                      color={u.ativo ? "success" : "default"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Visualizar">
                      <IconButton onClick={() => openView(u)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => openEdit(u)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        color="error"
                        onClick={() => requestDelete(u)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ justifyContent: "flex-end", p: 2 }} direction="row">
          <Pagination
            count={pages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
          />
        </Stack>
      </Card>

      {/* Form modal — FIX 2: era open={viewOpen}, corrigido para open={formOpen} */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 3 } },
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
            {editing.id ? "Editar usuário" : "Novo usuário"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome completo"
            fullWidth
            value={editing.nome}
            onChange={(e) => setEditing({ ...editing, nome: e.target.value })}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="E-mail"
              fullWidth
              value={editing.email}
              onChange={(e) =>
                setEditing({ ...editing, email: e.target.value })
              }
            />
            <TextField
              label="CPF"
              fullWidth
              value={editing.cpf}
              onChange={(e) => setEditing({ ...editing, cpf: e.target.value })}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Telefone"
              fullWidth
              value={editing.telefone}
              onChange={(e) =>
                setEditing({ ...editing, telefone: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Hospital</InputLabel>
              <Select
                label="Hospital"
                value={editing.hospitalId}
                onChange={(e) =>
                  setEditing({ ...editing, hospitalId: e.target.value })
                }
              >
                {HOSPITAIS_MOCK.map((h) => (
                  <MenuItem key={h.id} value={h.id}>
                    {h.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                value={editing.tipo}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    tipo: e.target.value as TipoUsuario,
                  })
                }
              >
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="MEDICO">Médico</MenuItem>
                <MenuItem value="RECEPCAO">Recepção</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth disabled={editing.tipo !== "MEDICO"}>
              <InputLabel>Especialidade</InputLabel>
              <Select
                label="Especialidade"
                value={editing.especialidadeId ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, especialidadeId: e.target.value })
                }
              >
                {ESPECIALIDADES_MOCK.map((esp) => (
                  <MenuItem key={esp.id} value={esp.id}>
                    {esp.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1,
            }}
          >
            <Typography variant="body2">Usuário ativo</Typography>
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

      {/* View modal */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 3 } },
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
            Detalhes do usuário
          </Typography>
          <IconButton onClick={() => setViewOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {viewing && (
          <DialogContent sx={{ pt: 3 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", mb: 3 }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 56,
                  height: 56,
                  fontSize: 20,
                }}
              >
                {viewing.nome
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {viewing.nome}
                </Typography>
                <Chip
                  label={viewing.tipo}
                  size="small"
                  color={TIPO_COR[viewing.tipo]}
                />
              </Box>
            </Stack>
            {[
              ["E-mail", viewing.email],
              ["CPF", viewing.cpf],
              ["Telefone", viewing.telefone],
              ["Hospital", hospitalNome(viewing.hospitalId)],
              ["Especialidade", especNome(viewing.especialidadeId)],
              ["Status", viewing.ativo ? "Ativo" : "Inativo"],
            ].map(([k, v]) => (
              <Stack
                key={k}
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {k}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {v}
                </Typography>
              </Stack>
            ))}
          </DialogContent>
        )}
      </Dialog>

      <ConfirmActionModal
        open={!!confirm}
        title={
          confirm?.tipo === "excluir" ? "Excluir usuário" : "Salvar alterações"
        }
        message={
          confirm?.tipo === "excluir"
            ? `Deseja realmente excluir o usuário ${confirm.user.nome}? Esta ação não pode ser desfeita.`
            : "Deseja salvar as alterações deste usuário?"
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
