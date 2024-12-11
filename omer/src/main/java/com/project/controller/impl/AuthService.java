package com.project.controller.impl;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.controller.IAuthService;
import com.project.dto.DtoUser;
import com.project.entities.RefreshToken;
import com.project.entities.User;
import com.project.jwt.AuthRequest;
import com.project.jwt.AuthResponse;
import com.project.jwt.GenerateRefreshToken;
import com.project.jwt.JwtService;
import com.project.repository.RefreshTokenRepository;
import com.project.repository.UserRepository;

@Service
public class AuthService implements IAuthService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	
	@Autowired
	private GenerateRefreshToken generateRefreshToken;
	
	private RefreshToken createRefreshToken(User user) {
				
		return generateRefreshToken.createRefreshToken(user);
		
	}
	
	@Override
	public DtoUser register(AuthRequest request) {
		User user = new User();
		DtoUser dto = new DtoUser();
		user.setUsername(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		User savedUser = userRepository.save(user);
		BeanUtils.copyProperties(savedUser, dto);
		
		
		return dto;
	}
	@Override
	public AuthResponse authenticate(AuthRequest request) {
		try {
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken
															(request.getUsername(), request.getPassword());
			authenticationProvider.authenticate(auth);
			
			Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
			
			String accessToken = jwtService.generateToken(optionalUser.get());
			
			RefreshToken refreshToken = createRefreshToken(optionalUser.get());
			refreshTokenRepository.save(refreshToken);
			
			return new AuthResponse(accessToken, refreshToken.getRefreshToken());
			
			
			
		} catch (Exception e) {
		System.out.println("usarname or password is wrong");
		}
		return null;
	}


}
