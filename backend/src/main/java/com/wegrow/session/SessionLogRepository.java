package com.wegrow.session;

import com.wegrow.session.SessionLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SessionLogRepository extends JpaRepository<SessionLog, Long> {
    List<SessionLog> findAllByUserIdAndOccurredAtAfterOrderByOccurredAtDesc(Long userId, LocalDateTime after);
    List<SessionLog> findAllByUserIdOrderByOccurredAtDesc(Long userId);
}
