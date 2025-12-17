package com.wegrow.dashboard;

import java.time.LocalDateTime;
import java.util.List;

public class DashboardDTO {
    public static class UserDTO {
        public Long id; public String name; public String email;
        public UserDTO(Long id, String name, String email) { this.id=id; this.name=name; this.email=email; }
    }

    public static class TrendPoint {
        public String day; public int value;
        public TrendPoint(String day, int value) { this.day=day; this.value=value; }
    }

    public static class ReminderItem {
        public Long id; public String text; public LocalDateTime dueAt; public boolean completed;
        public ReminderItem(Long id, String text, LocalDateTime dueAt, boolean completed) {
            this.id=id; this.text=text; this.dueAt=dueAt; this.completed=completed;
        }
    }

    public static class ProgressItem {
        public String type; public int percent;
        public ProgressItem(String type, int percent) { this.type=type; this.percent=percent; }
    }

    public static class QuickStats {
        public int streak;
        public int sessionsThisWeek;
        public int achievements;     // NEW

        public QuickStats(int streak, int sessionsThisWeek, int achievements) {
            this.streak = streak;
            this.sessionsThisWeek = sessionsThisWeek;
            this.achievements = achievements;
        }
    }

    public UserDTO user;
    public Integer currentMood;
    public List<TrendPoint> weeklyMoodTrend;
    public List<ReminderItem> reminders;
    public List<ProgressItem> progress;
    public QuickStats quickStats;
}
