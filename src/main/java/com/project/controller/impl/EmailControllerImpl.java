package com.project.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.controller.IEmailController;
import com.project.dto.DtoMultipleEmail;
import com.project.services.IEmailService;

import lombok.Data;

@RestController
@Data
public class EmailControllerImpl implements IEmailController{

	@Autowired 
	private IEmailService emailService;
	
	
	@PostMapping(path = "/sendMultipleEmail")
	@Override
	public void sendMultipleEmail(@RequestBody DtoMultipleEmail dtoMultipleEmail) {
		emailService.sendEmailToMultipleRecipients(dtoMultipleEmail);
	}
	
	
}
