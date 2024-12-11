package com.project.services.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.entities.RefreshToken;
import com.project.jwt.AuthResponse;
import com.project.jwt.GenerateRefreshToken;
import com.project.jwt.JwtService;
import com.project.jwt.RefreshTokenRequest;
import com.project.repository.RefreshTokenRepository;
import com.project.services.IRefreshTokenService;

@Service
public class RefreshTokenImpl implements IRefreshTokenService {
	
	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private GenerateRefreshToken generateRefreshToken;
	
	public boolean isTokenExpired(Date expiredDate) {
		return new Date().before(expiredDate);
	}
	
	@Override
	public AuthResponse refreshToken(RefreshTokenRequest request) {
		
		Optional<RefreshToken> optional = refreshTokenRepository.findByRefreshToken(request.getRefreshToken().toString());
		if(optional.isEmpty()) {
			System.out.println("refresh token is not valid: " + request.getRefreshToken());
		}
		
		RefreshToken refreshToken = optional.get();
		
		if(!isTokenExpired(refreshToken.getExpireDate())) {
			System.out.println("refresh token is expired: " + request.getRefreshToken());
		}
		
		String accessToken = jwtService.generateToken(refreshToken.getUser());
				
		RefreshToken savedRefreshToken = refreshTokenRepository.save(generateRefreshToken.createRefreshToken(refreshToken.getUser()));
		
		
		return new AuthResponse(accessToken, savedRefreshToken.getRefreshToken());
	}

}
