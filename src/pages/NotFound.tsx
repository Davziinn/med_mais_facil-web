import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorIcon from "@mui/icons-material/Error";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <ErrorIcon sx={{ fontSize: 64, color: "error.main" }} />

          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1 }}>
            404
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Página não encontrada
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<ArrowBackIcon />}
            >
              Voltar para Home
            </Button>

            <Button component={Link} to="/" variant="outlined">
              Ir para Dashboard
            </Button>
          </Stack>
        </div>
      </Paper>
    </Box>
  );
};
