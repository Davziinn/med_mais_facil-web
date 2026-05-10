import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;
  danger?: boolean;

  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  content,

  confirmText = "Confirmar",
  cancelText = "Cancelar",

  loading = false,
  danger = false,

  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            color: "text.primary",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          color="inherit"
          variant="text"
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={danger ? "error" : "primary"}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
