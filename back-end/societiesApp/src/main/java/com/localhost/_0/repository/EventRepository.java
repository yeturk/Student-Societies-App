package com.localhost._0.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.localhost._0.entities.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {
	
}
