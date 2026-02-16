import DeleteBtn from "./DeleteBtn";
import type { JobApplication } from "../types/jobApplication";

type Props = {
  application: JobApplication;
  onEdit: () => void;
  setApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
};

const JobApplicationDisplay = ({
  application,
  onEdit,
  setApplications,
}: Props) => (
  <div className="flex justify-between items-center">
    <div>
      <h3 className="font-bold">{application.company}</h3>
      <p>{application.position}</p>
      <p className="text-sm">Applied: {application.appliedDate}</p>
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold
          ${application.status === "APPLIED" && "bg-gray-200"}
          ${application.status === "INTERVIEWING" && "bg-blue-200"}
          ${application.status === "OFFER" && "bg-green-200"}
          ${application.status === "REJECTED" && "bg-red-200"}
        `}
      >
        {application.status}
      </span>
    </div>

    <div className="flex gap-2">
      <button onClick={onEdit} className="text-blue-600 hover:underline">
        Edit
      </button>
      <DeleteBtn application={application} setApplications={setApplications} />
    </div>
  </div>
);

export default JobApplicationDisplay;
