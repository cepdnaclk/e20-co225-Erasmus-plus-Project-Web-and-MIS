package com.example.demo.news;

import com.example.demo.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class for managing news and events API endpoints.
 */
@RestController
@RequestMapping("/api/v1/news")
@AllArgsConstructor
public class NewsAndEventsController {

    private final NewsAndEventsService newsAndEventsService;

    /**
     * Endpoint to fetch all news and events.
     */
    @GetMapping
    public List<NewsAndEvents> getAllNewsAndEvents() {
        return newsAndEventsService.getAllNewsAndEvents();
    }

    @GetMapping("/{newsId}")
    public Optional<NewsAndEvents> getNewsById(@PathVariable Long newsId) {
        return newsAndEventsService.getNewsAndEventById(newsId);
    }

    /**
     * Endpoint to add a new news or event.
     */
    @PostMapping
    public NewsAndEvents addNewsAndEvents(@RequestBody NewsAndEventsRequest newsAndEventsRequest) {
        return newsAndEventsService.addNewsAndEvent(newsAndEventsRequest);
    }

    /**
     * Endpoint to delete a news or event by its ID.
     */
    @DeleteMapping("/{newsId}")
    public void deleteNewsById(@PathVariable Long newsId) {
        newsAndEventsService.deleteNewsAndEvent(newsId);
    }

}
