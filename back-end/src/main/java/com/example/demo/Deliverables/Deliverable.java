//Deliverable Model - Create/Update a table 'Deliverable' in MySQL 'cycle' DB

package com.example.demo.Deliverables;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="deliverable")

public class Deliverable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deliverableId;

    private String deliverableRelatedNo;
    private String workPackageNo;
    private String deliverableNo;
    private String deliverableName;
    @Column(length = 5000)
    private String description;
    private String leadBeneficiary;
    private String type;
    private String disseminationLevel;
    private LocalDate dueDate;
}
