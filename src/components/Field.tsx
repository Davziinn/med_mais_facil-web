import { Box, Typography } from "@mui/material";

interface FieldProps {
  label: string;
  value: string;
}

export const Field = ({ label, value }: FieldProps) => {
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
