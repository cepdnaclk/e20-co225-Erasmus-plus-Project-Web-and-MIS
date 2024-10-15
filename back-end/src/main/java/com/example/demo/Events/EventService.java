package com.example.demo.Events;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private AppUserService userService;
    @Autowired
    private NotificationService notificationService;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        List<AppUser> users = userService.getAllUsers();
        for (AppUser user : users) {
            notificationService.createNotification("The new event, " + event.getTitle() + " has beed added!", user, "typeEvent");
        }
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(eventDetails.getTitle());
        event.setDetails(eventDetails.getDetails());
        event.setDate(eventDetails.getDate());
        event.setTime(eventDetails.getTime());
        event.setVenue(eventDetails.getVenue());

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
