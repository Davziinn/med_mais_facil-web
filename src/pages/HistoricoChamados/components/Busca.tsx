import { Card, CardContent, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Busca = () => {
  return (
    <Card>
      <CardContent sx={{ pb: "16px !important" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar por paciente, diagnóstico ou senha..."
          // value={}
          // onChange={}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
