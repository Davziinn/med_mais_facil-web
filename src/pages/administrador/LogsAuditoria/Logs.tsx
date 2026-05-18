import { useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
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

import { LOGS_MOCK } from "../../../mocks/adminMock";

export default function Logs() {
  const [search, setSearch] = useState("");

  const [user, setUser] = useState("TODOS");

  const [date, setDate] = useState("");

  const usuarios = Array.from(new Set(LOGS_MOCK.map((l) => l.usuario)));

  const filtered = useMemo(
    () =>
      LOGS_MOCK.filter((l) => {
        const matchS =
          l.acao.toLowerCase().includes(search.toLowerCase()) ||
          l.modulo.toLowerCase().includes(search.toLowerCase());

        const matchU = user === "TODOS" || l.usuario === user;

        const matchD = !date || l.data.startsWith(date);

        return matchS && matchU && matchD;
      }),
    [search, user, date],
  );

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
              flexDirection: {
                xs: "column",
                md: "row",
              },
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
              <InputLabel>Usuário</InputLabel>

              <Select
                label="Usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              >
                <MenuItem value="TODOS">Todos</MenuItem>

                {usuarios.map((u) => (
                  <MenuItem key={u} value={u}>
                    {u}
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
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
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
                const d = new Date(l.data);

                return (
                  <TableRow key={l.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{l.usuario}</TableCell>

                    <TableCell>{l.acao}</TableCell>

                    <TableCell>
                      <Chip size="small" label={l.modulo} variant="outlined" />
                    </TableCell>

                    <TableCell>{d.toLocaleDateString("pt-BR")}</TableCell>

                    <TableCell
                      sx={{
                        color: "text.secondary",
                      }}
                    >
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
      </Card>
    </Box>
  );
}
