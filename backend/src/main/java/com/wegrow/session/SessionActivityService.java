package com.wegrow.session;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.wegrow.habit.ActivityType;
import com.wegrow.habit.HabitProgress;
import com.wegrow.habit.HabitProgressRepository;
import com.wegrow.user.User;
import com.wegrow.user.UserRepository;

@Service
public class SessionActivityService {

    private final UserRepository userRepo;
    private final SessionLogRepository sessionRepo;
    private final HabitProgressRepository progressRepo;

    public SessionActivityService(UserRepository userRepo,
                                  SessionLogRepository sessionRepo,
                                  HabitProgressRepository progressRepo) {
        this.userRepo = userRepo;
        this.sessionRepo = sessionRepo;
        this.progressRepo = progressRepo;
    }

    
    public void recordActivity(Long userId, ActivityType type) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

       
        SessionLog log = new SessionLog();
        log.setUser(user);
        log.setType(type);                          
        log.setOccurredAt(LocalDateTime.now());     
        sessionRepo.save(log);

        
        HabitProgress hp = progressRepo.findByUserIdAndType(userId, type)
                .orElseGet(() -> {
                    HabitProgress p = new HabitProgress();
                    p.setUser(user);
                    p.setType(type);
                    p.setPercent(0);
                    return p;
                });

        int current = hp.getPercent();
        int step = 20;                             
        int updated = Math.min(100, current + step);
        hp.setPercent(updated);
        progressRepo.save(hp);
    }
}
