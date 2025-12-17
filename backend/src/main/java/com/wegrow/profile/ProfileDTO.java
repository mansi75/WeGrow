package com.wegrow.profile;

import java.time.LocalDate;

public class ProfileDTO {

    public Long id;
    public String name;
    public String email;
    public String tagline;

    // stats
    public int streakDays;
    public int totalSessions;
    public int achievements; // for now: derived or stub

    // personal info
    public String phone;
    public String location;
    public LocalDate memberSince;

    // wellness goals
    public int dailyMeditationMinutes;
    public String journalingFrequency;
    public int sleepHoursGoal;
    public String breathingPerWeek;

    // settings
    public boolean notificationsEnabled;
    public boolean emailUpdatesEnabled;
    public boolean privacyMode;
}
