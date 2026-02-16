import { useState } from "react";
import type { JobApplication } from "../types/jobApplication";

type AddApplicationProp = {
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
};

const AddApplication = ({ setApplications }: AddApplicationProp) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<JobApplication["status"]>("APPLIED");
  const [appliedDate, setAppliedDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addApplication = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, position, status, appliedDate }),
      });

      if (!response.ok) throw new Error("Failed to add application");

      const newApplication: JobApplication = await response.json();
      setApplications((prev) => [...prev, newApplication]);

      // reset form
      setCompany("");
      setPosition("");
      setStatus("APPLIED");
      setAppliedDate("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addApplication} className="flex flex-col gap-2 mb-6">
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        required
        className="border rounded-lg px-3 py-2"
      />
      <input
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        required
        className="border rounded-lg px-3 py-2"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as JobApplication["status"])}
        className="border rounded-lg px-3 py-2"
      >
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEWING">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>
      <input
        type="date"
        value={appliedDate}
        onChange={(e) => setAppliedDate(e.target.value)}
        required
        className="border rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Application"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddApplication;
