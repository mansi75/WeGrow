package com.wegrow.session;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionLogRepository extends JpaRepository<SessionLog, Long> {
    List<SessionLog> findAllByUserIdAndOccurredAtAfterOrderByOccurredAtDesc(Long userId, LocalDateTime after);
    List<SessionLog> findAllByUserIdOrderByOccurredAtDesc(Long userId);
    long countByUserId(Long userId);

}
