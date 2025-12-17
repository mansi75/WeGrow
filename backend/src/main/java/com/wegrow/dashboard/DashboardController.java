

package com.wegrow.dashboard;

import com.wegrow.user.UserRepository;
import com.wegrow.dashboard.DashboardService;
import com.wegrow.dashboard.DashboardDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final DashboardService svc;
    private final UserRepository userRepo;

    public DashboardController(DashboardService svc, UserRepository userRepo) {
        this.svc = svc;
        this.userRepo = userRepo;
    }

    
    @GetMapping("/dashboard/me")
    public DashboardDTO getMyDashboard(Authentication auth) {
        if (auth == null || auth.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        String email = auth.getName(); 
        Long userId = userRepo.findByEmail(email)
                .map(u -> u.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return svc.getDashboard(userId);
    }

   
    @GetMapping("/dashboard")
    public DashboardDTO getDashboardById(@RequestParam Long userId) {
        return svc.getDashboard(userId);
    }
}
