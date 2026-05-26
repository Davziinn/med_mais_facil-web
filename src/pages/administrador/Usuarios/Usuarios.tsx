/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
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
import { useHospitais } from "../../../hooks/useHospital";
import { useUsuarios } from "../../../hooks/useUsuario";
import type {
  TipoUsuarioResponseAPI,
  UsuarioResponseDTO,
} from "../../../service/api/usuarioService";

type TipoFiltro = TipoUsuarioResponseAPI | "TODOS";

const TIPO_COR: Record<
  Exclude<TipoUsuarioResponseAPI, "PACIENTE">,
  "primary" | "info" | "warning"
> = {
  ADMINISTRADOR: "warning",
  MEDICO: "info",
  RECEPCAO: "primary",
};

interface UsuarioForm {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  tipoUsuario: TipoUsuarioResponseAPI;
  hospitalId: number | "";
  ativo: boolean;
}

const emptyForm = (): UsuarioForm => ({
  nome: "",
  email: "",
  senha: "",
  cpf: "",
  telefone: "",
  tipoUsuario: "MEDICO",
  hospitalId: "",
  ativo: true,
});

const fromResponse = (u: UsuarioResponseDTO): UsuarioForm => ({
  id: u.id,
  nome: u.nome,
  email: u.email,
  senha: "",
  cpf: u.cpf,
  telefone: u.telefone,
  tipoUsuario: u.tipoUsuario,
  hospitalId: u.hospital?.id ?? "",
  ativo: u.ativo,
});

const PAGE_SIZE = 6;

const maskCpf = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const maskTelefone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};

export const Usuarios = () => {
  const { showToast } = useToast();

  const {
    usuarios,
    loading,
    fetchUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    removerUsuario,
  } = useUsuarios();

  const { hospitais } = useHospitais();

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const [search, setSearch] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<TipoFiltro>("TODOS");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return usuarios.filter((u) => {
      const matchSearch =
        u.nome.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchTipo = filtroTipo === "TODOS" || u.tipoUsuario === filtroTipo;
      return matchSearch && matchTipo;
    });
  }, [usuarios, search, filtroTipo]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    user: UsuarioForm;
  }>(null);
  const [editing, setEditing] = useState<UsuarioForm>(emptyForm());
  const [viewing, setViewing] = useState<UsuarioResponseDTO | null>(null);

  const openCreate = () => {
    setEditing(emptyForm());
    setFormOpen(true);
  };

  const openEdit = (u: UsuarioResponseDTO) => {
    setEditing(fromResponse(u));
    setFormOpen(true);
  };

  const openView = async (u: UsuarioResponseDTO) => {
    setViewing(null);
    setViewOpen(true);
    setViewLoading(true);
    try {
      const fresh = await buscarUsuarioPorId(u.id);
      setViewing(fresh);
    } catch {
      showToast("Erro ao carregar detalhes do usuário.", "error");
      setViewOpen(false);
    } finally {
      setViewLoading(false);
    }
  };

  const requestSave = () => setConfirm({ tipo: "salvar", user: editing });
  const requestDelete = (u: UsuarioResponseDTO) =>
    setConfirm({ tipo: "excluir", user: fromResponse(u) });

  const doConfirm = async () => {
    if (!confirm) return;
    setSaving(true);
    try {
      if (confirm.tipo === "salvar") {
        const { id, senha, hospitalId, ...rest } = confirm.user;

        if (id) {
          await atualizarUsuario(id, {
            ...rest,
            ...(senha ? { senha } : {}),
            hospitalId: Number(hospitalId),
          });
          showToast("Usuário atualizado com sucesso");
        } else {
          await criarUsuario({
            ...rest,
            senha,
            hospitalId: Number(hospitalId),
          });
          showToast("Usuário criado com sucesso");
        }
        setFormOpen(false);
      } else {
        await removerUsuario(confirm.user.id!);
        showToast("Usuário removido", "info");
      }
    } catch {
      showToast("Ocorreu um erro. Tente novamente.", "error");
    } finally {
      setSaving(false);
      setConfirm(null);
    }
  };

  const hospitalNome = (id: number) =>
    hospitais?.find((h: any) => h.id === id)?.nome ?? "—";

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
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              )}
              {!loading && pageRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum usuário encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                pageRows.map((u) => (
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
                    <TableCell>{hospitalNome(u.hospital?.id)}</TableCell>
                    <TableCell>
                      <Chip
                        label={u.tipoUsuario}
                        color={
                          TIPO_COR[
                            u.tipoUsuario as Exclude<
                              TipoUsuarioResponseAPI,
                              "PACIENTE"
                            >
                          ] ?? "default"
                        }
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
              onChange={(e) =>
                setEditing({ ...editing, cpf: maskCpf(e.target.value) })
              }
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label={editing.id ? "Nova senha (opcional)" : "Senha"}
              type="password"
              fullWidth
              value={editing.senha}
              onChange={(e) =>
                setEditing({ ...editing, senha: e.target.value })
              }
            />
            <TextField
              label="Telefone"
              fullWidth
              value={editing.telefone}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  telefone: maskTelefone(e.target.value),
                })
              }
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Hospital</InputLabel>
              <Select
                label="Hospital"
                value={editing.hospitalId}
                onChange={(e) =>
                  setEditing({ ...editing, hospitalId: Number(e.target.value) })
                }
              >
                {hospitais?.map((h: any) => (
                  <MenuItem key={h.id} value={h.id}>
                    {h.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                value={editing.tipoUsuario}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    tipoUsuario: e.target.value as TipoUsuarioResponseAPI,
                  })
                }
              >
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="MEDICO">Médico</MenuItem>
                <MenuItem value="RECEPCAO">Recepção</MenuItem>
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

      {/* ── Modal: Visualizar ── */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="xs"
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
            Detalhes do usuário
          </Typography>
          <IconButton onClick={() => setViewOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {viewLoading ? (
            <Stack sx={{ alignItems: "center", py: 4 }}>
              <CircularProgress size={32} />
            </Stack>
          ) : viewing ? (
            <>
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
                    label={viewing.tipoUsuario}
                    size="small"
                    color={
                      TIPO_COR[
                        viewing.tipoUsuario as Exclude<
                          TipoUsuarioResponseAPI,
                          "PACIENTE"
                        >
                      ] ?? "default"
                    }
                  />
                </Box>
              </Stack>
              {(
                [
                  ["E-mail", viewing.email],
                  ["CPF", viewing.cpf],
                  ["Telefone", viewing.telefone],
                  ["Hospital", viewing.hospital?.nome ?? "—"],
                  ["Status", viewing.ativo ? "Ativo" : "Inativo"],
                ] as [string, string][]
              ).map(([k, v]) => (
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
            </>
          ) : null}
        </DialogContent>
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
        loading={saving}
        onClose={() => setConfirm(null)}
        onConfirm={doConfirm}
      />
    </Box>
  );
};
