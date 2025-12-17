package com.wegrow.journal;

import com.wegrow.journal.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
  List<JournalEntry> findTop50ByUserIdOrderByCreatedAtDesc(Long userId);
}
