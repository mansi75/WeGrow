package com.wegrow.reminder;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.wegrow.user.User;

@Entity
@Table(name = "reminders")
public class Reminder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="user_id")
    private User user;

    @Column(nullable=false, length = 400)
    private String text;

    private LocalDateTime dueAt;

    @Column(nullable=false)
    private boolean completed = false;

    public Reminder() {}
    public Reminder(User user, String text, LocalDateTime dueAt, boolean completed) {
        this.user = user; this.text = text; this.dueAt = dueAt; this.completed = completed;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public String getText() { return text; }
    public LocalDateTime getDueAt() { return dueAt; }
    public boolean isCompleted() { return completed; }
    public void setUser(User user) { this.user = user; }
    public void setText(String text) { this.text = text; }
    public void setDueAt(LocalDateTime dueAt) { this.dueAt = dueAt; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
