package com.example.demo.download;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class FileEntity {

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
    private Long fileId;
    private String fileName;
    private String fileType;
    private String displayName;
    private boolean visibleToAll;

    @Lob
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;
    public FileEntity(String fileName, String fileType, byte[] data, String displayName, boolean visibleToAll) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.displayName = displayName;
        this.visibleToAll = visibleToAll;
    }
}
