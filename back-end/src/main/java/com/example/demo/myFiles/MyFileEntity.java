package com.example.demo.myFiles;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class MyFileEntity {

    @Id
    @SequenceGenerator(
            name = "file_entity_sequence",
            sequenceName = "file_entity_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "file_entity_sequence"
    )
    private Long myFileId;
    private String email;
    private String fileName;
    private String fileType;
    private String displayName;

    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;

    private String youtubeLink; // New field for YouTube links

    public MyFileEntity(String email, String fileName, String fileType, byte[] data, String displayName) {
        this.email = email;
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.displayName = displayName;
    }

    public MyFileEntity(String email, String youtubeLink, String displayName) {
        this.email = email;
        this.youtubeLink = youtubeLink;
        this.displayName = displayName;
    }
}
