package com.wegrow.community;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class CommunityService {

    private final CommunityPostRepository posts;
    private final Random rnd = new Random();

    private static final String[] ALIASES = {
            "Anonymous Butterfly",
            "Anonymous Phoenix",
            "Anonymous Star",
            "Anonymous River",
            "Anonymous Dawn",
            "Anonymous Willow",
            "Anonymous Lotus",
            "Anonymous Horizon"
    };

    public CommunityService(CommunityPostRepository posts) {
        this.posts = posts;
    }

    public List<CommunityPostDTO> list(String category) {
        List<CommunityPost> entities;
        if (category == null || category.isBlank() || "ALL".equalsIgnoreCase(category)) {
            entities = posts.findTop50ByOrderByCreatedAtDesc();
        } else {
            entities = posts.findTop50ByCategoryOrderByCreatedAtDesc(category.toUpperCase());
        }

        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public CommunityPostDTO create(Long userId, String category, String content) {
        CommunityPost p = new CommunityPost();
        p.setUserId(userId);
        p.setAlias(randomAlias());
        p.setCategory(normalizeCategory(category));
        p.setContent(content.trim());
        p.setLikesCount(0);
        p.setCommentsCount(0);

        CommunityPost saved = posts.save(p);
        return toDto(saved);
    }

    private String randomAlias() {
        int i = rnd.nextInt(ALIASES.length);
        return ALIASES[i];
    }

    private String normalizeCategory(String c) {
        if (c == null) return "GENERAL";
        String up = c.trim().toUpperCase();
        return switch (up) {
            case "MEDITATION", "JOURNALING", "BREATHING", "SLEEP", "GENERAL" -> up;
            default -> "GENERAL";
        };
    }

    private CommunityPostDTO toDto(CommunityPost p) {
        CommunityPostDTO dto = new CommunityPostDTO();
        dto.id = p.getId();
        dto.alias = p.getAlias();
        dto.category = p.getCategory();
        dto.content = p.getContent();
        dto.likes = p.getLikesCount();
        dto.comments = p.getCommentsCount();
        dto.createdAt = p.getCreatedAt();
        return dto;
    }
}
