package com.wegrow.session;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.wegrow.habit.ActivityType;
import com.wegrow.user.*;

@Entity
@Table(name = "session_logs")
public class SessionLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private ActivityType type;

    @Column(nullable=false)
    private LocalDateTime occurredAt;

    public SessionLog() {}
    public SessionLog(User user, ActivityType type, LocalDateTime occurredAt) {
        this.user = user; this.type = type; this.occurredAt = occurredAt;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public ActivityType getType() { return type; }
    public LocalDateTime getOccurredAt() { return occurredAt; }
    public void setUser(User user) { this.user = user; }
    public void setType(ActivityType type) { this.type = type; }
    public void setOccurredAt(LocalDateTime occurredAt) { this.occurredAt = occurredAt; }
}
