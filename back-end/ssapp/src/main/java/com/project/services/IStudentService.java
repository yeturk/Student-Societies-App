package com.project.services;

import java.util.List;

import com.project.dto.DtoLogin;
import com.project.dto.DtoStudent;
import com.project.dto.DtoStudentIU;

public interface IStudentService {

	public DtoStudentIU saveStudent(DtoStudentIU dtoStudentIU);
	
	public List<DtoStudent> getAllStudents();
	
	public DtoStudent getStudentById(Integer id);
	
	public void deleteStudent(Integer id);
	 
	public DtoStudent updateStudent(Integer id, DtoStudentIU dtoStudentIU);

	public DtoStudent addStudentToCommunity(Integer student_id, Integer community_id);

	public DtoStudentIU login(DtoLogin dtoLogin);
	



	
}
