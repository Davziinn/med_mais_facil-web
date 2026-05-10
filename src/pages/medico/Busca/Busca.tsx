import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { ProntuarioModal } from "../../../components/ProntuarioModal";
import { usePaciente } from "../../../hooks/usePaciente";
import { useFilaEspera } from "../../../hooks/useFilaEspera";

export default function Busca() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();

  const [pacienteSelecionado, setPacienteSelecionado] = useState<{
    id: number;
    nome: string;
  } | null>(null);

  const { pacientes } = usePaciente();
  const { filaEspera } = useFilaEspera();

  const { pacientesEncontrados, chamadosEncontrados } = useMemo(() => {
    if (!q) return { pacientesEncontrados: [], chamadosEncontrados: [] };

    const inclui = (...valores: (string | number | undefined | null)[]) =>
      valores.filter(Boolean).join(" ").toLowerCase().includes(q);

    return {
      pacientesEncontrados: pacientes.filter((p) => inclui(p.nome, p.cpf)),
      chamadosEncontrados: filaEspera.filter((c) =>
        inclui(c.senha, c.paciente?.nome, c.paciente?.cpf, c.queixa),
      ),
    };
  }, [q, pacientes, filaEspera]);

  const total = pacientesEncontrados.length + chamadosEncontrados.length;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Resultados da busca
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {q ? (
            <>
              {total} resultado{total !== 1 && "s"} para{" "}
              <Box component="span" sx={{ fontWeight: 600 }}>
                "{q}"
              </Box>
            </>
          ) : (
            "Digite um termo para buscar"
          )}
        </Typography>
      </Box>

      {q && total === 0 && (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <SearchOffIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography sx={{ fontWeight: 600 }}>
              Nenhum resultado encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tente nome, CPF, senha ou queixa.
            </Typography>
          </CardContent>
        </Card>
      )}

      {chamadosEncontrados.length > 0 && (
        <Card>
          <CardContent>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <AssignmentIcon color="primary" />
              <Typography sx={{ fontWeight: 700 }}>
                Chamados ({chamadosEncontrados.length})
              </Typography>
            </Stack>

            <Stack divider={<Divider flexItem />}>
              {chamadosEncontrados.map((c) => (
                <Box
                  key={c.id}
                  component={Link}
                  to={`/chamados/${c.id}`}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                    p: 1,
                    borderRadius: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Chip label={c.senha} size="small" color="primary" />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {c.paciente?.nome}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.queixa}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {pacientesEncontrados.length > 0 && (
        <Card>
          <CardContent>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography sx={{ fontWeight: 700 }}>
                Pacientes ({pacientesEncontrados.length})
              </Typography>
            </Stack>

            <Stack divider={<Divider flexItem />}>
              {pacientesEncontrados.map((p) => (
                <Stack
                  key={p.id}
                  direction="row"
                  spacing={2}
                  onClick={() =>
                    setPacienteSelecionado({ id: p.id, nome: p.nome })
                  }
                  sx={{
                    alignItems: "center",
                    p: 1,
                    cursor: "pointer",
                    borderRadius: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{p.nome}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.cpf} · {p.idade} anos
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {!q && (
        <Button component={Link} to="/" variant="outlined">
          Voltar
        </Button>
      )}

      <ProntuarioModal
        isOpen={!!pacienteSelecionado}
        paciente={pacienteSelecionado?.id ?? null}
        nomePaciente={pacienteSelecionado?.nome ?? ""}
        onClose={() => setPacienteSelecionado(null)}
      />
    </Box>
  );
}
