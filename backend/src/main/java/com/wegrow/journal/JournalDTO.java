package com.wegrow.journal;

import java.time.Instant;
import java.util.List;

public class JournalDTO {
  public Long id;
  public String content;
  public List<String> tags;
  public String fileUrl;      
  public Instant createdAt;

  public JournalDTO(Long id, String content, List<String> tags, String fileUrl, Instant createdAt) {
    this.id = id;
    this.content = content;
    this.tags = tags;
    this.fileUrl = fileUrl;
    this.createdAt = createdAt;
  }
}
