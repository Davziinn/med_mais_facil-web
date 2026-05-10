import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  Grid,
  Chip,
  Divider,
  MenuItem,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import MedicationIcon from "@mui/icons-material/Medication";
import ScienceIcon from "@mui/icons-material/Science";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


import { useSalvarPrescricao } from "../hooks/useSalvarPrescricao";
import type { DetalheChamadoUI } from "../mappers/detalheMapper";

interface PrescricaoModalProps {
  open: boolean;
  onClose: () => void;
  chamado: DetalheChamadoUI | null;
  onConfirm?: (dados: PrescricaoDados) => void;
  atendimentoId: number | null;
}

export interface Medicamento {
  nome: string;
  dose: string;
  via: string;
  frequencia: string;
  duracao: string;
}

export interface PrescricaoDados {
  medicamentos: Medicamento[];
  exames: string[];
  orientacoes: string;
  retorno: string;
}

const vias = [
  "Oral",
  "Endovenosa",
  "Intramuscular",
  "Subcutânea",
  "Tópica",
  "Inalatória",
];

const examesSugeridos = [
  "Hemograma completo",
  "Glicemia de jejum",
  "Perfil lipídico",
  "Eletrocardiograma",
  "Raio-X de tórax",
  "Ultrassonografia abdominal",
  "Tomografia",
];

const medicamentoVazio: Medicamento = {
  nome: "",
  dose: "",
  via: "Oral",
  frequencia: "",
  duracao: "",
};

export default function PrescricaoModal({
  open,
  onClose,
  chamado,
  onConfirm,
  atendimentoId,
}: PrescricaoModalProps) {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [novoMed, setNovoMed] = useState<Medicamento>(medicamentoVazio);
  const [exames, setExames] = useState<string[]>([]);
  const [novoExame, setNovoExame] = useState("");
  const [orientacoes, setOrientacoes] = useState("");
  const [retorno, setRetorno] = useState("");

  const { salvarPrescricao } = useSalvarPrescricao();

  if (!chamado) return null;

  const reset = () => {
    setMedicamentos([]);

    setNovoMed(medicamentoVazio);

    setExames([]);

    setNovoExame("");

    setOrientacoes("");

    setRetorno("");
  };

  const handleSalvarPrescricao = async () => {
    if (atendimentoId === null) return;

    const data = await salvarPrescricao(atendimentoId, {
      orientacoes,
      retornoConsulta: retorno,

      exames: exames.join(", "),

      medicamentos: medicamentos.map((medicamento) => ({
        nome: medicamento.nome,
        dose: medicamento.dose,
        frequencia: medicamento.frequencia,
        duracao: medicamento.duracao,
        via: medicamento.via,
      })),
    });

    if (data) {
      onConfirm?.({
        medicamentos,
        exames,
        orientacoes,
        retorno,
      });

      reset();

      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const adicionarMedicamento = () => {
    if (!novoMed.nome.trim() || !novoMed.dose.trim()) return;

    setMedicamentos((m) => [...m, novoMed]);

    setNovoMed(medicamentoVazio);
  };

  const removerMedicamento = (i: number) =>
    setMedicamentos((m) => m.filter((_, idx) => idx !== i));

  const adicionarExame = (nome?: string) => {
    const valor = (nome ?? novoExame).trim();

    if (!valor || exames.includes(valor)) return;

    setExames((e) => [...e, valor]);

    setNovoExame("");
  };

  const removerExame = (exame: string) =>
    setExames((arr) => arr.filter((x) => x !== exame));

  const podeConfirmar = medicamentos.length > 0 || exames.length > 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <MedicationIcon color="primary" />

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Prescrição Médica · {chamado.senha}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Paciente: {chamado.paciente.nome}
              {" · "}
              {chamado.paciente.idade} anos
            </Typography>
          </Box>
        </Stack>

        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
          aria-label="Fechar"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* ALERTA */}

        {chamado.paciente.condicoesPreexistentes.length > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Atenção às condições preexistentes:</strong>{" "}
            {chamado.paciente.condicoesPreexistentes.join(", ")}
          </Alert>
        )}

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mb: 1,
          }}
        >
          <MedicationIcon color="primary" fontSize="small" />

          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Medicamentos
          </Typography>
        </Stack>

        <Box
          sx={{
            p: 2,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
            mb: 2,
          }}
        >
          <Grid container spacing={1.5}>
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Medicamento"
                placeholder="Ex: Paracetamol"
                value={novoMed.nome}
                onChange={(e) =>
                  setNovoMed({
                    ...novoMed,
                    nome: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 6,
                md: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Dose"
                placeholder="500mg"
                value={novoMed.dose}
                onChange={(e) =>
                  setNovoMed({
                    ...novoMed,
                    dose: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 6,
                md: 2,
              }}
            >
              <TextField
                select
                fullWidth
                size="small"
                label="Via"
                value={novoMed.via}
                onChange={(e) =>
                  setNovoMed({
                    ...novoMed,
                    via: e.target.value,
                  })
                }
              >
                {vias.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid
              size={{
                xs: 6,
                md: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Frequência"
                placeholder="6/6h"
                value={novoMed.frequencia}
                onChange={(e) =>
                  setNovoMed({
                    ...novoMed,
                    frequencia: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 6,
                md: 2,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Duração"
                placeholder="5 dias"
                value={novoMed.duracao}
                onChange={(e) =>
                  setNovoMed({
                    ...novoMed,
                    duracao: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            sx={{
              justifyContent: "flex-end",
              mt: 1.5,
            }}
          >
            <Button
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={adicionarMedicamento}
              disabled={!novoMed.nome.trim() || !novoMed.dose.trim()}
            >
              Adicionar
            </Button>
          </Stack>
        </Box>

        {medicamentos.length > 0 && (
          <List
            dense
            sx={{
              mb: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            {medicamentos.map((m, i) => (
              <ListItem key={i} divider={i < medicamentos.length - 1}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {m.nome} {m.dose}
                    </Typography>
                  }
                  secondary={`${m.via} · ${m.frequencia || "-"} · ${
                    m.duracao || "-"
                  }`}
                />

                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => removerMedicamento(i)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ mb: 2 }} />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mb: 1,
          }}
        >
          <ScienceIcon color="info" fontSize="small" />

          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Exames Solicitados
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Digite ou selecione um exame"
            value={novoExame}
            onChange={(e) => setNovoExame(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                adicionarExame();
              }
            }}
          />

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => adicionarExame()}
          >
            Add
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            flexWrap: "wrap",
            gap: 0.5,
            mb: 1,
          }}
        >
          {examesSugeridos.map((e) => (
            <Chip
              key={e}
              label={e}
              size="small"
              variant="outlined"
              onClick={() => adicionarExame(e)}
              disabled={exames.includes(e)}
            />
          ))}
        </Stack>

        {exames.length > 0 && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              flexWrap: "wrap",
              gap: 0.5,
              mb: 2,
            }}
          >
            {exames.map((e) => (
              <Chip
                key={e}
                label={e}
                color="info"
                onDelete={() => removerExame(e)}
              />
            ))}
          </Stack>
        )}

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <TextField
              label="Orientações ao paciente"
              multiline
              minRows={3}
              fullWidth
              size="small"
              placeholder="Repouso, hidratação, sinais de alerta..."
              value={orientacoes}
              onChange={(e) => setOrientacoes(e.target.value)}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <TextField
              label="Retorno"
              fullWidth
              size="small"
              placeholder="Em 7 dias"
              value={retorno}
              onChange={(e) => setRetorno(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>

        <Button
          onClick={handleSalvarPrescricao}
          variant="contained"
          disabled={!podeConfirmar}
        >
          Salvar Prescrição
        </Button>
      </DialogActions>
    </Dialog>
  );
}
