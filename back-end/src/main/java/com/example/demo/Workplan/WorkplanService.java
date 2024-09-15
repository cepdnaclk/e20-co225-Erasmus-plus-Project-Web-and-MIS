//Workplan Service- Encapsulate the Business Logic

package com.example.demo.Workplan;

import com.example.demo.Deliverables.DeliverableNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkplanService {

    @Autowired
    private WorkplanRepository workplanRepo;

    //Create a new activity
    public WorkplanActivity addActivity(WorkplanActivity workplanActivity) {
        return workplanRepo.save(workplanActivity);
    }

    //Get all workplan activities as a List
    public List<WorkplanActivity> getAllActivities() {
        return workplanRepo.findAll();
    }

    //1. get workln by id
    public WorkplanActivity getActivityById( String id) {
        return workplanRepo.findById(id)
                .orElseThrow(()->new DeliverableNotFoundException(id));
    }

    //2. Update the workplan
    public WorkplanActivity updateActivity(String id, WorkplanActivity workplanActivity) {
        Optional<WorkplanActivity> existingWorkplanActivity = workplanRepo.findById(id);
        if (existingWorkplanActivity.isPresent()) {
            WorkplanActivity updatedWorkplanActivity = existingWorkplanActivity.get();

            updatedWorkplanActivity.setActivityNo(workplanActivity.getActivityNo());
            updatedWorkplanActivity.setActivityName(workplanActivity.getActivityName());
            updatedWorkplanActivity.setY1_q1(workplanActivity.isY1_q1());
            updatedWorkplanActivity.setY1_q2(workplanActivity.isY1_q2());
            updatedWorkplanActivity.setY1_q3(workplanActivity.isY1_q3());
            updatedWorkplanActivity.setY1_q4(workplanActivity.isY1_q4());
            updatedWorkplanActivity.setY2_q1(workplanActivity.isY2_q1());
            updatedWorkplanActivity.setY2_q2(workplanActivity.isY2_q2());
            updatedWorkplanActivity.setY2_q3(workplanActivity.isY2_q3());
            updatedWorkplanActivity.setY2_q4(workplanActivity.isY2_q4());
            updatedWorkplanActivity.setY3_q1(workplanActivity.isY3_q1());
            updatedWorkplanActivity.setY3_q2(workplanActivity.isY3_q2());
            updatedWorkplanActivity.setY3_q3(workplanActivity.isY3_q3());
            updatedWorkplanActivity.setY3_q4(workplanActivity.isY3_q4());
            updatedWorkplanActivity.setY4_q1(workplanActivity.isY4_q1());
            updatedWorkplanActivity.setY4_q2(workplanActivity.isY4_q2());
            updatedWorkplanActivity.setY4_q3(workplanActivity.isY4_q3());
            updatedWorkplanActivity.setY4_q4(workplanActivity.isY4_q4());
            return workplanRepo.save(updatedWorkplanActivity);
        }
        else{
            throw new DeliverableNotFoundException(id);
        }
    }

    //3. delete an activity with a known id
    public String deleteActivity(String id) {
        if(!workplanRepo.existsById(id)) {
            throw new DeliverableNotFoundException(id);
        }
        workplanRepo.deleteById(id);
        return "Activity with id "+id+ " has been deleted!";
    }
}
