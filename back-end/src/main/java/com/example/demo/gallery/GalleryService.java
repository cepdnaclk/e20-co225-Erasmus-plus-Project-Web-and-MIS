package com.example.demo.gallery;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.notification.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;
    @Autowired
    private AppUserService userService;
    @Autowired
    private NotificationService notificationService;

    /**
     * Fetch all gallery items and map them to GalleryResponse objects.
     */
    public List<GalleryResponse> getAllGallery() {
        return galleryRepository.findAllOrderByAlbumIDDesc()
                .stream()
                .map(GalleryResponse::new) // Map each entity to its response DTO
                .collect(Collectors.toList());
    }

    /**
     * Fetch a specific gallery item by its ID.
     */
    public Optional<Gallery> getGalleryById(Long albumId) {
        return galleryRepository.findById(albumId);
    }

    /**
     * Add a new gallery item with an optional image upload.
     * Handles both text data and the image file.
     *
     * @param albumName       The name of the album.
     * @param albumCreatedBy  The creator of the album.
     * @param albumURL        The URL of the album.
     * @param albumCoverImage An optional image file to be uploaded.
     * @return The saved Gallery entity.
     */
    @Transactional
    public Gallery addGallery(String albumName, String albumCreatedBy, String albumURL,
                              MultipartFile albumCoverImage) {

        byte[] imageBytes = null;
        if (albumCoverImage != null && !albumCoverImage.isEmpty()) {
            try {
                imageBytes = albumCoverImage.getBytes(); // Get the image bytes from MultipartFile
            } catch (IOException e) {
                throw new RuntimeException("Failed to process image file", e); // Better error handling
            }
        }

        Gallery gallery = new Gallery(
                albumName,
                albumCreatedBy,
                imageBytes, // Store the image bytes
                albumURL
        );
        List<AppUser> users = userService.getAllUsers();
        for (AppUser user : users) {
            notificationService.createNotification("The new album, " + gallery.getAlbumName() +  " has been uploaded!", user,"typeGallery");
        }
        System.out.println("Gallery Added: " + albumName); // Optional: log the added gallery

        return galleryRepository.save(gallery); // Save the entity to the database
    }

    /**
     * Delete a gallery item by its ID.
     *
     * @param albumID The ID of the gallery item to be deleted.
     */
    @Transactional
    public void deleteGallery(Long albumID) {
        if (!galleryRepository.existsById(albumID)) {
            throw new IllegalArgumentException("Gallery with ID " + albumID + " does not exist."); // Handle non-existing entries
        }
        galleryRepository.deleteById(albumID); // Perform the delete operation
    }

    // Uncomment and modify this method if you need to implement update functionality
    // public Gallery updateGallery(Long albumId, GalleryRequest updatedRequest) {
    //     // Fetch existing gallery by ID, update fields, and save.
    // }
}
