package com.example.demo.news;

import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
public class NewsAndEventsResponse {

    private Long newsID;
    private String newsTitle;
    private String newsDescription;
    private String newsUrl;
    private String newsAuthor;
    private String newsDate;
    private String newsCoverImage;  // Base64 encoded image

    public NewsAndEventsResponse(NewsAndEvents newsAndEvents) {
        this.newsID = newsAndEvents.getNewsID();
        this.newsTitle = newsAndEvents.getNewsTitle();
        this.newsDescription = newsAndEvents.getNewsDescription();
        this.newsUrl = newsAndEvents.getNewsUrl();
        this.newsAuthor = newsAndEvents.getNewsAuthor();
        this.newsDate = newsAndEvents.getNewsDate().toString();

        // Convert image byte array to Base64 encoded string
        this.newsCoverImage = Base64.getEncoder().encodeToString(newsAndEvents.getNewsCoverImage());
    }
}
