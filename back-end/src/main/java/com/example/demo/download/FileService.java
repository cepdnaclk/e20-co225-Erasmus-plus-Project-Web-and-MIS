package com.example.demo.download;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    @Autowired
    private AppUserService userService;
    @Autowired
    private NotificationService notificationService;

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public Optional<FileEntity> getFileById(Long fileId) {
        return fileRepository.findById(fileId);
    }

    @Transactional
    public FileEntity saveFile(FileEntity fileEntity) {
        try {
            List<AppUser> users = userService.getAllUsers();
            for (AppUser user : users) {
                notificationService.createNotification("The new file, " + fileEntity.getDisplayName() +  " has been uploaded!", user,"typeFile");
            }
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
