import {
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { useFilaEspera } from "../../../../hooks/useFilaEspera";
import PrioridadeBadge from "../../../../components/PrioridadeBadge";
import StatusBadge from "../../../../components/StatusBadge";
import { formatarTempo } from "../../../../utils/FormataTempo";

export const TabelaFilaAtendimento = () => {
  const { filaEspera } = useFilaEspera();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Senha</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Queixa</TableCell>
            <TableCell>Prioridade</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Espera</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {filaEspera.map((fila) => (
            <TableRow key={fila.id}>
              <TableCell>
                <Chip
                  label={fila.senha}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </TableCell>

              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {fila.paciente.nome}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {fila.paciente.idade} {' '}
                  ano(s) · {fila.paciente.sexo}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2">{fila.queixa}</Typography>
              </TableCell>

              <TableCell>
                <PrioridadeBadge prioridade={fila.prioridadeChamado} />
              </TableCell>

              <TableCell>
                <StatusBadge status={fila.statusChamado} />
              </TableCell>

              <TableCell>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ alignItems: "center" }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: 14, color: "text.secondary" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {formatarTempo(fila.tempoEspera)}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="right">
                <Button
                  component={Link}
                  to={`/chamados/${fila.id}`}
                  variant="contained"
                  size="small"
                >
                  Abrir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
