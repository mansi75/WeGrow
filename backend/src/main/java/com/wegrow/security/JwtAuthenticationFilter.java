// package com.wegrow.security;

// import java.io.IOException;

// import org.springframework.http.HttpHeaders;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {
//     private final JwtUtil jwt;
//     private final UserDetailsService uds;

//     public JwtAuthenticationFilter(JwtUtil jwt, UserDetailsService uds) {
//         this.jwt = jwt; this.uds = uds;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
//             throws ServletException, IOException {
//         String auth = req.getHeader(HttpHeaders.AUTHORIZATION);
//         if (auth != null && auth.startsWith("Bearer ")) {
//             String token = auth.substring(7);
//             try {
//                 String username = jwt.validateAndGetSubject(token);
//                 UserDetails user = uds.loadUserByUsername(username);
//                 var authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
//                 authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
//                 SecurityContextHolder.getContext().setAuthentication(authToken);
//             } catch (Exception ignored) { }
//         }
//         chain.doFilter(req, res);
//     }
// }


package com.wegrow.security;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwt;
    private final UserDetailsService uds;

    public JwtAuthenticationFilter(JwtUtil jwt, UserDetailsService uds) {
        this.jwt = jwt;
        this.uds = uds;
    }

    /**
     * This method tells Spring Security for which requests this filter
     * should NOT run at all. These requests will completely bypass the JWT logic.
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path   = request.getRequestURI();
        String method = request.getMethod();

        // PUBLIC ENDPOINTS – MUST bypass JWT filter
        if (path.equals("/healthz")) return true;           // health check
        if (path.equals("/") || path.equals("/index.html")) return true;
        if (path.startsWith("/static/") || path.startsWith("/assets/")) return true;
        if (path.startsWith("/api/auth/")) return true;     // login & register
        if ("OPTIONS".equalsIgnoreCase(method)) return true;
        if ("GET".equalsIgnoreCase(method) && path.startsWith("/files/")) return true;

        // For everything else, run the filter
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {

        String authHeader = req.getHeader(HttpHeaders.AUTHORIZATION);

        // No Authorization header → don't authenticate, just let the chain continue.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        String token = authHeader.substring(7);

        try {
            String username = jwt.validateAndGetSubject(token);

            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails user = uds.loadUserByUsername(username);

                var authToken = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(req)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception ex) {
            // Invalid or expired token → we leave SecurityContext empty
            // and let SecurityConfig treat this as an unauthenticated request.
            // Do NOT send 403 from here.
        }

        chain.doFilter(req, res);
    }
}

