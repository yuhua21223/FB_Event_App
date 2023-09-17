import React, { useState } from 'react';
import { createEvent, readEvent, updateEvent, deleteEvent } from '../src/api';

function EventForm() {
    const [eventId, setEventId] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventTimezone, setEventTimezone] = useState('');
    const [coverURL, setCoverURL] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleCreate = async () => {
        try {
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
            const response = await createEvent(eventData);
            setFeedback(`Event created with ID: ${response.id}`);
        } catch (error) {
            setFeedback(error.message);
        }
    };

    const handleRead = async () => {
        try {
            const response = await readEvent(eventId);
            if(response && response.data) {
                setEventName(response.data.name);
                setEventDate(response.data.date);
                // Add more setters if you have more fields from the response
                setFeedback('Event details fetched successfully');
            } else {
                setFeedback('Failed to fetch event details.');
            }
        } catch (error) {
            setFeedback(error.message);
        }
    };

    const handleUpdate = async () => {
        try {
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
            await updateEvent(eventId, eventData);
            setFeedback('Event updated successfully');
        } catch (error) {
            setFeedback(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(eventId);
            // Reset fields after successful deletion
            setEventId('');
            setEventName('');
            setEventDate('');
            // Add more resets if you have more fields
            setFeedback('Event deleted successfully');
        } catch (error) {
            setFeedback(error.message);
        }
    };

    // ... [Rest of the handlers remain unchanged]

    return (
        <div>
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
