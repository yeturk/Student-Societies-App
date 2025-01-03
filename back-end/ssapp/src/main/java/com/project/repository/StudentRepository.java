package com.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entities.Student;


@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

	Optional<Student> findByEmail(String email);
	

	
//	@Query(value = "from Student", nativeQuery = false)
//	List<Student> findAllStudents();
//	
//	@Query(value = "from Student s where first_name= :studentId")
//	Optional<Student> findStudentById(Integer studentId);
}
