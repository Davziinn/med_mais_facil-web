import { useEffect, useRef, useState } from "react";
import { Box, Button, Alert } from "@mui/material";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (code: string) => void;
}

const REGION_ID = "qr-scanner-region";

export const QRScanner = ({ onScan }: QRScannerProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    setError(null);
    try {
      const scanner = new Html5Qrcode(REGION_ID);
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decoded: string) => {
          onScan(decoded);
          stop();
        },
        () => {}
      );
      setActive(true);
    } catch (e) {
      setError(
        `Não foi possível acessar a câmera. Verifique as permissões do navegador. ${
          e instanceof Error ? e.message : String(e)
        }`
      );
    }
  };

  const stop = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch {
      /* ignore */
    }
    setActive(false);
  };

  useEffect(() => {
    return () => {
      stop();
    };
     
  }, []);

  return (
    <Box>
      <Box
        id={REGION_ID}
        sx={{
          width: "100%",
          minHeight: active ? 280 : 0,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.default",
          border: active ? 1 : 0,
          borderColor: "divider",
          mb: 2,
        }}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!active ? (
        <Button variant="contained" onClick={start} fullWidth>
          Iniciar leitura por câmera
        </Button>
      ) : (
        <Button variant="outlined" color="inherit" onClick={stop} fullWidth>
          Parar câmera
        </Button>
      )}
    </Box>
  );
}