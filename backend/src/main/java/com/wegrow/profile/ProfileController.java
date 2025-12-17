package com.wegrow.profile;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wegrow.security.CurrentUser;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final CurrentUser currentUser;

    public ProfileController(ProfileService profileService, CurrentUser currentUser) {
        this.profileService = profileService;
        this.currentUser = currentUser;
    }

    @GetMapping("/me")
    public ProfileDTO me(Authentication authentication) {
        Long userId = currentUser.id(authentication);   // <-- use your helper here
        return profileService.getProfileForUser(userId);
    }

    @PutMapping("/me")
    public ProfileDTO update(
            Authentication authentication,
            @RequestBody ProfileDTO body
    ) {
        Long userId = currentUser.id(authentication);   // <-- and here
        return profileService.updateProfile(userId, body);
    }
}
