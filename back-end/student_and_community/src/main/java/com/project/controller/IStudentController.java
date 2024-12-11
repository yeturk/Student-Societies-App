package com.project.controller;

import java.util.List;

import com.project.dto.DtoLogin;
import com.project.dto.DtoStudent;
import com.project.dto.DtoStudentIU;

import jakarta.validation.Valid;

public interface IStudentController {

	public DtoStudent saveStudent(DtoStudentIU dtoStudentIU);
	
	public List<DtoStudent> getAllStudents();
	
	public DtoStudent getStudentById(Integer id);
	
	public void deleteStudent(Integer id);

	public DtoStudent updateStudent(Integer id, DtoStudentIU dtoStudentIU);

	public DtoStudent addStudentToCommunity(@Valid Integer student_id, @Valid Integer community_id);

	public DtoStudent login(@Valid DtoLogin dtoLogin);


}
