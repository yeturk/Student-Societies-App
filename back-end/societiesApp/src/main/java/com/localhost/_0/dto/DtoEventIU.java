package com.localhost._0.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

import com.localhost._0.entities.EventType;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DtoEventIU {

    @NotBlank(message = "Title can not be blank.")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters.")
    private String title;

    @NotBlank(message = "There should be a description for this event.")
    @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters.")
    private String description;

    @NotBlank(message = "Location can not be blank")
    @Size(min = 3, max = 100, message = "Location must be between 3 and 100 characters.")
    private String location;

    @FutureOrPresent(message = "Start date must be in the present or future.")
    private LocalDate startDate;

    @FutureOrPresent(message = "Start time must be in the present or future.")
    private LocalTime startTime;

    @FutureOrPresent(message = "End date must be in the present or future.")
    private LocalDate endDate;

    @FutureOrPresent(message = "End time must be in the present or future.")
    private LocalTime endTime;

    @Positive(message = "Society ID must be a positive number.")
    private Integer societyID;

    @Size(max = 100, message = "Guest name must be less than 100 characters.")
    private String guest;

    @NotNull(message = "Event type must be provided.")
    private EventType type;

    public void setStartDate(String startDate) {
        try {
            this.startDate = LocalDate.parse(startDate);
        } catch (DateTimeParseException e) {
            this.startDate = null;
        }
    }

    public void setStartTime(String startTime) {
        try {
            this.startTime = LocalTime.parse(startTime);
        } catch (DateTimeParseException e) {
            this.startTime = null;
        }
    }

    public void setEndDate(String endDate) {
        try {
            this.endDate = LocalDate.parse(endDate);
        } catch (DateTimeParseException e) {
            this.endDate = null;
        }
    }

    public void setEndTime(String endTime) {
        try {
            this.endTime = LocalTime.parse(endTime);
        } catch (DateTimeParseException e) {
            this.endTime = null;
        }
    }
}