package com.wegrow.profile;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wegrow.session.SessionLog;
import com.wegrow.session.SessionLogRepository;
import com.wegrow.user.User;
import com.wegrow.user.UserRepository;

@Service
public class ProfileService {

    private final UserRepository userRepo;
    private final SessionLogRepository sessionRepo;

    public ProfileService(UserRepository userRepo, SessionLogRepository sessionRepo) {
        this.userRepo = userRepo;
        this.sessionRepo = sessionRepo;
    }

    public ProfileDTO getProfileForUser(Long userId) {
        User u = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        ProfileDTO dto = new ProfileDTO();
        dto.id = u.getId();
        dto.name = u.getName();
        dto.email = u.getEmail();
        dto.tagline = "Wellness Enthusiast"; // you can store this on User later

        // stats
        dto.streakDays = computeStreak(userId);
        dto.totalSessions = (int) sessionRepo.countByUserId(userId);
        dto.achievements = 12; // stub for now; later compute from badges table

        // personal info
        dto.phone = u.getPhone();
        dto.location = u.getLocation();
        dto.memberSince = u.getMemberSince();

        // wellness goals (with sensible defaults)
        dto.dailyMeditationMinutes = u.getDailyMeditationMinutes() != null ? u.getDailyMeditationMinutes() : 15;
        dto.journalingFrequency = u.getJournalingFrequency() != null ? u.getJournalingFrequency() : "Daily";
        dto.sleepHoursGoal = u.getSleepHoursGoal() != null ? u.getSleepHoursGoal() : 8;
        dto.breathingPerWeek = u.getBreathingPerWeek() != null ? u.getBreathingPerWeek() : "3x/week";

        // settings
        dto.notificationsEnabled = u.isNotificationsEnabled();
        dto.emailUpdatesEnabled = u.isEmailUpdatesEnabled();
        dto.privacyMode = u.isPrivacyMode();

        return dto;
    }

    public ProfileDTO updateProfile(Long userId, ProfileDTO req) {
    User u = userRepo.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    // ----- basic info -----
    if (req.name != null && !req.name.isBlank()) {
        u.setName(req.name.trim());
    }

    // email can change – ensure not blank and unique
    if (req.email != null && !req.email.isBlank()) {
        String newEmail = req.email.trim().toLowerCase();
        if (!newEmail.equalsIgnoreCase(u.getEmail())) {
            boolean exists = userRepo.findByEmail(newEmail)
                    .filter(other -> !other.getId().equals(u.getId()))
                    .isPresent();
            if (exists) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
            }
            u.setEmail(newEmail);
        }
    }

    // phone & location (optional)
    u.setPhone(req.phone != null ? req.phone.trim() : null);
    u.setLocation(req.location != null ? req.location.trim() : null);

    if (u.getMemberSince() == null) {
        u.setMemberSince(LocalDate.now());
    }

    // ----- wellness goals -----
    u.setDailyMeditationMinutes(req.dailyMeditationMinutes);
    u.setJournalingFrequency(req.journalingFrequency);
    u.setSleepHoursGoal(req.sleepHoursGoal);
    u.setBreathingPerWeek(req.breathingPerWeek);

    // ----- settings -----
    u.setNotificationsEnabled(req.notificationsEnabled);
    u.setEmailUpdatesEnabled(req.emailUpdatesEnabled);
    u.setPrivacyMode(req.privacyMode);

    userRepo.save(u);

    return getProfileForUser(userId);
}


    private int computeStreak(Long userId) {
        List<SessionLog> logs = sessionRepo.findAllByUserIdOrderByOccurredAtDesc(userId);
        Set<LocalDate> daysWithActivity = logs.stream()
                .map(l -> l.getOccurredAt().toLocalDate())
                .collect(Collectors.toCollection(LinkedHashSet::new));

        int streak = 0;
        LocalDate d = LocalDate.now();
        while (daysWithActivity.contains(d)) {
            streak++;
            d = d.minusDays(1);
        }
        return streak;
    }
}
