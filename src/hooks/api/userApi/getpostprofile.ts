import { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  PatientProfile,
} from "@/services/user/profileService";

export function useProfile() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        setProfile(p);
      } catch (e) {
        setError(e.response?.data?.detail || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save(updates: Partial<PatientProfile>) {
    if (!profile) return false;
    setLoading(true);
    setError(null);

    try {
      await updateProfile(profile.id, updates);
      const fresh = await getProfile();
      setProfile(fresh);
      return true;
    } catch (e) {
      setError(e.response?.data?.detail || "Failed to update profile");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { profile, loading, error, save };
}
