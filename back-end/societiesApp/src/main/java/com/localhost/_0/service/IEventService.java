package com.localhost._0.service;

import java.time.LocalDate;
import java.util.List;

import com.localhost._0.dto.DtoEvent;
import com.localhost._0.dto.DtoEventIU;

public interface IEventService {
	
	public DtoEvent saveEvent(DtoEventIU dtoStudentIU);
	public List<DtoEvent> getAllEvents();
	public void deleteEvent(Integer eventId);
	public DtoEvent getEventByID(Integer Id);
	public List<DtoEvent> getAllEventsBySocietyID(Integer societyID);
	public List<DtoEvent> getEventsByDate(LocalDate startDate);
}
