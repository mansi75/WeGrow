package com.wegrow.dashboard;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wegrow.habit.ActivityType;
import com.wegrow.habit.HabitProgressRepository;
import com.wegrow.mood.MoodLog;
import com.wegrow.mood.MoodLogRepository;
import com.wegrow.reminder.ReminderRepository;
import com.wegrow.session.SessionLog;
import com.wegrow.session.SessionLogRepository;
import com.wegrow.user.User;
import com.wegrow.user.UserRepository;

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

       
        dto.currentMood = moodRepo.findAllByUserIdOrderByLoggedAtDesc(userId)
                .stream().findFirst().map(MoodLog::getMood).orElse(3);

       
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
        int streak = computeStreak(userId);
int sessionsThisWeek = computeSessionsThisWeek(userId);
int achievements = computeAchievements(userId, streak, sessionsThisWeek);

dto.quickStats = new DashboardDTO.QuickStats(
        streak,
        sessionsThisWeek,
        achievements
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

    private int computeAchievements(Long userId, int streak, int sessionsThisWeek) {
    // Total number of sessions ever done by this user
    long totalSessions = sessionRepo.countByUserId(userId);

    int achievements = 0;

    // Streak-based achievements
    if (streak >= 3)  achievements++;   // 3-day streak
    if (streak >= 7)  achievements++;   // 7-day streak
    if (streak >= 14) achievements++;   // 14-day streak

    // Total sessions achievements
    if (totalSessions >= 10)  achievements++;  // 10 sessions
    if (totalSessions >= 25)  achievements++;  // 25 sessions
    if (totalSessions >= 50)  achievements++;  // 50 sessions

    // You can add more rules later if you like (journal-only, etc.)
    return achievements;
}

}
