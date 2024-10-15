package com.example.demo.appuser;

import com.example.demo.task.Task;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Represents an application user.
 * This class is a JPA entity and implements Spring Security's UserDetails interface
 * to integrate with Spring Security for authentication and authorization.
 */
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor

@Entity
@Table(name = "appUser")
public class AppUser {

    /**
     * The sequence generator for the primary key of the AppUser entity.
     * This generator is used to generate unique IDs for each AppUser.
     */
    @SequenceGenerator(
            name = "member_sequence",
            sequenceName = "member_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "member_sequence"
    )

    private Long id;
    @Getter
    private String title;
    @Getter
    private String firstName;
    @Getter
    private String lastName;
    private String email;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    private Boolean isAdmin = false;

    @ManyToMany(mappedBy = "assignedUsers",fetch = FetchType.LAZY)
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "id")
//    @JsonBackReference
    @JsonIgnore
    @JsonIgnoreProperties("Task")
    private Set<Task> assignedTasks = new HashSet<>();


    public AppUser( String title,
                    String firstName,
                    String lastName,
                    String email,
                    AppUserRole appUserRole) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.appUserRole = appUserRole;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName(){return firstName;}

    public String getLastName(){return lastName;}

    public boolean isAdmin() {return isAdmin;}



    public Set<Task> getAssignedTasks() {
        return assignedTasks;
    }

    public void assignTask(Task task) {
        assignedTasks.add(task);
    }

}
