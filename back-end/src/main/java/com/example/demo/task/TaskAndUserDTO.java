package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Data
public class TaskAndUserDTO {



        private Task task;
        private Set<AppUser> appUsers;

        public TaskAndUserDTO() {
        }

        /**
         * Constructor for TaskAndUserDTO with parameters.
         */
        public TaskAndUserDTO(Task task, Set <AppUser> appUsers) {
            this.task = task;
            this.appUsers = appUsers;
        }

    public Task getTask() {
        return this.task;
        }

    public Set<AppUser> getUsers(){
            return  this.appUsers;
    }
//}


}
