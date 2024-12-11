package com.project.dto;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoStudentIU {
	
	@NotEmpty
	@Size(min = 3, max = 15)
	private String firstName;
	
	@NotEmpty
	@Size(min = 2, max = 15)
	private String lastName;
	
	@NotEmpty
	@Email
	private String email;
	
	@NotEmpty
	@Size(min = 4, max = 15)
	private String password;
	
	private String phoneNumber;

    @NotEmpty
    private String role;

    private Boolean notificationOpenForEmail;

    private List<Integer> followedSocieties;
	
}
