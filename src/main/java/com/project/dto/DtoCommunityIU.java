package com.project.dto;

import java.util.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class DtoCommunityIU {

    private Integer id;

    @NotBlank(message = "Community name is required")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @PastOrPresent(message = "Created date cannot be in the future")
    private Date createdDate;

    private String instagram;

    private String x;

    private String facebook;

    @NotBlank(message = "President name is required")
    private String presidentName;

    @Email(message = "President email should be valid")
    private String presidentMail;

    @NotNull(message = "Number of followers is required")
    private Integer numberOfFollowers;

    /*private List<Integer> followers;
    private List<Integer> events;*/
}
