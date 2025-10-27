package com.wegrow.mood;

import com.wegrow.mood.MoodLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface MoodLogRepository extends JpaRepository<MoodLog, Long> {
    List<MoodLog> findAllByUserIdOrderByLoggedAtDesc(Long userId);
    List<MoodLog> findAllByUserIdAndLoggedAtAfterOrderByLoggedAtAsc(Long userId, LocalDateTime after);
}
