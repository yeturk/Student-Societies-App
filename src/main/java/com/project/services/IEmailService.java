package com.project.services;

import com.project.dto.DtoMultipleEmail;

public interface IEmailService {
	
	public void sendEmailToMultipleRecipients(DtoMultipleEmail dtoMultipleEmail);
}

