package com.example.demo.news;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * Represents a request object for creating or updating a NewsAndEvents entity.
 */
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString


public class NewsAndEventsRequest {
    private final String newsTitle;
    private final String newsDescription;
    private final String newsUrl;
    private final String newsAuthor;
    private final String newsDate;
    private final String newsCoverImage;
}
