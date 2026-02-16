package com.example.jobtracker.service;

import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.repository.JobTrackerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JobTrackerService {

    private final JobTrackerRepository repo;

    public JobTrackerService(JobTrackerRepository repo) { this.repo = repo; }

    public List<JobApplication> findAll() { return repo.findAll(); }

    public JobApplication save(JobApplication jobApp) { return repo.save(jobApp); }

    public JobApplication update(Long id, JobApplication details) {
        JobApplication jobApp = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));

        jobApp.setCompany(details.getCompany());
        jobApp.setPosition(details.getPosition());
        jobApp.setStatus(details.getStatus());
        jobApp.setAppliedDate(details.getAppliedDate());

        return repo.save(jobApp);
    }

    public void delete(Long id) {
        JobApplication jobApp = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job application not found"));
        repo.delete(jobApp);
    }
}
