import { useState, useEffect, useCallback } from "react";
import {
  getDoctorProfile,
  updateDoctorProfile,
  DoctorProfile,
} from "@/services/doctor/doctorProfileService";

export function useDoctorProfile() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const p = await getDoctorProfile();
      setProfile(p);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = useCallback(
    async (updates: Pick<DoctorProfile, "specialty" | "phone" | "region" | "neighborhood">) => {
      if (!profile) return false;
      setLoading(true);
      setError(null);
      try {
        const updated = await updateDoctorProfile(profile.id, updates);
        setProfile(updated);
        return true;
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [profile]
  );

  return { profile, loading, error, save, reload: load };
}
