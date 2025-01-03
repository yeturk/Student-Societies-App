package com.project.controller;

import java.util.List;

import com.project.dto.DtoContactUs;

public interface IContactUsController {

	public String startMessage();
	
	public void sendMessage(DtoContactUs dtoContactUs);

	List<DtoContactUs> getAllContacts();
}
