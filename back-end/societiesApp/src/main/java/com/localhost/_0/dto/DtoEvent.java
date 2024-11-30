package com.localhost._0.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DtoEvent {
	
    private String title;

    private String description;
    
    private String location;

    private LocalDate startDate;
    private LocalTime startTime;
    
    private LocalDate endDate;
    private LocalTime endTime;
    private Integer societyID;
}
