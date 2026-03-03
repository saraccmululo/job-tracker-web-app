package com.example.jobtracker.controller;

import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.service.JobTrackerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//This class handles REST API requests. Spring will automatically convert responses to JSON.
@RequestMapping("/api/applications")//Base URL for all endpoints in this controller.
@CrossOrigin(origins = "http://localhost:5173") // React frontend is allowed to call the backend.

public class JobTrackerController {

    private final JobTrackerService service;

    public JobTrackerController(JobTrackerService service) { 
        this.service = service; 
    }

    @GetMapping
    public List<JobApplication> getAll() { 
        return service.findAll(); 
    }

    @PostMapping
    public JobApplication create(@RequestBody JobApplication jobApp) { //takes JSON from the request body and convert it into a java object called jobApp
        return service.save(jobApp); 
    }

    @PutMapping("/{id}")
    public JobApplication update(@PathVariable Long id, //extracts ID from URL.
                                 @RequestBody JobApplication details) {//takes JSON from the frontend request body and convert it into a java object called details
        return service.update(id, details);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
