package com.example.demo;

import com.example.demo.news.NewsAndEvents;
import com.example.demo.news.NewsAndEventsController;
import com.example.demo.news.NewsAndEventsRequest;
import com.example.demo.news.NewsAndEventsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
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
        Test to verify that when a GET request is made to /api/v1/news/{newsId},
        the endpoint correctly retrieves and returns the news item with the specified newsId
    */

    @Test
    void testGetNewsById() throws Exception {
        Long newsId = 1L;
        NewsAndEvents newsAndEvents = new NewsAndEvents("Title", "Description", "Url", "Author", "Date", "Image");
        when(newsAndEventsService.getNewsAndEventById(newsId)).thenReturn(Optional.of(newsAndEvents));

        mockMvc.perform(get("/api/v1/news/{newsId}", newsId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.newsTitle").value("Title"));

        verify(newsAndEventsService, times(1)).getNewsAndEventById(newsId);
    }

    /*
        Test to ensure that when a POST request is made to /api/v1/news with a
        JSON payload representing a new news item, the endpoint correctly processes
        the request, adds the item using the service layer, and returns a response
        indicating success with the added news item's details
    */

    @Test
    void testAddNewsAndEvents() throws Exception {
        NewsAndEventsRequest request = new NewsAndEventsRequest("Title", "Description", "Url", "Author", "Date", "Image");
        NewsAndEvents newsAndEvents = new NewsAndEvents(request.getNewsTitle(), request.getNewsDescription(), request.getNewsUrl(), request.getNewsAuthor(), request.getNewsDate(), request.getNewsCoverImage());

        when(newsAndEventsService.addNewsAndEvent(any(NewsAndEventsRequest.class))).thenReturn(newsAndEvents);

        mockMvc.perform(post("/api/v1/news")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"newsTitle\":\"Title\",\"newsDescription\":\"Description\",\"newsUrl\":\"Url\",\"newsAuthor\":\"Author\",\"newsDate\":\"Date\",\"newsCoverImage\":\"Image\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.newsTitle").value("Title"));

        verify(newsAndEventsService, times(1)).addNewsAndEvent(any(NewsAndEventsRequest.class));
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
