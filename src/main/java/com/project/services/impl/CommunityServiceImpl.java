package com.project.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.DtoCommunity;
import com.project.dto.DtoCommunityIU;
import com.project.entities.Community;
import com.project.repository.CommunityRepository;
import com.project.services.ICommunityService;

@Service
public class CommunityServiceImpl implements ICommunityService{

@Autowired
private CommunityRepository communityRepository;
	
	@Override
	public DtoCommunity saveCommunity(DtoCommunityIU dtoCommunityIU) {
		DtoCommunity response = new DtoCommunity();
		Community community = new Community();
		
		BeanUtils.copyProperties(dtoCommunityIU, community);
		
		Community dbCommunity =  communityRepository.save(community);
		
		BeanUtils.copyProperties(dbCommunity, response);
		
		return response;
	}

	@Override
	public List<DtoCommunity> getAllCommunities() {
		
		List<DtoCommunity> dtoCommunityList = new ArrayList<>();
		
		List<Community> communityList = communityRepository.findAll();
		
		for (Community community : communityList) {
			DtoCommunity dto = new DtoCommunity();
			BeanUtils.copyProperties(community, dto);
			dtoCommunityList.add(dto);
		}
		
		return dtoCommunityList;
	}

	@Override
	public DtoCommunity getCommunityById(Integer id) {
		DtoCommunity dtoCommunity = new DtoCommunity();
		Optional<Community> optional = communityRepository.findById(id);
		
		if(optional.isEmpty()) {
			
			return null;
		}
		
		Community dbCommunity = optional.get();
		BeanUtils.copyProperties(dbCommunity, dtoCommunity);
		
		
		return dtoCommunity;
	}

	@Override
	public void deleteCommunity(Integer id) {
		Optional<Community> optional = communityRepository.findById(id);
		if(optional.isPresent()) {
			communityRepository.delete(optional.get());
		}

	}

	@Override
	public DtoCommunity updateCommunity(Integer id, DtoCommunityIU dtoCommunityIU) {
		
		DtoCommunity dto = new DtoCommunity();
		Optional<Community> optional = communityRepository.findById(id);
		if(optional.isPresent()) {
			Community dbCommunity = optional.get();
			dbCommunity.setName(dtoCommunityIU.getName());
			dbCommunity.setDescription(dtoCommunityIU.getDescription());
			//dbCommunity.setCreatedDate(dtoCommunityIU.getCreatedDate());
			dbCommunity.setInstagram(dtoCommunityIU.getInstagram());
			dbCommunity.setX(dtoCommunityIU.getX());
			dbCommunity.setFacebook(dtoCommunityIU.getFacebook());
			dbCommunity.setPresidentName(dtoCommunityIU.getPresidentName());
			dbCommunity.setPresidentMail(dtoCommunityIU.getPresidentMail());
			dbCommunity.setNumberOfFollowers(dtoCommunityIU.getNumberOfFollowers());
		  //dbCommunity.setFollowers(dtoCommunityIU.getFollowers());
		  //dbCommunity.setEvents(dtoCommunityIU.getEvents());

			
			Community updatedCommunity = communityRepository.save(dbCommunity);
			BeanUtils.copyProperties(updatedCommunity, dto);
			
		}
		return dto;
			}
}
