// src/hooks/api/userApi/useQrCode.ts
import { useState, useEffect } from 'react';
import { getQrCode } from '@/services/user/qrCodeService';

export function useQrCode(enabled: boolean) {
  const [qrUrl,    setQrUrl]    = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (!enabled) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const blob = await getQrCode();
        objectUrl = URL.createObjectURL(blob);
        setQrUrl(objectUrl);
      } catch (e) {
        setError(e.message || 'Failed to load QR code');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [enabled]);

  return { qrUrl, loading, error };
}
