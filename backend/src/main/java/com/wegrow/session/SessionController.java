package com.wegrow.session;

import com.wegrow.habit.ActivityType;
import com.wegrow.security.CurrentUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final CurrentUser currentUser;
    private final SessionActivityService activityService;

    public SessionController(CurrentUser currentUser,
                             SessionActivityService activityService) {
        this.currentUser = currentUser;
        this.activityService = activityService;
    }

    // what frontend sends: { "type": "MEDITATION" } etc.
    public record ActivityRequest(String type) {}

    @PostMapping("/activity")
    public ResponseEntity<?> logActivity(@RequestBody ActivityRequest req,
                                         Authentication auth) {
        Long userId = currentUser.id(auth);

        ActivityType type = ActivityType.valueOf(req.type()); // must match enum name
        activityService.recordActivity(userId, type);
        return ResponseEntity.ok().build();
    }
}
