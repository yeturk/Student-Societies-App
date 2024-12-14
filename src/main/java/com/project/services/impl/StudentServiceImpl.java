package com.project.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.DtoCommunity;
import com.project.dto.DtoLogin;
import com.project.dto.DtoStudent;
import com.project.dto.DtoStudentIU;
import com.project.entities.Community;
import com.project.entities.Student;
import com.project.repository.CommunityRepository;
import com.project.repository.StudentRepository;
import com.project.services.IStudentService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentServiceImpl implements IStudentService{
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private CommunityRepository communityRepository;
	
	

	
	@Override
	public DtoStudentIU saveStudent(DtoStudentIU dtoStudentIU) {
		DtoStudentIU response = new DtoStudentIU();
		Student student = new Student();
		
		if(!dtoStudentIU.getEmail().endsWith("@gtu.edu.tr")) {
			System.out.println("email should be ended with @gtu.edu.tr)");
			return null;
		}
		
		BeanUtils.copyProperties(dtoStudentIU, student);
		
		Student dbStudent =  studentRepository.save(student);
		
		BeanUtils.copyProperties(dbStudent, response);
		
		
		return response;
	}
	
	@Override
	public DtoStudentIU login(DtoLogin dtoLogin) {
		DtoStudentIU dtoStudent = new DtoStudentIU();
		
			Optional<Student> optional = studentRepository.findByEmail(dtoLogin.getEmail());
			
			if(optional.isEmpty()) {
				
				return null;
			}
			
			Student dbStudent = optional.get();
			
			if(!dbStudent.getPassword().equals(dtoLogin.getPassword())) {
				
				return null;
			}
			
			BeanUtils.copyProperties(dbStudent, dtoStudent);
			
			return dtoStudent;
	}
	

	@Override
	public List<DtoStudent> getAllStudents() {
		
		List<DtoStudent> dtoStudentList = new ArrayList<>();
		
		List<Student> studentList = studentRepository.findAll();
		
		for (Student student : studentList) {
			DtoStudent dto = new DtoStudent();
			BeanUtils.copyProperties(student, dto);
			dtoStudentList.add(dto);
		}
		
		return dtoStudentList;
	}

	@Override
	public DtoStudent getStudentById(Integer id) {
		DtoStudent dtoStudent = new DtoStudent();
		Optional<Student> optional = studentRepository.findById(id);
		
		if(optional.isEmpty()) {
			
			return null;
		}
		
		Student dbStudent = optional.get();
		BeanUtils.copyProperties(dbStudent, dtoStudent);
		
		if(dbStudent.getCommunities() != null && !dbStudent.getCommunities().isEmpty()) {
			for (Community community : dbStudent.getCommunities()) {
				DtoCommunity dtoCommunity = new DtoCommunity();
				BeanUtils.copyProperties(community, dtoCommunity);
				
				dtoStudent.getCommunities().add(dtoCommunity);
			}
		}
		
		return dtoStudent;
	}

	@Override
	public void deleteStudent(Integer id) {
		Optional<Student> optional = studentRepository.findById(id);
		if(optional.isPresent()) {
			studentRepository.delete(optional.get());
		}

	}

	@Override
	public DtoStudent updateStudent(Integer id, DtoStudentIU dtoStudentIU) {
		
		DtoStudent dto = new DtoStudent();
		Optional<Student> optional = studentRepository.findById(id);
		if(optional.isPresent()) {
			Student dbStudent = optional.get();
			dbStudent.setName(dtoStudentIU.getName());
			dbStudent.setEmail(dtoStudentIU.getEmail());
			dbStudent.setPassword(dtoStudentIU.getPassword()); 
			
			Student updatedStudent = studentRepository.save(dbStudent);
			BeanUtils.copyProperties(updatedStudent, dto);
			
		
		}
		return dto;
			}
	
	@Override
	public DtoStudent addStudentToCommunity(Integer student_id, Integer community_id) {
	    DtoStudent dtoStudent = new DtoStudent();
	    DtoCommunity dtoCommunity = new DtoCommunity();
	    
	    Optional<Student> optionalStudent = studentRepository.findById(student_id);
	    Optional<Community> optionalCommunity = communityRepository.findById(community_id);
	    
	    if (optionalStudent.isEmpty() || optionalCommunity.isEmpty()) {
	        throw new EntityNotFoundException("Student or Community not found");
	    }

	    Student dbStudent = optionalStudent.get();
	    Community dbCommunity = optionalCommunity.get();
	    
	    // Ensure communities list is initialized before adding
	    if (dbStudent.getCommunities() == null) {
	        dbStudent.setCommunities(new ArrayList<>());
	    }
	    dbStudent.getCommunities().add(dbCommunity);
	    
	    // Save the updated student entity
	    studentRepository.save(dbStudent);
	    
	    BeanUtils.copyProperties(dbStudent, dtoStudent);
	    BeanUtils.copyProperties(dbCommunity, dtoCommunity);
	    
	    // Ensure communities list is initialized before adding
	    if (dtoStudent.getCommunities() == null) {
	        dtoStudent.setCommunities(new ArrayList<>());
	    }
	    dtoStudent.getCommunities().add(dtoCommunity);
	    
	    return dtoStudent;
	}


}
