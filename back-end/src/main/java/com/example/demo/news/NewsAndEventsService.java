package com.example.demo.news;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NewsAndEventsService {

    private final NewsAndEventsRepository newsAndEventsRepository;

    /**
     * Fetch all news and events and map them to NewsAndEventsResponse objects.
     */
    public List<NewsAndEventsResponse> getAllNewsAndEvents() {
        return newsAndEventsRepository.findAllOrderByNewsIDDesc()
                .stream()
                .map(NewsAndEventsResponse::new) // Map each entity to its response DTO
                .collect(Collectors.toList());
    }

    /**
     * Fetch a specific news or event by its ID.
     */
    public Optional<NewsAndEvents> getNewsAndEventById(Long newsID) {
        return newsAndEventsRepository.findById(newsID);
    }

    /**
     * Add a new news or event with an optional image upload.
     * Handles both text data and the image file.
     *
     * @param newsTitle        The title of the news/event.
     * @param newsDescription  The description of the news/event.
     * @param newsUrl          An optional URL for the news/event.
     * @param newsAuthor       The author of the news/event.
     * @param newsDate         The date of the news/event.
     * @param newsCoverImage   An optional image file to be uploaded.
     * @return The saved NewsAndEvents entity.
     */
    @Transactional
    public NewsAndEvents addNewsAndEvent(String newsTitle, String newsDescription, String newsUrl,
                                         String newsAuthor, String newsDate, MultipartFile newsCoverImage) {

        byte[] imageBytes = null;
        if (newsCoverImage != null && !newsCoverImage.isEmpty()) {
            try {
                imageBytes = newsCoverImage.getBytes(); // Get the image bytes from MultipartFile
            } catch (IOException e) {
                throw new RuntimeException("Failed to process image file", e);  // Better error handling
            }
        }

        NewsAndEvents newsAndEvents = new NewsAndEvents(
                newsTitle,
                newsDescription,
                newsUrl,
                newsAuthor,
                newsDate,
                imageBytes // Store the image bytes
        );

        System.out.println("News Added: " + newsTitle); // Optional: log the added news

        return newsAndEventsRepository.save(newsAndEvents); // Save the entity to the database
    }

    /**
     * Delete a news or event by its ID.
     *
     * @param newsID The ID of the news/event to be deleted.
     */
    @Transactional
    public void deleteNewsAndEvent(Long newsID) {
        if (!newsAndEventsRepository.existsById(newsID)) {
            throw new IllegalArgumentException("News with ID " + newsID + " does not exist."); // Handle non-existing entries
        }
        newsAndEventsRepository.deleteById(newsID);  // Perform the delete operation
    }

    // Uncomment and modify this method if you need to implement update functionality
    // public NewsAndEvents updateNewsAndEvent(Long newsID, NewsAndEventsRequest updatedRequest) {
    //     // Fetch existing news by ID, update fields, and save.
    // }
}
