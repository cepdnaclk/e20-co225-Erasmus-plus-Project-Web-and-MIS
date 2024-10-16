//Deliverable Service- Encapsulate the Business Logic

package com.example.demo.Deliverables;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserService;
import com.example.demo.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliverableService {

    @Autowired
    private DeliverableRepository deliverableRepo;
    @Autowired
    private AppUserService userService;
    @Autowired
    private NotificationService notificationService;

    //Create a deliverable
    public Deliverable addDeliverable(Deliverable deliverable) {

        List<AppUser> users = userService.getAllUsers();
        for (AppUser user : users) {
            notificationService.createNotification("The new deliverable, " + deliverable.getDeliverableName() +  " has been added!", user,"typeDeliverable");
        }
        return deliverableRepo.save(deliverable);
    }

    //Get all the deliverable objects as a list
    public List<Deliverable> getAllDeliverables() {
        return deliverableRepo.findAll();
    }

    //Get deliverable by id
    public Deliverable getDeliverableById(String id) {
        return deliverableRepo.findById(id)
                .orElseThrow(()->new DeliverableNotFoundException(id));
    };

    //Update a deliverable with a known id
    public Deliverable updateDeliverable( String id,  Deliverable deliverable) {
        Optional<Deliverable> existingDeliverable = deliverableRepo.findById(id);
        if (existingDeliverable.isPresent()) {
            Deliverable updatedDeliverable = existingDeliverable.get();

            updatedDeliverable.setDeliverableRelatedNo(deliverable.getDeliverableRelatedNo());
            updatedDeliverable.setWorkPackageNo(deliverable.getWorkPackageNo());
            updatedDeliverable.setDeliverableNo(deliverable.getDeliverableNo());
            updatedDeliverable.setDeliverableName(deliverable.getDeliverableName());
            updatedDeliverable.setLeadBeneficiary(deliverable.getLeadBeneficiary());
            updatedDeliverable.setType(deliverable.getType());
            updatedDeliverable.setDisseminationLevel(deliverable.getDisseminationLevel());
            updatedDeliverable.setDueDate(deliverable.getDueDate());
            return deliverableRepo.save(updatedDeliverable);
        }
        else{
            throw new DeliverableNotFoundException(id);
        }
    }

    //Delete a deliverable with a known ID
    public String deleteDeliverable(String id) {
        if(!deliverableRepo.existsById(id)) {
            throw new DeliverableNotFoundException(id);
        }
        deliverableRepo.deleteById(id);
        return "Deliverable with id "+id+ " has been deleted!";
    }

}



