package com.wegrow.user;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false, unique = true)
    private String email;

    @Column(name="password", nullable=false)
    private String passwordHash;

    // NEW: role
    @Enumerated(EnumType.STRING)
    @Column(name = "role") 
    private Role role = Role.USER;

    
    private String phone;
    private String location;
    private LocalDate memberSince;

    private Integer dailyMeditationMinutes;      
    private String journalingFrequency;        
    private Integer sleepHoursGoal;             
    private String breathingPerWeek; 

    private boolean notificationsEnabled;
    private boolean emailUpdatesEnabled;
    private boolean privacyMode;

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDate getMemberSince() { return memberSince; }
    public void setMemberSince(LocalDate memberSince) { this.memberSince = memberSince; }

    public Integer getDailyMeditationMinutes() { return dailyMeditationMinutes; }
    public void setDailyMeditationMinutes(Integer dailyMeditationMinutes) { this.dailyMeditationMinutes = dailyMeditationMinutes; }

    public String getJournalingFrequency() { return journalingFrequency; }
    public void setJournalingFrequency(String journalingFrequency) { this.journalingFrequency = journalingFrequency; }

    public Integer getSleepHoursGoal() { return sleepHoursGoal; }
    public void setSleepHoursGoal(Integer sleepHoursGoal) { this.sleepHoursGoal = sleepHoursGoal; }

    public String getBreathingPerWeek() { return breathingPerWeek; }
    public void setBreathingPerWeek(String breathingPerWeek) { this.breathingPerWeek = breathingPerWeek; }

    public boolean isNotificationsEnabled() { return notificationsEnabled; }
    public void setNotificationsEnabled(boolean notificationsEnabled) { this.notificationsEnabled = notificationsEnabled; }

    public boolean isEmailUpdatesEnabled() { return emailUpdatesEnabled; }
    public void setEmailUpdatesEnabled(boolean emailUpdatesEnabled) { this.emailUpdatesEnabled = emailUpdatesEnabled; }

    public boolean isPrivacyMode() { return privacyMode; }
    public void setPrivacyMode(boolean privacyMode) { this.privacyMode = privacyMode; }




    public User() {}
    public User(String name, String email) { this.name = name; this.email = email; }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    // NEW: getter/setter for role
    public Role getRole() {
        return role == null ? Role.USER : role;
    }
    public void setRole(Role role) { this.role = role; }
}
