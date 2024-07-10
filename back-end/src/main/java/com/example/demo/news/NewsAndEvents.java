package com.example.demo.news;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a news or event entity stored in the database.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class NewsAndEvents {

    // A sequence generator for auto-generated IDs
    @SequenceGenerator(
            name = "news_and_events_sequence",
            sequenceName = "news_and_events_sequence",
            allocationSize = 1
    )

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "news_and_events_sequence"
    )
    private Long newsID;
    private String newsTitle;
    @Column(columnDefinition = "TEXT")
    private String newsDescription;
    private String newsUrl;
    private String newsCoverImage;
    private String newsDate;
    private String newsAuthor;

    /**
     * Constructor to initialize a new NewsAndEvents object.
     */
    public NewsAndEvents(String newsTitle,
                         String newsDescription,
                         String newsUrl,
                         String newsAuthor,
                         String newsDate,
                         String newsCoverImage){
        this.newsTitle = newsTitle;
        this.newsDescription = newsDescription;
        this.newsUrl = newsUrl;
        this.newsAuthor = newsAuthor;
        this.newsDate = newsDate;
        this.newsCoverImage = newsCoverImage;
    }
}
