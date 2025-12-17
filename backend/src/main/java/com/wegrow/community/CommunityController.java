package com.wegrow.community;

import com.wegrow.security.CurrentUser;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityPostRepository repo;
    private final CurrentUser currentUser;
    private final Random random = new Random();

    public CommunityController(CommunityPostRepository repo, CurrentUser currentUser) {
        this.repo = repo;
        this.currentUser = currentUser;
    }

    public record CreatePostRequest(String content, String category) { }

    @GetMapping("/posts")
    public List<CommunityPostDTO> list(@RequestParam(required = false) String category) {
        List<CommunityPost> posts;
        if (category == null || category.equalsIgnoreCase("ALL")) {
            posts = repo.findTop50ByOrderByCreatedAtDesc();
        } else {
            posts = repo.findTop50ByCategoryOrderByCreatedAtDesc(category.toUpperCase());
        }
        return posts.stream().map(CommunityPostDTO::of).toList();
    }

   
    @PostMapping("/posts")
    public CommunityPostDTO create(@RequestBody CreatePostRequest body, Authentication auth) {
        Long userId = currentUser.id(auth); // ensures user exists

        if (body.content() == null || body.content().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content is required");
        }

        String cat = (body.category() == null || body.category().isBlank())
                ? "GENERAL"
                : body.category().toUpperCase();

        CommunityPost p = new CommunityPost();
        p.setUserId(userId);
        p.setAlias(generateAlias());     
        p.setCategory(cat);
        p.setContent(body.content().trim());
        p.setLikesCount(0);
        p.setCommentsCount(0);
        p.setCreatedAt(OffsetDateTime.now());

        CommunityPost saved = repo.save(p);
        return CommunityPostDTO.of(saved);
    }

    private String generateAlias() {
        String[] first = {"Anonymous", "Hidden", "Quiet", "Gentle", "Kind"};
        String[] second = {"Butterfly", "Phoenix", "Star", "River", "Dawn"};
        return first[random.nextInt(first.length)] + " " + second[random.nextInt(second.length)];
    }
}
