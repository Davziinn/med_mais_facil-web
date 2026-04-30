import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface CardPacienteProps {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  sexo: string;
}

export const CardPaciente = ({
  id,
  nome,
  cpf,
  idade,
  sexo,
}: CardPacienteProps) => {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={id}>
      <Card sx={{ "&:hover": { boxShadow: 4 }, transition: "box-shadow 0.2s" }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <PersonIcon />
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                {nome}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                CPF: {cpf}
              </Typography>
            </Box>
          </Stack>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">
                Idade
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {idade} anos
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">
                Sexo
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {sexo}
              </Typography>
            </Box>
            {/* <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Typography variant="caption" color="text.secondary">Convênio</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Camed</Typography>
                        </Box> */}
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ mt: 1.5, flexWrap: "wrap" }}
            useFlexGap
          >
            <Chip
              key={1}
              label="LEMBRAR DE PUXAR AS CONDIÇÕES PREEXISTENTES"
              size="small"
              color="warning"
              variant="outlined"
              sx={{ fontSize: "0.65rem" }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
