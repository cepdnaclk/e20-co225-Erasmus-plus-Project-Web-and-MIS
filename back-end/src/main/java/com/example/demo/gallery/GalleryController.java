package com.example.demo.gallery;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


/**
 * Controller class for managing gallery API endpoints.
 */
@RestController
@RequestMapping("/api/v1/gallery")
@AllArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    /**
     * Endpoint to fetch all gallery items.
     */
    @GetMapping
    public List<GalleryResponse> getAllGallery() {
        return galleryService.getAllGallery();
    }

    /**
     * Endpoint to fetch a specific gallery item by its ID.
     */
    @GetMapping("/{albumId}")
    public GalleryResponse getGalleryById(@PathVariable Long albumId) {
        return galleryService.getGalleryById(albumId)
                .map(GalleryResponse::new)
                .orElseThrow(() -> new RuntimeException("Gallery item not found"));
    }

    /**
     * Endpoint to add a new gallery album with an optional image upload.
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Gallery addGallery(
            @RequestParam("albumName") String albumName,
            @RequestParam("albumCreatedBy") String albumCreatedBy,
            @RequestParam("albumURL") String albumURL,
            @RequestParam("albumCoverImage") MultipartFile albumCoverImage) {

        // Call the service to add the gallery with the optional uploaded image
        return galleryService.addGallery(albumName, albumCreatedBy, albumURL, albumCoverImage);
    }

    /**
     * Endpoint to delete a gallery album by its ID.
     */
    @DeleteMapping("/{albumId}")
    public void deleteGallery(@PathVariable Long albumId) {
        galleryService.deleteGallery(albumId);
    }
}
