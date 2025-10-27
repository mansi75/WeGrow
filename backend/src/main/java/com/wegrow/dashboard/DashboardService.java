package com.wegrow.dashboard;

import com.wegrow.dashboard.DashboardDTO;
import com.wegrow.user.User;
import com.wegrow.user.UserRepository;
import com.wegrow.mood.MoodLogRepository;
import com.wegrow.habit.HabitProgressRepository;
import com.wegrow.reminder.ReminderRepository;
import com.wegrow.session.SessionLogRepository;
import com.wegrow.mood.MoodLog;
import com.wegrow.habit.ActivityType;
import com.wegrow.dashboard.DashboardDTO;
import com.wegrow.habit.HabitProgress;
import com.wegrow.reminder.Reminder;
import com.wegrow.session.SessionLog;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepo;
    private final MoodLogRepository moodRepo;
    private final HabitProgressRepository progressRepo;
    private final ReminderRepository reminderRepo;
    private final SessionLogRepository sessionRepo;

    public DashboardService(UserRepository userRepo,
                            MoodLogRepository moodRepo,
                            HabitProgressRepository progressRepo,
                            ReminderRepository reminderRepo,
                            SessionLogRepository sessionRepo) {
        this.userRepo = userRepo;
        this.moodRepo = moodRepo;
        this.progressRepo = progressRepo;
        this.reminderRepo = reminderRepo;
        this.sessionRepo = sessionRepo;
    }

    public DashboardDTO getDashboard(Long userId) {
        User u = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        DashboardDTO dto = new DashboardDTO();
        dto.user = new DashboardDTO.UserDTO(u.getId(), u.getName(), u.getEmail());

        // ---------- Current mood (neutral 3 if none) ----------
        dto.currentMood = moodRepo.findAllByUserIdOrderByLoggedAtDesc(userId)
                .stream().findFirst().map(MoodLog::getMood).orElse(3);

        // ---------- Weekly mood trend (empty list if none) ----------
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.minusDays(6);
        List<MoodLog> logs = moodRepo.findAllByUserIdAndLoggedAtAfterOrderByLoggedAtAsc(
                userId, weekStart.atStartOfDay()
        );

        if (logs.isEmpty()) {
            dto.weeklyMoodTrend = List.of();  // let frontend show empty state
        } else {
            Map<LocalDate, Double> avgByDay = logs.stream()
                    .collect(Collectors.groupingBy(m -> m.getLoggedAt().toLocalDate(),
                            Collectors.averagingInt(MoodLog::getMood)));

            List<DashboardDTO.TrendPoint> trend = new ArrayList<>();
            for (int i = 0; i < 7; i++) {
                LocalDate d = weekStart.plusDays(i);
                Double avg = avgByDay.get(d);              // could be null (no logs that day)
                if (avg != null) {
                    int val = (int) Math.round(avg);       // 1..5
                    trend.add(new DashboardDTO.TrendPoint(d.getDayOfWeek().name().substring(0, 3), val));
                } else {
                    // If you prefer to always show 7 points, uncomment:
                    // trend.add(new DashboardDTO.TrendPoint(d.getDayOfWeek().name().substring(0, 3), 3));
                }
            }
            dto.weeklyMoodTrend = trend;
        }

        // ---------- Reminders (empty list is fine) ----------
        dto.reminders = reminderRepo.findAllByUserIdOrderByDueAtAsc(userId).stream()
                .limit(5)
                .map(r -> new DashboardDTO.ReminderItem(r.getId(), r.getText(), r.getDueAt(), r.isCompleted()))
                .toList();

        // ---------- Progress (ensure 4 tiles at 0% if none) ----------
        List<DashboardDTO.ProgressItem> dbProgress = progressRepo.findAllByUserId(userId).stream()
                .map(p -> new DashboardDTO.ProgressItem(p.getType().name(), p.getPercent()))
                .toList();

        dto.progress = defaultProgressIfEmpty(dbProgress);

        // ---------- Quick stats: streak + sessions this week (zeros if none) ----------
        dto.quickStats = new DashboardDTO.QuickStats(
                computeStreak(userId),
                computeSessionsThisWeek(userId)
        );

        return dto;
    }

    private List<DashboardDTO.ProgressItem> defaultProgressIfEmpty(List<DashboardDTO.ProgressItem> db) {
        if (db != null && !db.isEmpty()) return db;

        // Guarantee the 4 tiles exist at 0%
        List<DashboardDTO.ProgressItem> zeros = new ArrayList<>();
        for (ActivityType t : EnumSet.of(ActivityType.JOURNALING, ActivityType.MEDITATION, ActivityType.SLEEP, ActivityType.BREATHING)) {
            zeros.add(new DashboardDTO.ProgressItem(t.name(), 0));
        }
        return zeros;
    }

    private int computeSessionsThisWeek(Long userId) {
        LocalDate today = LocalDate.now();
        LocalDate monday = today.minusDays((today.getDayOfWeek().getValue() + 6) % 7); // Monday
        List<SessionLog> logs = sessionRepo.findAllByUserIdAndOccurredAtAfterOrderByOccurredAtDesc(
                userId, monday.atStartOfDay()
        );
        return logs.size();
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
