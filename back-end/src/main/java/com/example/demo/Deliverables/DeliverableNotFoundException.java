package com.example.demo.Deliverables;

public class DeliverableNotFoundException extends RuntimeException {
    public DeliverableNotFoundException(String id) {
        super("Could not found the Deliverable with ID " + id );
    }
}
