import { useState, useEffect } from "react";
import { getDoctorVisits, DoctorVisit } from "@services/doctor/doctorVisitsService";

export function useDoctorVisits() {
  const [visits, setVisits] = useState<DoctorVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDoctorVisits();
        setVisits(data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { visits, loading, error };
}
