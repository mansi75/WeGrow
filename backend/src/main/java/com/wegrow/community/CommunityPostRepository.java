package com.wegrow.community;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {

    // All categories
    List<CommunityPost> findTop50ByOrderByCreatedAtDesc();

    // Filter by category (stored in upper-case)
    List<CommunityPost> findTop50ByCategoryOrderByCreatedAtDesc(String category);
}
