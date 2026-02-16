import JobApplicationDisplay from "./JobApplicationDisplay";
import type { JobApplication } from "../types/jobApplication";
import { useState } from "react";

type ItemProps = {
  application: JobApplication;
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
};

const JobApplicationItem = ({ application, setApplications }: ItemProps) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedCompany, setUpdatedCompany] = useState(application.company);
  const [updatedPosition, setUpdatedPosition] = useState(application.position);
  const [updatedStatus, setUpdatedStatus] = useState<JobApplication["status"]>(
    application.status,
  );
  const [updatedDate, setUpdatedDate] = useState(application.appliedDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateApplication = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/applications/${application.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: application.id,
            company: updatedCompany,
            position: updatedPosition,
            status: updatedStatus,
            appliedDate: updatedDate,
          }),
        },
      );
      if (!response.ok) throw new Error("Failed to update application");
      const updated: JobApplication = await response.json();
      setApplications((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a)),
      );
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="flex flex-col gap-2 border-b py-3">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={updatedCompany}
            onChange={(e) => setUpdatedCompany(e.target.value)}
            placeholder="Company"
            className="border rounded px-2 py-1"
          />
          <input
            value={updatedPosition}
            onChange={(e) => setUpdatedPosition(e.target.value)}
            placeholder="Position"
            className="border rounded px-2 py-1"
          />
          <select
            value={updatedStatus}
            onChange={(e) =>
              setUpdatedStatus(e.target.value as JobApplication["status"])
            }
            className="border rounded px-2 py-1"
          >
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className="border rounded px-2 py-1"
          />

          <div className="flex gap-2">
            <button
              onClick={updateApplication}
              disabled={loading}
              className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}
        </div>
      ) : (
        <JobApplicationDisplay
          application={application}
          onEdit={() => setIsEditing(true)}
          setApplications={setApplications}
        />
      )}
    </li>
  );
};

export default JobApplicationItem;
