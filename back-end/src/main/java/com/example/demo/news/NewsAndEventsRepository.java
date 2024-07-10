package com.example.demo.news;

import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing NewsAndEvents entities.
 */
@Repository
public interface NewsAndEventsRepository extends JpaRepository<NewsAndEvents, Long> {

    /**
     * Static method to find a NewsAndEvents entity by its ID.
     */
    static Remapper findByNewsID(Long newsID) {
        return null;
    }

    /**
     * Deletes a NewsAndEvents entity by its newsTitle.
     */
    void deleteByNewsTitle(String newsTitle);

    @Query("SELECT n FROM NewsAndEvents n ORDER BY n.newsID DESC")
    List<NewsAndEvents> findAllOrderByNewsIDDesc();
}
