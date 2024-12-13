package com.localhost._0.controller;

import java.time.LocalDate;
import java.util.List;

import com.localhost._0.dto.DtoEvent;
import com.localhost._0.dto.DtoEventIU;
import jakarta.validation.Valid;

public interface IEventController {
	
	public DtoEvent saveEvent(@Valid DtoEventIU dtoEventIU);
	public List<DtoEvent> getAllEvents();
	public void deleteEvent(Integer eventId);
	public DtoEvent getEventByID(Integer Id);
	public List<DtoEvent> getAllEventsBySocietyID(Integer societyId);
	public List<DtoEvent> getEventsByDate(LocalDate startDate);
}
