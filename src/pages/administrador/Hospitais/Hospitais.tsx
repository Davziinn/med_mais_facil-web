import { useMemo, useState } from "react";
import {
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
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { ConfirmActionModal } from "../../../components/modais/ModalConfirmAction";
import { StatCardAdmin } from "../../../components/StatCardAdmin";
import { useToast } from "../../../contexts/ToastContext";
import {
  type HospitalResponseDTO,
  type HospitalRequestDTO,
  type StatusHospitalResponseAPI,
} from "../../../service/api/hospitalService";
import { useHospitais } from "../../../hooks/useHospital";

const maskCnpj = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const STATUS_LABEL: Record<StatusHospitalResponseAPI, string> = {
  ATIVO: "Ativo",
  INATIVO: "Inativo",
  LOTADO: "Lotado",
  EM_MANUTENCAO: "Em manutenção",
};

const STATUS_COR: Record<
  StatusHospitalResponseAPI,
  "success" | "default" | "warning" | "info"
> = {
  ATIVO: "success",
  INATIVO: "default",
  LOTADO: "warning",
  EM_MANUTENCAO: "info",
};

const STATUS_OPTIONS: StatusHospitalResponseAPI[] = [
  "ATIVO",
  "INATIVO",
  "LOTADO",
  "EM_MANUTENCAO",
];

interface FormState {
  id: number | null;
  nome: string;
  cnpj: string;
  // telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  statusHospital: StatusHospitalResponseAPI;
}

const emptyForm = (): FormState => ({
  id: null,
  nome: "",
  cnpj: "",
  // telefone: "",
  endereco: "",
  cidade: "",
  estado: "",
  statusHospital: "ATIVO",
});

const hospitalToForm = (h: HospitalResponseDTO): FormState => ({
  id: h.id,
  nome: h.nome,
  cnpj: maskCnpj(h.cnpj),
  // telefone: "",
  endereco: h.endereco,
  cidade: h.cidade,
  estado: h.estado,
  statusHospital: h.statusHospital,
});

const formToRequest = (f: FormState): HospitalRequestDTO => ({
  id: f.id ?? 0,
  nome: f.nome,
  cnpj: f.cnpj.replace(/\D/g, ""),
  endereco: f.endereco,
  cidade: f.cidade,
  estado: f.estado,
  statusHospital: f.statusHospital,
});

export const Hospitais = () => {
  const { showToast } = useToast();

  const {
    hospitais,
    metricas,
    loading,
    loadingMetricas,
    error,
    carregarHospitais,
    carregarMetricas,
    criarHospital,
    atualizarHospital,
    removerHospital,
  } = useHospitais();

  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [confirm, setConfirm] = useState<null | {
    tipo: "salvar" | "excluir";
    hospital: HospitalResponseDTO | null;
  }>(null);

  const filtered = useMemo(
    () =>
      hospitais.filter(
        (h) =>
          h.nome.toLowerCase().includes(search.toLowerCase()) ||
          h.cidade.toLowerCase().includes(search.toLowerCase()),
      ),
    [hospitais, search],
  );

  const openCreate = () => {
    setForm(emptyForm());
    setFormOpen(true);
  };

  const openEdit = (h: HospitalResponseDTO) => {
    setForm(hospitalToForm(h));
    setFormOpen(true);
  };

  const requestSave = () => setConfirm({ tipo: "salvar", hospital: null });

  const requestDelete = (h: HospitalResponseDTO) =>
    setConfirm({ tipo: "excluir", hospital: h });

  const doConfirm = async () => {
    if (!confirm) return;

    setSaving(true);
    try {
      if (confirm.tipo === "salvar") {
        const request = formToRequest(form);
        if (form.id) {
          await atualizarHospital(form.id, request);
          showToast("Hospital atualizado com sucesso");
        } else {
          await criarHospital(request);
          showToast("Hospital cadastrado com sucesso");
        }
        await carregarMetricas();
        setFormOpen(false);
      } else if (confirm.tipo === "excluir" && confirm.hospital) {
        await removerHospital(confirm.hospital.id);
        await carregarMetricas();
        showToast("Hospital removido", "info");
      }
    } catch (err) {
      console.error("Erro na operação:", err);
      showToast("Erro ao realizar operação. Tente novamente.", "error");
    } finally {
      setSaving(false);
      setConfirm(null);
    }
  };

  const handleRefresh = async () => {
    await Promise.all([carregarHospitais(), carregarMetricas()]);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Hospitais"
        subtitle="Cadastre e gerencie as unidades hospitalares"
        actions={
          <Stack direction="row" spacing={1}>
            <Tooltip title="Recarregar">
              <IconButton
                onClick={handleRefresh}
                disabled={loading || loadingMetricas}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openCreate}
              disabled={loading}
            >
              Novo hospital
            </Button>
          </Stack>
        }
      />
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Tentar novamente
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Total"
            value={loadingMetricas ? "—" : (metricas?.totalHospitais ?? 0)}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Ativos"
            value={loadingMetricas ? "—" : (metricas?.ativoHospitais ?? 0)}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Lotados"
            value={loadingMetricas ? "—" : (metricas?.lotadoHospitais ?? 0)}
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCardAdmin
            icon={<LocalHospitalIcon />}
            label="Em manutenção"
            value={
              loadingMetricas ? "—" : (metricas?.emManutencaoHospitais ?? 0)
            }
            color="info"
          />
        </Grid>
      </Grid>

      <Card sx={{ mb: 2 }}>
        <CardContent>
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
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Nenhum hospital encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((h) => (
                  <TableRow key={h.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {h.nome}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {h.endereco}
                      </Typography>
                    </TableCell>
                    <TableCell>{maskCnpj(h.cnpj)}</TableCell>
                    <TableCell>
                      {h.cidade}/{h.estado}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={STATUS_LABEL[h.statusHospital]}
                        color={STATUS_COR[h.statusHospital]}
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={formOpen}
        onClose={() => !saving && setFormOpen(false)}
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
            {form.id ? "Editar hospital" : "Novo hospital"}
          </Typography>
          <IconButton onClick={() => setFormOpen(false)} disabled={saving}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Nome do hospital"
            fullWidth
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="CNPJ"
              fullWidth
              placeholder="00.000.000/0000-00"
              value={form.cnpj}
              onChange={(e) =>
                setForm({ ...form, cnpj: maskCnpj(e.target.value) })
              }
              slotProps={{ htmlInput: { maxLength: 18 } }}
            />
            {/* <TextField
              label="Telefone"
              fullWidth
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            /> */}
          </Stack>
          <TextField
            label="Endereço"
            fullWidth
            value={form.endereco}
            onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Cidade"
              fullWidth
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />
            <TextField
              label="Estado"
              fullWidth
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={form.statusHospital}
                onChange={(e) =>
                  setForm({
                    ...form,
                    statusHospital: e.target.value as StatusHospitalResponseAPI,
                  })
                }
              >
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Button
            onClick={() => setFormOpen(false)}
            variant="outlined"
            color="inherit"
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button
            onClick={requestSave}
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : undefined}
          >
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
            ? `Deseja realmente excluir o hospital "${confirm.hospital?.nome}"?`
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
};
