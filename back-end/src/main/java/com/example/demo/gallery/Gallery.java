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

//    Setting the primary key
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "gallery_sequence"
    )

    private Long albumID;
    private String albumName;
    private String albumCreatedBy;

    @Lob
    @Column(name = "albumCoverImage", columnDefinition = "LONGBLOB")
    private byte[] albumCoverImage;
    private String albumURL;

    /**
     * Constructor to initialize a new Gallery object.
     */
    public Gallery(String albumName,
                   String albumCreatedBy,
                   byte[] albumCoverImage,
                   String albumURL) {
        this.albumName = albumName;
        this.albumCreatedBy = albumCreatedBy;
        this.albumCoverImage = albumCoverImage;
        this.albumURL = albumURL;
    }
}
