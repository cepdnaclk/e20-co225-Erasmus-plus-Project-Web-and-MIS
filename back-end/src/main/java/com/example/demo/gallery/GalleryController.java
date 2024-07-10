package com.example.demo.gallery;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class for managing news and events API endpoints.
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
    public List<Gallery> getAllGallery() {
        return galleryService.getAllGallery();
    }

    @GetMapping("/{albumId}")
    public Optional<Gallery> getGalleryById(@PathVariable Long albumId) {
        return galleryService.getGalleryById(albumId);
    }

    /**
     * Endpoint to add a new album.
     */
    @PostMapping
    public Gallery addGallery(@RequestBody GalleryRequest galleryRequest) {
        return galleryService.addGallery(galleryRequest);
    }

    /**
     * Endpoint to delete album by its ID.
     */
    @DeleteMapping("/{albumId}")
    public void deleteGallery(@PathVariable Long albumId) {
        galleryService.deleteGallery(albumId);
    }


}
