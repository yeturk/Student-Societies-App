package com.project.jwt;

import java.sql.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.project.entities.RefreshToken;
import com.project.entities.User;

@Component
public class GenerateRefreshToken {


	public RefreshToken createRefreshToken(User user) {
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setRefreshToken(UUID.randomUUID().toString());
		refreshToken.setExpireDate(new Date(System.currentTimeMillis() + 1000*60*60*4));
		refreshToken.setUser(user);
		
		return refreshToken;
		
	}

}
