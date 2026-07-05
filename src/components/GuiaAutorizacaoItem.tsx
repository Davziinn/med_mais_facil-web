import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Field } from "./Field";
import type { GuiaMedicaResponseDTO } from "../service/api/guiaMedicaService";

interface GuiaAutorizacaoItemProps {
  guia: GuiaMedicaResponseDTO;
  onEditar: () => void;
  onCancelar: () => void;
  onVisualizar: () => void;
}

export const GuiaAutorizacaoItem = ({
  guia,
  onEditar,
  onCancelar,
  onVisualizar,
}: GuiaAutorizacaoItemProps) => {
  return (
    <Accordion
      variant="outlined"
      disableGutters
      sx={{
        borderRadius: 2,
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mr: 1,
          },
        }}
      >
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            {guia.numeroGuia}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {guia.convenio} · {new Date(guia.dataSolicitacao).toLocaleDateString("pt-BR")}
          </Typography>
        </Stack>
        <Chip
          label="Pendente de autorização"
          color="warning"
          size="small"
          sx={{ fontWeight: 600, flexShrink: 0 }}
        />
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0 }}>
        <Stack spacing={1} sx={{ mb: 1.5 }}>
          <Field label="Nº da Guia" value={guia.numeroGuia} />
          <Field label="Convênio" value={guia.convenio} />
          <Field label="Data" value={new Date(guia.dataSolicitacao).toLocaleString("pt-BR")} />
        </Stack>

        <Typography variant="caption" color="text.secondary">
          Exames solicitados
        </Typography>
        <Stack spacing={0.5} sx={{ mt: 0.5, mb: 2 }}>
          {guia.exames.map((e) => (
            <Typography key={e.id} variant="body2">
              • {e.nome}
            </Typography>
          ))}
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={onVisualizar}
          sx={{ mb: 1 }}
        >
          Visualizar Guia
        </Button>

        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" fullWidth onClick={onEditar}>
            Editar
          </Button>
          <Button size="small" variant="outlined" color="error" fullWidth onClick={onCancelar}>
            Cancelar
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};