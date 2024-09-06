package com.example.demo.gallery;

import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
public class GalleryResponse {

    private Long albumID;
    private String albumName;
    private String albumCreatedBy;
    private String albumCoverImage;  // Base64 encoded image or URL if applicable
    private String albumURL;

    public GalleryResponse(Gallery gallery) {
        this.albumID = gallery.getAlbumID();
        this.albumName = gallery.getAlbumName();
        this.albumCreatedBy = gallery.getAlbumCreatedBy();
        // Convert image byte array to Base64 encoded string
        this.albumCoverImage = Base64.getEncoder().encodeToString(gallery.getAlbumCoverImage());
        this.albumURL = gallery.getAlbumURL();
    }
}
