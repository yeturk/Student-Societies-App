package com.project.controller;

import java.util.List;

import com.project.dto.DtoCommunity;
import com.project.dto.DtoCommunityIU;
import jakarta.validation.Valid;

public interface ICommunityController {

	public DtoCommunity saveCommunity(@Valid DtoCommunityIU dtoCommunityIU);

	public List<DtoCommunity> getAllCommunities();

	public DtoCommunityIU getCommunityById(Integer id);

	public void deleteCommunity(Integer id);

	public DtoCommunity updateCommunity(Integer id, DtoCommunityIU dtoCommunityIU);
	

}
