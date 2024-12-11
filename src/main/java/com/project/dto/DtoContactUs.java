package com.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class DtoContactUs {


	private Long id;

	@NotBlank(message = "name is required")
	private String name;

	@Email(message = "email should be valid")
	private String email;

	@Size(max = 100, message = "message is required")
	private String message;

	//private Date createdDate;
	

	
}
