package com.example.demo.download;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public Optional<FileEntity> getFileById(Long fileId) {
        return fileRepository.findById(fileId);
    }

    @Transactional
    public FileEntity saveFile(FileEntity fileEntity) {
        try {
            return fileRepository.save(fileEntity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    @Transactional
    public void deleteFile(Long fileId) {
        try {
            fileRepository.deleteById(fileId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file", e);
        }
    }
}
