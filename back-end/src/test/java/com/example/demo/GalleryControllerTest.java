// JUnit Testing For GalleryController

package com.example.demo;

import com.example.demo.gallery.Gallery;
import com.example.demo.gallery.GalleryController;
import com.example.demo.gallery.GalleryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class GalleryControllerTest {

    @Mock
    private GalleryService galleryService;

    @InjectMocks
    private GalleryController galleryController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(galleryController).build();
    }

    /* Testing that the controller correctly handles the request to add a gallery,
    including file upload, and returns the expected response with the album name */
    @Test
    void testAddGallery() throws Exception {
        Gallery gallery = new Gallery("Test Album", "Test Creator", null, "http://test.com");
        when(galleryService.addGallery(anyString(), anyString(), anyString(), any(MultipartFile.class))).thenReturn(gallery);

        mockMvc.perform(multipart("/api/v1/gallery")
                        .file("albumCoverImage", new byte[]{})
                        .param("albumName", "Test Album")
                        .param("albumCreatedBy", "Test Creator")
                        .param("albumURL", "http://test.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.albumName").value("Test Album"));
    }

    // Testing that the controller processes the request to delete a gallery by its ID and returns a successful status
    @Test
    void testDeleteGallery() throws Exception {
        doNothing().when(galleryService).deleteGallery(1L);

        mockMvc.perform(delete("/api/v1/gallery/1"))
                .andExpect(status().isOk());
    }

}
