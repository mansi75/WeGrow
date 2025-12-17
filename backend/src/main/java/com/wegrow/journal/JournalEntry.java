package com.wegrow.journal;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "journal_entries")
public class JournalEntry {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long userId;

  @Lob
  @Column(nullable = false)
  private String content;

  
  @Column(columnDefinition = "text")
  private String tagsJson; 

  private String fileUrl; 

  @Column(nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  
  public Long getId() { return id; }
  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }
  public String getContent() { return content; }
  public void setContent(String content) { this.content = content; }
  public String getTagsJson() { return tagsJson; }
  public void setTagsJson(String tagsJson) { this.tagsJson = tagsJson; }
  public String getFileUrl() { return fileUrl; }
  public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
