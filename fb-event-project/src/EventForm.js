// Import React-specific dependencies and functions.
import React, { useState } from 'react';
// Import API-related functions to create, read, update, and delete events.
import { createEvent, readEvent, updateEvent, deleteEvent } from '../src/api';

// This is the EventForm component where the user can perform CRUD operations related to events.
function EventForm() {
    // Declare state variables using the useState hook to manage form fields' values.
    const [eventId, setEventId] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventTimezone, setEventTimezone] = useState('');
    const [coverURL, setCoverURL] = useState('');
    const [feedback, setFeedback] = useState(''); // Feedback state to show messages to the user.

    // Function to handle the creation of a new event.
    const handleCreate = async () => {
        try {
            // Prepare the event data object to be sent to the API.
            const eventData = {
                name: eventName,
                description: eventDescription,
                place_id: placeId,
                category: eventCategory,
                timezone: eventTimezone,
                start_time: eventDate,
                cover: {
                    source: coverURL,
                    offset_x: 0,
                    offset_y: 0
                }
            };

            // Use the createEvent API function to create a new event.
            const response = await createEvent(eventData);

            // Provide feedback to the user on successful event creation.
            setFeedback(`Event created with ID: ${response.id}`);
        } catch (error) {
            // If there's an error, display it to the user.
            setFeedback(error.message);
        }
    };

    // Function to handle reading the details of an event by its ID.
    const handleRead = async () => {
        try {
            const response = await readEvent(eventId);
            if(response && response.data) {
                setEventName(response.data.name);
                setEventDate(response.data.date);
                // Add other setters as needed based on the response data.
                setFeedback('Event details fetched successfully');
            } else {
                setFeedback('Failed to fetch event details.');
            }
        } catch (error) {
            setFeedback(error.message);
        }
    };

    // Function to handle the updating of an existing event.
    const handleUpdate = async () => {
        try {
            const eventData = {
                // Prepare the event data similar to the handleCreate function.
                // ...[similar to handleCreate]
            };
            await updateEvent(eventId, eventData);
            setFeedback('Event updated successfully');
        } catch (error) {
            setFeedback(error.message);
        }
    };

    // Function to handle the deletion of an event by its ID.
    const handleDelete = async () => {
        try {
            await deleteEvent(eventId);
            // Reset form fields after a successful delete.
            setEventId('');
            setEventName('');
            setEventDate('');
            // Reset other fields as needed.
            setFeedback('Event deleted successfully');
        } catch (error) {
            setFeedback(error.message);
        }
    };
    return (
        <div>
            <h1>Artist Event Form Portal</h1>
            <h2>Facebook Event API Form</h2>
            <label>
                Event ID:
                <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="If updating or deleting" />
            </label>
            <label>
                Event Name:
                <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}></textarea>
            </label>
            <label>
                Place ID:
                <input type="text" value={placeId} onChange={(e) => setPlaceId(e.target.value)} />
            </label>
            <label>
                Event Category:
                <input type="text" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} />
            </label>
            <label>
                Event Timezone:
                <input type="text" value={eventTimezone} onChange={(e) => setEventTimezone(e.target.value)} />
            </label>
            <label>
                Event Date:
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </label>
            <label>
                Cover Image URL:
                <input type="url" value={coverURL} onChange={(e) => setCoverURL(e.target.value)} />
            </label>
            <div>
                <button onClick={handleCreate}>Create Event</button>
                <button onClick={handleRead}>Read Event</button>
                <button onClick={handleUpdate}>Update Event</button>
                <button onClick={handleDelete}>Delete Event</button>
            </div>
            {feedback && <div>{feedback}</div>}
        </div>
    );
}

export default EventForm;
