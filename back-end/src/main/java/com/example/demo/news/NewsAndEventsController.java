package com.example.demo.news;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping
    public List<NewsAndEventsResponse> getAllNewsAndEvents() {
        return newsAndEventsService.getAllNewsAndEvents();
    }

    @GetMapping("/{newsId}")
    public NewsAndEventsResponse getNewsById(@PathVariable Long newsId) {
        return newsAndEventsService.getNewsAndEventById(newsId)
                .map(NewsAndEventsResponse::new)
                .orElseThrow(() -> new RuntimeException("News not found"));
    }

    /**
     * Endpoint to add a new news or event with image upload.
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public NewsAndEvents addNewsAndEvents(
            @RequestParam("newsTitle") String newsTitle,
            @RequestParam("newsDescription") String newsDescription,
            @RequestParam("newsUrl") String newsUrl,
            @RequestParam("newsAuthor") String newsAuthor,
            @RequestParam("newsDate") String newsDate,
            @RequestParam("newsCoverImage") MultipartFile newsCoverImage) {

        // Call the service to add the news with the uploaded image
        return newsAndEventsService.addNewsAndEvent(newsTitle, newsDescription, newsUrl, newsAuthor, newsDate, newsCoverImage);
    }

    /**
     * Endpoint to delete a news or event by its ID.
     */
    @DeleteMapping("/{newsId}")
    public void deleteNewsById(@PathVariable Long newsId) {
        newsAndEventsService.deleteNewsAndEvent(newsId);
    }
}
