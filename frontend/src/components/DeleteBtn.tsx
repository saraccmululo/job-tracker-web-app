import type { JobApplication } from "../types/jobApplication";
import { useState } from "react";

type DeleteApplicationProp = {
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  application: JobApplication;
};

const DeleteBtn = ({ setApplications, application }: DeleteApplicationProp) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteApplication = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/applications/${application.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete application: ${response.statusText}`);
      }

      // Remove deleted item from state
      setApplications((prev) =>
        prev.filter((app) => app.id !== application.id),
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={deleteApplication}
        className="text-red-700 hover:underline disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </>
  );
};

export default DeleteBtn;
