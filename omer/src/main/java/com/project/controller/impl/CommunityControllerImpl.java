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
import org.springframework.web.bind.annotation.RestController;

import com.project.controller.ICommunityController;
import com.project.dto.DtoCommunity;
import com.project.dto.DtoCommunityIU;
import com.project.services.ICommunityService;

import jakarta.validation.Valid;
import lombok.Data;


@RestController
@RequestMapping("/rest/api/community")
@Data
public class CommunityControllerImpl implements ICommunityController {
	
	@Autowired 
	private ICommunityService communityService;
	
	@PostMapping(path = "/save")
	@Override
	public DtoCommunity saveCommunity(@RequestBody @Valid DtoCommunityIU dtoCommunityIU) {
		return communityService.saveCommunity(dtoCommunityIU);
	}

	@GetMapping(path = "/list")
	@Override
	public List<DtoCommunity> getAllCommunities() {
		// TODO Auto-generated method stub
		return communityService.getAllCommunities();
	}
	
	@GetMapping(path = "/list/{id}")
	@Override
	public DtoCommunity getCommunityById(@PathVariable(name = "id") Integer id) {
		
		return communityService.getCommunityById(id);
	}

	@DeleteMapping(path = "/delete/{id}")
	@Override
	public void deleteCommunity(@PathVariable(name = "id") Integer id) {
		communityService.deleteCommunity(id);
		
	}

	@PutMapping(path = "/update/{id}")
	@Override
	public DtoCommunity updateCommunity(@PathVariable(name = "id")Integer id, @RequestBody DtoCommunityIU dtoCommunityIU) {
		return communityService.updateCommunity(id, dtoCommunityIU);
	}
	
	


}
