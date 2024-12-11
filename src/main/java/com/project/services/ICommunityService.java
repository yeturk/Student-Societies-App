package com.project.services;

import java.util.List;

import com.project.dto.DtoCommunity;
import com.project.dto.DtoCommunityIU;


public interface ICommunityService {

	public DtoCommunity saveCommunity(DtoCommunityIU dtoCommunityIU);

	public List<DtoCommunity> getAllCommunities();

	public DtoCommunityIU getCommunityById(Integer id);

	public void deleteCommunity(Integer id);

	public DtoCommunity updateCommunity(Integer id, DtoCommunityIU dtoCommunityIU);

}
