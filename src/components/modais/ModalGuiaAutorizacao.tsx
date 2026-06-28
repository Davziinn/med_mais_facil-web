/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider,
} from "@mui/material";
import type { DetalheChamadoUI } from "../../mappers/detalheMapper";
import { examesMock } from "../../mocks/examesMock";


export interface ExameResumo {
  id: number;
  nome: string;
}

export interface GuiaMedicaCriada {
  id: number;
  numeroGuia: string;
  statusGuiaMedica: "PENDENTE" | "APROVADA" | "NEGADA";
  dataSolicitacao: string;
  convenio: string;
  cid10: string; 
  indicacaoClinica: string; 
  observacoes?: string; 
  atendimentoId: number;
  exames: ExameResumo[];
}

interface GuiaAutorizacaoModalProps {
  open: boolean;
  onClose: () => void;
  chamado: DetalheChamadoUI | null;
  atendimentoId: number | null;
  guiaParaEditar?: GuiaMedicaCriada | null;
  onConfirm: (guia: GuiaMedicaCriada) => void;
}

function gerarNumeroGuiaMock(): string {
  const agora = new Date();
  const aaaa = agora.getFullYear();
  const mm = String(agora.getMonth() + 1).padStart(2, "0");
  const dd = String(agora.getDate()).padStart(2, "0");
  const sufixo = Math.floor(100000 + Math.random() * 900000);
  return `GUIA-${aaaa}${mm}${dd}-${sufixo}`;
}

// MOCK — trocar por POST /guias-medicas (criação) e PUT /guias-medicas/{id} (edição)
// quando o backend existir. No mock, toda guia fica em PENDENTE pra sempre, porque
// a transição pra APROVADA/NEGADA é assíncrona (vem do backend/convênio).
function salvarGuiaMock(
  payload: {
    atendimentoId: number;
    convenio: string;
    cid10: string;
    indicacaoClinica: string;
    observacoes?: string;
    exameIds: number[];
  },
  guiaExistente?: GuiaMedicaCriada | null
): Promise<GuiaMedicaCriada> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exames = examesMock.filter((e) => payload.exameIds.includes(e.id));

      resolve({
        id: guiaExistente?.id ?? Math.floor(Math.random() * 10000),
        numeroGuia: guiaExistente?.numeroGuia ?? gerarNumeroGuiaMock(),
        statusGuiaMedica: guiaExistente?.statusGuiaMedica ?? "PENDENTE",
        dataSolicitacao: guiaExistente?.dataSolicitacao ?? new Date().toISOString(),
        convenio: payload.convenio,
        cid10: payload.cid10,
        indicacaoClinica: payload.indicacaoClinica,
        observacoes: payload.observacoes,
        atendimentoId: payload.atendimentoId,
        exames: exames.map((e) => ({ id: e.id, nome: e.nome })),
      });
    }, 600);
  });
}

export default function GuiaAutorizacaoModal({
  open,
  onClose,
  chamado,
  atendimentoId,
  guiaParaEditar,
  onConfirm,
}: GuiaAutorizacaoModalProps) {
  const [exameIdsSelecionados, setExameIdsSelecionados] = useState<number[]>([]);
  const [cid10, setCid10] = useState("");
  const [indicacaoClinica, setIndicacaoClinica] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);

  const modoEdicao = !!guiaParaEditar;
  const convenio = chamado?.paciente?.convenio ?? "-";

  // Preenche o form quando abre em modo edição, ou limpa quando abre pra criar
  useEffect(() => {
    if (!open) return;

    if (guiaParaEditar) {
      setExameIdsSelecionados(guiaParaEditar.exames.map((e) => e.id));
      setCid10(guiaParaEditar.cid10);
      setIndicacaoClinica(guiaParaEditar.indicacaoClinica);
      setObservacoes(guiaParaEditar.observacoes ?? "");
    } else {
      setExameIdsSelecionados([]);
      setCid10("");
      setIndicacaoClinica("");
      setObservacoes("");
    }
  }, [open, guiaParaEditar]);

  const handleToggleExame = (id: number) => {
  const exame = examesMock.find((e) => e.id === id);

  console.log("Exame clicado:", exame);

  setExameIdsSelecionados((prev) =>
    prev.includes(id)
      ? prev.filter((e) => e !== id)
      : [...prev, id]
  );
};

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const formValido =
    exameIdsSelecionados.length > 0 &&
    cid10.trim().length > 0 &&
    indicacaoClinica.trim().length > 0;

  const handleSubmit = async () => {
    if (!atendimentoId || !formValido) return;

    setLoading(true);

    const guiaSalva = await salvarGuiaMock(
      {
        atendimentoId,
        convenio,
        cid10: cid10.trim(),
        indicacaoClinica: indicacaoClinica.trim(),
        observacoes: observacoes.trim() || undefined,
        exameIds: exameIdsSelecionados,
      },
      guiaParaEditar
    );

    setLoading(false);
    onConfirm(guiaSalva);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {modoEdicao ? "Editar Pré-Solicitação de Guia" : "Nova Pré-Solicitação de Guia"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <TextField label="Convênio" value={convenio} fullWidth disabled size="small" />

          <TextField
            label="CID-10"
            placeholder="Ex: J18.9"
            value={cid10}
            onChange={(e) => setCid10(e.target.value)}
            fullWidth
            required
            size="small"
          />

          <TextField
            label="Indicação Clínica"
            placeholder="Justificativa clínica para a solicitação dos exames"
            value={indicacaoClinica}
            onChange={(e) => setIndicacaoClinica(e.target.value)}
            fullWidth
            required
            multiline
            minRows={2}
          />

          <Divider />

          <Typography variant="subtitle2">Exames solicitados</Typography>

          <FormGroup>
            {examesMock.map((exame) => (
              <FormControlLabel
                key={exame.id}
                control={
                  <Checkbox
                    checked={exameIdsSelecionados.includes(exame.id)}
                    onChange={() => handleToggleExame(exame.id)}
                  />
                }
                label={
                  <Stack>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {exame.nome}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {exame.descricao}
                    </Typography>
                  </Stack>
                }
                sx={{ alignItems: "flex-start", mb: 1 }}
              />
            ))}
          </FormGroup>

          <TextField
            label="Observações"
            multiline
            minRows={3}
            fullWidth
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value.slice(0, 300))}
            helperText={`${observacoes.length}/300`}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formValido || !atendimentoId}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : modoEdicao ? (
            "Salvar Alterações"
          ) : (
            "Gerar Pré-Solicitação"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}