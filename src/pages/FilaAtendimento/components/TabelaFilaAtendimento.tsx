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
import PrioridadeBadge from "../../../components/PrioridadeBadge";
import StatusBadge from "../../../components/StatusBadge";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

type Chamado = {
  id: number;
  senha: string;
  nome: string;
  idade: number;
  sexo: string;
  queixa: string;
  prioridade: "verde" | "amarelo" | "vermelho" | "laranja";
  status:
    | "aguardando"
    | "cancelado"
    | "em_triagem"
    | "finalizado"
    | "em_atendimento";
  espera: string;
};

const chamados: Chamado[] = [
  {
    id: 1,
    senha: "A001",
    nome: "John Doe",
    idade: 45,
    sexo: "Masculino",
    queixa: "Dor de cabeça",
    prioridade: "verde",
    status: "aguardando",
    espera: "35 min",
  },
  {
    id: 2,
    senha: "A002",
    nome: "Jane Smith",
    idade: 30,
    sexo: "Feminino",
    queixa: "Febre",
    prioridade: "amarelo",
    status: "cancelado",
    espera: "-",
  },
  {
    id: 3,
    senha: "A003",
    nome: "Dente Yuohan",
    idade: 3,
    sexo: "Masculino",
    queixa: "Morte",
    prioridade: "vermelho",
    status: "em_triagem",
    espera: "15 min",
  },
  {
    id: 4,
    senha: "A004",
    nome: "Jonan Dua",
    idade: 22,
    sexo: "Feminino",
    queixa: "Dor de pescoço",
    prioridade: "laranja",
    status: "finalizado",
    espera: "-",
  },
  {
    id: 5,
    senha: "A005",
    nome: "Nilole Cripte",
    idade: 35,
    sexo: "Feminino",
    queixa: "Gripe",
    prioridade: "vermelho",
    status: "em_atendimento",
    espera: "-",
  },
];

export const TabelaFilaAtendimento = () => {
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
          {chamados.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Chip
                  label={c.senha}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </TableCell>

              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {c.nome}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {c.idade} anos · {c.sexo}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2">{c.queixa}</Typography>
              </TableCell>

              <TableCell>
                <PrioridadeBadge prioridade={c.prioridade} />
              </TableCell>

              <TableCell>
                <StatusBadge status={c.status} />
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
                    {c.espera}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="right">
                <Button
                  component={Link}
                  to={`/chamados/${c.id}`}
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
