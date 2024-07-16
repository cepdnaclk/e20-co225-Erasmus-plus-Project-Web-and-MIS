package com.example.demo.task;

import com.example.demo.appuser.AppUser;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class TaskAndUserDTO {



        private Task task;
        private AppUser appUser;

        public TaskAndUserDTO() {
        }

        /**
         * Constructor for TaskAndUserDTO with parameters.
         */
        public TaskAndUserDTO(Task task, AppUser appUser) {
            this.task = task;
            this.appUser = appUser;
        }

//    public static Task getTask() {
//    }
//}


}
