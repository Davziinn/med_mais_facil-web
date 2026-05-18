import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminPageHeader = ({
  title,
  subtitle,
  actions,
}: Props) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {actions && <Box>{actions}</Box>}
    </Box>
  );
};