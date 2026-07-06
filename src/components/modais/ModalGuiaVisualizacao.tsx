import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import type { DetalheChamadoUI } from "../../mappers/detalheMapper";
import type { GuiaMedicaResponseDTO } from "../../service/api/guiaMedicaService";
import { calcularValidade, formatDateTime } from "../../utils/FormataTempo";

interface GuiaVisualizacaoModalProps {
  open: boolean;
  onClose: () => void;
  guia: GuiaMedicaResponseDTO;
  chamado: DetalheChamadoUI;
  onCopy?: (mensagem: string) => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
      <Typography
        variant="caption"
        sx={{
          textTransform: "uppercase",
          color: "text.secondary",
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function ModalGuiaVisualizacao({
  open,
  onClose,
  guia,
  chamado,
  onCopy,
}: GuiaVisualizacaoModalProps) {
  const handleCopiar = () => {
    navigator.clipboard.writeText(guia.numeroGuia);
    onCopy?.(`Número da guia ${guia.numeroGuia} copiado.`);
  };

  console.log("ModalGuiaVisualizacao renderizado com guia:", guia);

  const handleImprimir = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          pt: 2.5,
          pb: 1,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <AddModeratorIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Guia de Autorização
          </Typography>
        </Stack>
        <IconButton onClick={onClose} aria-label="Fechar">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Pré-Solicitação de Guia
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "warning.main" }}
            >
              PENDENTE DE AUTORIZAÇÃO
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "block" }}
              color="text.secondary"
            >
              Emitida em {formatDateTime(guia.dataSolicitacao)}
            </Typography>

            <Typography
              variant="caption"
              sx={{ display: "block" }}
              color="text.secondary"
            >
              Validade: {calcularValidade(guia.dataSolicitacao)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Identificação da Guia
        </Typography>
        <Stack sx={{ mb: 2 }}>
          <DetailRow label="Nº da Guia" value={guia.numeroGuia} />
          <DetailRow label="Convênio" value={guia.convenio} />
          <DetailRow label="Senha do Chamado" value={chamado.senha} />
        </Stack>

        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Dados do Paciente
        </Typography>
        <Stack sx={{ mb: 2 }}>
          <DetailRow label="Nome" value={chamado.paciente.nome} />
          <DetailRow label="CPF" value={chamado.paciente.cpf} />
          <DetailRow
            label="Idade / Sexo"
            value={`${chamado.paciente.idade} anos · ${chamado.paciente.sexo}`}
          />
        </Stack>

        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Dados Clínicos
        </Typography>
        <Stack sx={{ mb: 2 }}>
          <DetailRow label="Queixa Principal" value={chamado.queixa} />
          <DetailRow
            label="Prioridade"
            value={chamado.prioridadeChamado.toUpperCase()}
          />
          <DetailRow
            label="Condições"
            value={
              chamado.paciente.condicoesPreexistentes.join(", ") || "Nenhuma"
            }
          />
        </Stack>

        <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
          Exames Solicitados ({guia.exames.length})
        </Typography>
        <Stack spacing={0.5} sx={{ mb: 1 }}>
          {guia.exames.map((e) => (
            <Typography key={e.id} variant="body2" sx={{ fontWeight: 600 }}>
              {e.nome}
            </Typography>
          ))}
        </Stack>
      </DialogContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          px: 3,
          py: 1.5,
        }}
      >
        <Button startIcon={<ContentCopyIcon />} onClick={handleCopiar}>
          Copiar Nº
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handleImprimir}
        >
          Imprimir / Salvar PDF
        </Button>
        <Button onClick={onClose} color="inherit">
          Fechar
        </Button>
      </Box>
    </Dialog>
  );
}