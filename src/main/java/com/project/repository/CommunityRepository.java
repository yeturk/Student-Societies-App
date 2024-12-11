package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entities.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer>{

}
