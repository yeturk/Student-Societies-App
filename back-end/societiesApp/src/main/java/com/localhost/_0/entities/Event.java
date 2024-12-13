package com.localhost._0.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table (name = "Event")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "societID", nullable = true )
    private Integer societyID;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "Guests")
    private String guest;
    
    @Column(name = "Location", nullable = false)
    private String location;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "Start Date", nullable = false)
    private LocalDate startDate;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "Start Time", nullable = false)
    private LocalTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "End Date", nullable = false)
    private LocalDate endDate;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "End Time", nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private EventType type;
    

}