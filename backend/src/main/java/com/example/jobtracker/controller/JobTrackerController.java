package com.example.jobtracker.controller;

import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.service.JobTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173") // React frontend
public class JobTrackerController {

    private final JobTrackerService service;

    public JobTrackerController(JobTrackerService service) { this.service = service; }

    @GetMapping
    public List<JobApplication> getAll() { return service.findAll(); }

    @PostMapping
    public JobApplication create(@RequestBody JobApplication jobApp) { return service.save(jobApp); }

    @PutMapping("/{id}")
    public JobApplication update(@PathVariable Long id, @RequestBody JobApplication details) {
        return service.update(id, details);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
