package com.wegrow.web;

import com.wegrow.user.UserRepository;
import com.wegrow.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.wegrow.user.User;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtUtil jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    record LoginRequest(String username, String password) {}

    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    String name = body.getOrDefault("name", "").trim();
    String email = body.getOrDefault("email", "").trim().toLowerCase();
    String password = body.getOrDefault("password", "");

    if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("error", "All fields are required"));
    }

    
    if (password.length() < 6) {
        return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters"));
    }

    if (users.findByEmail(email).isPresent()) {
        return ResponseEntity.status(409).body(Map.of("error", "Email already registered"));
    }

    var u = new User();
    u.setName(name);
    u.setEmail(email);
    u.setPasswordHash(encoder.encode(password)); 

    var saved = users.save(u);

    
    String token = jwt.generate(saved.getEmail());
    return ResponseEntity.ok(Map.of(
            "token", token,
            "user", Map.of("id", saved.getId(), "name", saved.getName(), "email", saved.getEmail())
    ));
}


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req){
        var user = users.findByEmail(req.username()).orElse(null);
        if (user == null || !encoder.matches(req.password(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error","Invalid credentials"));
        }
        String token = jwt.generate(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail())));
    }
}
