package com.example.demo.gallery;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

/**
 * Represents a request object for creating or updating a gallery entity.
 */
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString

public class GalleryRequest {
    private final String albumName;
    private final String albumCreatedBy;
    private final String albumCoverURL;
    private final String albumURL;
}
