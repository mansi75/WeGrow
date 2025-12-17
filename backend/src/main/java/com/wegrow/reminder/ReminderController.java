
package com.wegrow.reminder;

import com.wegrow.reminder.Reminder;
import com.wegrow.user.User;
import com.wegrow.reminder.ReminderRepository;
import com.wegrow.user.UserRepository;
import com.wegrow.security.CurrentUser;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {
    private final ReminderRepository repo;
    private final UserRepository users;
    private final CurrentUser current;

    public ReminderController(ReminderRepository r, UserRepository u, CurrentUser c) {
        this.repo = r; this.users = u; this.current = c;
    }

    record CreateReq(String text, LocalDateTime dueAt) {}

    @PostMapping
    public Reminder create(@RequestBody CreateReq req, Authentication auth){
        Long userId = current.id(auth);
        User user = users.findById(userId).orElseThrow();
        return repo.save(new Reminder(user, req.text(), req.dueAt(), false));
    }
}
