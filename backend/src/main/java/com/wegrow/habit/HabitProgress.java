package com.wegrow.habit;

import jakarta.persistence.*;
import com.wegrow.user.*;

@Entity
@Table(name = "habit_progress")
public class HabitProgress {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private ActivityType type;

    
    @Column(nullable=false)
    private int percent;

    public HabitProgress() {}
    public HabitProgress(User user, ActivityType type, int percent) {
        this.user = user; this.type = type; this.percent = percent;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public ActivityType getType() { return type; }
    public int getPercent() { return percent; }
    public void setUser(User user) { this.user = user; }
    public void setType(ActivityType type) { this.type = type; }
    public void setPercent(int percent) { this.percent = percent; }
}
