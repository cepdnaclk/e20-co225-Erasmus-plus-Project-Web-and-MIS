package com.example.demo;

import com.example.demo.news.NewsAndEvents;
import com.example.demo.news.NewsAndEventsRepository;
import com.example.demo.news.NewsAndEventsRequest;
import com.example.demo.news.NewsAndEventsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
        import static org.mockito.Mockito.*;

class NewsAndEventsServiceTest {

    @Mock
    private NewsAndEventsRepository newsAndEventsRepository;

    @InjectMocks
    private NewsAndEventsService newsAndEventsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllNewsAndEvents() {
        when(newsAndEventsRepository.findAll()).thenReturn(Collections.emptyList());
        assertTrue(newsAndEventsService.getAllNewsAndEvents().isEmpty());
        verify(newsAndEventsRepository, times(1)).findAll();
    }

    @Test
    void testGetNewsAndEventById() {
        Long newsId = 1L;
        NewsAndEvents newsAndEvents = new NewsAndEvents("Title", "Description", "Url", "Author", "Date", "Image");
        when(newsAndEventsRepository.findById(newsId)).thenReturn(Optional.of(newsAndEvents));

        Optional<NewsAndEvents> foundNews = newsAndEventsService.getNewsAndEventById(newsId);
        assertTrue(foundNews.isPresent());
        assertEquals("Title", foundNews.get().getNewsTitle());
        verify(newsAndEventsRepository, times(1)).findById(newsId);
    }

    @Test
    void testAddNewsAndEvent() {
        NewsAndEventsRequest request = new NewsAndEventsRequest("Title", "Description", "Url", "Author", "Date", "Image");
        NewsAndEvents newsAndEvents = new NewsAndEvents(request.getNewsTitle(), request.getNewsDescription(), request.getNewsUrl(), request.getNewsAuthor(), request.getNewsDate(), request.getNewsCoverImage());

        when(newsAndEventsRepository.save(any(NewsAndEvents.class))).thenReturn(newsAndEvents);

        NewsAndEvents addedNews = newsAndEventsService.addNewsAndEvent(request);
        assertNotNull(addedNews);
        assertEquals("Title", addedNews.getNewsTitle());
        verify(newsAndEventsRepository, times(1)).save(any(NewsAndEvents.class));
    }

    @Test
    void testDeleteNewsAndEvent() {
        Long newsId = 1L;
        doNothing().when(newsAndEventsRepository).deleteById(newsId);
        newsAndEventsService.deleteNewsAndEvent(newsId);
        verify(newsAndEventsRepository, times(1)).deleteById(newsId);
    }
}
