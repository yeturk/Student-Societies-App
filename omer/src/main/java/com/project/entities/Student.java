package com.project.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "department")
    private String department;

    @Column(name = "role")
    private String role;

    @Column(name = "notification_open_email")
    private Boolean notificationOpenForEmail;

    /*@ElementCollection
    @CollectionTable(name = "user_followed_societies", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "society_id")
    private List<Integer> followedSocieties;*/
	
	
	@ManyToMany
	@JoinTable(name = "student_community",
	inverseJoinColumns = @JoinColumn(name="community_id"))
	private List<Community> communities = new ArrayList<>();

}
