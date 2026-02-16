import { useState } from "react";
import "./App.css";
import JobApplicationList from "./components/JobApplicationList";
import AddApplication from "./components/AddApplication";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { JobApplication } from "./types/jobApplication";

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
          <AddApplication setApplications={setApplications} />
          <JobApplicationList
            applications={applications}
            setApplications={setApplications}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
