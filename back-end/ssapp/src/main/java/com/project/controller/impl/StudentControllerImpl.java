package com.project.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.controller.IStudentController;
import com.project.dto.DtoLogin;
import com.project.dto.DtoStudent;
import com.project.dto.DtoStudentIU;
import com.project.services.IStudentService;

import jakarta.validation.Valid;
import lombok.Data;


@RestController
@RequestMapping("/rest/api/student")
@Data
public class StudentControllerImpl implements IStudentController {
	
	@Autowired 
	private IStudentService studentService;
	
	@PostMapping(path = "/save")
	@Override
	public DtoStudentIU saveStudent(@RequestBody @Valid DtoStudentIU dtoStudentIU) {
		return studentService.saveStudent(dtoStudentIU);
	}

	@GetMapping(path = "/list")
	@Override
	public List<DtoStudent> getAllStudents() {
	
		return studentService.getAllStudents();
	}
	
	@PostMapping(path = "/login")
	@Override 
	public DtoStudentIU login(@RequestBody @Valid DtoLogin dtoLogin) {
		
		return studentService.login(dtoLogin);
	}
	
	@GetMapping(path = "/list/{id}")
	@Override
	public DtoStudent getStudentById(@PathVariable(name = "id") Integer id) {
		
		return studentService.getStudentById(id);
	}

	@DeleteMapping(path = "/delete/{id}")
	@Override
	public void deleteStudent(@PathVariable(name = "id") Integer id) {
		studentService.deleteStudent(id);
		
	}

	@PutMapping(path = "/update/{id}")
	@Override
	public DtoStudent updateStudent(@PathVariable(name = "id")Integer id, @RequestBody DtoStudentIU dtoStudentIU) {
		return studentService.updateStudent(id, dtoStudentIU);
	}
	
	@PostMapping(path = "/follow/{id}")
	@Override
	public DtoStudent addStudentToCommunity(
	    @PathVariable(name = "id") Integer student_id,
	    @RequestParam Integer community_id) {
	    return studentService.addStudentToCommunity(student_id, community_id);
	}

}
