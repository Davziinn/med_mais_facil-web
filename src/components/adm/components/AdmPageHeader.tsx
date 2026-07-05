import { Box, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminPageHeader({ title, subtitle, actions }: Props) {
  return (
     <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box>{actions}</Box>}
    </Stack>
  );
}
