import { useCallback, useState } from "react";

export type FeedbackSeverity = "success" | "error";

export interface FeedbackState {
  message: string;
  severity: FeedbackSeverity;
}

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const showFeedback = useCallback(
    (message: string, severity: FeedbackSeverity = "success") => {
      setFeedback({ message, severity });
    },
    [],
  );

  const showSuccess = useCallback(
    (message: string) => showFeedback(message, "success"),
    [showFeedback],
  );

  const showError = useCallback(
    (message: string) => showFeedback(message, "error"),
    [showFeedback],
  );

  const clearFeedback = useCallback(() => setFeedback(null), []);

  return { feedback, showFeedback, showSuccess, showError, clearFeedback };
};