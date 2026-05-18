import { Box, Card, CardContent, Typography, alpha } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: "primary" | "success" | "warning" | "error" | "info" | "secondary";
  trend?: string;
}

export const StatCardAdmin = ({
  icon,
  label,
  value,
  color = "primary",
  trend,
}: Props) => {
  return (
    <Card
      sx={(t) => ({
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 12px 24px -12px ${alpha(
            t.palette[color].main,
            0.35
          )}`,
          borderColor: alpha(t.palette[color].main, 0.4),
        },
      })}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={(t) => ({
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(t.palette[color].main, 0.12),
              color: t.palette[color].main,
              flexShrink: 0,
            })}
          >
            {icon}
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 600,
              }}
            >
              {label}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>

            {trend && (
              <Typography
                variant="caption"
                sx={{
                  color: `${color}.main`,
                  fontWeight: 600,
                }}
              >
                {trend}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}