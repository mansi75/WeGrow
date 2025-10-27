package com.wegrow.user;

import com.wegrow.user.User;
import com.wegrow.user.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository repo;
    public UserController(UserRepository repo){ this.repo = repo; }

    @PostMapping
    public User create(@RequestBody User u) { return repo.save(u); }
}
