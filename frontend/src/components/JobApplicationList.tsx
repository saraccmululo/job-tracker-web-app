import { useEffect, useState } from "react";
import type { JobApplication } from "../types/jobApplication";
import JobApplicationItem from "./JobApplicationItem";

type ApplicationListProps = {
  applications: JobApplication[];
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
};

const JobApplicationList = ({
  applications,
  setApplications,
}: ApplicationListProps) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/applications`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch applications: ${response.statusText}`,
          );
        }
        const data: JobApplication[] = await response.json();
        setApplications(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [API_URL, setApplications]);

  return (
    <div>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {applications.map((app) => (
            <JobApplicationItem
              key={app.id}
              application={app}
              setApplications={setApplications}
            />
          ))}
        </ul>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default JobApplicationList;
