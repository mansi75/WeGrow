package com.wegrow.mood;

import com.wegrow.mood.MoodLog;
import com.wegrow.user.User;
import com.wegrow.user.UserRepository;
import com.wegrow.mood.MoodService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/moods")
public class MoodController {

    private final MoodService moodService;
    private final UserRepository userRepo;

    public MoodController(MoodService moodService, UserRepository userRepo) {
        this.moodService = moodService; this.userRepo = userRepo;
    }

    public static class CreateMoodRequest {
        @NotNull @Min(1) @Max(5) public Integer mood;
    }

    @PostMapping
    public Map<String,Object> create(@RequestBody CreateMoodRequest req, Principal principal) {
        User u = userRepo.findByEmail(principal.getName()).orElseThrow();
        MoodLog saved = moodService.addMood(u.getId(), req.mood);
        return Map.of("id", saved.getId(), "mood", saved.getMood(), "loggedAt", saved.getLoggedAt());
    }
}
