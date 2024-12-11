package com.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoMultipleEmail {

	String[] to;
	
	String subject;
	
	String body;
	
	String imagePath; 

}
