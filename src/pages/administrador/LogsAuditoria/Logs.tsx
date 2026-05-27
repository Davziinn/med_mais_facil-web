import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdminPageHeader } from "../../../components/AdminPageHeader";
import { useLogs } from "../../../hooks/useLogs";

export default function Logs() {
  const [search, setSearch] = useState("");
  const [modulo, setModulo] = useState("");
  const [date, setDate] = useState("");

  const { logs, totalPages, page, loading, fetchLogs } = useLogs();

  const modulos = useMemo(
    () => Array.from(new Set(logs.map((l) => l.modulo))),
    [logs],
  );

  const filtered = useMemo(
    () =>
      logs.filter((l) => {
        const matchS =
          l.acao.toLowerCase().includes(search.toLowerCase()) ||
          l.modulo.toLowerCase().includes(search.toLowerCase());

        const matchM = !modulo || l.modulo === modulo;

        const matchD = !date || l.criadoEm.startsWith(date);

        return matchS && matchM && matchD;
      }),
    [logs, search, modulo, date],
  );

  const handleModuloChange = (value: string) => {
    setModulo(value);
    fetchLogs(0, undefined, value || undefined);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    fetchLogs(newPage - 1, undefined, modulo || undefined);
  };

  return (
    <Box>
      <AdminPageHeader
        title="Logs / Auditoria"
        subtitle="Histórico de ações realizadas no sistema"
      />

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar ação ou módulo"
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

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Módulo</InputLabel>
              <Select
                label="Módulo"
                value={modulo}
                onChange={(e) => handleModuloChange(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {modulos.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              type="date"
              label="Data"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Usuário</TableCell>
                    <TableCell>Ação</TableCell>
                    <TableCell>Módulo</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Horário</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filtered.map((l) => {
                    const d = new Date(l.criadoEm);
                    return (
                      <TableRow key={l.id} hover>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {l.nomeUsuario}
                        </TableCell>
                        <TableCell>{l.acao}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={l.modulo}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{d.toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell sx={{ color: "text.secondary" }}>
                          {d.toLocaleTimeString("pt-BR")}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Typography color="text.secondary">
                          Nenhum log encontrado
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page + 1}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}
