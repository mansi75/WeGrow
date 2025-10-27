package com.wegrow.user;

import jakarta.persistence.*;
import com.wegrow.user.Role;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false, unique = true)
    private String email;

    @Column(name="password", nullable=false)
    private String passwordHash;

    // NEW: role
    @Enumerated(EnumType.STRING)
    @Column(name = "role") // keep nullable in DB to avoid migration issues
    private Role role = Role.USER;

    public User() {}
    public User(String name, String email) { this.name = name; this.email = email; }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    // NEW: getter/setter for role
    public Role getRole() {
        return role == null ? Role.USER : role;
    }
    public void setRole(Role role) { this.role = role; }
}
