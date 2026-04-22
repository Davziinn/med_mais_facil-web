import { Button, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import PrioridadeBadge from "../../../components/PrioridadeBadge"
import StatusBadge from "../../../components/StatusBadge"
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";


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
                    <TableRow>
                        <TableCell>
                            <Chip label="A001" color="primary" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>John Doe</Typography>
                            <Typography variant="caption" color="text.secondary">45 anos · Masculino</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">Dor de cabeça</Typography>
                        </TableCell>
                        <TableCell>
                            <PrioridadeBadge prioridade="verde" />
                        </TableCell>
                        <TableCell>
                            <StatusBadge status="aguardando" />
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                                <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary">35 min</Typography>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            <Button component={Link} to={`/chamados/1`} variant="contained" size="small">Abrir</Button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <Chip label="A002" color="primary" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Jane Smith</Typography>
                            <Typography variant="caption" color="text.secondary">30 anos · Feminino</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">Febre</Typography>
                        </TableCell>
                        <TableCell>
                            <PrioridadeBadge prioridade="amarelo" />
                        </TableCell>
                        <TableCell>
                            <StatusBadge status="cancelado" />
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                                <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary"> - </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            <Button component={Link} to={`/chamados/:id`} variant="contained" size="small">Abrir</Button>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell>
                            <Chip label="A003" color="primary" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Dente Yuohan</Typography>
                            <Typography variant="caption" color="text.secondary">3 anos · Masculino</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">Morte</Typography>
                        </TableCell>
                        <TableCell>
                            <PrioridadeBadge prioridade="vermelho" />
                        </TableCell>
                        <TableCell>
                            <StatusBadge status="em_triagem" />
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                                <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary"> 15 min </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            <Button component={Link} to={`/chamados/:id`} variant="contained" size="small">Abrir</Button>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell>
                            <Chip label="A004" color="primary" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Jonan Dua</Typography>
                            <Typography variant="caption" color="text.secondary">22 anos · Feminino</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">Dor de pescoço</Typography>
                        </TableCell>
                        <TableCell>
                            <PrioridadeBadge prioridade="laranja" />
                        </TableCell>
                        <TableCell>
                            <StatusBadge status="finalizado" />
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                                <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary"> - </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            <Button component={Link} to={`/chamados/:id`} variant="contained" size="small">Abrir</Button>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <Chip label="A005" color="primary" variant="outlined" size="small" sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>Nilole Cripte</Typography>
                            <Typography variant="caption" color="text.secondary">35 anos · Feminino</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">Gripe</Typography>
                        </TableCell>
                        <TableCell>
                            <PrioridadeBadge prioridade="vermelho" />
                        </TableCell>
                        <TableCell>
                            <StatusBadge status="em_atendimento" />
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.5}>
                                <AccessTimeIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                                <Typography variant="body2" color="text.secondary"> - </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            <Button component={Link} to={`/chamados/:id`} variant="contained" size="small">Abrir</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}