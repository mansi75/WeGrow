package com.wegrow.mood;

import com.wegrow.mood.MoodLog;
import com.wegrow.user.User;
import com.wegrow.mood.MoodLogRepository;
import com.wegrow.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MoodService {
    private final MoodLogRepository moodRepo;
    private final UserRepository userRepo;

    public MoodService(MoodLogRepository moodRepo, UserRepository userRepo) {
        this.moodRepo = moodRepo;
        this.userRepo = userRepo;
    }

    public MoodLog addMood(Long userId, int mood) {
        if (mood < 1 || mood > 5) throw new IllegalArgumentException("Mood must be 1..5");
        User u = userRepo.findById(userId).orElseThrow();
        MoodLog log = new MoodLog(u, mood, LocalDateTime.now());
        return moodRepo.save(log);
    }
}
