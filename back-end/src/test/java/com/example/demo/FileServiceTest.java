package com.example.demo;

import com.example.demo.download.FileEntity;
import com.example.demo.download.FileRepository;
import com.example.demo.download.FileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FileServiceTest {

    @Mock
    private FileRepository fileRepository;

    @InjectMocks
    private FileService fileService;

    private FileEntity fileEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        fileEntity = new FileEntity("test.txt", "text/plain", "Hello World".getBytes(), "Test File", true);
        fileEntity.setFileId(1L);
    }

    @Test
    void testGetAllFiles() {
        // Arrange
        when(fileRepository.findAll()).thenReturn(Arrays.asList(fileEntity));

        // Act
        List<FileEntity> files = fileService.getAllFiles();

        // Assert
        assertNotNull(files);
        assertEquals(1, files.size());
        assertEquals("test.txt", files.get(0).getFileName());
        verify(fileRepository, times(1)).findAll();
    }

    @Test
    void testGetFileById() {
        // Arrange
        when(fileRepository.findById(1L)).thenReturn(Optional.of(fileEntity));

        // Act
        Optional<FileEntity> foundFile = fileService.getFileById(1L);

        // Assert
        assertTrue(foundFile.isPresent());
        assertEquals("test.txt", foundFile.get().getFileName());
        verify(fileRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveFile() {
        // Arrange
        when(fileRepository.save(fileEntity)).thenReturn(fileEntity);

        // Act
        FileEntity savedFile = fileService.saveFile(fileEntity);

        // Assert
        assertNotNull(savedFile);
        assertEquals("test.txt", savedFile.getFileName());
        verify(fileRepository, times(1)).save(fileEntity);
    }

    @Test
    void testDeleteFile() {
        // Act
        fileService.deleteFile(1L);

        // Assert
        verify(fileRepository, times(1)).deleteById(1L);
    }

    @Test
    void testSaveFileException() {
        // Arrange
        when(fileRepository.save(any(FileEntity.class))).thenThrow(new RuntimeException("Save failed"));

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            fileService.saveFile(fileEntity);
        });
        assertEquals("Failed to save file", thrown.getMessage());
    }

    @Test
    void testDeleteFileException() {
        // Arrange
        doThrow(new RuntimeException("Delete failed")).when(fileRepository).deleteById(1L);

        // Act & Assert
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            fileService.deleteFile(1L);
        });
        assertEquals("Failed to delete file", thrown.getMessage());
    }
}
