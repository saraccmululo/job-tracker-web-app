package com.example.jobtracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity //this class maps to a database table.
public class JobApplication {

    @Id //marks the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto generate the ID
    private Long id;
    private String company;
    private String position;
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;//are Enums
    private LocalDate appliedDate;

    //constructores
    public JobApplication() {}//JPA/Hibernate requires a no-args constructor to create objects when reading from the database

    public JobApplication(String company, String position, ApplicationStatus status, LocalDate appliedDate) {
        this.company = company;//creates objects with valid state
        this.position = position;
        this.status = status;
        this.appliedDate = appliedDate;
    }

    // Getters and setters
    public Long getId() { return id; }

    public String getCompany() { 
        return company; 
    }
    public void setCompany(String company) { 
        this.company = company; 
    }

    public String getPosition() { 
        return position; 
    }
    public void setPosition(String position) { 
        this.position = position; 
    }

    public ApplicationStatus getStatus() { 
        return status; 
    }
    public void setStatus(ApplicationStatus status) { 
        this.status = status; 
    }

    public LocalDate getAppliedDate() { 
        return appliedDate; 
    }
    public void setAppliedDate(LocalDate appliedDate) { 
        this.appliedDate = appliedDate; 
    }
}
