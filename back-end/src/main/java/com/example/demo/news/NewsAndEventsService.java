package com.example.demo.news;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NewsAndEventsService {

    private final NewsAndEventsRepository newsAndEventsRepository;
    
    public List<NewsAndEvents> getAllNewsAndEvents() {
        return newsAndEventsRepository.findAllOrderByNewsIDDesc();
    }                                                     
    
    public Optional<NewsAndEvents> getNewsAndEventById(Long newsID) {
        return newsAndEventsRepository.findById(newsID);
    }

    @Transactional
    public NewsAndEvents addNewsAndEvent(NewsAndEventsRequest newsAndEventsRequest) {
        NewsAndEvents newsAndEvents = new NewsAndEvents(
                newsAndEventsRequest.getNewsTitle(),
                newsAndEventsRequest.getNewsDescription(),
                newsAndEventsRequest.getNewsUrl(),
                newsAndEventsRequest.getNewsAuthor(),
                newsAndEventsRequest.getNewsDate(),
                newsAndEventsRequest.getNewsCoverImage()
        );
        System.out.println("News Added");
        return newsAndEventsRepository.save(newsAndEvents);
    }

    @Transactional
    public void deleteNewsAndEvent(Long newsID) {
        newsAndEventsRepository.deleteById(newsID);
    }

//    public NewsAndEvents updateNewsAndEvent(Long newsID, NewsAndEvents updatednewsAndEvent) {
//        return NewsAndEventsRepository.findByID(newsID)
//                .map(newsAndEvents -> {
//                    newsAndEvents.setNewsAuthor(updatednewsAndEvent.getNewsAuthor());
//                    return NewsAndEventsRepository.save(newsAndEvents);
//                })
//                .orElseGet(() -> {
//                    updatednewsAndEvent.setNewsAuthor(updatednewsAndEvent.getNewsAuthor());
//                });
//    }
}
