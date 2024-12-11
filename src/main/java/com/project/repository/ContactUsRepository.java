package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.entities.ContactUs;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs, Integer>{

}
