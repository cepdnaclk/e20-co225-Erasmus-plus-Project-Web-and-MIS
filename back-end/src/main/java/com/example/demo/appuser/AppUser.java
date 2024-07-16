package com.example.demo.appuser;

import com.example.demo.task.Task;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
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
public class AppUser implements UserDetails {



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
    private String firstName;
    @Getter
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    @JsonIgnore
    private Boolean locked = false;
    @JsonIgnore
    private Boolean enabled = false;

    @ManyToMany(mappedBy = "assignedUsers",fetch = FetchType.LAZY)
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "id")
//    @JsonBackReference
    @JsonIgnore
    @JsonIgnoreProperties("task")
    private Set<Task> assignedTasks = new HashSet<>();


    public AppUser( String firstName,
                    String lastName,
                    String email,
                    String password,
                    AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
    }


    /**
     * Returns the authorities granted to the user.
     * This method is used by Spring Security to determine the roles of the user
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public  String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public  boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public Set<Task> getAssignedTasks() {
        return assignedTasks;
    }

    public void assignTask(Task task) {
        assignedTasks.add(task);
    }

    public Long getId() {
        return id;
    }
}
