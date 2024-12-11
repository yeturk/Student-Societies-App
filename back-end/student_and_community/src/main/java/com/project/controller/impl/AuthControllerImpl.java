package com.project.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.controller.IAuthController;
import com.project.dto.DtoUser;
import com.project.jwt.AuthRequest;
import com.project.jwt.AuthResponse;
import com.project.jwt.RefreshTokenRequest;
import com.project.services.IRefreshTokenService;

import jakarta.validation.Valid;

@RestController
public class AuthControllerImpl implements IAuthController{

	@Autowired
	private AuthService authService;
	
	@Autowired
	private IRefreshTokenService refreshTokenService;
	
	@Override
	public DtoUser register(AuthRequest request) {
		
		
		return authService.register(request);
	}
	@Override
	@PostMapping("/authenticate")
	public AuthResponse authenticate(@RequestBody @Valid AuthRequest request) {
		
		return authService.authenticate(request);
	}
	@Override
	@PostMapping("/refreshToken")
	public AuthResponse refreshToken(@RequestBody RefreshTokenRequest request) {
		System.out.println("ALOOOOOOOO" + request.getRefreshToken());
		return refreshTokenService.refreshToken(request);
	}

	
}
