// package com.wegrow.web;

// import com.wegrow.model.ActivityType;
// import com.wegrow.model.HabitProgress;
// import com.wegrow.model.User;
// import com.wegrow.repository.HabitProgressRepository;
// import com.wegrow.repository.UserRepository;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/progress")
// public class ProgressController {
//     private final HabitProgressRepository repo;
//     private final UserRepository users;
//     public ProgressController(HabitProgressRepository r, UserRepository u){ repo=r; users=u; }

//     record CreateReq(Long userId, ActivityType type, int percent){}

//     @PostMapping
//     public HabitProgress create(@RequestBody CreateReq req){
//         User user = users.findById(req.userId()).orElseThrow();
//         return repo.save(new HabitProgress(user, req.type(), req.percent()));
//     }
// }
package com.wegrow.habit;

import com.wegrow.habit.ActivityType;
import com.wegrow.habit.HabitProgress;
import com.wegrow.user.User;
import com.wegrow.habit.HabitProgressRepository;
import com.wegrow.user.UserRepository;
import com.wegrow.security.CurrentUser;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    private final HabitProgressRepository repo;
    private final UserRepository users;
    private final CurrentUser current;

    public ProgressController(HabitProgressRepository r, UserRepository u, CurrentUser c) {
        this.repo = r; this.users = u; this.current = c;
    }

    record UpsertReq(ActivityType type, int percent) {}

    @PostMapping("/upsert")
    public HabitProgress upsert(@RequestBody UpsertReq req, Authentication auth){
        Long userId = current.id(auth);
        User user = users.findById(userId).orElseThrow();

        return repo.findByUserIdAndType(userId, req.type())
            .map(p -> { p.setPercent(req.percent()); return repo.save(p); })
            .orElseGet(() -> repo.save(new HabitProgress(user, req.type(), req.percent())));
    }
}
