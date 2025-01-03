package com.localhost._0.controller.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.localhost._0.controller.IEventController;
import com.localhost._0.dto.DtoEvent;
import com.localhost._0.dto.DtoEventIU;
import com.localhost._0.service.IEventService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/")
public class EventController implements IEventController {
	
	@Autowired
	private IEventService eventService;

	@Override
	@GetMapping
	public String home()
	{
		return "welcome to the societiesApp!";
	}
	@Override
	@PostMapping (path = "/save")
	public DtoEvent saveEvent(@Valid @RequestBody DtoEventIU dtoEventIU)
	{
		return eventService.saveEvent(dtoEventIU);
	}

	@Override
	@GetMapping(path = "/list")
	public List<DtoEvent> getAllEvents()
	{
		return eventService.getAllEvents();
	}
	
	@Override
	@DeleteMapping(path = "/delete/{id}")
	public void deleteEvent(@PathVariable(name = "id") Integer eventId) {
		eventService.deleteEvent(eventId);
	}
	
	@Override
	@GetMapping(path = "/get/{id}")
	public DtoEvent getEventByID(@PathVariable(name = "id") Integer eventId)
	{
		return eventService.getEventByID(eventId);
	}
	
	@Override
	@GetMapping(path = "/getBySID/{id}")
	public List<DtoEvent> getAllEventsBySocietyID(@PathVariable(name = "id") Integer SocietId)
	{
		return eventService.getAllEventsBySocietyID(SocietId);
	}
	@Override
	@GetMapping(path = "/getByDate")
	public List<DtoEvent> getEventsByDate(@RequestBody LocalDate startDate)
	{
		return eventService.getEventsByDate(startDate);
	}
}
