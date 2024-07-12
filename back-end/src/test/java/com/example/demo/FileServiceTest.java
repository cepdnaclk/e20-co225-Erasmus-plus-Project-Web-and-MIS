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
        fileEntity = new FileEntity("test.txt", "text/plain", "Hello World".getBytes());
        fileEntity.setFileId(1L);
    }

    @Test
    void testGetAllFiles() {
        when(fileRepository.findAll()).thenReturn(Arrays.asList(fileEntity));
        List<FileEntity> files = fileService.getAllFiles();
        assertEquals(1, files.size());
        verify(fileRepository, times(1)).findAll();
    }

    @Test
    void testGetFileById() {
        when(fileRepository.findById(1L)).thenReturn(Optional.of(fileEntity));
        Optional<FileEntity> file = fileService.getFileById(1L);
        assertTrue(file.isPresent());
        assertEquals(fileEntity.getFileId(), file.get().getFileId());
        verify(fileRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveFile() {
        when(fileRepository.save(fileEntity)).thenReturn(fileEntity);
        FileEntity savedFile = fileService.saveFile(fileEntity);
        assertNotNull(savedFile);
        assertEquals(fileEntity.getFileId(), savedFile.getFileId());
        verify(fileRepository, times(1)).save(fileEntity);
    }

    @Test
    void testDeleteFile() {
        doNothing().when(fileRepository).deleteById(1L);
        fileService.deleteFile(1L);
        verify(fileRepository, times(1)).deleteById(1L);
    }
}
