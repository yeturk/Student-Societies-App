package com.project.jwt;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor 
@Getter
@Setter

public class AuthRequest {
	
	@NotEmpty
	private String username;
	
	@NotEmpty
	private String password;
}
