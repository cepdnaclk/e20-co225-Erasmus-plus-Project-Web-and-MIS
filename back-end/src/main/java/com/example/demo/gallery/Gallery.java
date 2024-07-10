package com.example.demo.gallery;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a gallery entity stored in the database.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class Gallery {

    // A sequence generator for auto-generated IDs
    @SequenceGenerator(
            name = "gallery_sequence",
            sequenceName = "gallery_sequence",
            allocationSize = 1
    )

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "gallery_sequence"
    )

    private Long albumId;
    private String albumName;
    private String albumCreatedBy;
    private String albumCoverURL;
    private String albumURL;

    /**
     * Constructor to initialize a new Gallery object.
     */
    public Gallery(String albumName,
                   String albumCreatedBy,
                   String albumCoverURL,
                   String albumURL) {
        this.albumName = albumName;
        this.albumCreatedBy = albumCreatedBy;
        this.albumCoverURL = albumCoverURL;
        this.albumURL = albumURL;
    }
}
