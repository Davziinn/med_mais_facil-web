import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"

export const HeaderHistorico = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Histórico de Atendimentos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Consulte atendimentos finalizados e cancelados, com diagnósticos e produtividade
                </Typography>
            </Box>
            <ToggleButtonGroup
                exclusive
                size="small"
            >
                <ToggleButton value="hoje">Hoje</ToggleButton>
                <ToggleButton value="semana">7 dias</ToggleButton>
                <ToggleButton value="mes">30 dias</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}