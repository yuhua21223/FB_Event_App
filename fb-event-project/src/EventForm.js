import React, { useState } from 'react';
import { createEvent,readEvent, updateEvent, deleteEvent } from '../src/api';


function EventForm() {
    // State for form fields and feedback to the user.
    const [eventId, setEventId] = useState('');           // Store Event ID
    const [eventName, setEventName] = useState('');       // Store Event Name
    const [eventDate, setEventDate] = useState('');       // Store Event Date
    const [feedback, setFeedback] = useState('');         // Store feedback messages

    // Handler for creating an event.
    const handleCreate = async () => {
        try {
            // Make a POST request to create a new event.
            const response = await createEvent({ name: eventName, date: eventDate });
            setFeedback(`Event created with ID: ${response.data.id}`);
        } catch (error) {
            // Display error to the user if there's a problem.
            setFeedback(error.message);
        }
    };

    // Handler for reading an event's details.
    const handleRead = async () => {
        try {
            // Make a GET request to fetch event details by ID.
            const response = await readEvent(eventId);
            setEventName(response.data.name);
            setEventDate(response.data.date);
            setFeedback('Event details fetched successfully');
        } catch (error) {
            // Display error to the user if there's a problem.
            setFeedback(error.message);
        }
    };

    // Handler for updating an event.
    const handleUpdate = async () => {
        try {
            // Make a POST request to update an existing event by ID.
            await updateEvent(eventId, { name: eventName, date: eventDate });
            setFeedback('Event updated successfully');
        } catch (error) {
            // Display error to the user if there's a problem.
            setFeedback(error.message);
        }
    };

    // Handler for deleting an event.
    const handleDelete = async () => {
        try {
            // Make a DELETE request to remove an event by ID.
            await deleteEvent(eventId);
            setFeedback('Event deleted successfully');
        } catch (error) {
            // Display error to the user if there's a problem.
            setFeedback(error.message);
        }
    };

    return (
        <div>
            <h2>Facebook Event API Form</h2>
            {/* Input field for Event ID */}
            <label>
                Event ID:
                <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="If updating or deleting" />
            </label>

            {/* Input field for Event Name */}
            <label>
                Event Name:
                <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </label>

            {/* Input field for Event Date */}
            <label>
                Event Date:
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </label>

            {/* Buttons for CRUD operations */}
            <div>
                <button onClick={handleCreate}>Create Event</button>
                <button onClick={handleRead}>Read Event</button>
                <button onClick={handleUpdate}>Update Event</button>
                <button onClick={handleDelete}>Delete Event</button>
            </div>

            {/* Display feedback to the user */}
            {feedback && <div>{feedback}</div>}
        </div>
    );
}

export default EventForm;
