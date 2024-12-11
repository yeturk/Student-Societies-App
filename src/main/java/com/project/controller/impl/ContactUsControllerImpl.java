package com.project.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.controller.IContactUsController;
import com.project.dto.DtoContactUs;
import com.project.services.IContactUsService;

import lombok.Data;

@RestController
@Data
public class ContactUsControllerImpl implements IContactUsController{

	@Autowired
	private IContactUsService contactUsService;
	
	
	@PostMapping(path = "/contactUs")
	@Override
	public void sendMessage(@RequestBody DtoContactUs dtoContactUs) {
		contactUsService.sendMessage(dtoContactUs);
	}
	
	@GetMapping(path = "/contactUs/list")
	@Override
	public List<DtoContactUs> getAllContacts() {
		return contactUsService.getAllContacts();
	}
	
}
