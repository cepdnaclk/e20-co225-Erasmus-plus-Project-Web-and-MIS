package com.example.demo.myFiles;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/myFiles")
@AllArgsConstructor
public class MyFileController {

    private final MyFileService myFileService;

    // Fetch files by the user's email
    @GetMapping
    public List<MyFileEntity> getFilesByUser(@RequestParam("email") String email) {
        return myFileService.getFilesByEmail(email);
    }

    // Download file or retrieve YouTube link by file ID
    @GetMapping("/{myFileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long myFileId) {
        MyFileEntity myFileEntity = myFileService.getFileById(myFileId)
                .orElseThrow(() -> new RuntimeException("File not found with ID " + myFileId));

        // Handle YouTube link
        if (myFileEntity.getYoutubeLink() != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(new ByteArrayResource(myFileEntity.getYoutubeLink().getBytes()));
        }

        // Handle file download
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(myFileEntity.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + myFileEntity.getFileName() + "\"")
                .body(new ByteArrayResource(myFileEntity.getData()));
    }

    // Upload file or YouTube link, with email and display name
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(required = false, name = "file") MultipartFile file,
                                             @RequestParam(required = false, name = "youtubeLink") String youtubeLink,
                                             @RequestParam("displayName") String displayName,
                                             @RequestParam("email") String email) {
        try {
            if (file != null) {
                // Save file with email
                myFileService.saveFile(new MyFileEntity(
                        email,
                        file.getOriginalFilename(),
                        file.getContentType(),
                        file.getBytes(),
                        displayName
                ));
            } else if (youtubeLink != null) {
                // Save YouTube link with email
                myFileService.saveFile(new MyFileEntity(
                        email,
                        youtubeLink,
                        displayName
                ));
            }
            return ResponseEntity.ok("Content uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload content");
        }
    }

    // Delete file by file ID
    @DeleteMapping("/{myFileId}")
    public ResponseEntity<String> deleteFile(@PathVariable Long myFileId) {
        try {
            myFileService.deleteFile(myFileId);
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete file");
        }
    }
}
