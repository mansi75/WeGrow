package com.wegrow.community;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {

    
    List<CommunityPost> findTop50ByOrderByCreatedAtDesc();

    
    List<CommunityPost> findTop50ByCategoryOrderByCreatedAtDesc(String category);
}
