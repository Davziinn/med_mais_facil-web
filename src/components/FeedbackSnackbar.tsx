import { Alert, Snackbar } from "@mui/material";
import type { FeedbackState } from "../hooks/useFeedback";

interface FeedbackSnackbarProps {
  feedback: FeedbackState | null;
  onClose: () => void;
}

export const FeedbackSnackbar = ({ feedback, onClose }: FeedbackSnackbarProps) => {
  return (
    <Snackbar
      open={!!feedback}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={feedback?.severity ?? "success"}
        variant="filled"
        onClose={onClose}
      >
        {feedback?.message}
      </Alert>
    </Snackbar>
  );
};