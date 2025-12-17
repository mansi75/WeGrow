package com.wegrow.journal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wegrow.journal.JournalService;
import com.wegrow.journal.JournalDTO;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;   // <-- import
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/journal")
public class JournalController {

  private final JournalService service;
  private final ObjectMapper om = new ObjectMapper();

  public JournalController(JournalService service) { this.service = service; }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<JournalDTO> create(
      Authentication auth,                              // <-- Spring injects it
      @RequestPart(value = "content", required = false) String content,
      @RequestPart(value = "tags", required = false) String tagsJson,
      @RequestPart(value = "image", required = false) MultipartFile image
  ) throws Exception {
    List<String> tags = (tagsJson == null || tagsJson.isBlank())
        ? List.of()
        : om.readValue(tagsJson, om.getTypeFactory().constructCollectionType(List.class, String.class));

    return ResponseEntity.ok(service.create(auth, content, tags, image));
  }

  @GetMapping("/me")
  public List<JournalDTO> myEntries(Authentication auth,
                                    @RequestParam(defaultValue = "20") int limit) {
    return service.myRecent(auth, limit);
  }
}
