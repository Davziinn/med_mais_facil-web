import { Box, Typography } from "@mui/material";

interface FieldProps {
  label: string;
  value: string;
  variant?: "default" | "compact";
}

export const Field = ({ label, value, variant = "default" }: FieldProps) => {
  if (variant === "compact") {
    return (
      <Box>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontSize: "10px",
            fontWeight: 500,
            color: "text.disabled",
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "13px" }}>
          {value}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="caption" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
};