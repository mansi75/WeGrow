package com.wegrow.profile;

import java.time.LocalDate;

public class ProfileDTO {

    public Long id;
    public String name;
    public String email;
    public String tagline;

    
    public int streakDays;
    public int totalSessions;
    public int achievements; 

    
    public String phone;
    public String location;
    public LocalDate memberSince;

    
    public int dailyMeditationMinutes;
    public String journalingFrequency;
    public int sleepHoursGoal;
    public String breathingPerWeek;

    
    public boolean notificationsEnabled;
    public boolean emailUpdatesEnabled;
    public boolean privacyMode;
}
