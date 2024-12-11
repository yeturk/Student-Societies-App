package com.project.controller;

import com.project.dto.DtoUser;
import com.project.jwt.AuthRequest;
import com.project.jwt.AuthResponse;
import com.project.jwt.RefreshTokenRequest;

public interface IAuthController {

	public DtoUser register(AuthRequest request);
	
	public AuthResponse authenticate(AuthRequest request);
	
	public AuthResponse refreshToken(RefreshTokenRequest request);
}
