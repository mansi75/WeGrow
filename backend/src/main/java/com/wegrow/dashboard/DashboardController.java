// package com.wegrow.web;

// import com.wegrow.dto.DashboardDTO;
// import com.wegrow.model.User;
// import com.wegrow.repo.UserRepository;
// import com.wegrow.service.DashboardService;
// import org.springframework.web.bind.annotation.*;

// import java.security.Principal;

// @RestController
// @RequestMapping("/api")
// public class DashboardController {
//     private final DashboardService service;
//     private final UserRepository userRepo;

//     public DashboardController(DashboardService service, UserRepository userRepo) {
//         this.service = service;
//         this.userRepo = userRepo;
//     }

//     // New: uses auth principal's email
//     @GetMapping("/dashboard/me")
//     public DashboardDTO me(Principal principal) {
//         User u = userRepo.findByEmail(principal.getName()).orElseThrow();
//         return service.getDashboard(u.getId());
//     }
// }

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

    /**
     * New, recommended endpoint:
     * Uses JWT subject (email) to resolve the logged-in user.
     */
    @GetMapping("/dashboard/me")
    public DashboardDTO getMyDashboard(Authentication auth) {
        if (auth == null || auth.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
        }
        String email = auth.getName(); // JwtUtil sets subject = email
        Long userId = userRepo.findByEmail(email)
                .map(u -> u.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return svc.getDashboard(userId);
    }

    /**
     * (Optional) Keep the old endpoint for tooling/manual calls.
     * You can remove this later.
     */
    @GetMapping("/dashboard")
    public DashboardDTO getDashboardById(@RequestParam Long userId) {
        return svc.getDashboard(userId);
    }
}
