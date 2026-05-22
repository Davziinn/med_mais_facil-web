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
  // Stack,
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
import { useEspecialidade } from "../../../hooks/useEspecialidade";
import type { EspecialidadeMedicoRequestDTO, EspecialidadeMedicoResponseDTO } from "../../../service/api/especialidadeService";

const COLOR_PALETTE = [
  { bg: "#0284c7", label: "Azul"   },
  { bg: "#ca8a04", label: "Amarelo" },
  { bg: "#16a34a", label: "Verde"   },
  { bg: "#7c3aed", label: "Roxo"    },
] as const;

const corPorId = (id: number) => COLOR_PALETTE[id % COLOR_PALETTE.length].bg;

type FormState = EspecialidadeMedicoRequestDTO;

const emptyForm = (): FormState => ({
  nome: "",
  descricao: "",
});

export const Especialidades = () => {
  const { showToast } = useToast();
  const {
    especialidades,
    criarEspecialidade,
    editarEspecialidade,
    removerEspecialidade,
  } = useEspecialidade();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    item: EspecialidadeMedicoResponseDTO;
  }>(null);

  const filtered = useMemo(
    () =>
      especialidades.filter((e) =>
        e.nome.toLowerCase().includes(search.toLowerCase()),
      ),
    [especialidades, search],
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormOpen(true);
  };

  const openEdit = (e: EspecialidadeMedicoResponseDTO) => {
    setEditingId(e.id);
    setForm({ nome: e.nome, descricao: e.descricao });
    setFormOpen(true);
  };

  const requestSave = () => {
    const fakeItem: EspecialidadeMedicoResponseDTO = {
      id: editingId ?? 0,
      nome: form.nome,
      descricao: form.descricao,
    };
    setConfirm({ tipo: "salvar", item: fakeItem });
  };

  const requestDelete = (e: EspecialidadeMedicoResponseDTO) =>
    setConfirm({ tipo: "excluir", item: e });

  const doConfirm = async () => {
    if (!confirm) return;

    try {
      if (confirm.tipo === "salvar") {
        if (editingId !== null) {
          await editarEspecialidade(editingId, form);
          showToast("Especialidade atualizada");
        } else {
          await criarEspecialidade(form);
          showToast("Especialidade criada");
        }
        setFormOpen(false);
      } else {
        await removerEspecialidade(confirm.item.id);
        showToast("Especialidade removida", "info");
      }
    } catch {
      showToast("Ocorreu um erro. Tente novamente.", "error");
    } finally {
      setConfirm(null);
    }
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
                {/* <TableCell align="center">Médicos vinculados</TableCell> */}
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
                        fontWeight: 700,
                        bgcolor: `${corPorId(e.id)}22`,
                        color: corPorId(e.id),
                        border: `1px solid ${corPorId(e.id)}55`,
                      }}
                    />
                  </TableCell>
                  <TableCell>{e.descricao}</TableCell>
                  {/* <TableCell align="center">
                    <Chip
                      label={e.medicosVinculados}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell> */}
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
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
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
            {editingId !== null ? "Editar especialidade" : "Nova especialidade"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome"
            fullWidth
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <TextField
            label="Descrição"
            fullWidth
            multiline
            rows={2}
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
          {/* Campo "Cor" removido — não faz parte do modelo da API */}

          {/* Médicos vinculados — comentado até o endpoint estar disponível
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <TextField
              label="Médicos vinculados"
              type="number"
              value={form.medicosVinculados}
              onChange={(e) =>
                setForm({ ...form, medicosVinculados: Number(e.target.value) })
              }
            />
          </Stack>
          */}
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
            onClick={requestSave}
            variant="contained"
            disabled={!form.nome.trim()}
          >
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
};