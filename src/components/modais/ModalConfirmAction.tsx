/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Slide,
  alpha,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { forwardRef } from "react";

export type ConfirmVariant =
  | "danger"
  | "warning"
  | "info"
  | "success";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  icon?: "delete" | "edit" | "save" | "warning" | "info";
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const Transition = forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const variantColor: Record<
  ConfirmVariant,
  "error" | "warning" | "info" | "success"
> = {
  danger: "error",
  warning: "warning",
  info: "info",
  success: "success",
};

const iconMap = {
//   delete: DeleteOutlineIcon,
  delete: DeleteIcon,
  edit: EditOutlinedIcon,
  save: SaveOutlinedIcon,
  warning: WarningAmberIcon,
  info: InfoOutlinedIcon,
};

export const ConfirmActionModal = ({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "warning",
  icon = "warning",
  onClose,
  onConfirm,
  loading,
}: Props) => {
  const color = variantColor[variant];
  const IconCmp = iconMap[icon];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 0,
            maxWidth: 460,
            width: "100%",
            boxShadow: 24,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={(t) => ({
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(t.palette[color].main, 0.12),
            color: t.palette[color].main,
          })}
        >
          <IconCmp />
        </Box>

        <Typography
          variant="h6"
          sx={{
            flex: 1,
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 3,
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          disabled={loading}
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color={color}
          disabled={loading}
          autoFocus
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};