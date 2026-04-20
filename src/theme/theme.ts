import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0284c7", 
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#eef2f7", 
      contrastText: "#1e293b",
    },
    error: {
      main: "#e11d48", 
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b", 
      contrastText: "#ffffff",
    },
    success: {
      main: "#16a34a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f0f4f8", 
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: "'Public Sans', system-ui, sans-serif",
    h1: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)",
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.75rem",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: "0.75rem",
          textTransform: "uppercase" as const,
          letterSpacing: "0.05em",
          color: "#64748b",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e293b",
          color: "#eef2f7",
          borderRight: "none",
        },
      },
    },
  },
});

export default theme;
