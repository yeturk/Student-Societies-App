package com.project.controller;

import com.project.dto.DtoUser;
import com.project.jwt.AuthRequest;
import com.project.jwt.AuthResponse;

public interface IAuthService {

	public DtoUser register(AuthRequest request);
	
	public AuthResponse authenticate(AuthRequest request);
	

}
