package com.project.services;

import java.util.List;

import com.project.dto.DtoContactUs;

public interface IContactUsService {

	public void sendMessage(DtoContactUs dtoContactUs);

	List<DtoContactUs> getAllContacts();
}
