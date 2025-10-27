// package com.wegrow.security;

// import com.auth0.jwt.JWT;
// import com.auth0.jwt.JWTVerifier;
// import com.auth0.jwt.algorithms.Algorithm;
// import com.auth0.jwt.interfaces.Claim;
// import com.auth0.jwt.interfaces.DecodedJWT;
// import com.wegrow.model.User;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;

// import java.time.Instant;
// import java.time.temporal.ChronoUnit;
// import java.util.Map;
// import java.util.function.Function;

// @Service
// public class JwtService {

//     private final Algorithm algo;
//     private final String issuer;
//     private final long expMinutes;
//     private final JWTVerifier verifier;

//     public JwtService(
//             @Value("${jwt.secret}") String secret,
//             @Value("${jwt.issuer:wegrow}") String issuer,
//             @Value("${jwt.expMinutes:120}") long expMinutes
//     ) {
//         this.algo = Algorithm.HMAC256(secret); // ensure secret length is adequate
//         this.issuer = issuer;
//         this.expMinutes = expMinutes;
//         this.verifier = JWT.require(algo)
//                 .withIssuer(issuer)
//                 .build();
//     }

//     /** Create a JWT for the given user with role claim. */
//     public String generate(User user) {
//         Instant now = Instant.now();
//         return JWT.create()
//                 .withIssuer(issuer)
//                 .withSubject(user.getEmail())
//                 .withClaim("uid", user.getId())
//                 .withClaim("name", user.getName())
//                 .withClaim("role", user.getRole().name())
//                 .withIssuedAt(now)
//                 .withExpiresAt(now.plus(expMinutes, ChronoUnit.MINUTES))
//                 .sign(algo);
//     }

//     /** Verify signature, issuer and expiration; throws on invalid token. */
//     public DecodedJWT verify(String token) {
//         return verifier.verify(token);
//     }

//     // -------- Optional helpers --------
//     public String getSubject(DecodedJWT jwt) {
//         return jwt.getSubject();
//     }

//     public <T> T getClaim(DecodedJWT jwt, String name, Function<Claim, T> mapper) {
//         Claim c = jwt.getClaim(name);
//         return c == null ? null : mapper.apply(c);
//     }

//     public String getRole(DecodedJWT jwt) {
//         return jwt.getClaim("role").asString(); // e.g., "USER" / "ADMIN"
//     }
// }
