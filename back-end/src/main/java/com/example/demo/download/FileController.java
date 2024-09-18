package com.example.demo.download;

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
@RequestMapping("/api/v1/files")
@AllArgsConstructor
public class FileController {

    private final FileService fileService;

    @GetMapping
    public List<FileEntity> getAllFiles() {
        return fileService.getAllFiles();
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        FileEntity fileEntity = fileService.getFileById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with ID " + fileId));

        if (fileEntity.getYoutubeLink() != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "text/plain")
                    .body(new ByteArrayResource(fileEntity.getYoutubeLink().getBytes()));
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileEntity.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFileName() + "\"")
                .body(new ByteArrayResource(fileEntity.getData()));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(required = false, name = "file") MultipartFile file,
                                             @RequestParam(required = false, name = "youtubeLink") String youtubeLink,
                                             @RequestParam("displayName") String displayName,
                                             @RequestParam("visibleToAll") boolean visibleToAll) {
        try {
            if (file != null) {
                fileService.saveFile(new FileEntity(
                        file.getOriginalFilename(),
                        file.getContentType(),
                        file.getBytes(),
                        displayName,
                        visibleToAll
                ));
            } else if (youtubeLink != null) {
                fileService.saveFile(new FileEntity(
                        youtubeLink,
                        displayName,
                        visibleToAll
                ));
            }
            return ResponseEntity.ok("Content uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload content");
        }
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable Long fileId) {
        try {
            fileService.deleteFile(fileId);
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete file");
        }
    }
}
