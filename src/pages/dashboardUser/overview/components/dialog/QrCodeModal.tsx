import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import { useQrCode } from '@hooks/api/userApi/useQrCode';

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ open, onClose }) => {
  // Pass `open` as `enabled` so we only fetch when the dialog opens
  const { qrUrl, loading, error } = useQrCode(open);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Your QR Code</DialogTitle>
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="warning">{error}</Alert>
        ) : qrUrl ? (
          <Box
            component="img"
            src={qrUrl}
            alt="Your QR code"
            sx={{ width: 200, height: 200, mx: 'auto' }}
          />
        ) : (
          <Typography>No QR code available</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;
