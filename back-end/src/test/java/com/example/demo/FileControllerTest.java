package com.example.demo;

import com.example.demo.download.FileController;
import com.example.demo.download.FileEntity;
import com.example.demo.download.FileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FileControllerTest {

    @Mock
    private FileService fileService;

    @InjectMocks
    private FileController fileController;

    private FileEntity fileEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        fileEntity = new FileEntity("test.txt", "text/plain", "Hello World".getBytes());
        fileEntity.setFileId(1L);
    }

    @Test
    void testGetAllFiles() {
        when(fileService.getAllFiles()).thenReturn(Arrays.asList(fileEntity));
        List<FileEntity> files = fileController.getAllFiles();
        assertEquals(1, files.size());
        verify(fileService, times(1)).getAllFiles();
    }

    @Test
    void testDownloadFile() {
        when(fileService.getFileById(1L)).thenReturn(Optional.of(fileEntity));
        ResponseEntity<Resource> response = fileController.downloadFile(1L);
        assertEquals(MediaType.parseMediaType("text/plain"), response.getHeaders().getContentType());
        assertEquals("attachment; filename=\"test.txt\"", response.getHeaders().getContentDisposition().toString());
        verify(fileService, times(1)).getFileById(1L);
    }

    @Test
    void testUploadFile() {
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "Hello World".getBytes()
        );

        ResponseEntity<String> responseEntity = fileController.uploadFile(mockMultipartFile);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("File uploaded successfully", responseEntity.getBody());
        verify(fileService, times(1)).saveFile(any(FileEntity.class));
    }
}