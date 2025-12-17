package com.wegrow.journal;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wegrow.journal.JournalEntry;
import com.wegrow.journal.JournalDTO;
import com.wegrow.journal.JournalEntryRepository;
import com.wegrow.security.CurrentUser;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class JournalService {

  private final JournalEntryRepository repo;
  private final CurrentUser currentUser;      // <-- use your helper
  private final ObjectMapper om = new ObjectMapper();

  public JournalService(JournalEntryRepository repo, CurrentUser currentUser) {
    this.repo = repo;
    this.currentUser = currentUser;
  }

  public JournalDTO create(Authentication auth, String content, List<String> tags, MultipartFile image)
      throws IOException {

    Long uid = currentUser.id(auth);          // <-- resolve user id

    String fileUrl = null;
    if (image != null && !image.isEmpty()) {
      Files.createDirectories(Path.of("uploads"));
      String name = UUID.randomUUID() + "-" + image.getOriginalFilename();
      Path dest = Path.of("uploads").resolve(name);
      Files.copy(image.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);
      fileUrl = "/files/" + name;
}

JournalEntry e = new JournalEntry();
e.setUserId(uid);
e.setContent(content == null ? "" : content);
e.setTagsJson(om.writeValueAsString(tags == null ? Collections.emptyList() : tags));
e.setFileUrl(fileUrl);

    e.setCreatedAt(Instant.now());

    JournalEntry saved = repo.save(e);
    return toDto(saved);
  }

  public List<JournalDTO> myRecent(Authentication auth, int limit) {
    Long uid = currentUser.id(auth);          // <-- resolve user id
    return repo.findTop50ByUserIdOrderByCreatedAtDesc(uid).stream()
        .limit(Math.max(1, Math.min(limit, 50)))
        .map(this::toDto)
        .toList();
  }

  private JournalDTO toDto(JournalEntry e) {
  List<String> tags = List.of();
  try {
    tags = om.readValue(
      e.getTagsJson() == null ? "[]" : e.getTagsJson(),
      new TypeReference<List<String>>() {}
    );
  } catch (Exception ignored) {}

  return new JournalDTO(
    e.getId(),
    e.getContent(),
    tags,
    e.getFileUrl(),        // <— here
    e.getCreatedAt()
  );
}

}
