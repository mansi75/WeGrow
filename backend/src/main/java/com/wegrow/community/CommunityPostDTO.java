package com.wegrow.community;

import java.time.OffsetDateTime;

public class CommunityPostDTO {
    public Long id;
    public String alias;
    public String category;
    public String content;
    public int likes;
    public int comments;
    public OffsetDateTime createdAt;

    public static CommunityPostDTO of(CommunityPost p) {
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
