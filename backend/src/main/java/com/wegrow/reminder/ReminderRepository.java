package com.wegrow.reminder;

import com.wegrow.reminder.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findAllByUserIdOrderByDueAtAsc(Long userId);
}
