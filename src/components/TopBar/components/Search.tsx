import { Toolbar, Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => {
  return (
    <Toolbar sx={{ gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.default",
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          width: "80%",
          border: 1,
          borderColor: "divider",
        }}
      >
        <SearchIcon
          sx={{
            color: "text.secondary",
            mr: 1,
            fontSize: 20,
          }}
        />
        <InputBase
          placeholder="Buscar Paciente"
          sx={{ flex: 1, fontSize: "0.875rem" }}
        />
      </Box>

      <Box sx={{ ml: "auto" }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: "text.primary" }}
        >
          14 Mar 2026
        </Typography>
      </Box>
    </Toolbar>
  );
};
