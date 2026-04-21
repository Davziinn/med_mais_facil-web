import { Avatar, Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person";

export const CardPaciente = () => {
    return (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={1}>
            <Card sx={{ "&:hover": { boxShadow: 4 }, transition: "box-shadow 0.2s" }}>
                <CardContent>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <PersonIcon />
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>Davi Pereira Menezes</Typography>
                            <Typography variant="caption" color="text.secondary">
                                CPF: 085.983.623-10
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Typography variant="caption" color="text.secondary">Idade</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>21 anos</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Typography variant="caption" color="text.secondary">Sexo</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Masculino</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Typography variant="caption" color="text.secondary">Convênio</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Camed</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1.5, flexWrap: "wrap" }} useFlexGap>
                        <Chip key={1} label="Gostosura demais da conta sô" size="small" color="warning" variant="outlined" sx={{ fontSize: "0.65rem" }} />
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}