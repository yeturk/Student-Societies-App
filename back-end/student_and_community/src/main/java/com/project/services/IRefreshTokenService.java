package com.project.services;

import com.project.jwt.AuthResponse;
import com.project.jwt.RefreshTokenRequest;

public interface IRefreshTokenService {

public AuthResponse refreshToken(RefreshTokenRequest request);

}
