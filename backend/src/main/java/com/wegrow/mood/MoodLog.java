package com.wegrow.mood;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.wegrow.user.User;

@Entity
@Table(name = "mood_logs")
public class MoodLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="user_id")
    private User user;

    // 1..5 scale
    @Column(nullable=false)
    private int mood;

    @Column(nullable=false)
    private LocalDateTime loggedAt;

    public MoodLog() {}
    public MoodLog(User user, int mood, LocalDateTime loggedAt) {
        this.user = user; this.mood = mood; this.loggedAt = loggedAt;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public int getMood() { return mood; }
    public LocalDateTime getLoggedAt() { return loggedAt; }
    public void setUser(User user) { this.user = user; }
    public void setMood(int mood) { this.mood = mood; }
    public void setLoggedAt(LocalDateTime loggedAt) { this.loggedAt = loggedAt; }
}
