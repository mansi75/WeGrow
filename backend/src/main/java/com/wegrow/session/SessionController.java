package com.wegrow.session;

import com.wegrow.habit.ActivityType;
import com.wegrow.session.SessionLog;
import com.wegrow.user.User;
import com.wegrow.session.SessionLogRepository;
import com.wegrow.user.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    private final SessionLogRepository repo;
    private final UserRepository users;
    public SessionController(SessionLogRepository r, UserRepository u){ repo=r; users=u; }

    record CreateReq(Long userId, ActivityType type, LocalDateTime occurredAt){}

    @PostMapping
    public SessionLog create(@RequestBody CreateReq req){
        User user = users.findById(req.userId()).orElseThrow();
        return repo.save(new SessionLog(user, req.type(), req.occurredAt()));
    }
}
