package com.localhost._0.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.localhost._0.dto.DtoEvent;
import com.localhost._0.dto.DtoEventIU;
import com.localhost._0.entities.Event;
import com.localhost._0.repository.EventRepository;
import com.localhost._0.service.IEventService;

@Service
public class EventService implements IEventService {
	
	@Autowired
	private EventRepository eventRepository;
	
	@Override
	public DtoEvent saveEvent(DtoEventIU dtoEventIU)
	{
		Event event= new Event();
		BeanUtils.copyProperties(dtoEventIU, event);
		
		DtoEvent dtoEvent = new DtoEvent();
		Event svdEvent = eventRepository.save(event);
		
		BeanUtils.copyProperties(svdEvent, dtoEvent);
		return dtoEvent;			
	}
	@Override
	public List<DtoEvent> getAllEvents()
	{
		List<DtoEvent> dtoEvents= new ArrayList<>();
		List<Event> allEvents = eventRepository.findAll();
		for (Event event : allEvents) {
			DtoEvent newEvent = new DtoEvent();
			BeanUtils.copyProperties(event, newEvent);
			dtoEvents.add(newEvent);
		}
		return dtoEvents;
	}
	
    private boolean isDateValid(LocalDate date) {
        return !date.isBefore(LocalDate.now());
    }
    
	@Override
	public void deleteEvent(Integer eventId) {
		Optional<Event> optional = eventRepository.findById(eventId);
		
		if(optional.isPresent())
		{
			eventRepository.delete(optional.get());
		}	
	}
	
	@Override
	public DtoEvent getEventByID(Integer Id)
	{
		Optional<Event> optional = eventRepository.findById(Id);
		
		if(optional.isPresent())	
		{
			Event newEvent = optional.get();
			DtoEvent dtoEvent = new DtoEvent();
			BeanUtils.copyProperties(newEvent, dtoEvent);
			
			return dtoEvent;
		}
		return null;
		
	}
	@Override
	public List<DtoEvent> getAllEventsBySocietyID(Integer societyID)
	{ 
		List<DtoEvent> eventList = getAllEvents();
		List<DtoEvent> eventListBySocietyID = new ArrayList<>();
		for (DtoEvent dtoEvent : eventList) {
			if(societyID.equals(dtoEvent.getSocietyID()))
			{
				eventListBySocietyID.add(dtoEvent);
			}
		}
		return eventListBySocietyID;
		
	}
	
	@Override
	public List<DtoEvent> getEventsByDate(LocalDate startDate)
	{
		List<DtoEvent> eventList = getAllEvents();
		List<DtoEvent> eventListByDate = new ArrayList<>();
		for (DtoEvent dtoEvent : eventList) {
			if(startDate.equals(dtoEvent.getStartDate()))
			{
				eventListByDate.add(dtoEvent);
			}
		}
		return eventListByDate;
	}
}
