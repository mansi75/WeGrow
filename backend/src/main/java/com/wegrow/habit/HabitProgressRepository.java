package com.wegrow.habit;

import com.wegrow.habit.ActivityType;
import com.wegrow.habit.HabitProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface HabitProgressRepository extends JpaRepository<HabitProgress, Long> {
    List<HabitProgress> findAllByUserId(Long userId);

    Optional<HabitProgress> findByUserIdAndType(Long userId, ActivityType type);


}
