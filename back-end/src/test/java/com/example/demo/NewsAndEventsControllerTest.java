// JUnit Testing For NewsAndEventsController

package com.example.demo;

import com.example.demo.news.NewsAndEvents;
import com.example.demo.news.NewsAndEventsController;
import com.example.demo.news.NewsAndEventsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class NewsAndEventsControllerTest {

    @Mock
    private NewsAndEventsService newsAndEventsService;

    @InjectMocks
    private NewsAndEventsController newsAndEventsController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(newsAndEventsController).build();
    }

    /* Unit tests */

    /*
        Test to ensures that when a GET request is made to /api/v1/news, the endpoint
        responds with an HTTP 200 status and returns an empty JSON array when
        there are no news or events available from the service layer
    */
    @Test
    void testGetAllNewsAndEvents() throws Exception {
        when(newsAndEventsService.getAllNewsAndEvents()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/news"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(newsAndEventsService, times(1)).getAllNewsAndEvents();
    }

    /*
        Test to ensure that when a POST request is made to /api/v1/news with a
        MultipartFile and other parameters representing a new news item, the endpoint
        correctly processes the request, adds the item using the service layer, and returns
        a response indicating success with the added news item's details.
    */
    @Test
    void testAddNewsAndEvents() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile("newsCoverImage", "image.jpg", MediaType.IMAGE_JPEG_VALUE, "test image".getBytes());

        NewsAndEvents newsAndEvents = new NewsAndEvents("Title", "Description", "Url", "Author", "Date", imageFile.getBytes());

        when(newsAndEventsService.addNewsAndEvent(
                eq("Title"),
                eq("Description"),
                eq("Url"),
                eq("Author"),
                eq("Date"),
                any(MockMultipartFile.class)
        )).thenReturn(newsAndEvents);

        mockMvc.perform(multipart("/api/v1/news")
                        .file(imageFile)
                        .param("newsTitle", "Title")
                        .param("newsDescription", "Description")
                        .param("newsUrl", "Url")
                        .param("newsAuthor", "Author")
                        .param("newsDate", "Date")
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.newsTitle").value("Title"));

        verify(newsAndEventsService, times(1)).addNewsAndEvent(
                eq("Title"),
                eq("Description"),
                eq("Url"),
                eq("Author"),
                eq("Date"),
                any(MockMultipartFile.class)
        );
    }

    /*
        Test to ensure that when a DELETE request is made to /api/v1/news/{newsId},
        the endpoint correctly handles the request to delete the news or events item with
        the specified newsId.
    */
    @Test
    void testDeleteNewsById() throws Exception {
        Long newsId = 1L;
        doNothing().when(newsAndEventsService).deleteNewsAndEvent(newsId);

        mockMvc.perform(delete("/api/v1/news/{newsId}", newsId))
                .andExpect(status().isOk());

        verify(newsAndEventsService, times(1)).deleteNewsAndEvent(newsId);
    }
}
