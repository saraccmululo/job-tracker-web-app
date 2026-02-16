export type JobApplication = {
  id: number;
  company: string;
  position: string;
  status: "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";
  appliedDate: string;
};
