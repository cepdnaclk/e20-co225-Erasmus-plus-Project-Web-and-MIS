package com.example.demo.gallery;

import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing Gallery entities.
 */
@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    /**
     * Static method to find a NewsAndEvents entity by its ID.
     */
    static Remapper findByAlbumID(Long albumID) {
        return null;
    }

    /**
     * Deletes a NewsAndEvents entity by its albumName.
     */
    void deleteByAlbumName(String albumName);

    @Query("SELECT n FROM Gallery n ORDER BY n.albumID DESC")
    List<Gallery> findAllOrderByAlbumIDDesc();
}
