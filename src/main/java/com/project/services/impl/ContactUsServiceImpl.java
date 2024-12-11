package com.project.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.DtoContactUs;
import com.project.entities.ContactUs;
import com.project.repository.ContactUsRepository;
import com.project.services.IContactUsService;

@Service
public class ContactUsServiceImpl implements IContactUsService{
	
	@Autowired
	private ContactUsRepository contactUsRepository;
	
	@Override
	public void sendMessage(DtoContactUs dtoContactUs){
		
		ContactUs contactUs = new ContactUs();
		
		BeanUtils.copyProperties(dtoContactUs, contactUs);
		
	    contactUsRepository.save(contactUs);
		
		
	}
	
	@Override
	public List<DtoContactUs> getAllContacts() {
		
		List<DtoContactUs> dtoContactUsList = new ArrayList<>();
		
		List<ContactUs> contactUsList = contactUsRepository.findAll();
		
		for (ContactUs contactUs : contactUsList) {
			DtoContactUs dto = new DtoContactUs();
			BeanUtils.copyProperties(contactUs, dto);
			dtoContactUsList.add(dto);
		}
		
		return dtoContactUsList;
	}
}
