package com.example.demo.myFiles;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MyFileService {

    private final MyFileRepository myFileRepository;

    // Fetch all files (not needed if we filter by email in the controller)
    public List<MyFileEntity> getAllFiles() {
        return myFileRepository.findAll();
    }

    // Fetch files by email (new method)
    public List<MyFileEntity> getFilesByEmail(String email) {
        return myFileRepository.findByEmail(email);
    }

    // Get a specific file by its ID
    public Optional<MyFileEntity> getFileById(Long myFileId) {
        return myFileRepository.findById(myFileId);
    }

    // Save a file or YouTube link in the database
    @Transactional
    public MyFileEntity saveFile(MyFileEntity myFileEntity) {
        try {
            return myFileRepository.save(myFileEntity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    // Delete a file by its ID
    @Transactional
    public void deleteFile(Long myFileId) {
        try {
            myFileRepository.deleteById(myFileId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file", e);
        }
    }
}
