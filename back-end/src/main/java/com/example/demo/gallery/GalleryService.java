package com.example.demo.gallery;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;

    public List<Gallery> getAllGallery() {
        return galleryRepository.findAllOrderByAlbumIDDesc();
    }

    public Optional<Gallery> getGalleryById(Long albumId) {
        return galleryRepository.findById(albumId);
    }

    @Transactional
    public Gallery addGallery(GalleryRequest galleryRequest) {
        Gallery gallery = new Gallery(
                galleryRequest.getAlbumName(),
                galleryRequest.getAlbumCreatedBy(),
                galleryRequest.getAlbumCoverURL(),
                galleryRequest.getAlbumURL()
        );
        System.out.println("Gallery Added");
        return galleryRepository.save(gallery);
    }

    @Transactional
    public void deleteGallery(Long albumId) {
        galleryRepository.deleteById(albumId);
    }
}
