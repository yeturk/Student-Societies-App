package com.project.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "community")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", length = 1000) // Adjust length as needed
    private String description;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
   private Date createdDate;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "x") 
    private String x;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "president_name")
    private String presidentName;

    @Column(name = "president_mail")
    private String presidentMail;

    @Column(name = "number_of_followers")
    private Integer numberOfFollowers;

 /*   @ElementCollection
    @CollectionTable(name = "community_followers", joinColumns = @JoinColumn(name = "community_id"))
    @Column(name = "follower_id")
    private List<Integer> followers;

    @ElementCollection
    @CollectionTable(name = "community_events", joinColumns = @JoinColumn(name = "community_id"))
    @Column(name = "event_id")
    private List<Integer> events; */
}
